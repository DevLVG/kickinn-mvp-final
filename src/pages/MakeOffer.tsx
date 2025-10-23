import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OfferProgressIndicator from "@/components/offer/OfferProgressIndicator";
import OfferStep1Amount from "@/components/offer/OfferStep1Amount";
import OfferStep2Terms from "@/components/offer/OfferStep2Terms";
import OfferStep3Deposit from "@/components/offer/OfferStep3Deposit";
import OfferStep4Review from "@/components/offer/OfferStep4Review";
import OfferSummarySidebar from "@/components/offer/OfferSummarySidebar";
import OfferConfirmationModal from "@/components/offer/OfferConfirmationModal";
import LoadingSpinner from "@/components/LoadingSpinner";

export type OfferFormData = {
  // Step 1
  offerType: 'match' | 'custom';
  offerAmount: number;
  financingStructure: 'cash' | 'partial' | 'earnout';
  initialPayment?: number;
  paymentTerms?: string;
  earnoutPeriod?: string;
  performanceMetrics?: string[];
  
  // Step 2
  closingDate: Date;
  assetsIncluded: string[];
  customRequirements?: string;
  contingencies: string[];
  
  // Step 3
  depositTiming: 'now' | 'after_acceptance';
  walletAddress?: string;
  
  // Step 4
  agreementsAccepted: {
    offerAgreement: boolean;
    riskDisclosure: boolean;
    paymentAuth: boolean;
    dataPrivacy: boolean;
  };
};

const MakeOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState(5240);
  const [offerId, setOfferId] = useState<string | null>(null);

  const form = useForm<OfferFormData>({
    defaultValues: {
      offerType: 'match',
      offerAmount: 1850000,
      financingStructure: 'cash',
      closingDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      assetsIncluded: [
        'source_code',
        'domain',
        'user_db',
        'brand_assets',
        'social_media',
        'email_lists',
        'analytics',
        'vendor_contracts',
        'documentation'
      ],
      contingencies: [],
      depositTiming: 'now',
      agreementsAccepted: {
        offerAgreement: false,
        riskDisclosure: false,
        paymentAuth: false,
        dataPrivacy: false
      }
    }
  });

  // Mock user
  const user = {
    id: "user123",
    name: "John Buyer",
    email: "buyer@example.com",
    initials: "JB",
    role: 'buyer' as const,
    kyc_status: 'verified' as const,
  };

  // Mock venture data
  const venture = {
    id: id || "1",
    title: "LogiTrack - Fleet Management SaaS",
    sector: "SaaS",
    image_url: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800",
    asking_price_usd: 1850000,
    revenue_multiple: 6.2,
    status: 'available' as const
  };

  // Auto-save draft
  useEffect(() => {
    const interval = setInterval(() => {
      const formData = form.getValues();
      localStorage.setItem(`offer_draft_${id}`, JSON.stringify(formData));
    }, 60000);
    return () => clearInterval(interval);
  }, [id, form]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem(`offer_draft_${id}`);
    if (draft) {
      const parsed = JSON.parse(draft);
      form.reset(parsed);
    }
  }, [id, form]);

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (data: OfferFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newOfferId = `KKN-${Date.now().toString().slice(-8)}`;
      setOfferId(newOfferId);
      setShowConfirmationModal(true);
      
      // Clear draft
      localStorage.removeItem(`offer_draft_${id}`);
    } catch (error) {
      console.error("Offer submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const depositAmount = Math.max(form.watch('offerAmount') * 0.025, 5000);

  return (
    <DashboardLayout
      activeRole="buyer"
      userRoles={['buyer']}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="min-h-screen bg-gradient-to-b from-[rgba(15,43,56,0.8)] to-[rgba(15,43,56,0.95)]">
        {/* Progress Indicator */}
        <OfferProgressIndicator currentStep={currentStep} />

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="grid lg:grid-cols-[60%_40%] gap-10">
            {/* Left Column - Form Steps */}
            <div>
              {currentStep === 1 && (
                <OfferStep1Amount
                  form={form}
                  venture={venture}
                  onBack={() => navigate(`/exits/${id}`)}
                />
              )}
              {currentStep === 2 && (
                <OfferStep2Terms form={form} />
              )}
              {currentStep === 3 && (
                <OfferStep3Deposit
                  form={form}
                  depositAmount={depositAmount}
                  walletConnected={walletConnected}
                  walletBalance={walletBalance}
                  onWalletConnect={() => setWalletConnected(true)}
                  onWalletDisconnect={() => setWalletConnected(false)}
                />
              )}
              {currentStep === 4 && (
                <OfferStep4Review
                  form={form}
                  venture={venture}
                  depositAmount={depositAmount}
                  onEditStep={(step) => setCurrentStep(step)}
                />
              )}

              {/* Navigation Buttons */}
              <div className="sticky bottom-0 bg-[rgba(25,74,97,0.95)] backdrop-blur-[20px] border-t border-[rgba(103,159,131,0.2)] p-5 rounded-xl mt-8 flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-7 py-3.5 rounded-xl border border-[rgba(103,159,131,0.4)] text-[#86b39c] hover:bg-[rgba(103,159,131,0.1)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                <button
                  onClick={() => {
                    const formData = form.getValues();
                    localStorage.setItem(`offer_draft_${id}`, JSON.stringify(formData));
                    alert('Draft saved!');
                  }}
                  className="px-5 py-3 text-sm text-white/60 hover:text-white/80 transition-colors"
                >
                  💾 Save Draft
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#679f83] to-[#23698a] text-white font-bold hover:opacity-90 hover:scale-[1.02] transition-all"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={form.handleSubmit(handleSubmit)}
                    disabled={isSubmitting || !form.watch('agreementsAccepted.offerAgreement') || !form.watch('agreementsAccepted.riskDisclosure')}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#679f83] to-[#23698a] text-white font-bold hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Offer'}
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Summary Sidebar */}
            <OfferSummarySidebar
              form={form}
              depositAmount={depositAmount}
              venture={venture}
            />
          </div>
        </div>

        {/* Confirmation Modal */}
        <OfferConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => {
            setShowConfirmationModal(false);
            navigate('/buyer/offers');
          }}
          offerId={offerId || ''}
          venture={venture}
          offerAmount={form.watch('offerAmount')}
        />
      </div>
    </DashboardLayout>
  );
};

export default MakeOffer;
