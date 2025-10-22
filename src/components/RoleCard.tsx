interface RoleCardProps {
  icon: string;
  title: string;
  description: string;
  memberCount?: string;
}

const RoleCard = ({ icon, title, description, memberCount }: RoleCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 hover:-translate-y-2 hover:border-secondary-teal/40 transition-all duration-300 shadow-card">
      <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mb-5 mx-auto">
        <span className="text-4xl">{icon}</span>
      </div>
      <h3 className="font-bold text-xl text-white mb-3 text-center">{title}</h3>
      <p className="text-sm text-white/70 leading-relaxed mb-4 text-center">{description}</p>
      {memberCount && (
        <p className="text-xs text-white/50 text-center">{memberCount}</p>
      )}
    </div>
  );
};

export default RoleCard;
