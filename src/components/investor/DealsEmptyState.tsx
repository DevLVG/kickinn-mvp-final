interface DealsEmptyStateProps {
  hasDeals: boolean;
  onClearFilters: () => void;
}

const DealsEmptyState = ({ hasDeals, onClearFilters }: DealsEmptyStateProps) => {
  return (
    <div className="text-center py-20 px-5 bg-white rounded-xl border border-gray-200">
      <span className="text-6xl block mb-6 opacity-30">💼</span>
      
      <h2 className="text-2xl font-bold text-primary-dark mb-3">
        {hasDeals ? 'No Deals Found' : 'No Active Deals'}
      </h2>
      
      <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">
        {hasDeals 
          ? 'Try adjusting your filters or check back later'
          : 'New investment opportunities will appear here once ventures complete validation'
        }
      </p>

      {hasDeals && (
        <button
          onClick={onClearFilters}
          className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white px-6 py-3 rounded-lg font-medium text-sm hover:shadow-lg transition-all"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default DealsEmptyState;
