import { UseFormReturn } from "react-hook-form";
import { OfferFormData } from "@/pages/MakeOffer";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

interface OfferStep4ReviewProps {
  form: UseFormReturn<OfferFormData>;
  venture: any;
  depositAmount: number;
  onEditStep: (step: number) => void;
}

const OfferStep4Review = ({ form, venture, depositAmount, onEditStep }: OfferStep4ReviewProps) => {
  const formData = form.watch();

  return (
    <div className="space-y-6">
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Review Your Offer</h3>
        <p className="text-sm text-white/60 mb-8">Review all details before submitting</p>

        {/* Offer Summary Sections */}
        <div className="space-y-6 mb-8">
          {/* Offer Amount */}
          <div className="p-5 bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.2)] rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Offer Amount</h4>
              <button
                onClick={() => onEditStep(1)}
                className="text-sm text-[#679f83] hover:text-[#86b39c] underline"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Amount</span>
                <span className="text-white font-bold text-base">${formData.offerAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Financing</span>
                <span className="text-white capitalize">{formData.financingStructure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Multiple</span>
                <span className="text-white">{venture.revenue_multiple}x revenue</span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="p-5 bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.2)] rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Terms</h4>
              <button
                onClick={() => onEditStep(2)}
                className="text-sm text-[#679f83] hover:text-[#86b39c] underline"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Closing</span>
                <span className="text-white">{format(formData.closingDate, "MMMM dd, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Assets</span>
                <span className="text-white">{formData.assetsIncluded.length} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Contingencies</span>
                <span className="text-white">{formData.contingencies.length || 'None'}</span>
              </div>
            </div>
          </div>

          {/* DD Deposit */}
          <div className="p-5 bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.2)] rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">DD Deposit</h4>
              <button
                onClick={() => onEditStep(3)}
                className="text-sm text-[#679f83] hover:text-[#86b39c] underline"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Amount</span>
                <span className="text-white font-bold">${depositAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Payment</span>
                <span className="text-white capitalize">{formData.depositTiming === 'now' ? 'Now' : 'After acceptance'}</span>
              </div>
              {formData.depositTiming === 'now' && formData.walletAddress && (
                <div className="flex justify-between">
                  <span className="text-white/70">Wallet</span>
                  <span className="text-white font-mono text-xs">
                    {formData.walletAddress.slice(0, 6)}...{formData.walletAddress.slice(-4)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legal Agreements */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-white mb-4">Terms & Agreements</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-[rgba(103,159,131,0.05)] transition-colors">
              <Checkbox
                id="offer_agreement"
                checked={formData.agreementsAccepted.offerAgreement}
                onCheckedChange={(checked) =>
                  form.setValue('agreementsAccepted.offerAgreement', checked as boolean)
                }
                className="border-[rgba(103,159,131,0.4)] mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="offer_agreement" className="text-white cursor-pointer block mb-1">
                  I agree to the <a href="#" className="text-[#679f83] underline">Kick Inn Offer Agreement</a>
                </Label>
                <p className="text-xs text-white/60">12 pages • Must read to continue</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-[rgba(103,159,131,0.05)] transition-colors">
              <Checkbox
                id="risk_disclosure"
                checked={formData.agreementsAccepted.riskDisclosure}
                onCheckedChange={(checked) =>
                  form.setValue('agreementsAccepted.riskDisclosure', checked as boolean)
                }
                className="border-[rgba(103,159,131,0.4)] mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="risk_disclosure" className="text-white cursor-pointer block mb-1">
                  I acknowledge the <a href="#" className="text-[#679f83] underline">Risk Disclosure</a>
                </Label>
                <p className="text-xs text-white/60">Market volatility, performance uncertainty, regulatory risks</p>
              </div>
            </div>

            {formData.depositTiming === 'now' && (
              <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-[rgba(103,159,131,0.05)] transition-colors">
                <Checkbox
                  id="payment_auth"
                  checked={formData.agreementsAccepted.paymentAuth}
                  onCheckedChange={(checked) =>
                    form.setValue('agreementsAccepted.paymentAuth', checked as boolean)
                  }
                  className="border-[rgba(103,159,131,0.4)] mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="payment_auth" className="text-white cursor-pointer block">
                    I authorize deposit payment from connected wallet
                  </Label>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-[rgba(103,159,131,0.05)] transition-colors">
              <Checkbox
                id="data_privacy"
                checked={formData.agreementsAccepted.dataPrivacy}
                onCheckedChange={(checked) =>
                  form.setValue('agreementsAccepted.dataPrivacy', checked as boolean)
                }
                className="border-[rgba(103,159,131,0.4)] mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="data_privacy" className="text-white cursor-pointer block mb-1">
                  I consent per <a href="#" className="text-[#679f83] underline">Privacy Policy</a>
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Confirmation */}
        <div className="p-6 bg-[rgba(103,159,131,0.15)] border border-[rgba(103,159,131,0.3)] rounded-2xl">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#679f83] flex-shrink-0 mt-1" />
            <div className="text-white/80 leading-relaxed">
              <p className="mb-3">
                By submitting, you enter binding agreement. Seller notified immediately, has 7 days to respond.
              </p>
              <p className="mb-3">
                You'll receive email/in-app notifications.
              </p>
              <p>
                Deposit (if paid) held in escrow, refundable per terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferStep4Review;
