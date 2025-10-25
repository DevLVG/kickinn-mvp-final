import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ProfileHeroProps {
  data: {
    name: string;
    avatar_url: string;
    member_since: string;
    reputation_score: number;
    reputation_badge: string;
    stats: {
      completed_ventures: number;
      success_rate: number;
      avg_rating: number;
    };
    skills: Array<{
      name: string;
      level: string;
      icon: string;
    }>;
  };
}

const ProfileHeroSection = ({ data }: ProfileHeroProps) => {
  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "#4ade80";
    if (score >= 75) return "#60a5fa";
    if (score >= 60) return "#fb923c";
    return "rgba(255, 255, 255, 0.7)";
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied to clipboard!");
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section 
      className="relative w-full py-20 px-10"
      style={{
        background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)'
      }}
    >
      {/* Radial overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(103, 159, 131, 0.12), transparent 50%)'
        }}
      />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-5 gap-10">
        {/* Left Column - Profile Card */}
        <div className="md:col-span-2">
          <div 
            className="rounded-3xl p-8 backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(103, 159, 131, 0.15), rgba(35, 105, 138, 0.15))',
              border: '1px solid rgba(103, 159, 131, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Avatar */}
            <div className="flex justify-center mb-5">
              {data.avatar_url ? (
                <img 
                  src={data.avatar_url} 
                  alt={data.name}
                  className="w-32 h-32 rounded-full object-cover"
                  style={{ border: '3px solid #679f83' }}
                />
              ) : (
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold"
                  style={{ 
                    border: '3px solid #679f83',
                    background: 'linear-gradient(135deg, #679f83, #23698a)'
                  }}
                >
                  {getInitials(data.name)}
                </div>
              )}
            </div>

            {/* Name */}
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              {data.name}
            </h1>

            {/* Member Since */}
            <p className="text-sm text-center mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              📅 Member since {data.member_since}
            </p>

            {/* Reputation Score Badge */}
            <div 
              className="rounded-2xl p-6 mb-6 text-center"
              style={{
                background: 'linear-gradient(135deg, #679f83, #23698a)'
              }}
            >
              <p className="text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Reputation Score
              </p>
              <div className="flex items-end justify-center gap-1">
                <span className="text-6xl font-bold text-white">
                  {data.reputation_score}
                </span>
                <span className="text-3xl pb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  /100
                </span>
              </div>
              <div 
                className="inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: getScoreBadgeColor(data.reputation_score)
                }}
              >
                {data.reputation_badge}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-1">✅</div>
                <div className="text-2xl font-bold text-white">{data.stats.completed_ventures}</div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Ventures</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-2xl font-bold text-white">{data.stats.success_rate}%</div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-2xl font-bold text-white">{data.stats.avg_rating}</div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Avg Rating</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                className="w-full py-3 px-4 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                style={{
                  background: 'rgba(103, 159, 131, 0.2)',
                  border: '1px solid rgba(103, 159, 131, 0.4)',
                  color: '#86b39c'
                }}
                onClick={() => window.location.href = '/settings/profile'}
              >
                Edit Profile
              </button>
              <button 
                className="w-full py-3 px-4 rounded-xl font-medium text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
                onClick={handleShareProfile}
              >
                <Copy className="w-4 h-4" />
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Skills Cloud */}
        <div className="md:col-span-3">
          <h2 className="text-4xl font-bold text-white mb-6">
            Skills & Expertise
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            AI-verified through completed ventures
          </p>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="px-5 py-2.5 rounded-full font-medium text-sm text-white transition-all hover:translate-y-[-2px]"
                style={{
                  background: 'rgba(103, 159, 131, 0.2)',
                  border: `1px solid ${
                    skill.level === 'Expert' ? '#4ade80' :
                    skill.level === 'Advanced' ? '#60a5fa' :
                    '#fb923c'
                  }`
                }}
              >
                {skill.name} ({skill.level}) {skill.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeroSection;
