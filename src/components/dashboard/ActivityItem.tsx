interface Activity {
  id: string;
  type: 'milestone' | 'funding' | 'exit' | 'token';
  icon: string;
  title: string;
  description: string;
  time: string;
}

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  // Determine border color based on type
  const getBorderColor = () => {
    switch (activity.type) {
      case 'milestone':
        return '#10b981'; // green
      case 'funding':
        return '#f59e0b'; // amber
      case 'exit':
        return '#8b5cf6'; // purple
      case 'token':
        return '#3b82f6'; // blue
      default:
        return '#679f83'; // teal
    }
  };

  return (
    <div 
      className="bg-white rounded-lg p-4 flex items-start gap-3"
      style={{
        borderLeft: `3px solid ${getBorderColor()}`
      }}
    >
      {/* Icon */}
      <span className="text-2xl flex-shrink-0">{activity.icon}</span>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-bold text-primary-dark mb-1">
          {activity.title}
        </p>
        <p className="text-xs text-gray-600 mb-1">
          {activity.description}
        </p>
        <p className="text-xs text-gray-500">
          {activity.time}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
