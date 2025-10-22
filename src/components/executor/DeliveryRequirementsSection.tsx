interface Requirement {
  category: string;
  icon: string;
  description: string;
}

interface DeliveryRequirementsSectionProps {
  requirements: Requirement[];
}

const DeliveryRequirementsSection = ({ requirements }: DeliveryRequirementsSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[hsl(var(--primary-dark))] mb-2">
        Quality & Delivery Standards
      </h2>
      <p className="text-sm text-muted-foreground mb-5">What we expect from your work</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requirements.map((req, index) => (
          <div
            key={index}
            className="bg-card border border-[hsl(var(--secondary-teal))]/20 rounded-lg p-5 hover:border-[hsl(var(--secondary-teal))] hover:shadow-sm transition-all duration-200 text-center"
          >
            <div className="text-3xl mb-3">{req.icon}</div>
            <h3 className="text-base font-bold text-[hsl(var(--primary-dark))] mb-2">
              {req.category}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{req.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryRequirementsSection;
