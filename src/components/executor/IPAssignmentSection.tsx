interface IPAssignmentSectionProps {
  ipTerms: string;
}

const IPAssignmentSection = ({ ipTerms }: IPAssignmentSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[hsl(var(--primary-dark))] mb-2">
        Intellectual Property Rights
      </h2>
      <p className="text-sm text-muted-foreground mb-5">Ownership and usage terms</p>

      <div className="bg-muted border-2 border-[hsl(var(--secondary-teal))]/15 rounded-xl p-6">
        <div className="text-center mb-4">
          <span className="text-3xl">📜</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed text-center">{ipTerms}</p>

        <div className="bg-card border-l-3 border-[hsl(var(--secondary-teal))] rounded-r-lg p-4 mt-4">
          <ul className="space-y-2">
            <li className="text-xs text-foreground flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Code and designs become venture property upon payment</span>
            </li>
            <li className="text-xs text-foreground flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Non-compete clause: 12 months for similar solutions</span>
            </li>
            <li className="text-xs text-foreground flex items-start gap-2">
              <span className="text-muted-foreground">•</span>
              <span>Attribution rights maintained for portfolio purposes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IPAssignmentSection;
