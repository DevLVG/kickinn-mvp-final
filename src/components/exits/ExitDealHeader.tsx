import { ArrowLeft } from "lucide-react";

interface Venture {
  title: string;
  tagline: string;
  image_url: string;
  sector: string;
  status: string;
  is_featured: boolean;
}

interface ExitDealHeaderProps {
  venture: Venture;
  onBack: () => void;
}

const ExitDealHeader = ({ venture, onBack }: ExitDealHeaderProps) => {
  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/70 hover:text-[#86b39c] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Marketplace</span>
      </button>

      {/* Venture Image */}
      <div className="relative mb-6">
        <img
          src={venture.image_url}
          alt={venture.title}
          className="w-full h-[300px] object-cover rounded-3xl border border-[rgba(103,159,131,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        />
      </div>

      {/* Venture Title */}
      <h1 className="font-bold text-[42px] text-white leading-tight mb-4">
        {venture.title}
      </h1>

      {/* Tagline */}
      <p className="text-lg text-white/80 leading-relaxed mb-6 max-w-[600px]">
        {venture.tagline}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-3">
        {/* Sector Badge */}
        <span className="px-4 py-2 rounded-full bg-[rgba(103,159,131,0.2)] border border-[rgba(103,159,131,0.4)] text-[#86b39c] text-sm font-medium">
          {venture.sector}
        </span>

        {/* Status Badge */}
        <span className="px-4 py-2 rounded-full bg-[rgba(74,222,128,0.2)] border border-[rgba(74,222,128,0.4)] text-[#4ade80] text-sm font-medium">
          {venture.status === 'available' ? 'Available' : venture.status}
        </span>

        {/* Verified Badge */}
        <span className="px-4 py-2 rounded-full bg-[rgba(96,165,250,0.2)] border border-[rgba(96,165,250,0.4)] text-[#60a5fa] text-sm font-medium flex items-center gap-2">
          <span>✓</span>
          Verified by Kick Inn
        </span>

        {/* Featured Badge */}
        {venture.is_featured && (
          <span className="px-4 py-2 rounded-full bg-[rgba(251,146,60,0.2)] border border-[rgba(251,146,60,0.4)] text-[#fb923c] text-sm font-medium flex items-center gap-2">
            <span>⭐</span>
            Featured Deal
          </span>
        )}
      </div>
    </div>
  );
};

export default ExitDealHeader;
