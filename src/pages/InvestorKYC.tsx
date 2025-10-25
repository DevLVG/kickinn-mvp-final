import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle, Upload, FileText, User, MapPin, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InvestorKYC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    idType: "",
    idNumber: "",
  });

  const [documents, setDocuments] = useState({
    idFront: null as File | null,
    idBack: null as File | null,
    proofOfAddress: null as File | null,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setUser(user);
    } catch (error) {
      console.error("Error checking auth:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof typeof documents, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [field]: file }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.dateOfBirth && formData.nationality);
      case 2:
        return !!(formData.country && formData.address && formData.city && formData.postalCode);
      case 3:
        return !!(formData.idType && formData.idNumber && documents.idFront);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fill in all required fields");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast.error("Please complete all required information");
      return;
    }

    setSaving(true);
    try {
      // In a real implementation, you would:
      // 1. Upload documents to storage
      // 2. Create KYC record in database
      // 3. Send to KYC verification service
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create notification
      await supabase.from("notifications").insert({
        user_id: user.id,
        type: "info",
        title: "KYC Submitted",
        message: "Your KYC application has been submitted for review. We'll notify you once it's processed.",
        link: "/investor/kyc",
      });

      toast.success("KYC application submitted successfully!");
      setCurrentStep(4);
    } catch (error: any) {
      console.error("Error submitting KYC:", error);
      toast.error("Failed to submit KYC application");
    } finally {
      setSaving(false);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  if (loading) {
    return (
      <DashboardLayout
        activeRole="investor"
        userRoles={["investor"]}
        onRoleChange={() => {}}
        user={{ name: "User", email: "", initials: "U" }}
      >
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      activeRole="investor"
      userRoles={["investor"]}
      onRoleChange={() => {}}
      user={{
        name: user?.email || "User",
        email: user?.email || "",
        initials: (user?.email?.[0] || "U").toUpperCase(),
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">KYC Verification</h1>
          <p className="text-muted-foreground mt-2">
            Complete your identity verification to start investing
          </p>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {currentStep} of 4</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} />
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter your personal details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Legal Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="As shown on ID document"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    placeholder="e.g., American"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Address Information */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Provide your residential address</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Identity Verification */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Identity Verification</CardTitle>
                  <CardDescription>Upload your identification documents</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idType">ID Document Type *</Label>
                <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers_license">Driver's License</SelectItem>
                    <SelectItem value="national_id">National ID Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="Document number"
                />
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>ID Front Side *</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="idFront"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange("idFront", e.target.files?.[0] || null)}
                    />
                    <label htmlFor="idFront" className="cursor-pointer">
                      {documents.idFront ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                          <span>{documents.idFront.name}</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>ID Back Side</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="idBack"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange("idBack", e.target.files?.[0] || null)}
                    />
                    <label htmlFor="idBack" className="cursor-pointer">
                      {documents.idBack ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                          <span>{documents.idBack.name}</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Proof of Address (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="proofOfAddress"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => handleFileChange("proofOfAddress", e.target.files?.[0] || null)}
                    />
                    <label htmlFor="proofOfAddress" className="cursor-pointer">
                      {documents.proofOfAddress ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                          <span>{documents.proofOfAddress.name}</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Utility bill or bank statement
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold">Application Submitted!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your KYC application has been submitted for review. We'll notify you via email once the verification is complete. This usually takes 1-3 business days.
                </p>
                <Button onClick={() => navigate("/dashboard")} className="mt-6">
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            {currentStep === 3 ? (
              <Button onClick={handleSubmit} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Submit Application
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Continue
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InvestorKYC;
