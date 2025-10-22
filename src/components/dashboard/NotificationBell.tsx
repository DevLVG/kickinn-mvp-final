import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  icon: string;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    icon: '✅',
    title: 'Idea Validated',
    message: 'Your submission "Logistics Platform" passed AI validation',
    timeAgo: '5 minutes ago',
    unread: true,
  },
  {
    id: '2',
    icon: '💰',
    title: 'Funding Opened',
    message: 'ThreadCycle venture is now accepting investments',
    timeAgo: '2 hours ago',
    unread: true,
  },
  {
    id: '3',
    icon: '🎉',
    title: 'Milestone Completed',
    message: 'Design phase completed for LogiTrack',
    timeAgo: '1 day ago',
    unread: false,
  },
];

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:opacity-70 transition-opacity"
      >
        <Bell className="w-6 h-6 text-primary-dark" />
        {unreadCount > 0 && (
          <span 
            className="absolute top-0 right-0 w-[18px] h-[18px] bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-[360px] max-h-[480px] bg-white rounded-xl shadow-xl z-50 overflow-hidden"
          style={{
            border: '1px solid rgba(103, 159, 131, 0.2)',
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}
          >
            <h3 className="text-base font-bold text-primary-dark">Notifications</h3>
            <button
              onClick={markAllAsRead}
              className="text-xs text-secondary-teal hover:underline"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[400px]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <span className="text-5xl opacity-30 mb-4">🔕</span>
                <p className="text-sm text-gray-500 text-center">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  style={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    background: notification.unread ? 'rgba(103, 159, 131, 0.05)' : 'transparent',
                  }}
                >
                  <div className="flex-shrink-0 text-2xl">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.timeAgo}
                    </p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 rounded-full bg-secondary-teal flex-shrink-0 mt-1" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;