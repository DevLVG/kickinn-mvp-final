interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => {
  return (
    <div className="text-center">
      <div className="bg-gradient-light rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
        <span className="text-dark-navy font-bold text-lg">{number}</span>
      </div>
      <h3 className="font-bold text-xl text-white mb-3">{title}</h3>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </div>
  );
};

export default ProcessStep;
