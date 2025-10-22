interface DealsFilterBarProps {
  filters: {
    search: string;
    category: string;
    validationScore: string;
    fundingProgress: string;
    sort: string;
  };
  onFilterChange: (key: string, value: string) => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}

const DealsFilterBar = ({
  filters,
  onFilterChange,
  activeFilterCount,
  onClearFilters
}: DealsFilterBarProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Search ventures..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-teal/20 focus:border-secondary-teal transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">📂</span>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-8 py-3 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-teal/20 focus:border-secondary-teal transition-all"
          >
            <option value="all">All Categories</option>
            <option value="HealthTech">HealthTech</option>
            <option value="Fintech">Fintech</option>
            <option value="Logistics">Logistics</option>
            <option value="EdTech">EdTech</option>
            <option value="AgriTech">AgriTech</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Other">Other</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
        </div>

        {/* Validation Score Filter */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">⭐</span>
          <select
            value={filters.validationScore}
            onChange={(e) => onFilterChange('validationScore', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-8 py-3 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-teal/20 focus:border-secondary-teal transition-all"
          >
            <option value="all">All Scores</option>
            <option value="9.0-10.0">Excellent (9.0-10.0)</option>
            <option value="8.0-8.9">Very Good (8.0-8.9)</option>
            <option value="7.0-7.9">Good (7.0-7.9)</option>
            <option value="6.0-6.9">Fair (6.0-6.9)</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
        </div>

        {/* Funding Progress Filter */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">📈</span>
          <select
            value={filters.fundingProgress}
            onChange={(e) => onFilterChange('fundingProgress', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-8 py-3 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-teal/20 focus:border-secondary-teal transition-all"
          >
            <option value="all">All Progress</option>
            <option value="low">Just Started (&lt;25%)</option>
            <option value="medium">In Progress (25-75%)</option>
            <option value="high">Almost Funded (&gt;75%)</option>
            <option value="urgent">Closing Soon (&lt;48h)</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">⚡</span>
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-8 py-3 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary-teal/20 focus:border-secondary-teal transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="validation">Validation Score (High to Low)</option>
            <option value="funding">Funding Progress (High to Low)</option>
            <option value="urgent">Time Remaining (Urgent First)</option>
            <option value="traction">Traction (MRR High to Low)</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-secondary-teal font-medium">
            {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
          </span>
          <button
            onClick={onClearFilters}
            className="text-xs text-gray-600 underline hover:text-gray-900 transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default DealsFilterBar;
