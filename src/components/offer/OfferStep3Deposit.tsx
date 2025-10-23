import { UseFormReturn } from "react-hook-form";
import { OfferFormData } from "@/pages/MakeOffer";
import { Info, Zap, Clock, CheckCircle, AlertCircle, Link as LinkIcon, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface OfferStep3DepositProps {
  form: UseFormReturn<OfferFormData>;
  depositAmount: number;
  walletConnected: boolean;
  walletBalance: number;
  onWalletConnect: () => void;
  onWalletDisconnect: () => void;
}

const OfferStep3Deposit = ({
  form,
  depositAmount,
  walletConnected,
  walletBalance,
  onWalletConnect,
  onWalletDisconnect
}: OfferStep3DepositProps) => {
  const depositTiming = form.watch('depositTiming');
  const sufficientBalance = walletBalance >= depositAmount;

  const mockWalletAddress = "UQAbcdefghijklmnopqrstuvwxyz123456";

  return (
    <div className="space-y-6">
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Due Diligence Access Deposit</h3>
        <p className="text-sm text-white/60 mb-8">Secure exclusive DD materials access</p>

        {/* Deposit Explanation */}
        <div className="p-6 bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.3)] rounded-2xl mb-8">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#60a5fa] flex-shrink-0 mt-1" />
            <div className="space-y-2 text-white/80">
              <p>• Full DD access requires refundable deposit</p>
              <p>• Deposit: 2.5% of offer (min $5,000)</p>
              <p>• Refund: Full if withdraw within 14 days</p>
              <p>• Applied: Deducted from final payment if closes</p>
            </div>
          </div>
        </div>

        {/* Calculated Deposit */}
        <div className="text-center mb-8 p-6 bg-[rgba(103,159,131,0.1)] rounded-2xl">
          <p className="text-sm text-white/70 mb-2">Required Deposit</p>
          <p className="text-5xl font-bold text-[#679f83] mb-2">
            ${depositAmount.toLocaleString()}
          </p>
          <p className="text-sm text-white/60">
            2.5% of ${form.watch('offerAmount').toLocaleString()} offer
          </p>
        </div>

        {/* Deposit Payment Options */}
        <div className="mb-8">
          <h4 className="text-lg font-bold text-white mb-4">Payment Timing</h4>
          
          <RadioGroup
            value={depositTiming}
            onValueChange={(value: 'now' | 'after_acceptance') => form.setValue('depositTiming', value)}
            className="space-y-4"
          >
            {/* Pay Now */}
            <div className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
              depositTiming === 'now'
                ? 'border-[#679f83] bg-[rgba(103,159,131,0.1)]'
                : 'border-[rgba(103,159,131,0.2)] hover:border-[rgba(103,159,131,0.4)]'
            }`}>
              <div className="flex items-start gap-4">
                <RadioGroupItem value="now" id="now" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-[#f59e0b]" />
                    <Label htmlFor="now" className="text-base font-bold text-white cursor-pointer">
                      Pay ${depositAmount.toLocaleString()} deposit now
                    </Label>
                    <span className="px-3 py-1 rounded-full bg-[rgba(74,222,128,0.2)] text-[#4ade80] text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                  <p className="text-sm text-white/70">
                    Immediate DD access
                  </p>
                </div>
              </div>
            </div>

            {/* Pay After */}
            <div className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
              depositTiming === 'after_acceptance'
                ? 'border-[#679f83] bg-[rgba(103,159,131,0.1)]'
                : 'border-[rgba(103,159,131,0.2)] hover:border-[rgba(103,159,131,0.4)]'
            }`}>
              <div className="flex items-start gap-4">
                <RadioGroupItem value="after_acceptance" id="after_acceptance" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-[#60a5fa]" />
                    <Label htmlFor="after_acceptance" className="text-base font-bold text-white cursor-pointer">
                      Pay only if offer accepted
                    </Label>
                  </div>
                  <p className="text-sm text-white/70 mb-2">
                    Due within 48hrs of acceptance
                  </p>
                  <p className="text-xs text-white/60">
                    ℹ️ Seller reviews first, access after acceptance
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Wallet Connection (if deposit now) */}
        {depositTiming === 'now' && (
          <div className="bg-[rgba(25,74,97,0.4)] border border-[rgba(103,159,131,0.2)] rounded-2xl p-6">
            <h4 className="text-lg font-bold text-white mb-4">Connect Wallet for Payment</h4>

            {!walletConnected ? (
              <Button
                onClick={onWalletConnect}
                className="w-full bg-gradient-to-r from-[#679f83] to-[#23698a] hover:opacity-90 text-white font-medium py-6 text-base"
              >
                <LinkIcon className="w-5 h-5 mr-3" />
                Connect TON Wallet
              </Button>
            ) : (
              <>
                {/* Connected Wallet */}
                <div className={`p-5 rounded-xl mb-4 ${
                  sufficientBalance
                    ? 'bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.3)]'
                    : 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)]'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {sufficientBalance ? (
                        <CheckCircle className="w-6 h-6 text-[#4ade80]" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-[#ef4444]" />
                      )}
                      <div>
                        <p className="text-white font-medium mb-1 flex items-center gap-2">
                          {mockWalletAddress.slice(0, 6)}...{mockWalletAddress.slice(-4)}
                          <button
                            onClick={() => navigator.clipboard.writeText(mockWalletAddress)}
                            className="text-white/60 hover:text-white"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </p>
                        <p className={`text-sm font-medium ${sufficientBalance ? 'text-[#4ade80]' : 'text-[#ef4444]'}`}>
                          {walletBalance.toLocaleString()} USDT available
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onWalletDisconnect}
                      className="text-xs text-white/60 hover:text-white underline"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>

                {/* Insufficient Balance Warning */}
                {!sufficientBalance && (
                  <div className="p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-xl mb-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-[#ef4444] mb-3">
                        Insufficient USDT. Add funds to wallet
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#ef4444] text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)]"
                      >
                        Add USDT
                      </Button>
                    </div>
                  </div>
                )}

                {/* Transaction Preview */}
                {sufficientBalance && (
                  <div className="p-5 bg-[rgba(103,159,131,0.05)] border border-[rgba(103,159,131,0.2)] rounded-xl">
                    <h5 className="text-base font-bold text-white mb-4">Transaction Details</h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Deposit</span>
                        <span className="text-white font-medium">${depositAmount.toLocaleString()} USDT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Gas fee</span>
                        <span className="text-white font-medium">~$2.50 TON</span>
                      </div>
                      <div className="h-px bg-[rgba(103,159,131,0.2)] my-2" />
                      <div className="flex justify-between">
                        <span className="text-white/70">Total</span>
                        <span className="text-white font-bold text-base">${(depositAmount + 2.50).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Destination</span>
                        <span className="text-white font-mono text-xs">Kick Inn Escrow Contract</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Network</span>
                        <span className="text-white font-medium">TON Mainnet</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferStep3Deposit;
