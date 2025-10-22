import { useState } from 'react';
import { ChevronDown, Grid, List } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface FilterSortBarProps {
  filters: {
    status: string;
    dateRange: string;
  };
  sorting: {
    field: string;
    order: string;
  };
  viewMode: 'grid' | 'list';
  onFilterChange: (key: string, value: string) => void;
  onSortChange: (field: string, order: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'validated', label: 'Validated ✓' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'building', label: 'Building MVP' },
  { value: 'archived', label: 'Archived' },
];

const dateOptions = [
  { value: 'all', label: 'All Time' },
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '3months', label: 'Last 3 months' },
  { value: '1year', label: 'Last year' },
];

const sortOptions = [
  { value: 'date-desc', label: 'Most Recent', field: 'date', order: 'desc' },
  { value: 'date-asc', label: 'Oldest First', field: 'date', order: 'asc' },
  { value: 'score-desc', label: 'Highest Validation Score', field: 'score', order: 'desc' },
  { value: 'score-asc', label: 'Lowest Validation Score', field: 'score', order: 'asc' },
  { value: 'title-asc', label: 'Alphabetical (A-Z)', field: 'title', order: 'asc' },
];

const FilterSortBar = ({
  filters,
  sorting,
  viewMode,
  onFilterChange,
  onSortChange,
  onViewModeChange
}: FilterSortBarProps) => {
  const currentStatus = statusOptions.find(opt => opt.value === filters.status) || statusOptions[0];
  const currentDate = dateOptions.find(opt => opt.value === filters.dateRange) || dateOptions[0];
  const currentSort = sortOptions.find(opt => opt.field === sorting.field && opt.order === sorting.order) || sortOptions[0];

  return (
    <div 
      className="bg-white rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
      style={{ border: '1px solid rgba(103, 159, 131, 0.15)' }}
    >
      {/* Left: Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="border-gray-300 hover:border-secondary-teal hover:bg-secondary-teal/5"
            >
              <span className="text-sm font-medium">Status: {currentStatus.label}</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 bg-white z-50">
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onFilterChange('status', option.value)}
                className={`cursor-pointer ${filters.status === option.value ? 'bg-secondary-teal/10' : ''}`}
              >
                {filters.status === option.value && <span className="mr-2">✓</span>}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline"
              className="border-gray-300 hover:border-secondary-teal hover:bg-secondary-teal/5"
            >
              <span className="text-sm font-medium">{currentDate.label}</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 bg-white z-50">
            {dateOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onFilterChange('dateRange', option.value)}
                className={`cursor-pointer ${filters.dateRange === option.value ? 'bg-secondary-teal/10' : ''}`}
              >
                {filters.dateRange === option.value && <span className="mr-2">✓</span>}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right: Sort & View */}
      <div className="flex items-center gap-3">
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline"
              className="border-gray-300 hover:border-secondary-teal hover:bg-secondary-teal/5"
            >
              <span className="text-sm font-medium">Sort: {currentSort.label}</span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white z-50">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange(option.field, option.order)}
                className={`cursor-pointer ${
                  sorting.field === option.field && sorting.order === option.order 
                    ? 'bg-secondary-teal/10' 
                    : ''
                }`}
              >
                {sorting.field === option.field && sorting.order === option.order && (
                  <span className="mr-2">✓</span>
                )}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Toggle */}
        <div className="hidden md:flex gap-1 border border-gray-300 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid' 
                ? 'bg-secondary-teal/15 text-secondary-teal' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list' 
                ? 'bg-secondary-teal/15 text-secondary-teal' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSortBar;
