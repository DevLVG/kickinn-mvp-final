import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ProcessStepProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  microStat: string;
  index: number;
  isLast?: boolean;
}

const ProcessStep = ({ 
  icon: Icon, 
  iconColor, 
  title, 
  description, 
  microStat, 
  index,
  isLast = false 
}: ProcessStepProps) => {
  return (
    <div className="flex flex-col items-center relative flex-1">
      {/* Step Number & Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 }}
        whileHover={{ scale: 1.1 }}
        className="relative z-10 mb-6"
      >
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm border-2"
          style={{
            background: 'rgba(103, 159, 131, 0.15)',
            borderColor: iconColor
          }}
        >
          <Icon className="w-10 h-10" style={{ color: iconColor }} />
        </div>
        <div 
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: iconColor }}
        >
          {index + 1}
        </div>
      </motion.div>

      {/* Connecting Line */}
      {!isLast && (
        <motion.div 
          className="absolute top-10 left-[60%] w-[80%] h-0.5 hidden md:block"
          style={{ background: `linear-gradient(to right, ${iconColor}, rgba(103, 159, 131, 0.3))` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
        />
      )}

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="text-center px-4 py-6 rounded-2xl backdrop-blur-md border border-[#679f83]/20 transition-all duration-300 bg-white/5 hover:border-[#679f83]/40 hover:shadow-[0_8px_30px_hsla(150,25%,52%,0.3)]"
      >
        <h3 className="text-lg md:text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-4 min-h-[60px]">
          {description}
        </p>
        <div 
          className="text-xs font-semibold px-3 py-1.5 rounded-full inline-block text-white/85"
          style={{ background: 'rgba(103, 159, 131, 0.2)' }}
        >
          {microStat}
        </div>
      </motion.div>
    </div>
  );
};

export default ProcessStep;
