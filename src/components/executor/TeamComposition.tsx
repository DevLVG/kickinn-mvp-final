interface TeamMember {
  role: string;
  status: 'open' | 'assigned';
  responsibility: string;
  tokenAllocation: number;
  isYourRole?: boolean;
}

interface TeamCompositionProps {
  team: TeamMember[];
}

const TeamComposition = ({ team }: TeamCompositionProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Team Composition</h2>
        <p className="text-sm text-muted-foreground">Other roles needed for this venture</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member, index) => (
          <div
            key={index}
            className={`bg-muted/30 rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all ${
              member.isYourRole
                ? 'border-2 border-secondary-teal bg-gradient-to-br from-secondary-teal/5 to-accent-blue/5'
                : 'border border-border'
            }`}
          >
            <h3 className="font-bold text-base text-primary-dark mb-2">{member.role}</h3>
            
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-bold mb-2 ${
                member.isYourRole
                  ? 'bg-secondary-teal text-white'
                  : member.status === 'assigned'
                  ? 'bg-success/10 text-success'
                  : 'bg-warning/10 text-warning'
              }`}
            >
              {member.isYourRole ? 'Your Role' : member.status === 'assigned' ? 'Assigned ✓' : 'Open'}
            </span>

            <p className="text-sm text-muted-foreground mb-3">{member.responsibility}</p>

            <div className="text-sm font-medium text-secondary-teal">
              {member.tokenAllocation.toLocaleString()} tokens
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamComposition;
