interface Skill {
  name: string;
  level: string;
  proficiency: number;
  ventures_count: number;
}

interface Domain {
  name: string;
  proficiency: number;
  ventures_count: number;
}

interface SkillsBreakdownProps {
  technicalSkills: Skill[];
  domains: Domain[];
}

const SkillsBreakdown = ({ technicalSkills, domains }: SkillsBreakdownProps) => {
  const getSkillColor = (proficiency: number) => {
    if (proficiency >= 90) return "#4ade80";
    if (proficiency >= 75) return "#60a5fa";
    return "#fb923c";
  };

  const getSkillLevel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 75) return "Advanced";
    return "Intermediate";
  };

  return (
    <section 
      className="w-full py-20 px-10"
      style={{ background: 'rgba(25, 74, 97, 0.4)' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">
          Skill Verification
        </h2>
        <p className="text-base mb-12" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Skills validated through completed venture milestones
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Technical Skills */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              💻 Technical Skills
            </h3>

            <div className="space-y-4">
              {technicalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid rgba(103, 159, 131, 0.1)' }}
                >
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="text-base font-medium text-white mb-1">
                      {skill.name}
                    </div>
                    <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Used in {skill.ventures_count} ventures
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="w-52">
                    <div 
                      className="h-2 rounded-full overflow-hidden mb-1"
                      style={{ background: 'rgba(103, 159, 131, 0.2)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${skill.proficiency}%`,
                          background: `linear-gradient(90deg, ${getSkillColor(skill.proficiency)}, ${getSkillColor(skill.proficiency)}dd)`
                        }}
                      />
                    </div>
                    <div 
                      className="text-xs text-right font-medium"
                      style={{ color: getSkillColor(skill.proficiency) }}
                    >
                      {getSkillLevel(skill.proficiency)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Domain Expertise */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              🎯 Domain Expertise
            </h3>

            <div className="space-y-4">
              {domains.map((domain, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid rgba(103, 159, 131, 0.1)' }}
                >
                  {/* Left Side */}
                  <div className="flex-1">
                    <div className="text-base font-medium text-white mb-1">
                      {domain.name}
                    </div>
                    <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {domain.ventures_count} ventures
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="w-52">
                    <div 
                      className="h-2 rounded-full overflow-hidden mb-1"
                      style={{ background: 'rgba(103, 159, 131, 0.2)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${domain.proficiency}%`,
                          background: `linear-gradient(90deg, ${getSkillColor(domain.proficiency)}, ${getSkillColor(domain.proficiency)}dd)`
                        }}
                      />
                    </div>
                    <div 
                      className="text-xs text-right font-medium"
                      style={{ color: getSkillColor(domain.proficiency) }}
                    >
                      {domain.proficiency}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsBreakdown;
