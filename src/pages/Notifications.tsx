import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: string;
  data?: any;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [preferences, setPreferences] = useState({
    email_notifications: true,
    push_notifications: true,
    milestone_updates: true,
    investment_updates: true,
    venture_updates: true,
    chat_mentions: true
  });

  useEffect(() => {
    fetchNotifications();
    fetchPreferences();

    // Subscribe to real-time notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          setNotifications(prev => [payload.new as Notification, ...prev]);
          toast.success('New notification received');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } else {
      setNotifications(data || []);
    }
    setLoading(false);
  };

  const fetchPreferences = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setPreferences(data);
    }
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);

    if (!error) {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    }
  };

  const markAllAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false);

    if (!error) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    }
  };

  const updatePreferences = async (key: string, value: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: user.id,
        ...preferences,
        [key]: value
      }, { onConflict: 'user_id' });

    if (!error) {
      setPreferences(prev => ({ ...prev, [key]: value }));
      toast.success('Preferences updated');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'milestone': return '🎯';
      case 'investment': return '💰';
      case 'venture': return '🚀';
      case 'chat': return '💬';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <DashboardLayout
        activeRole="investor"
        userRoles={['investor']}
        onRoleChange={() => {}}
        user={{ name: 'User', email: 'user@example.com', initials: 'U' }}
      >
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      activeRole="investor"
      userRoles={['investor']}
      onRoleChange={() => {}}
      user={{ name: 'User', email: 'user@example.com', initials: 'U' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your ventures and investments
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList>
            <TabsTrigger value="notifications">
              Notifications {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="mt-6">
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => setFilter('all')}
                variant={filter === 'all' ? 'default' : 'outline'}
              >
                All ({notifications.length})
              </Button>
              <Button
                onClick={() => setFilter('unread')}
                variant={filter === 'unread' ? 'default' : 'outline'}
              >
                Unread ({unreadCount})
              </Button>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-16 bg-muted rounded-lg">
                  <span className="text-6xl mb-4 block">🔔</span>
                  <h3 className="text-xl font-bold mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    {filter === 'unread' ? "You're all caught up!" : 'Notifications will appear here'}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-card border rounded-lg p-5 transition-all cursor-pointer hover:shadow-md ${
                      !notification.read ? 'border-primary/50 bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.link) navigate(notification.link);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{getIcon(notification.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-foreground">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{notification.type}</Badge>
                          {!notification.read && <Badge variant="destructive">New</Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.email_notifications}
                    onChange={(e) => updatePreferences('email_notifications', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.push_notifications}
                    onChange={(e) => updatePreferences('push_notifications', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Milestone Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about milestone progress</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.milestone_updates}
                    onChange={(e) => updatePreferences('milestone_updates', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Investment Updates</p>
                    <p className="text-sm text-muted-foreground">Updates about your investments</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.investment_updates}
                    onChange={(e) => updatePreferences('investment_updates', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Venture Updates</p>
                    <p className="text-sm text-muted-foreground">News about your ventures</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.venture_updates}
                    onChange={(e) => updatePreferences('venture_updates', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Chat Mentions</p>
                    <p className="text-sm text-muted-foreground">When someone mentions you in chat</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.chat_mentions}
                    onChange={(e) => updatePreferences('chat_mentions', e.target.checked)}
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
