import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  memberCount: string;
  badge?: string;
  ctaText: string;
  ctaLink: string;
  index: number;
}

const RoleCard = ({ 
  icon: Icon, 
  title, 
  description, 
  memberCount,
  badge,
  ctaText, 
  ctaLink,
  index 
}: RoleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-emerald-400/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] transition-all duration-300"
      aria-label={`${title} role with ${memberCount}`}
    >
      {/* Member Count Badge - Top Right */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Badge 
          variant="secondary" 
          className="bg-white text-gray-900 font-bold text-xs px-3 py-1"
        >
          {memberCount}
        </Badge>
        {badge && (
          <Badge 
            variant="secondary" 
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs px-3 py-1"
          >
            {badge}
          </Badge>
        )}
      </div>

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30"
      >
        <Icon className="w-8 h-8 text-emerald-400" />
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-white/70 text-sm mb-6 line-clamp-1">{description}</p>

      {/* CTA Button */}
      <Link to={ctaLink}>
        <Button 
          className="w-full text-white font-medium transition-all duration-300 group-hover:scale-105"
          style={{ 
            background: 'linear-gradient(to right, #10b981, #14b8a6)',
          }}
        >
          {ctaText}
        </Button>
      </Link>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </motion.div>
  );
};

export default RoleCard;
