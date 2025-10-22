interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="flex justify-center gap-2 mb-8">
      {steps.map((step) => (
        <div 
          key={step}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            step < currentStep ? 'bg-accent-blue' : 
            step === currentStep ? 'bg-secondary-teal' : 
            'bg-white/20'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;