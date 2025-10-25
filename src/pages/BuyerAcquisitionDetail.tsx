import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Loader2, 
  ArrowLeft, 
  Download, 
  FileText, 
  Users, 
  DollarSign,
  Calendar,
  CheckCircle,
  Building,
  TrendingUp
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AcquisitionDetail {
  id: string;
  venture_name: string;
  purchase_price: number;
  acquisition_date: string;
  status: string;
  deal_structure: string;
  assets_included: string[];
  team_members: number;
  revenue: number;
  users: number;
}

const BuyerAcquisitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [acquisition, setAcquisition] = useState<AcquisitionDetail | null>(null);

  useEffect(() => {
    checkAuthAndLoadData();
  }, [id]);

  const checkAuthAndLoadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);
      await loadAcquisitionData();
    } catch (error) {
      console.error("Error checking auth:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const loadAcquisitionData = async () => {
    try {
      // Mock data - in real implementation, fetch from database
      const mockData: AcquisitionDetail = {
        id: id || "1",
        venture_name: "TechFlow Solutions",
        purchase_price: 250000,
        acquisition_date: "2024-09-15",
        status: "completed",
        deal_structure: "Asset Purchase",
        assets_included: [
          "Source code and IP",
          "Customer database",
          "Marketing materials",
          "Domain and social media accounts",
          "3 months technical support"
        ],
        team_members: 3,
        revenue: 45000,
        users: 2500,
      };

      setAcquisition(mockData);
    } catch (error) {
      console.error("Error loading acquisition:", error);
      toast.error("Failed to load acquisition details");
    }
  };

  const handleDownloadDocument = (docName: string) => {
    toast.success(`Downloading ${docName}...`);
    // In real implementation, download from storage
  };

  if (loading) {
    return (
      <DashboardLayout
        activeRole="buyer"
        userRoles={["buyer"]}
        onRoleChange={() => {}}
        user={{ name: "User", email: "", initials: "U" }}
      >
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!acquisition) {
    return (
      <DashboardLayout
        activeRole="buyer"
        userRoles={["buyer"]}
        onRoleChange={() => {}}
        user={{
          name: user?.email || "User",
          email: user?.email || "",
          initials: (user?.email?.[0] || "U").toUpperCase(),
        }}
      >
        <div className="text-center py-12">
          <p className="text-muted-foreground">Acquisition not found</p>
          <Button onClick={() => navigate("/buyer/acquired")} className="mt-4">
            Back to Acquisitions
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      activeRole="buyer"
      userRoles={["buyer"]}
      onRoleChange={() => {}}
      user={{
        name: user?.email || "User",
        email: user?.email || "",
        initials: (user?.email?.[0] || "U").toUpperCase(),
      }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/buyer/acquired")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{acquisition.venture_name}</h1>
              <p className="text-muted-foreground mt-1">
                Acquired on {new Date(acquisition.acquisition_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Badge className="bg-green-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            Completed
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Purchase Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${acquisition.purchase_price.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${acquisition.revenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {acquisition.users.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Team Size</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {acquisition.team_members}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deal Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Transaction Type</p>
                  <Badge variant="secondary">{acquisition.deal_structure}</Badge>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium mb-3">Payment Terms</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Upfront Payment</span>
                      <span className="font-medium">
                        ${(acquisition.purchase_price * 0.7).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Escrow (6 months)</span>
                      <span className="font-medium">
                        ${(acquisition.purchase_price * 0.3).toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm font-bold">
                      <span>Total</span>
                      <span>${acquisition.purchase_price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Key Metrics at Acquisition</p>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                      <p className="text-sm font-medium">
                        ${(acquisition.revenue / 12).toFixed(0)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Monthly Active Users</p>
                      <p className="text-sm font-medium">{acquisition.users}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Churn Rate</p>
                      <p className="text-sm font-medium">2.3%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Growth Rate</p>
                      <p className="text-sm font-medium text-green-600">+15% MoM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Transition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {acquisition.team_members} team members included in acquisition with transition support.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Technical Lead</p>
                      <p className="text-sm text-muted-foreground">6 months retention bonus</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Product Manager</p>
                      <p className="text-sm text-muted-foreground">3 months consultation</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Marketing Specialist</p>
                      <p className="text-sm text-muted-foreground">Full-time employee</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Acquired Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {acquisition.assets_included.map((asset, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">{asset}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">AWS</Badge>
                  <Badge variant="outline">Stripe</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Legal Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Asset Purchase Agreement",
                    "IP Transfer Certificate",
                    "Non-Compete Agreement",
                    "Transition Service Agreement",
                    "Final Closing Statement"
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{doc}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownloadDocument(doc)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Acquisition Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { date: "2024-09-15", title: "Deal Closed", desc: "All documents signed and payment transferred" },
                    { date: "2024-09-10", title: "Due Diligence Completed", desc: "Technical and financial review finished" },
                    { date: "2024-09-01", title: "Offer Accepted", desc: "Purchase offer of $250,000 accepted" },
                    { date: "2024-08-25", title: "Initial Offer", desc: "First offer submitted to seller" },
                  ].map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        {index < 3 && <div className="w-0.5 h-full bg-border mt-2" />}
                      </div>
                      <div className="pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BuyerAcquisitionDetail;
