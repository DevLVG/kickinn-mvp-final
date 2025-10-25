import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Search, Eye, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Clarification {
  id: string;
  idea_id: string;
  user_id: string;
  status: string;
  questions: any;
  answers: any;
  created_at: string;
  updated_at: string;
  user_email?: string;
}

const AdminVentures = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [ideas, setIdeas] = useState<Clarification[]>([]);
  const [filteredIdeas, setFilteredIdeas] = useState<Clarification[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIdea, setSelectedIdea] = useState<Clarification | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [actionNotes, setActionNotes] = useState("");

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    let filtered = ideas;

    if (statusFilter !== "all") {
      filtered = filtered.filter((idea) => idea.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (idea) =>
          idea.idea_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.user_email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredIdeas(filtered);
  }, [searchQuery, statusFilter, ideas]);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error || !roles || (roles.role as string) !== "admin") {
        toast.error("Access denied. Admin privileges required.");
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
      await fetchIdeas();
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast.error("Failed to verify admin access");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchIdeas = async () => {
    try {
      const { data: clarifications, error } = await supabase
        .from("idea_clarifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch user emails
      const userIds = clarifications?.map((c) => c.user_id) || [];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", userIds);

      const ideasWithEmails = clarifications?.map((idea) => ({
        ...idea,
        user_email: profiles?.find((p) => p.id === idea.user_id)?.email || "Unknown",
      })) || [];

      setIdeas(ideasWithEmails);
      setFilteredIdeas(ideasWithEmails);
    } catch (error: any) {
      console.error("Error fetching ideas:", error);
      toast.error("Failed to load ideas");
    }
  };

  const handleAction = async () => {
    if (!selectedIdea || !actionType) return;

    try {
      const newStatus = actionType === "approve" ? "approved" : "rejected";
      
      const { error } = await supabase
        .from("idea_clarifications")
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString() 
        })
        .eq("id", selectedIdea.id);

      if (error) throw error;

      // Create notification for user
      await supabase.from("notifications").insert({
        user_id: selectedIdea.user_id,
        type: actionType === "approve" ? "success" : "warning",
        title: `Idea ${actionType === "approve" ? "Approved" : "Rejected"}`,
        message: actionNotes || `Your idea has been ${actionType === "approve" ? "approved" : "rejected"}.`,
        data: { idea_id: selectedIdea.idea_id },
        link: `/ideas/${selectedIdea.id}`,
      });

      toast.success(`Idea ${actionType}d successfully`);
      setShowActionDialog(false);
      setActionType(null);
      setActionNotes("");
      await fetchIdeas();
    } catch (error: any) {
      console.error("Error updating idea:", error);
      toast.error("Failed to update idea");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "answered":
        return <Badge variant="outline">Answered</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        activeRole="ideator"
        userRoles={["ideator"]}
        onRoleChange={() => {}}
        user={{ name: "Admin", email: "", initials: "A" }}
      >
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <DashboardLayout
      activeRole="ideator"
      userRoles={["ideator"]}
      onRoleChange={() => {}}
      user={{
        name: user?.email || "Admin",
        email: user?.email || "",
        initials: (user?.email?.[0] || "A").toUpperCase(),
      }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Venture Moderation</h1>
            <p className="text-muted-foreground mt-2">
              Review and moderate venture submissions
            </p>
          </div>
          <Badge variant="secondary" className="px-4 py-2">
            {ideas.length} Submissions
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Submissions</CardTitle>
            <div className="flex items-center gap-2 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Idea ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIdeas.length > 0 ? (
                    filteredIdeas.map((idea) => (
                      <TableRow key={idea.id}>
                        <TableCell className="font-mono text-sm">
                          {idea.idea_id.slice(0, 8)}...
                        </TableCell>
                        <TableCell>{idea.user_email}</TableCell>
                        <TableCell>{getStatusBadge(idea.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(idea.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedIdea(idea);
                                setShowDetailDialog(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {idea.status !== "approved" && (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => {
                                  setSelectedIdea(idea);
                                  setActionType("approve");
                                  setShowActionDialog(true);
                                }}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {idea.status !== "rejected" && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedIdea(idea);
                                  setActionType("reject");
                                  setShowActionDialog(true);
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <p className="text-muted-foreground">
                          {searchQuery || statusFilter !== "all"
                            ? "No submissions found"
                            : "No submissions yet"}
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
              <DialogDescription>
                Review the full submission details
              </DialogDescription>
            </DialogHeader>
            {selectedIdea && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Idea ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {selectedIdea.idea_id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">User</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedIdea.user_email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  {getStatusBadge(selectedIdea.status)}
                </div>
                <div>
                  <p className="text-sm font-medium">Questions</p>
                  <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[200px]">
                    {JSON.stringify(selectedIdea.questions, null, 2)}
                  </pre>
                </div>
                {selectedIdea.answers && (
                  <div>
                    <p className="text-sm font-medium">Answers</p>
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[200px]">
                      {JSON.stringify(selectedIdea.answers, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Action Dialog */}
        <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "approve" ? "Approve" : "Reject"} Submission
              </DialogTitle>
              <DialogDescription>
                Add optional notes for the user
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter notes (optional)..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowActionDialog(false);
                  setActionType(null);
                  setActionNotes("");
                }}
              >
                Cancel
              </Button>
              <Button
                variant={actionType === "approve" ? "default" : "destructive"}
                onClick={handleAction}
              >
                {actionType === "approve" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminVentures;
