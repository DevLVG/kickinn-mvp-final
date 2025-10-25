const AchievementsBadges = () => {
  const achievements = [
    {
      id: "first-venture",
      name: "First Venture",
      description: "Completed first venture",
      icon: "🎯",
      unlocked: true
    },
    {
      id: "speed-demon",
      name: "Speed Demon",
      description: "Delivered 3 ventures ahead of schedule",
      icon: "⚡",
      unlocked: true
    },
    {
      id: "perfect-streak",
      name: "Perfect Streak",
      description: "5 consecutive 5-star ratings",
      icon: "💯",
      unlocked: true
    },
    {
      id: "tech-wizard",
      name: "Tech Wizard",
      description: "Mastered 5+ technologies",
      icon: "🧙",
      unlocked: true
    },
    {
      id: "team-player",
      name: "Team Player",
      description: "Collaborated on 10+ ventures",
      icon: "🤝",
      unlocked: true
    },
    {
      id: "revenue-driver",
      name: "Revenue Driver",
      description: "Built venture with $100K+ revenue",
      icon: "💰",
      unlocked: false
    },
    {
      id: "elite-executor",
      name: "Elite Executor",
      description: "Reach 95+ reputation score",
      icon: "👑",
      unlocked: false
    },
    {
      id: "specialist",
      name: "Specialist",
      description: "Expert in 3+ skills",
      icon: "🎓",
      unlocked: true
    },
    {
      id: "innovator",
      name: "Innovator",
      description: "Implemented novel solution",
      icon: "💡",
      unlocked: false
    },
    {
      id: "marathon-runner",
      name: "Marathon Runner",
      description: "Completed 10+ ventures",
      icon: "🏃",
      unlocked: true
    }
  ];

  return (
    <section 
      className="w-full py-20 px-10"
      style={{ background: 'rgba(15, 43, 56, 0.5)' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Achievements Unlocked
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {achievements.map((badge) => (
            <div
              key={badge.id}
              className="w-44 h-52 rounded-2xl p-5 text-center transition-all hover:translate-y-[-4px] relative"
              style={{
                background: badge.unlocked 
                  ? 'linear-gradient(135deg, rgba(103, 159, 131, 0.12), rgba(35, 105, 138, 0.12))'
                  : 'linear-gradient(135deg, rgba(103, 159, 131, 0.05), rgba(35, 105, 138, 0.05))',
                border: badge.unlocked
                  ? '1px solid #4ade80'
                  : '1px dashed rgba(103, 159, 131, 0.3)',
                boxShadow: badge.unlocked
                  ? '0 4px 16px rgba(74, 222, 128, 0.3)'
                  : 'none',
                opacity: badge.unlocked ? 1 : 0.5
              }}
            >
              {/* Lock Overlay for Locked Badges */}
              {!badge.unlocked && (
                <div className="absolute top-2 right-2 text-2xl">
                  🔒
                </div>
              )}

              {/* Icon */}
              <div className="text-6xl mb-3">
                {badge.icon}
              </div>

              {/* Title */}
              <div className="text-base font-bold text-white mb-2">
                {badge.name}
              </div>

              {/* Description */}
              <div 
                className="text-xs leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                {badge.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsBadges;
