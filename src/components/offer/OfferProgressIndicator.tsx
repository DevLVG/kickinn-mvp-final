import { Check } from "lucide-react";

interface OfferProgressIndicatorProps {
  currentStep: number;
}

const OfferProgressIndicator = ({ currentStep }: OfferProgressIndicatorProps) => {
  const steps = [
    { number: 1, label: "Offer Amount" },
    { number: 2, label: "Terms" },
    { number: 3, label: "DD Deposit" },
    { number: 4, label: "Review & Submit" }
  ];

  return (
    <div className="bg-[rgba(25,74,97,0.4)] border-b border-[rgba(103,159,131,0.2)] py-6">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base transition-all ${
                    step.number < currentStep
                      ? 'bg-[#4ade80] text-white'
                      : step.number === currentStep
                      ? 'bg-gradient-to-r from-[#679f83] to-[#23698a] text-white shadow-[0_0_20px_rgba(103,159,131,0.4)]'
                      : 'bg-[rgba(103,159,131,0.2)] border border-[rgba(103,159,131,0.4)] text-white/60'
                  }`}
                >
                  {step.number < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`mt-2 text-sm font-medium whitespace-nowrap ${
                  step.number <= currentStep ? 'text-white' : 'text-white/50'
                }`}>
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 relative">
                  <div className="absolute inset-0 bg-[rgba(103,159,131,0.2)]" />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#679f83] to-[#23698a] transition-all ${
                      step.number < currentStep ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferProgressIndicator;
