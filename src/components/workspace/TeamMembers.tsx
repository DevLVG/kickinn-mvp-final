interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  online: boolean;
  lastSeen: string;
}

interface TeamMembersProps {
  team: TeamMember[];
  currentUserId: string;
}

const TeamMembers = ({ team, currentUserId }: TeamMembersProps) => {
  const getRoleColor = (role: string) => {
    if (role.includes('Manager')) return '#8b5cf6';
    if (role.includes('Designer')) return '#ec4899';
    if (role.includes('Developer')) return '#3b82f6';
    return '#f59e0b';
  };

  const getLastSeenText = (lastSeen: string) => {
    const hours = Math.floor((Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Last seen just now';
    if (hours === 1) return 'Last seen 1h ago';
    return `Last seen ${hours}h ago`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">👥</span>
        <h2 className="text-lg font-bold text-[hsl(var(--primary-dark))]">Team</h2>
        <span className="text-sm text-muted-foreground">({team.length} members)</span>
      </div>

      <div className="space-y-3">
        {team.map((member) => {
          const isYou = member.id === currentUserId;
          const roleColor = getRoleColor(member.role);

          return (
            <div
              key={member.id}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer ${
                isYou
                  ? 'bg-gradient-to-r from-[hsl(var(--secondary-teal))]/5 to-[hsl(var(--accent-blue))]/5 border border-[hsl(var(--secondary-teal))]'
                  : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${roleColor}, ${roleColor}dd)`,
                  }}
                >
                  {member.name[0]}
                </div>
                {/* Online Indicator */}
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                    member.online ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </div>

              {/* Member Info */}
              <div className="flex-1">
                <p className="text-sm font-bold text-[hsl(var(--primary-dark))]">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
                <p className="text-[11px] text-muted-foreground italic mt-0.5">
                  {member.online ? 'Online' : getLastSeenText(member.lastSeen)}
                </p>
              </div>

              {/* Message Icon */}
              <button className="text-base text-muted-foreground hover:text-[hsl(var(--secondary-teal))] transition-colors">
                💬
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamMembers;
