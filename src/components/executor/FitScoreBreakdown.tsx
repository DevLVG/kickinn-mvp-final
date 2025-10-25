import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/LoadingSpinner';

interface FitComponent {
  score: number;
  weight: number;
  explanation: string;
}

interface FitScoreBreakdownProps {
  opportunityId: string;
  requiredSkills: string[];
  timelineWeeks?: number;
}

const FitScoreBreakdown = ({ opportunityId, requiredSkills, timelineWeeks }: FitScoreBreakdownProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fitScore, setFitScore] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFitScore = async () => {
      try {
        setIsLoading(true);
        
        const { data: functionData, error: functionError } = await supabase.functions.invoke(
          'calculate-fit-score',
          {
            body: {
              opportunityId,
              requiredSkills,
              timelineWeeks
            }
          }
        );

        if (functionError) {
          throw functionError;
        }

        if (functionData?.fitScore) {
          const fs = functionData.fitScore;
          setFitScore(Number(fs.overall_score));
          setBreakdown({
            skillsMatch: {
              score: Number(fs.skills_match_score),
              weight: fs.skills_match_weight,
              explanation: fs.skills_match_explanation
            },
            experienceLevel: {
              score: Number(fs.experience_score),
              weight: fs.experience_weight,
              explanation: fs.experience_explanation
            },
            successRate: {
              score: Number(fs.success_rate_score),
              weight: fs.success_rate_weight,
              explanation: fs.success_rate_explanation
            },
            deliverySpeed: {
              score: Number(fs.delivery_speed_score),
              weight: fs.delivery_speed_weight,
              explanation: fs.delivery_speed_explanation
            }
          });
        }
      } catch (err) {
        console.error('Error loading fit score:', err);
        setError('Failed to calculate fit score. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadFitScore();
  }, [opportunityId, requiredSkills, timelineWeeks]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-success to-success/80';
    if (score >= 75) return 'from-info to-info/80';
    if (score >= 60) return 'from-warning to-warning/80';
    return 'from-muted to-muted/80';
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-secondary-teal/10 to-accent-blue/10 border border-secondary-teal/30 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !breakdown) {
    return (
      <div className="bg-gradient-to-br from-secondary-teal/10 to-accent-blue/10 border border-secondary-teal/30 rounded-2xl p-8">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Unable to Calculate Fit Score</h3>
          <p className="text-sm text-gray-600">{error || 'An unexpected error occurred'}</p>
        </div>
      </div>
    );
  }

  const components = [
    { key: 'skillsMatch', label: 'Skills Match', data: breakdown.skillsMatch },
    { key: 'experienceLevel', label: 'Experience Level', data: breakdown.experienceLevel },
    { key: 'successRate', label: 'Success Rate', data: breakdown.successRate },
    { key: 'deliverySpeed', label: 'Delivery Speed', data: breakdown.deliverySpeed },
  ];

  return (
    <div className="bg-gradient-to-br from-secondary-teal/10 to-accent-blue/10 border border-secondary-teal/30 rounded-2xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Your Fit Score Breakdown</h2>
        <p className="text-sm text-muted-foreground">Why this opportunity matches your profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((component) => (
          <div key={component.key} className="bg-white/80 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-sm text-foreground">{component.label}</span>
              <span className="text-xs text-muted-foreground">{component.data.weight}% weight</span>
            </div>

            {/* Score Bar */}
            <div className="mb-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getScoreColor(component.data.score)} transition-all duration-500`}
                  style={{ width: `${component.data.score}%` }}
                />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl font-bold text-primary-dark">{component.data.score}%</span>
            </div>

            <p className="text-sm text-muted-foreground">{component.data.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitScoreBreakdown;
