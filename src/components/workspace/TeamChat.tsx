import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  online: boolean;
  lastSeen: string;
}

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
  attachments?: { name: string; size: string; url: string }[];
}

interface TeamChatProps {
  ventureId: string;
  team: TeamMember[];
  currentUserId: string;
}

const mockMessages: Message[] = [
  {
    id: 'm1',
    userId: 't1',
    content: 'Hey team! Just reviewed the wireframes. Looking great! 🎨',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    reactions: [{ emoji: '❤️', count: 2 }],
  },
  {
    id: 'm2',
    userId: 't2',
    content: 'Thanks! I just pushed the authentication API endpoints. Can someone test?',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'm3',
    userId: 't4',
    content: "I'll test it now. What's the base URL?",
    timestamp: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
  },
  {
    id: 'm4',
    userId: 't2',
    content: 'https://api-dev.threadcycle.com - credentials are in the shared docs',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    attachments: [{ name: 'api-docs.pdf', size: '2.3 MB', url: '#' }],
  },
];

const TeamChat = ({ ventureId, team, currentUserId }: TeamChatProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('venture_id', ventureId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data.map(msg => ({
        id: msg.id,
        userId: msg.user_id,
        content: msg.content,
        timestamp: msg.created_at,
        reactions: msg.reactions as any,
        attachments: msg.attachments as any
      })));
    };

    fetchMessages();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`chat-${ventureId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `venture_id=eq.${ventureId}`
        },
        (payload) => {
          const newMsg = payload.new;
          setMessages(prev => [...prev, {
            id: newMsg.id,
            userId: newMsg.user_id,
            content: newMsg.content,
            timestamp: newMsg.created_at,
            reactions: newMsg.reactions,
            attachments: newMsg.attachments
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [ventureId]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to send messages');
        return;
      }

      const { error } = await supabase
        .from('chat_messages')
        .insert({
          venture_id: ventureId,
          user_id: user.id,
          content: message
        });

      if (error) throw error;
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const getUserInfo = (userId: string) => {
    return team.find((m) => m.id === userId);
  };

  const getRoleColor = (role: string) => {
    if (role.includes('Manager')) return '#8b5cf6';
    if (role.includes('Designer')) return '#ec4899';
    if (role.includes('Developer')) return '#3b82f6';
    return '#f59e0b';
  };

  return (
    <div className="bg-card border border-border rounded-xl h-full flex flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--secondary-teal))]/5 to-[hsl(var(--accent-blue))]/5 border-b border-border px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💬</span>
          <h2 className="text-lg font-bold text-[hsl(var(--primary-dark))]">Team Chat</h2>
          <span className="text-xs text-green-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
            {team.filter((m) => m.online).length} online
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-lg hover:text-[hsl(var(--secondary-teal))] transition-colors">
            🔍
          </button>
          <button className="text-lg hover:text-[hsl(var(--secondary-teal))] transition-colors">
            ⋮
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted">
        {messages.map((msg) => {
          const user = getUserInfo(msg.userId);
          const isOwn = msg.userId === currentUserId;

          return (
            <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${isOwn ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-xl p-4 ${
                    isOwn
                      ? 'bg-gradient-to-br from-[hsl(var(--secondary-teal))]/10 to-[hsl(var(--accent-blue))]/10 border border-[hsl(var(--secondary-teal))]/30'
                      : 'bg-card border border-border'
                  }`}
                >
                  {/* Message Header */}
                  {!isOwn && user && (
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{
                          background: `linear-gradient(135deg, ${getRoleColor(user.role)}, ${getRoleColor(user.role)}dd)`,
                        }}
                      >
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{user.role}</p>
                      </div>
                      <span className="text-[11px] text-muted-foreground ml-auto">
                        {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  )}

                  {/* Message Content */}
                  <p className="text-sm text-foreground leading-relaxed">{msg.content}</p>

                  {/* Attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-3 bg-[hsl(var(--secondary-teal))]/5 border border-dashed border-[hsl(var(--secondary-teal))] rounded-lg p-3">
                      {msg.attachments.map((file, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-xl">📎</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[hsl(var(--primary-dark))]">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                          <button className="text-base hover:text-[hsl(var(--secondary-teal))]">
                            ⬇️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {msg.reactions.map((reaction, i) => (
                        <button
                          key={i}
                          className="bg-[hsl(var(--secondary-teal))]/10 border border-[hsl(var(--secondary-teal))] px-2 py-0.5 rounded-full text-xs hover:bg-[hsl(var(--secondary-teal))]/20 transition-colors"
                        >
                          {reaction.emoji} {reaction.count}
                        </button>
                      ))}
                    </div>
                  )}

                  {isOwn && (
                    <p className="text-[11px] text-muted-foreground text-right mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex items-end gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleSend();
              }
            }}
            placeholder="Type a message... (@mention teammates)"
            className="flex-1 min-h-[44px] max-h-[120px] resize-none bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--secondary-teal))]/20 focus:border-[hsl(var(--secondary-teal))]"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] hover:shadow-md"
          >
            →
          </Button>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="text-lg hover:text-[hsl(var(--secondary-teal))] transition-colors">
            😊
          </button>
          <button className="text-lg hover:text-[hsl(var(--secondary-teal))] transition-colors">
            📎
          </button>
          <button className="text-lg hover:text-[hsl(var(--secondary-teal))] transition-colors">
            @
          </button>
          <button className="text-lg hover:text-[hsl(var(--secondary-teal))] transition-colors">
            {'</>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;
