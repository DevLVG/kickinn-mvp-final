interface ContractTermsSectionProps {
  terms: string[];
}

const ContractTermsSection = ({ terms }: ContractTermsSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[hsl(var(--primary-dark))] mb-2">Contract Terms</h2>
      <p className="text-sm text-muted-foreground mb-5">Key obligations and commitments</p>

      <div className="space-y-3">
        {terms.map((term, index) => (
          <div
            key={index}
            className="bg-muted border-l-4 border-[hsl(var(--secondary-teal))] p-4 rounded-r-lg flex gap-3"
          >
            <span className="text-sm font-bold text-[hsl(var(--secondary-teal))] flex-shrink-0">
              {index + 1}.
            </span>
            <p className="text-sm text-foreground leading-relaxed">{term}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractTermsSection;
