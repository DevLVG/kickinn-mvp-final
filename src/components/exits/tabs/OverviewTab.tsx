import { Target, CheckCircle } from "lucide-react";

interface OverviewTabProps {
  venture: any;
}

const OverviewTab = ({ venture }: OverviewTabProps) => {
  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Executive Summary</h2>
        <div className="space-y-4 text-white/80 leading-relaxed">
          <p>
            LogiTrack is an AI-powered fleet management platform designed specifically for small to mid-sized logistics companies. Our solution addresses the critical challenge of inefficient route planning and vehicle maintenance, which costs the industry billions annually in wasted fuel and downtime.
          </p>
          <p>
            The platform combines real-time GPS tracking with predictive AI algorithms to optimize delivery routes, reduce fuel consumption by an average of 23%, and predict maintenance needs before breakdowns occur. This results in significant cost savings and improved operational efficiency for our customers.
          </p>
          <p>
            Since launch 18 months ago, we've acquired 1,247 paying customers across North America, with a strong focus on regional logistics providers. Our customer retention rate of 97.6% demonstrates the value we deliver, while our monthly recurring revenue has grown consistently at 32% month-over-month.
          </p>
          <p>
            The business is currently cash flow positive with a 43% net margin, and all core infrastructure is fully automated and scalable. This acquisition represents an opportunity to integrate proven technology with distribution channels for accelerated growth.
          </p>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Problem Card */}
        <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-[#679f83]" />
            <h3 className="text-xl font-bold text-white">Problem Being Solved</h3>
          </div>
          <p className="text-white/80 leading-relaxed">
            Small and mid-sized logistics companies struggle with inefficient route planning, unexpected vehicle breakdowns, and high fuel costs. Traditional fleet management solutions are either too expensive or too complex for their needs, forcing them to rely on outdated manual processes that waste time and money.
          </p>
        </div>

        {/* Solution Card */}
        <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-[#4ade80]" />
            <h3 className="text-xl font-bold text-white">The Solution</h3>
          </div>
          <p className="text-white/80 leading-relaxed">
            LogiTrack provides an affordable, easy-to-use platform that combines real-time tracking with AI-powered route optimization and predictive maintenance. Our solution integrates seamlessly with existing operations, requires minimal training, and delivers immediate cost savings through reduced fuel consumption and vehicle downtime.
          </p>
        </div>
      </div>

      {/* Market Opportunity */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-8">Market Opportunity</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-xs text-white/60 mb-2">TAM</p>
            <p className="text-3xl font-bold text-[#679f83] mb-2">$4.2B</p>
            <p className="text-sm text-white/70">Total Addressable Market</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/60 mb-2">SAM</p>
            <p className="text-3xl font-bold text-[#679f83] mb-2">$850M</p>
            <p className="text-sm text-white/70">Serviceable Available Market</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/60 mb-2">SOM</p>
            <p className="text-3xl font-bold text-[#679f83] mb-2">$120M</p>
            <p className="text-sm text-white/70">Serviceable Obtainable Market</p>
          </div>
        </div>
      </div>

      {/* Competitive Advantage */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Competitive Advantage</h3>
        <div className="space-y-4">
          {[
            "Proprietary AI matching algorithm with 95% accuracy in maintenance predictions",
            "First-mover advantage in SMB-focused fleet management vertical",
            "Strong network effects as more data improves route optimization",
            "High switching costs due to deep integration with customer operations",
            "Exclusive partnerships with leading telematics hardware providers"
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p className="text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Overview */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">👥</span>
          <h3 className="text-xl font-bold text-white">Team Overview</h3>
        </div>
        <div className="bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.2)] rounded-xl p-6 mb-4">
          <p className="text-sm text-white/60 mb-3">
            Note: Full team details available after deposit
          </p>
          <p className="text-white/80">
            The core team consists of 3 technical co-founders with 10+ years combined experience in logistics and AI, 2 senior product designers, and 1 operations manager. All key personnel are willing to stay on during transition period if desired.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
