import { Link } from 'react-router-dom';

interface PendingContract {
  ventureId: string;
  ventureName: string;
  role: string;
  deadlineHours: number;
}

interface PendingContractsSectionProps {
  contracts: PendingContract[];
}

const PendingContractsSection = ({ contracts }: PendingContractsSectionProps) => {
  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500 rounded-2xl p-6 mb-8 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">⚠️</span>
        <h2 className="text-xl font-bold text-purple-600">Action Required: Sign Contracts</h2>
      </div>

      {/* Contract List */}
      <div className="grid grid-cols-1 gap-3">
        {contracts.map((contract) => (
          <div
            key={contract.ventureId}
            className="bg-card rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-bold text-base text-[hsl(var(--primary-dark))]">
                {contract.ventureName}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{contract.role}</p>
              <p className="text-xs text-destructive mt-1 font-medium">
                Sign within 48 hours ({contract.deadlineHours}h remaining)
              </p>
            </div>

            <Link
              to={`/executor/contracts/${contract.ventureId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white font-bold text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              <span>✍️</span>
              <span>Review & Sign</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingContractsSection;
