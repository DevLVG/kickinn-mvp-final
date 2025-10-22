import { Clock, Check, AlertTriangle, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface OpportunityInfoCardProps {
  opportunity: {
    role: string;
    scope: string[];
    timelineEstimate: string;
    tokenReward: number;
    tokenRewardUsd: number;
    tokenPercentage: number;
    requiredSkills: string[];
  };
  executorSkills: string[];
}

const OpportunityInfoCard = ({ opportunity, executorSkills }: OpportunityInfoCardProps) => {
  const hasSkill = (skill: string) => executorSkills.includes(skill);
  const matchedSkills = opportunity.requiredSkills.filter(hasSkill).length;
  const totalSkills = opportunity.requiredSkills.length;

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Role</p>
          <h2 className="text-2xl font-bold text-primary-dark mb-5">{opportunity.role}</h2>

          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Scope</p>
          <ul className="space-y-2">
            {opportunity.scope.map((item, index) => (
              <li key={index} className="text-base text-foreground flex items-start gap-2">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
            Estimated Timeline
          </p>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-accent-blue" />
            <span className="text-3xl font-bold text-accent-blue">{opportunity.timelineEstimate}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-6">Based on AI analysis</p>

          <p className="text-xs font-medium text-muted-foreground uppercase mb-2">Token Reward</p>
          <div className="mb-1">
            <span className="text-3xl font-bold text-secondary-teal">
              {opportunity.tokenReward.toLocaleString()}
            </span>
            <span className="text-base text-muted-foreground ml-2">tokens</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base text-muted-foreground">
              ≈ ${opportunity.tokenRewardUsd.toLocaleString()} at current rate
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{opportunity.tokenPercentage}% of total token supply</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Required Skills - Full Width */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase mb-3">Required Skills</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {opportunity.requiredSkills.map((skill) => {
            const has = hasSkill(skill);
            return (
              <span
                key={skill}
                className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                  has
                    ? 'bg-success/10 border border-success text-success'
                    : 'bg-muted border border-border text-muted-foreground'
                }`}
              >
                {has ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {skill}
              </span>
            );
          })}
        </div>
        
        <p className={`text-sm mt-2 ${matchedSkills === totalSkills ? 'text-success' : 'text-warning'}`}>
          {matchedSkills === totalSkills ? (
            <>You have all required skills ✓</>
          ) : (
            <>You're missing {totalSkills - matchedSkills} skill{totalSkills - matchedSkills > 1 ? 's' : ''}. Still want to apply?</>
          )}
        </p>
      </div>
    </div>
  );
};

export default OpportunityInfoCard;
