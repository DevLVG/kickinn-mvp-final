import { ReactNode } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group bg-white/5 backdrop-blur-md border border-[#679f83]/20 rounded-2xl p-8 hover:-translate-y-2 hover:border-[#679f83]/50 hover:shadow-[0_8px_30px_hsla(150,25%,52%,0.3)] transition-all duration-300 shadow-card relative overflow-hidden">
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#679f83]/5 to-[#23698a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-[#679f83] to-[#23698a] shadow-[0_4px_20px_hsla(150,25%,52%,0.3)]">
          <span className="text-3xl">{icon}</span>
        </div>
        <h3 className="font-bold text-xl text-white mb-3">{title}</h3>
        <p className="text-sm text-white/85 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
