interface RoleCardProps {
  icon: string;
  title: string;
  description: string;
  memberCount?: string;
}

const RoleCard = ({ icon, title, description, memberCount }: RoleCardProps) => {
  return (
    <div className="group bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 hover:-translate-y-2 hover:border-secondary-teal/50 hover:shadow-[0_8px_30px_hsla(150,25%,52%,0.3)] transition-all duration-300 shadow-card relative overflow-hidden">
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-teal/5 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="bg-gradient-primary rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto shadow-[0_4px_20px_hsla(150,25%,52%,0.3)] group-hover:scale-110 transition-transform duration-300">
          <span className="text-4xl">{icon}</span>
        </div>
        <h3 className="font-bold text-xl text-white mb-3 text-center">{title}</h3>
        <p className="text-sm text-white/70 leading-relaxed mb-4 text-center">{description}</p>
        {memberCount && (
          <div className="inline-block px-4 py-1.5 bg-secondary-teal/10 border border-secondary-teal/20 rounded-full mx-auto">
            <p className="text-xs text-secondary-teal font-medium text-center">{memberCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleCard;
