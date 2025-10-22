import { ReactNode } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 hover:-translate-y-2 hover:border-secondary-teal/40 transition-all duration-300 shadow-card">
      <div className="bg-gradient-primary rounded-xl w-14 h-14 flex items-center justify-center mb-5">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="font-bold text-xl text-white mb-3">{title}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
