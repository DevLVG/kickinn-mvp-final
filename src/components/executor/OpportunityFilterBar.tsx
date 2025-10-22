import { useState } from 'react';
import { ChevronDown, Grid3x3, List, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OpportunityFilterBarProps {
  filters: {
    role: string;
    skills: string[];
    fitScore: string;
    tokenRange: string;
  };
  onFilterChange: (filters: any) => void;
  sorting: {
    field: string;
    order: string;
  };
  onSortChange: (sorting: any) => void;
  viewMode: 'list' | 'compact';
  onViewModeChange: (mode: 'list' | 'compact') => void;
}

const roles = [
  'All Roles',
  'Frontend Developer',
  'Backend Developer',
  'Full-Stack Developer',
  'UI/UX Designer',
  'Product Manager',
  'Marketing/Growth',
];

const skills = [
  'React', 'Vue', 'Angular',
  'Node.js', 'Python', 'Go',
  'TypeScript', 'JavaScript',
  'Figma', 'Adobe XD',
  'Tailwind', 'CSS',
  'PostgreSQL', 'MongoDB',
  'AWS', 'Docker',
];

const fitScoreOptions = [
  { label: 'All Scores', value: 'all' },
  { label: 'Excellent (90%+)', value: 'excellent' },
  { label: 'Good (75-89%)', value: 'good' },
  { label: 'Fair (60-74%)', value: 'fair' },
];

const tokenRangeOptions = [
  { label: 'Any Amount', value: 'all' },
  { label: '10K+ tokens', value: '10k' },
  { label: '20K+ tokens', value: '20k' },
  { label: '30K+ tokens', value: '30k' },
  { label: '50K+ tokens', value: '50k' },
];

const sortOptions = [
  { label: 'Best Match', value: 'fitScore' },
  { label: 'Highest Reward', value: 'reward' },
  { label: 'Shortest Timeline', value: 'timeline' },
  { label: 'Most Recent', value: 'recent' },
  { label: 'Expiring Soon', value: 'deadline' },
];

const OpportunityFilterBar = ({
  filters,
  onFilterChange,
  sorting,
  onSortChange,
  viewMode,
  onViewModeChange,
}: OpportunityFilterBarProps) => {
  const [skillsMenuOpen, setSkillsMenuOpen] = useState(false);

  const hasActiveFilters = 
    filters.role !== 'all' ||
    filters.skills.length > 0 ||
    filters.fitScore !== 'all' ||
    filters.tokenRange !== 'all';

  const clearFilters = () => {
    onFilterChange({
      role: 'all',
      skills: [],
      fitScore: 'all',
      tokenRange: 'all',
    });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ ...filters, skills: newSkills });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Role Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 border border-border rounded-lg hover:border-secondary-teal hover:bg-secondary-teal/5 transition-colors flex items-center gap-2">
            <span className="text-sm font-medium text-primary-dark">
              Role: {filters.role === 'all' ? 'All' : filters.role}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {roles.map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => onFilterChange({ ...filters, role: role === 'All Roles' ? 'all' : role })}
                className={filters.role === (role === 'All Roles' ? 'all' : role) ? 'bg-secondary-teal/10' : ''}
              >
                {filters.role === (role === 'All Roles' ? 'all' : role) && '✓ '}
                {role}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Skills Filter */}
        <DropdownMenu open={skillsMenuOpen} onOpenChange={setSkillsMenuOpen}>
          <DropdownMenuTrigger className="px-4 py-2 border border-border rounded-lg hover:border-secondary-teal hover:bg-secondary-teal/5 transition-colors flex items-center gap-2">
            <span className="text-sm font-medium text-primary-dark">
              Skills: {filters.skills.length > 0 ? `${filters.skills.length} selected` : 'All'}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
            {skills.map((skill) => (
              <DropdownMenuItem
                key={skill}
                onClick={(e) => {
                  e.preventDefault();
                  toggleSkill(skill);
                }}
                className="cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.skills.includes(skill)}
                  onChange={() => {}}
                  className="mr-2"
                />
                {skill}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Fit Score Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 border border-border rounded-lg hover:border-secondary-teal hover:bg-secondary-teal/5 transition-colors flex items-center gap-2">
            <span className="text-sm font-medium text-primary-dark">
              Fit Score: {fitScoreOptions.find(o => o.value === filters.fitScore)?.label}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {fitScoreOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onFilterChange({ ...filters, fitScore: option.value })}
                className={filters.fitScore === option.value ? 'bg-secondary-teal/10' : ''}
              >
                {filters.fitScore === option.value && '✓ '}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Token Range Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 border border-border rounded-lg hover:border-secondary-teal hover:bg-secondary-teal/5 transition-colors flex items-center gap-2">
            <span className="text-sm font-medium text-primary-dark">
              Reward: {tokenRangeOptions.find(o => o.value === filters.tokenRange)?.label}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {tokenRangeOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onFilterChange({ ...filters, tokenRange: option.value })}
                className={filters.tokenRange === option.value ? 'bg-secondary-teal/10' : ''}
              >
                {filters.tokenRange === option.value && '✓ '}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-secondary-teal hover:underline flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 border border-border rounded-lg hover:border-secondary-teal hover:bg-secondary-teal/5 transition-colors flex items-center gap-2">
            <span className="text-sm font-medium text-primary-dark">
              Sort: {sortOptions.find(o => o.value === sorting.field)?.label}
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onSortChange({ field: option.value, order: 'desc' })}
                className={sorting.field === option.value ? 'bg-secondary-teal/10' : ''}
              >
                {sorting.field === option.value && '✓ '}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Mode Toggle */}
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 ${
              viewMode === 'list'
                ? 'bg-secondary-teal/15 border-secondary-teal'
                : 'hover:bg-muted'
            } transition-colors`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('compact')}
            className={`p-2 ${
              viewMode === 'compact'
                ? 'bg-secondary-teal/15 border-secondary-teal'
                : 'hover:bg-muted'
            } transition-colors`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityFilterBar;
