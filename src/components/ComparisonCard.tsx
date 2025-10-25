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
      className="bg-slate-900 backdrop-blur-md border border-slate-700 rounded-2xl p-6 hover:border-[#679f83]/30 transition-all duration-300"
    >
      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-6 text-center">{title}</h3>

      {/* Two-column comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Traditional VC - Left */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#ef4444] mb-3">
            <X className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">Traditional VC</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ef4444]/20 flex items-center justify-center flex-shrink-0">
              <OldIcon className="w-6 h-6 text-[#ef4444]" />
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{oldWay}</p>
          </div>
        </div>

        {/* Kick Inn - Right */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#4ade80] mb-3">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">Kick Inn</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4ade80]/20 flex items-center justify-center flex-shrink-0">
              <NewIcon className="w-6 h-6 text-[#4ade80]" />
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{kickInnWay}</p>
          </div>
        </div>
      </div>

      {/* Mobile accordion separator */}
      <div className="md:hidden h-px bg-white/10 my-4" />
    </motion.div>
  );
};

export default ComparisonCard;
