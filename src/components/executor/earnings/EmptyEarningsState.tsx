import { Link } from "react-router-dom";

const EmptyEarningsState = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="text-[100px] opacity-50 mb-6">
          📊
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-bold text-muted-foreground mb-3">
          No earnings yet
        </h2>

        {/* Subtext */}
        <p className="text-base text-muted-foreground mb-8 leading-relaxed">
          Complete milestones in your projects to start earning tokens. 
          Browse available opportunities to get started.
        </p>

        {/* CTA Button */}
        <Link
          to="/executor/opportunities"
          className="inline-block px-8 py-4 bg-gradient-to-r from-[#679f83] to-[#23698a] text-white rounded-lg font-medium text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Browse Opportunities
        </Link>
      </div>
    </div>
  );
};

export default EmptyEarningsState;
