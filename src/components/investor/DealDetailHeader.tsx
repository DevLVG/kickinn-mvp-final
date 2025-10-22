interface DealDetailHeaderProps {
  deal: {
    title: string;
    category: string;
    validation_score: number;
  };
  isSaved: boolean;
  onToggleSave: () => void;
  onBack: () => void;
}

const DealDetailHeader = ({ deal, isSaved, onToggleSave, onBack }: DealDetailHeaderProps) => {
  const getValidationGradient = (score: number) => {
    if (score >= 9.0) return 'linear-gradient(135deg, #10b981, #059669)';
    if (score >= 8.0) return 'linear-gradient(135deg, #3b82f6, #2563eb)';
    if (score >= 7.0) return 'linear-gradient(135deg, #f59e0b, #d97706)';
    return 'linear-gradient(135deg, #6b7280, #4b5563)';
  };

  return (
    <div className="mb-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-secondary-teal transition-colors mb-4"
      >
        <span>←</span>
        <span>Back to Deals</span>
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-primary-dark mb-3 leading-tight">
            {deal.title}
          </h1>
          <div className="bg-secondary-teal/10 text-secondary-teal px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2">
            <span>📂</span>
            <span>{deal.category}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* Validation Badge */}
          <div
            className="px-6 py-3 rounded-xl text-white font-bold text-xl shadow-lg flex items-center gap-2"
            style={{ background: getValidationGradient(deal.validation_score) }}
          >
            <span>⭐</span>
            <span>{deal.validation_score.toFixed(1)}/10</span>
          </div>

          {/* Save Button */}
          <button
            onClick={onToggleSave}
            className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-secondary-teal hover:border-secondary-teal hover:text-white transition-all shadow-md"
            aria-label={isSaved ? 'Remove saved deal' : 'Save deal'}
          >
            <span className="text-2xl">{isSaved ? '📌' : '🔖'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealDetailHeader;
