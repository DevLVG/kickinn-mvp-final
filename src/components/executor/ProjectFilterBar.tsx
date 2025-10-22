interface ProjectFilterBarProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
}

const ProjectFilterBar = ({
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}: ProjectFilterBarProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
      {/* Left Section - Filters */}
      <div className="flex items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className={`border rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20 ${
              statusFilter === 'all'
                ? 'border-border bg-background'
                : 'border-[hsl(var(--secondary-teal))] bg-[hsl(var(--secondary-teal))]/10 text-[hsl(var(--secondary-teal))]'
            }`}
          >
            <option value="all">All</option>
            <option value="on_track">On Track</option>
            <option value="at_risk">At Risk</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="border border-border bg-background rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20"
          >
            <option value="deadline">Deadline (Soon First)</option>
            <option value="progress">Progress (Low to High)</option>
            <option value="recent">Recently Updated</option>
            <option value="name">Venture Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilterBar;
