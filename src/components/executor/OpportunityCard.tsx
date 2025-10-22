import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Clock, ArrowRight, Check, Lock, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface OpportunityCardProps {
  opportunity: {
    id: string;
    ventureId: string;
    ventureTitle: string;
    role: string;
    scope: string[];
    timeline: number;
    requiredSkills: string[];
    tokenReward: number;
    tokenValue: number;
    allocationPercentage: number;
    fitScore: number;
    deadline: string;
    applicationsCount: number;
    status: string;
    ventureStatus: string;
    isSaved: boolean;
  };
  executorSkills: string[];
  isDisabled: boolean;
  onSaveToggle: (id: string) => void;
  viewMode: 'list' | 'compact';
}

const OpportunityCard = ({
  opportunity,
  executorSkills,
  isDisabled,
  onSaveToggle,
  viewMode,
}: OpportunityCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getFitScoreColor = (score: number) => {
    if (score >= 90) return 'from-success to-success/80';
    if (score >= 75) return 'from-info to-info/80';
    if (score >= 60) return 'from-warning to-warning/80';
    return 'from-muted to-muted/80';
  };

  const getFitScoreTextColor = (score: number) => {
    if (score >= 60) return 'text-white';
    return 'text-muted-foreground';
  };

  const getFitScoreIcon = (score: number) => {
    if (score >= 90) return '⭐';
    if (score >= 75) return '✓';
    if (score >= 60) return '•';
    return '';
  };

  const timeUntilDeadline = formatDistanceToNow(new Date(opportunity.deadline), { addSuffix: false });
  const hoursUntilDeadline = (new Date(opportunity.deadline).getTime() - Date.now()) / (1000 * 60 * 60);
  
  const getDeadlineColor = () => {
    if (hoursUntilDeadline < 12) return 'text-destructive font-bold';
    if (hoursUntilDeadline < 24) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleCardClick = () => {
    if (!isDisabled) {
      navigate(`/executor/opportunities/${opportunity.id}`);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveToggle(opportunity.id);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled) {
      navigate(`/executor/opportunities/${opportunity.id}`, { state: { autoFocusApply: true } });
    }
  };

  const isCompact = viewMode === 'compact';

  return (
    <div
      className={`bg-card border border-border rounded-xl ${
        isCompact ? 'p-4' : 'p-6'
      } hover:shadow-lg hover:border-secondary-teal/30 transition-all cursor-pointer relative ${
        isDisabled ? 'opacity-60 cursor-not-allowed' : ''
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fit Score Badge */}
      <div
        className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold text-sm shadow-md bg-gradient-to-r ${getFitScoreColor(
          opportunity.fitScore
        )} ${getFitScoreTextColor(opportunity.fitScore)} flex items-center gap-1 ${
          opportunity.fitScore >= 90 ? 'animate-pulse' : ''
        }`}
      >
        {getFitScoreIcon(opportunity.fitScore) && (
          <span>{getFitScoreIcon(opportunity.fitScore)}</span>
        )}
        {opportunity.fitScore}% Match
      </div>

      {/* Lock Overlay if Disabled */}
      {isDisabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-xl z-10">
          <Lock className="w-8 h-8 text-muted-foreground" />
        </div>
      )}

      <div className="flex items-start gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* Title & Role */}
          <h3
            className={`font-bold text-primary-dark mb-1 ${
              isCompact ? 'text-base line-clamp-1' : 'text-xl line-clamp-2'
            }`}
          >
            {opportunity.ventureTitle}
          </h3>
          
          <div className="inline-block bg-accent-blue text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
            {opportunity.role}
          </div>

          {/* Scope */}
          {!isCompact && (
            <>
              <div className="mb-3">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Scope</p>
                <div className="flex flex-wrap gap-2">
                  {opportunity.scope.map((item, index) => (
                    <span key={index} className="text-sm text-foreground flex items-center gap-1">
                      📝 {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Clock className="w-4 h-4" />
                <span>Estimated: {opportunity.timeline} weeks</span>
              </div>
            </>
          )}

          {/* Required Skills */}
          <div className="mt-4">
            <p className="text-xs font-bold text-muted-foreground uppercase mb-2">
              {isCompact ? `${opportunity.requiredSkills.length} skills` : 'Required Skills'}
            </p>
            {!isCompact && (
              <div className="flex flex-wrap gap-2">
                {opportunity.requiredSkills.map((skill) => {
                  const hasSkill = executorSkills.includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        hasSkill
                          ? 'bg-secondary-teal/10 text-secondary-teal'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {hasSkill && <Check className="inline w-3 h-3 mr-1" />}
                      {skill}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Venture Status */}
          {!isCompact && (
            <p className="text-xs text-info italic mt-2">
              🚀 {opportunity.ventureStatus}
            </p>
          )}
        </div>

        {/* Right Section */}
        <div className="text-right flex-shrink-0">
          {/* Token Reward */}
          <div className="mb-4">
            <p className="text-3xl font-bold text-secondary-teal">
              {opportunity.tokenReward.toLocaleString()}
            </p>
            <p className="text-base text-muted-foreground">tokens</p>
            <p className="text-base text-muted-foreground">~${opportunity.tokenValue.toLocaleString()}</p>
            <span className="inline-block bg-secondary-teal/10 text-secondary-teal text-xs px-2 py-1 rounded-full mt-1">
              {opportunity.allocationPercentage}% of supply
            </span>
          </div>

          {/* Deadline */}
          <div className="mb-2">
            <div className="flex items-center justify-end gap-1 text-sm">
              <Clock className={`w-4 h-4 ${getDeadlineColor()}`} />
              <span className={getDeadlineColor()}>
                Expires in {timeUntilDeadline}
              </span>
            </div>
          </div>

          {/* Applications Counter */}
          <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{opportunity.applicationsCount} Executors applied</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between gap-3">
        <button
          onClick={handleSaveClick}
          className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-2 text-sm ${
            opportunity.isSaved
              ? 'border-secondary-teal bg-secondary-teal/10 text-secondary-teal'
              : 'border-border text-muted-foreground hover:border-secondary-teal hover:text-secondary-teal'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${opportunity.isSaved ? 'fill-current' : ''}`} />
          {opportunity.isSaved ? 'Saved ✓' : 'Save for Later'}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/executor/opportunities/${opportunity.id}`);
          }}
          className="px-4 py-2 border border-secondary-teal text-secondary-teal rounded-lg hover:bg-secondary-teal/10 transition-colors flex items-center gap-2 text-sm"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleApplyClick}
          disabled={isDisabled}
          className="px-6 py-2 bg-gradient-to-r from-secondary-teal to-accent-blue text-white rounded-lg font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
        >
          <Check className="w-4 h-4" />
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
