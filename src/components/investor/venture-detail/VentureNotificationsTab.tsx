import { useState } from 'react';

interface Notification {
  id: string;
  type: 'milestone' | 'traction' | 'trading' | 'exit' | 'validation';
  title: string;
  message: string;
  timestamp: string;
  is_read: boolean;
  action_url?: string;
}

interface VentureNotificationsTabProps {
  notifications: Notification[];
}

const VentureNotificationsTab = ({ notifications }: VentureNotificationsTabProps) => {
  const [filterType, setFilterType] = useState<'all' | Notification['type']>('all');

  const getNotificationConfig = (type: Notification['type']) => {
    const configs = {
      milestone: { icon: '🎯', color: '#10b981', label: 'Milestones' },
      traction: { icon: '📈', color: '#3b82f6', label: 'Traction' },
      trading: { icon: '💱', color: '#8b5cf6', label: 'Trading' },
      exit: { icon: '🚪', color: '#f59e0b', label: 'Exit' },
      validation: { icon: '🏆', color: '#10b981', label: 'Validation' }
    };
    return configs[type];
  };

  const filteredNotifications = filterType === 'all'
    ? notifications
    : notifications.filter(n => n.type === filterType);

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
            filterType === 'all'
              ? 'bg-[#679f83] text-white'
              : 'bg-white border border-[rgba(103,159,131,0.2)] text-gray-700 hover:bg-[rgba(103,159,131,0.05)]'
          }`}
        >
          All
        </button>
        {['milestone', 'traction', 'trading', 'exit', 'validation'].map((type) => {
          const config = getNotificationConfig(type as Notification['type']);
          return (
            <button
              key={type}
              onClick={() => setFilterType(type as Notification['type'])}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                filterType === type
                  ? 'bg-[#679f83] text-white'
                  : 'bg-white border border-[rgba(103,159,131,0.2)] text-gray-700 hover:bg-[rgba(103,159,131,0.05)]'
              }`}
            >
              <span>{config.icon}</span>
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const config = getNotificationConfig(notification.type);
            return (
              <div
                key={notification.id}
                className="bg-white rounded-xl p-5 border-l-4 hover:shadow-md transition-all relative"
                style={{ borderLeftColor: config.color }}
              >
                {!notification.is_read && (
                  <div className="absolute top-5 right-5 w-2 h-2 bg-[#3b82f6] rounded-full" />
                )}

                <div className="flex items-start gap-4">
                  <span className="text-2xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-base text-[#194a61]">{notification.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                      </div>
                      {notification.action_url && (
                        <button className="text-xs text-[#679f83] hover:underline">View</button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{notification.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-[rgba(103,159,131,0.15)]">
          <div className="text-5xl opacity-30 mb-4">🔔</div>
          <p className="text-base text-gray-500">No notifications</p>
          <p className="text-sm text-gray-400">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default VentureNotificationsTab;
