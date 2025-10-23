import { UseFormReturn } from "react-hook-form";
import { OfferFormData } from "@/pages/MakeOffer";
import { format, addDays } from "date-fns";
import { Phone, Mail, MessageCircle } from "lucide-react";

interface OfferSummarySidebarProps {
  form: UseFormReturn<OfferFormData>;
  depositAmount: number;
  venture: any;
}

const OfferSummarySidebar = ({ form, depositAmount, venture }: OfferSummarySidebarProps) => {
  const formData = form.watch();
  const gasFee = 2.50;
  const totalDueNow = formData.depositTiming === 'now' ? depositAmount + gasFee : 0;

  return (
    <div className="space-y-6 lg:sticky lg:top-[120px]">
      {/* Pricing Summary Card */}
      <div className="bg-gradient-to-br from-[rgba(103,159,131,0.15)] to-[rgba(35,105,138,0.15)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.3)] rounded-3xl p-8 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-6">Offer Summary</h3>

        <div className="space-y-5">
          {/* Offer Amount */}
          <div>
            <p className="text-sm text-white/70 mb-1">Your Offer</p>
            <p className="text-3xl font-bold text-white">${formData.offerAmount.toLocaleString()}</p>
            <p className="text-xs text-[#679f83] mt-1">
              {formData.offerType === 'match' ? 'Asking match' : 'Custom offer'}
            </p>
          </div>

          {/* DD Deposit */}
          <div>
            <p className="text-sm text-white/70 mb-1">DD Deposit</p>
            <p className="text-2xl font-bold text-white">${depositAmount.toLocaleString()}</p>
            <p className="text-xs text-white/60 mt-1">Refundable within 14 days</p>
          </div>

          {/* Gas Fees */}
          <div>
            <p className="text-sm text-white/70 mb-1">Transaction Fees</p>
            <p className="text-xl font-bold text-white">~${gasFee.toFixed(2)}</p>
            <p className="text-xs text-white/60 mt-1">Network fees (TON)</p>
          </div>

          <div className="h-px bg-[rgba(103,159,131,0.3)]" />

          {/* Total Due Now */}
          <div>
            <p className="text-base font-bold text-white mb-1">Total Due Now</p>
            <p className="text-4xl font-bold text-[#679f83]">
              ${totalDueNow.toLocaleString()}
            </p>
            {formData.depositTiming === 'now' ? (
              <p className="text-xs text-white/60 mt-1">Deposit deducted from final payment</p>
            ) : (
              <p className="text-xs text-white/60 mt-1">Deposit due after acceptance</p>
            )}
          </div>

          {/* Financing Breakdown */}
          {formData.financingStructure !== 'cash' && (
            <div className="pt-4 border-t border-[rgba(103,159,131,0.2)]">
              <p className="text-sm font-bold text-white mb-3">Payment Structure</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Initial Payment</span>
                  <span className="text-white">${(formData.offerAmount * 0.6).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Remaining</span>
                  <span className="text-white">${(formData.offerAmount * 0.4).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Terms</span>
                  <span className="text-white">12 months</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Preview Card */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h3 className="text-lg font-bold text-white mb-6">Estimated Timeline</h3>

        <div className="space-y-5">
          {/* Milestone 1 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📝</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Offer Submitted</p>
              <p className="text-sm text-[#679f83]">Today</p>
              <p className="text-xs text-white/60">Current step</p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🔍</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Seller Review</p>
              <p className="text-sm text-white/70">{format(addDays(new Date(), 1), "MMM dd")} - {format(addDays(new Date(), 7), "MMM dd")}</p>
              <p className="text-xs text-white/60">Awaiting response</p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📄</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">DD Period</p>
              <p className="text-sm text-white/70">{format(addDays(new Date(), 7), "MMM dd")} - {format(addDays(new Date(), 21), "MMM dd")}</p>
              <p className="text-xs text-white/60">14 days</p>
            </div>
          </div>

          {/* Milestone 4 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">✍️</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Contract Finalization</p>
              <p className="text-sm text-white/70">{format(addDays(new Date(), 21), "MMM dd")} - {format(addDays(new Date(), 31), "MMM dd")}</p>
              <p className="text-xs text-white/60">Negotiation & legal</p>
            </div>
          </div>

          {/* Milestone 5 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(103,159,131,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">💸</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Payment & Transfer</p>
              <p className="text-sm text-white/70">{format(addDays(new Date(), 31), "MMM dd")} - {format(formData.closingDate, "MMM dd")}</p>
              <p className="text-xs text-white/60">Closing</p>
            </div>
          </div>

          {/* Final */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(74,222,128,0.2)] flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎉</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Complete</p>
              <p className="text-sm text-[#4ade80] font-medium">{format(formData.closingDate, "MMMM dd, yyyy")}</p>
              <p className="text-xs text-white/60">Target closing date</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Card */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h3 className="text-lg font-bold text-white mb-6">Need Help?</h3>

        <div className="space-y-4">
          {/* Consultation */}
          <a
            href="#"
            className="flex items-start gap-4 p-4 rounded-xl bg-[rgba(103,159,131,0.1)] hover:bg-[rgba(103,159,131,0.15)] transition-colors"
          >
            <Phone className="w-5 h-5 text-[#679f83] flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Schedule Consultation</p>
              <p className="text-sm text-white/70">Talk to M&A advisor</p>
              <p className="text-xs text-[#679f83] mt-1">Free 30-min session</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:buyers@kickinn.io"
            className="flex items-start gap-4 p-4 rounded-xl bg-[rgba(103,159,131,0.1)] hover:bg-[rgba(103,159,131,0.15)] transition-colors"
          >
            <Mail className="w-5 h-5 text-[#679f83] flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Email Support</p>
              <p className="text-sm text-white/70">buyers@kickinn.io</p>
              <p className="text-xs text-[#679f83] mt-1">Response within 4hrs</p>
            </div>
          </a>

          {/* Live Chat */}
          <button className="flex items-start gap-4 p-4 rounded-xl bg-[rgba(103,159,131,0.1)] hover:bg-[rgba(103,159,131,0.15)] transition-colors w-full text-left">
            <MessageCircle className="w-5 h-5 text-[#679f83] flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Live Chat</p>
              <p className="text-sm text-white/70">Start Chat</p>
              <p className="text-xs text-[#679f83] mt-1">Available 9am-6pm EST</p>
            </div>
          </button>
        </div>

        {/* FAQ Links */}
        <div className="mt-6 pt-6 border-t border-[rgba(103,159,131,0.2)]">
          <p className="text-sm font-bold text-white mb-3">Common Questions</p>
          <div className="space-y-2">
            {['How does deposit work?', 'What if offer rejected?', 'Can I modify offer?', 'How long DD takes?'].map((faq) => (
              <button
                key={faq}
                className="text-sm text-[#679f83] hover:text-[#86b39c] underline block"
              >
                {faq}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSummarySidebar;
