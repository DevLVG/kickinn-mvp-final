import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface VentureBriefProps {
  problemStatement: string;
  solution: string;
  targetMarket: string;
  validationScore: number;
  validationBreakdown: {
    problemClarity: number;
    marketSize: number;
    solutionFeasibility: number;
    revenuePotential: number;
  };
}

const VentureBrief = ({
  problemStatement,
  solution,
  targetMarket,
  validationScore,
  validationBreakdown,
}: VentureBriefProps) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Venture Brief</h2>
        <p className="text-sm text-muted-foreground">AI-generated pitch from Ideator submission</p>
      </div>

      <div className="space-y-6">
        {/* Problem Statement */}
        <div>
          <h3 className="text-base font-medium text-primary-dark mb-3">Problem</h3>
          <p className="text-base text-foreground leading-relaxed">{problemStatement}</p>
        </div>

        {/* Solution */}
        <div>
          <h3 className="text-base font-medium text-primary-dark mb-3">Solution</h3>
          <p className="text-base text-foreground leading-relaxed">{solution}</p>
        </div>

        {/* Target Market */}
        <div>
          <h3 className="text-base font-medium text-primary-dark mb-3">Target Market</h3>
          <p className="text-base text-foreground leading-relaxed">{targetMarket}</p>
        </div>

        {/* Validation Score */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-base font-medium text-primary-dark mb-3">AI Validation Score</h3>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl font-bold bg-gradient-to-r from-secondary-teal to-accent-blue bg-clip-text text-transparent">
              {validationScore}/10
            </span>
            <span className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-bold">
              Validated by Kick Inn
            </span>
          </div>

          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-sm text-secondary-teal hover:underline flex items-center gap-1"
          >
            {showBreakdown ? 'Hide' : 'View'} breakdown
            {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showBreakdown && (
            <div className="mt-4 space-y-3 bg-muted/30 rounded-lg p-4">
              {Object.entries(validationBreakdown).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-bold text-primary-dark">{value}/10</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VentureBrief;
