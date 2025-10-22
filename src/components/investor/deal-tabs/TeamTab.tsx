interface TeamTabProps {
  team: Array<{
    id: string;
    pseudonym: string;
    location: string;
    role: string;
    reputation_score: number;
    completed_ventures: number;
    success_rate: number;
    skills: string[];
  }>;
}

const TeamTab = ({ team }: TeamTabProps) => {
  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    
    return (
      <div className="flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className="text-xl">
            {index < fullStars ? '⭐' : index === fullStars && hasHalfStar ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Execution Team</h2>
        <p className="text-base text-gray-600">
          Pseudonymous team with verified reputation
        </p>
      </div>

      {/* Note Banner */}
      <div className="bg-accent-blue/10 border border-accent-blue p-4 rounded-lg flex items-start gap-3">
        <span className="text-xl">🔒</span>
        <p className="text-sm text-primary-dark leading-relaxed">
          Team identities are protected for privacy. All members are verified through Kick Inn's reputation system.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div
            key={member.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
          >
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary-teal to-accent-blue flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4"
            >
              {member.pseudonym[0]}
            </div>

            {/* Name & Location */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-primary-dark mb-1">
                {member.pseudonym}
              </h3>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <span>📍</span>
                <span>{member.location}</span>
              </p>
            </div>

            {/* Role Badge */}
            <div className="text-center mb-4">
              <span className="inline-block bg-secondary-teal/10 text-secondary-teal px-4 py-1.5 rounded-full text-sm font-medium">
                {member.role}
              </span>
            </div>

            {/* Reputation Score */}
            <div className="text-center mb-4">
              {renderStars(member.reputation_score)}
              <p className="text-2xl font-bold text-primary-dark mt-2">
                {member.reputation_score.toFixed(1)}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-primary-dark">{member.completed_ventures}</p>
                <p className="text-xs text-gray-500">Ventures</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-green-600">{member.success_rate}%</p>
                <p className="text-xs text-gray-500">Success Rate</p>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {member.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTab;
