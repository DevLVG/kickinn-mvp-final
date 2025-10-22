import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  hasIdeas: boolean;
  onClearFilters: () => void;
}

const EmptyState = ({ hasIdeas, onClearFilters }: EmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-5 min-h-[400px]">
      <span className="text-8xl opacity-40 mb-6">💭</span>
      
      <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">
        No ideas found
      </h2>
      
      <p className="text-base text-gray-600 mb-6 text-center max-w-md">
        {hasIdeas 
          ? "No ideas match your current filters"
          : "You haven't submitted any ideas yet"
        }
      </p>

      {!hasIdeas ? (
        <Button
          onClick={() => navigate('/submit-idea')}
          className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
        >
          Submit Your First Idea
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
