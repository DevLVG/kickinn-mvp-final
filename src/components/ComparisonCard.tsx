import { motion } from "framer-motion";
import { LucideIcon, X, Check } from "lucide-react";

interface ComparisonCardProps {
  title: string;
  oldWay: string;
  kickInnWay: string;
  oldIcon: LucideIcon;
  newIcon: LucideIcon;
  index: number;
}

const ComparisonCard = ({ 
  title, 
  oldWay, 
  kickInnWay, 
  oldIcon: OldIcon, 
  newIcon: NewIcon,
  index 
}: ComparisonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="bg-white/5 backdrop-blur-md border border-[#679f83]/20 rounded-2xl p-6 md:p-8 hover:border-[#679f83]/40 hover:-translate-y-2 transition-all duration-300"
      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
    >
      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold mb-6 text-center" style={{ color: '#194a61' }}>{title}</h3>

      {/* Two-column comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Traditional VC - Left */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3" style={{ color: '#194a61' }}>
            <X className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">Traditional VC</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(25, 74, 97, 0.1)' }}>
              <OldIcon className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#194a61', opacity: 0.8 }}>{oldWay}</p>
          </div>
        </div>

        {/* Kick Inn - Right */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3" style={{ color: '#194a61' }}>
            <Check className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">Kick Inn</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(103, 159, 131, 0.15)' }}>
              <NewIcon className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#194a61', opacity: 0.8 }}>{kickInnWay}</p>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default ComparisonCard;
