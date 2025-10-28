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
      className="bg-white/5 backdrop-blur-md border border-[#679f83]/20 rounded-2xl p-6 md:p-8 hover:border-[#679f83]/50 hover:-translate-y-2 hover:shadow-md transition-all duration-300"
      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
    >
      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold mb-6 text-center text-white">{title}</h3>

      {/* Two-column comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Traditional VC - Left */}
        <div className="space-y-3 bg-white/5 rounded-lg p-4 border border-red-500/20">
          <div className="flex items-center gap-2 mb-3 text-red-400">
            <X className="w-5 h-5 flex-shrink-0" aria-label="Not available" />
            <span className="text-sm font-semibold">Traditional VC</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-red-500/10">
              <OldIcon className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm leading-relaxed text-white/80">{oldWay}</p>
              <p className="text-xs text-white/40 mt-2">*Industry average data</p>
            </div>
          </div>
        </div>

        {/* Kick Inn - Right */}
        <div className="space-y-3 bg-white/5 rounded-lg p-4 border border-[#679f83]/30">
          <div className="flex items-center gap-2 mb-3 text-[#86efac]">
            <Check className="w-5 h-5 flex-shrink-0" aria-label="Available" />
            <span className="text-sm font-semibold">Kick Inn</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(103, 159, 131, 0.2)' }}>
              <NewIcon className="w-6 h-6 text-[#679f83]" />
            </div>
            <div>
              <p className="text-sm leading-relaxed text-white/80">{kickInnWay}</p>
              <p className="text-xs text-white/40 mt-2">*Platform verified</p>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default ComparisonCard;
