import { format } from 'date-fns';
import { Idea } from '@/pages/Ideas';

interface IdeaTimelineProps {
  idea: Idea;
}

interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  icon: string;
  status: 'completed' | 'current' | 'future';
  color: string;
}

const IdeaTimeline = ({ idea }: IdeaTimelineProps) => {
  // Generate timeline events based on idea status
  const generateEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [
      {
        id: '1',
        title: 'Idea Submitted',
        timestamp: idea.submittedAt,
        description: `via ${idea.submissionType === 'voice' ? 'Voice Recording' : 
                          idea.submissionType === 'video' ? 'Video Recording' : 
                          idea.submissionType === 'text' ? 'Text' : 'File Upload'}`,
        icon: '✓',
        status: 'completed',
        color: 'bg-green-500'
      },
      {
        id: '2',
        title: 'AI Review Started',
        timestamp: new Date(new Date(idea.submittedAt).getTime() + 5 * 60000).toISOString(),
        description: 'Analyzing submission...',
        icon: '🤖',
        status: idea.status === 'pending' ? 'current' : 'completed',
        color: idea.status === 'pending' ? 'bg-blue-500' : 'bg-green-500'
      }
    ];

    if (idea.status === 'validated' || idea.status === 'building') {
      events.push({
        id: '3',
        title: 'Validation Complete',
        timestamp: new Date(new Date(idea.submittedAt).getTime() + 24 * 60 * 60000).toISOString(),
        description: `Score: ${idea.validationScores?.average}/10`,
        icon: '✓',
        status: 'completed',
        color: 'bg-green-500'
      });

      if (idea.executorCount) {
        events.push({
          id: '4',
          title: 'Executors Matched',
          timestamp: new Date(new Date(idea.submittedAt).getTime() + 48 * 60 * 60000).toISOString(),
          description: `${idea.executorCount} Executors assigned`,
          icon: '👥',
          status: 'completed',
          color: 'bg-green-500'
        });
      }

      if (idea.status === 'building') {
        events.push({
          id: '5',
          title: 'MVP Build Started',
          timestamp: new Date(new Date(idea.submittedAt).getTime() + 72 * 60 * 60000).toISOString(),
          description: 'Building in progress...',
          icon: '🏗️',
          status: 'current',
          color: 'bg-blue-500'
        });
      }
    }

    if (idea.status === 'rejected') {
      events.push({
        id: '3',
        title: 'Validation Complete',
        timestamp: new Date(new Date(idea.submittedAt).getTime() + 24 * 60 * 60000).toISOString(),
        description: `Score: ${idea.validationScores?.average || 0}/10`,
        icon: '✕',
        status: 'completed',
        color: 'bg-red-500'
      });
    }

    return events;
  };

  const events = generateEvents();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h2 className="text-xl font-bold text-primary-dark mb-6">Timeline</h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative flex items-start gap-4">
              {/* Icon circle */}
              <div 
                className={`
                  relative z-10 flex-shrink-0 w-8 h-8 rounded-full 
                  ${event.color} 
                  flex items-center justify-center text-white text-sm
                  ${event.status === 'current' ? 'animate-pulse ring-4 ring-blue-200' : ''}
                `}
              >
                {event.icon}
              </div>

              {/* Event content */}
              <div className={`
                flex-1 pb-6
                ${event.status === 'current' ? 'bg-blue-50 -ml-4 pl-4 pr-4 py-2 rounded-lg' : ''}
                ${event.status === 'future' ? 'opacity-50' : ''}
              `}>
                <h3 className="font-bold text-sm text-primary-dark mb-1">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  {format(new Date(event.timestamp), 'MMM d, yyyy \'at\' h:mm a')}
                </p>
                {event.description && (
                  <p className={`text-xs leading-relaxed ${
                    event.status === 'future' ? 'text-gray-400 italic' : 'text-gray-700'
                  }`}>
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaTimeline;
