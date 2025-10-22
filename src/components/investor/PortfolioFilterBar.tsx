interface PortfolioFilterBarProps {
  statusFilter: string;
  categoryFilter: string;
  sortBy: string;
  onStatusFilterChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

const PortfolioFilterBar = ({
  statusFilter,
  categoryFilter,
  sortBy,
  onStatusFilterChange,
  onCategoryFilterChange,
  onSortByChange,
  activeFiltersCount,
  onClearFilters
}: PortfolioFilterBarProps) => {
  const statusOptions = [
    'All Status',
    'Active',
    'Funding Failed (refund available)',
    'Exit Available',
    'Exited'
  ];

  const categoryOptions = [
    'All Categories',
    'HealthTech',
    'Fintech',
    'Logistics',
    'EdTech',
    'AgriTech',
    'Other'
  ];

  const sortOptions = [
    'Highest ROI',
    'Lowest ROI',
    'Largest Investment',
    'Most Recent',
    'Alphabetical (A-Z)'
  ];

  return (
    <div className="bg-white border border-[rgba(103,159,131,0.15)] rounded-xl p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base">🎯</div>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full bg-[#f5f7f8] border border-[rgba(103,159,131,0.2)] rounded-lg pl-10 pr-10 py-3 text-sm appearance-none cursor-pointer focus:border-[#679f83] focus:ring-2 focus:ring-[rgba(103,159,131,0.2)] transition-all"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none">▼</div>
        </div>

        {/* Category Filter */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base">📂</div>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="w-full bg-[#f5f7f8] border border-[rgba(103,159,131,0.2)] rounded-lg pl-10 pr-10 py-3 text-sm appearance-none cursor-pointer focus:border-[#679f83] focus:ring-2 focus:ring-[rgba(103,159,131,0.2)] transition-all"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none">▼</div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base">⚡</div>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full bg-[#f5f7f8] border border-[rgba(103,159,131,0.2)] rounded-lg pl-10 pr-10 py-3 text-sm appearance-none cursor-pointer focus:border-[#679f83] focus:ring-2 focus:ring-[rgba(103,159,131,0.2)] transition-all"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none">▼</div>
        </div>
      </div>

      {/* Active Filters Badge */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs text-[#679f83] font-medium">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
          </span>
          <button
            onClick={onClearFilters}
            className="text-xs text-gray-600 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioFilterBar;
