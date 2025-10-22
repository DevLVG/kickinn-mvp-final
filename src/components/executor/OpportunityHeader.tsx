import { Bookmark, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OpportunityHeaderProps {
  title: string;
  ventureType: string;
  fitScore: number;
  isSaved: boolean;
  onSaveToggle: () => void;
}

const OpportunityHeader = ({
  title,
  ventureType,
  fitScore,
  isSaved,
  onSaveToggle,
}: OpportunityHeaderProps) => {
  const { toast } = useToast();

  const getFitScoreColor = (score: number) => {
    if (score >= 90) return 'from-success to-success/80';
    if (score >= 75) return 'from-info to-info/80';
    if (score >= 60) return 'from-warning to-warning/80';
    return 'from-muted to-muted/80';
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copied!',
      description: 'Opportunity link copied to clipboard',
    });
  };

  return (
    <div className="flex items-start justify-between gap-4">
      {/* Left Side */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-primary-dark leading-tight mb-2">
          {title}
        </h1>
        <span className="inline-block bg-secondary-teal/10 text-secondary-teal px-3 py-1 rounded-full text-xs uppercase font-bold">
          {ventureType}
        </span>
      </div>

      {/* Right Side */}
      <div className="flex-shrink-0">
        <div
          className={`bg-gradient-to-r ${getFitScoreColor(
            fitScore
          )} text-white px-6 py-4 rounded-xl shadow-lg text-center`}
        >
          <div className="text-4xl font-bold leading-none">{fitScore}%</div>
          <div className="text-xs uppercase opacity-90 mt-1">Match Score</div>
        </div>
        
        <div className="flex gap-2 mt-3">
          <button
            onClick={onSaveToggle}
            className={`px-4 py-2 border rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              isSaved
                ? 'border-secondary-teal bg-secondary-teal/10 text-secondary-teal'
                : 'border-border text-muted-foreground hover:border-secondary-teal hover:text-secondary-teal'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
          
          <button
            onClick={handleShare}
            className="px-4 py-2 border border-border text-muted-foreground rounded-lg hover:border-secondary-teal hover:text-secondary-teal transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityHeader;
