import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Filters {
  search: string;
  sector: string | null;
  metrics: {
    minRevenue: boolean;
    minUsers: boolean;
    minGrowth: boolean;
    isProfitable: boolean;
  };
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'recent' | 'price_asc' | 'price_desc' | 'revenue' | 'growth' | 'multiple';
}

interface ExitFilterPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const ExitFilterPanel = ({ filters, onFiltersChange }: ExitFilterPanelProps) => {
  const [searchValue, setSearchValue] = useState(filters.search);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Debounce search
    setTimeout(() => {
      onFiltersChange({ ...filters, search: value });
    }, 500);
  };

  const toggleMetric = (metric: keyof typeof filters.metrics) => {
    onFiltersChange({
      ...filters,
      metrics: {
        ...filters.metrics,
        [metric]: !filters.metrics[metric]
      }
    });
  };

  const activeFiltersCount = 
    (filters.sector ? 1 : 0) +
    Object.values(filters.metrics).filter(Boolean).length +
    (filters.search ? 1 : 0);

  const clearAllFilters = () => {
    setSearchValue("");
    onFiltersChange({
      search: "",
      sector: null,
      metrics: { minRevenue: false, minUsers: false, minGrowth: false, isProfitable: false },
      priceRange: { min: 100000, max: 10000000 },
      sortBy: 'recent'
    });
  };

  return (
    <div 
      className="sticky top-0 z-20 px-4 md:px-10 py-6 md:py-8"
      style={{
        background: 'rgba(25, 74, 97, 0.3)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(103, 159, 131, 0.2)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px] md:min-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            <Input
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name, sector, or keyword..."
              className="pl-10 rounded-xl text-white placeholder:text-white/50"
              style={{
                background: 'rgba(15, 43, 56, 0.8)',
                border: '1px solid rgba(103, 159, 131, 0.3)'
              }}
            />
          </div>

          {/* Category Filter */}
          <Select value={filters.sector || "all"} onValueChange={(value) => onFiltersChange({ ...filters, sector: value === "all" ? null : value })}>
            <SelectTrigger 
              className="w-[180px] rounded-xl text-white"
              style={{
                background: 'rgba(15, 43, 56, 0.8)',
                border: '1px solid rgba(103, 159, 131, 0.3)'
              }}
            >
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="SaaS">SaaS</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Fintech">Fintech</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="EdTech">EdTech</SelectItem>
              <SelectItem value="Marketplace">Marketplace</SelectItem>
              <SelectItem value="AI/ML">AI/ML</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Options */}
          <Select value={filters.sortBy} onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as any })}>
            <SelectTrigger 
              className="w-[180px] rounded-xl text-white"
              style={{
                background: 'rgba(15, 43, 56, 0.8)',
                border: '1px solid rgba(103, 159, 131, 0.3)'
              }}
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Listed</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="revenue">Highest Revenue</SelectItem>
              <SelectItem value="growth">Fastest Growing</SelectItem>
              <SelectItem value="multiple">Best Multiple</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Metrics Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm mr-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Traction:
          </span>
          
          <button
            onClick={() => toggleMetric('minRevenue')}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: filters.metrics.minRevenue ? '#679f83' : 'rgba(103, 159, 131, 0.2)',
              border: filters.metrics.minRevenue ? 'none' : '1px solid rgba(103, 159, 131, 0.4)',
              color: filters.metrics.minRevenue ? 'white' : '#86b39c'
            }}
          >
            Revenue &gt; $10K MRR
          </button>

          <button
            onClick={() => toggleMetric('minUsers')}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: filters.metrics.minUsers ? '#679f83' : 'rgba(103, 159, 131, 0.2)',
              border: filters.metrics.minUsers ? 'none' : '1px solid rgba(103, 159, 131, 0.4)',
              color: filters.metrics.minUsers ? 'white' : '#86b39c'
            }}
          >
            Users &gt; 10K
          </button>

          <button
            onClick={() => toggleMetric('minGrowth')}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: filters.metrics.minGrowth ? '#679f83' : 'rgba(103, 159, 131, 0.2)',
              border: filters.metrics.minGrowth ? 'none' : '1px solid rgba(103, 159, 131, 0.4)',
              color: filters.metrics.minGrowth ? 'white' : '#86b39c'
            }}
          >
            Growth &gt; 20%
          </button>

          <button
            onClick={() => toggleMetric('isProfitable')}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: filters.metrics.isProfitable ? '#679f83' : 'rgba(103, 159, 131, 0.2)',
              border: filters.metrics.isProfitable ? 'none' : '1px solid rgba(103, 159, 131, 0.4)',
              color: filters.metrics.isProfitable ? 'white' : '#86b39c'
            }}
          >
            Profitable
          </button>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </span>
            <button
              onClick={clearAllFilters}
              className="text-sm font-medium flex items-center gap-1 hover:underline"
              style={{ color: '#679f83' }}
            >
              <X className="h-3 w-3" />
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExitFilterPanel;
