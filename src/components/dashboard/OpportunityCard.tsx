import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Opportunity {
  id: string;
  fitScore: number;
  ventureTitle: string;
  role: string;
  scope: string;
  skills: string[];
  tokenReward: number;
  tokenValue: number;
  timeline: string;
  deadline: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  // Determine if deadline is urgent (<24 hours)
  const isUrgent = opportunity.deadline.includes('hour') || 
                   (opportunity.deadline.includes('day') && parseInt(opportunity.deadline) === 1);

  return (
    <div 
      className="bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-md"
      style={{
        border: '1px solid rgba(103, 159, 131, 0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(103, 159, 131, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(103, 159, 131, 0.15)';
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Section */}
        <div className="flex-1">
          {/* Fit Score Badge */}
          <div className="inline-block mb-3">
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)'
              }}
            >
              {opportunity.fitScore}% Match
            </span>
          </div>

          {/* Venture Title */}
          <h3 className="text-lg font-bold text-primary-dark mb-1">
            {opportunity.ventureTitle}
          </h3>

          {/* Role */}
          <p className="text-sm text-gray-600 mb-2">{opportunity.role}</p>

          {/* Scope */}
          <div className="flex items-start gap-2 mb-3">
            <span className="text-sm">📝</span>
            <p className="text-xs text-gray-600">{opportunity.scope}</p>
          </div>

          {/* Required Skills */}
          <div className="flex flex-wrap gap-2">
            {opportunity.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end justify-between lg:text-right">
          {/* Token Reward */}
          <div className="mb-3">
            <p className="text-xl font-bold text-secondary-teal mb-0">
              {opportunity.tokenReward.toLocaleString()} tokens
            </p>
            <p className="text-sm text-gray-500">
              ~${opportunity.tokenValue.toLocaleString()}
            </p>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-sm">⏱️</span>
            <p className="text-xs text-gray-600">{opportunity.timeline}</p>
          </div>

          {/* Deadline */}
          <p 
            className={`text-xs mb-3 ${isUrgent ? 'text-amber-600 font-medium' : 'text-gray-500'}`}
          >
            Expires in {opportunity.deadline}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
            >
              Apply
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
