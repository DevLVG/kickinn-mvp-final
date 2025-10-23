import { UseFormReturn } from "react-hook-form";
import { OfferFormData } from "@/pages/MakeOffer";
import { ArrowLeft, Zap, MessageCircle, DollarSign, TrendingUp, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OfferStep1AmountProps {
  form: UseFormReturn<OfferFormData>;
  venture: any;
  onBack: () => void;
}

const OfferStep1Amount = ({ form, venture, onBack }: OfferStep1AmountProps) => {
  const offerType = form.watch('offerType');
  const offerAmount = form.watch('offerAmount');
  const financingStructure = form.watch('financingStructure');
  const askingPrice = venture.asking_price_usd;

  const percentDiff = ((offerAmount - askingPrice) / askingPrice) * 100;

  return (
    <div className="space-y-6">
      {/* Venture Summary Card */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-[#86b39c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Details</span>
          </button>
        </div>
        
        <div className="flex items-center gap-5">
          <img
            src={venture.image_url}
            alt={venture.title}
            className="w-20 h-20 object-cover rounded-xl"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">{venture.title}</h2>
            <span className="inline-block px-3 py-1 rounded-full bg-[rgba(103,159,131,0.2)] border border-[rgba(103,159,131,0.4)] text-[#86b39c] text-xs">
              {venture.sector}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60 mb-1">Asking Price</p>
            <p className="text-2xl font-bold text-[#679f83]">
              ${(askingPrice / 1000000).toFixed(2)}M
            </p>
          </div>
        </div>
      </div>

      {/* Offer Amount Card */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Your Offer Amount</h3>
        <p className="text-sm text-white/60 mb-6">Suggested: ${askingPrice.toLocaleString()} (listing price)</p>

        {/* Offer Type Selection */}
        <RadioGroup
          value={offerType}
          onValueChange={(value: 'match' | 'custom') => form.setValue('offerType', value)}
          className="space-y-4 mb-6"
        >
          {/* Match Asking Price */}
          <div className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${
            offerType === 'match'
              ? 'border-[#679f83] bg-[rgba(103,159,131,0.1)]'
              : 'border-[rgba(103,159,131,0.2)] hover:border-[rgba(103,159,131,0.4)]'
          }`}>
            <div className="flex items-start gap-4">
              <RadioGroupItem value="match" id="match" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-[#f59e0b]" />
                  <Label htmlFor="match" className="text-lg font-bold text-white cursor-pointer">
                    Match asking price: ${askingPrice.toLocaleString()}
                  </Label>
                  <span className="px-3 py-1 rounded-full bg-[rgba(74,222,128,0.2)] text-[#4ade80] text-xs font-medium">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-white/70">
                  Fastest path. Closes in 18-25 days
                </p>
              </div>
            </div>
          </div>

          {/* Custom Offer */}
          <div className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${
            offerType === 'custom'
              ? 'border-[#679f83] bg-[rgba(103,159,131,0.1)]'
              : 'border-[rgba(103,159,131,0.2)] hover:border-[rgba(103,159,131,0.4)]'
          }`}>
            <div className="flex items-start gap-4">
              <RadioGroupItem value="custom" id="custom" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="w-5 h-5 text-[#60a5fa]" />
                  <Label htmlFor="custom" className="text-lg font-bold text-white cursor-pointer">
                    Submit custom offer
                  </Label>
                </div>
                <p className="text-sm text-white/70 mb-4">
                  Negotiate price. May require multiple rounds
                </p>

                {offerType === 'custom' && (
                  <div className="mt-4">
                    <Label className="text-white mb-2 block">Enter your offer amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                      <Input
                        type="number"
                        {...form.register('offerAmount', { valueAsNumber: true })}
                        className="pl-12 bg-[rgba(15,43,56,0.8)] border-[rgba(103,159,131,0.3)] text-white text-lg h-14"
                        min={100000}
                        max={10000000}
                      />
                    </div>

                    {/* Validation Messages */}
                    {percentDiff < -30 && (
                      <p className="mt-3 text-sm text-[#fb923c] flex items-center gap-2">
                        <span>⚠️</span>
                        Offers below 70% rarely accepted
                      </p>
                    )}
                    {percentDiff > 10 && (
                      <p className="mt-3 text-sm text-[#60a5fa] flex items-center gap-2">
                        <span>ℹ️</span>
                        Consider matching asking price
                      </p>
                    )}

                    {/* Comparison Chart */}
                    {offerType === 'custom' && (
                      <div className="mt-6 p-4 bg-[rgba(15,43,56,0.6)] rounded-xl">
                        <p className="text-sm text-white/70 mb-3">Offer Comparison</p>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/70">Asking Price</span>
                              <span className="text-white font-medium">${askingPrice.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-[rgba(103,159,131,0.2)] rounded-full overflow-hidden">
                              <div className="h-full w-full bg-[#679f83]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/70">Your Offer</span>
                              <span className="text-white font-medium">${offerAmount.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-[rgba(103,159,131,0.2)] rounded-full overflow-hidden">
                              <div
                                className={`h-full ${percentDiff >= 0 ? 'bg-[#4ade80]' : percentDiff >= -30 ? 'bg-[#fb923c]' : 'bg-[#ef4444]'}`}
                                style={{ width: `${Math.min((offerAmount / askingPrice) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#679f83] mt-3 font-medium">
                          {percentDiff >= 0 ? `${percentDiff.toFixed(1)}% above asking` : `${Math.abs(percentDiff).toFixed(1)}% below asking`}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </RadioGroup>

        {/* Financing Structure */}
        <div className="mt-8">
          <h4 className="text-lg font-bold text-white mb-4">Financing Structure</h4>
          
          <RadioGroup
            value={financingStructure}
            onValueChange={(value: any) => form.setValue('financingStructure', value)}
            className="space-y-4"
          >
            {/* Cash */}
            <div className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
              financingStructure === 'cash'
                ? 'border-[#679f83] bg-[rgba(103,159,131,0.1)]'
                : 'border-[rgba(103,159,131,0.2)] hover:border-[rgba(103,159,131,0.4)]'
            }`}>
              <div className="flex items-start gap-4">
                <RadioGroupItem value="cash" id="cash" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-[#4ade80]" />
                    <Label htmlFor="cash" className="text-base font-bold text-white cursor-pointer">
                      Cash Purchase
                    </Label>
                  </div>
                  <p className="text-sm text-white/70">
                    Full USDT payment via smart contract
                  </p>
                  <p className="text-xs text-[#4ade80] mt-2">
                    ⚡ Fastest closing, ~18 days
                  </p>
                </div>
              </div>
            </div>

            {/* Partial Financing */}
            <div className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
              financingStructure === 'partial'
                ? 'border-[#679f83] bg-[rgba(103,159,131,0.1)]'
                : 'border-[rgba(103,159,131,0.2)] hover:border-[rgba(103,159,131,0.4)]'
            }`}>
              <div className="flex items-start gap-4">
                <RadioGroupItem value="partial" id="partial" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-[#60a5fa]" />
                    <Label htmlFor="partial" className="text-base font-bold text-white cursor-pointer">
                      Partial Financing
                    </Label>
                  </div>
                  <p className="text-sm text-white/70 mb-3">
                    Initial payment + structured payments
                  </p>
                  <p className="text-xs text-white/60">
                    ⚠️ Subject to seller approval
                  </p>
                </div>
              </div>
            </div>

            {/* Earn-Out */}
            <div className={`border-2 rounded-xl p-5 cursor-pointer transition-all ${
              financingStructure === 'earnout'
                ? 'border-[#679f83] bg-[rgba(103,159,131,0.1)]'
                : 'border-[rgba(103,159,131,0.2)] hover:border-[rgba(103,159,131,0.4)]'
            }`}>
              <div className="flex items-start gap-4">
                <RadioGroupItem value="earnout" id="earnout" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
                    <Label htmlFor="earnout" className="text-base font-bold text-white cursor-pointer">
                      Earn-Out Structure
                    </Label>
                  </div>
                  <p className="text-sm text-white/70 mb-3">
                    Base payment + performance-based payments
                  </p>
                  <p className="text-xs text-white/60">
                    ⚠️ Complex, may extend timeline
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default OfferStep1Amount;
