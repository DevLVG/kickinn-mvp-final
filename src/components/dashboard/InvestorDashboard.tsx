import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import InvestorVentureCard from "./InvestorVentureCard";
import ActivityItem from "./ActivityItem";

interface InvestorDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const InvestorDashboard = ({ user }: InvestorDashboardProps) => {
  // Mock data - in production, fetch from API
  const kycStatus = "pending" as "pending" | "verified" | "rejected";

  const featuredVentures = [
    {
      id: "1",
      title: "ThreadCycle - Sustainable Fashion Marketplace",
      category: "HealthTech",
      validationScore: 8.7,
      users: 2400,
      mrr: 18000,
      fundingRaised: 195000,
      fundingGoal: 250000,
      tokenPrice: 0.30
    },
    {
      id: "2",
      title: "CarbonTrack - Personal Carbon Footprint",
      category: "ClimateType",
      validationScore: 9.1,
      users: 5200,
      mrr: 32000,
      fundingRaised: 450000,
      fundingGoal: 500000,
      tokenPrice: 0.45
    },
    {
      id: "3",
      title: "LocalBites - Restaurant Discovery App",
      category: "FoodTech",
      validationScore: 8.3,
      users: 1800,
      mrr: 12000,
      fundingRaised: 80000,
      fundingGoal: 150000,
      tokenPrice: 0.25
    }
  ];

  const portfolioData = {
    totalInvested: 125000,
    currentValue: 156800,
    percentageChange: 25.4,
    activeVentures: 8,
    avgROI: 32
  };

  const recentActivity: Array<{
    id: string;
    type: 'milestone' | 'funding' | 'exit' | 'token';
    icon: string;
    title: string;
    description: string;
    time: string;
  }> = [
    {
      id: "1",
      type: "milestone",
      icon: "✅",
      title: "Milestone Completed",
      description: "ThreadCycle completed 'Design Phase' milestone",
      time: "2 hours ago"
    },
    {
      id: "2",
      type: "funding",
      icon: "💰",
      title: "Funding Round Closed",
      description: "CarbonTrack raised $500K in Series A",
      time: "5 hours ago"
    },
    {
      id: "3",
      type: "exit",
      icon: "🎉",
      title: "Exit Opportunity",
      description: "LocalBites received acquisition offer ($2.5M)",
      time: "1 day ago"
    },
    {
      id: "4",
      type: "token",
      icon: "🪙",
      title: "Token Distribution",
      description: "Received 5,000 tokens from FitTrack vesting",
      time: "2 days ago"
    }
  ];

  const firstName = user.name.split(' ')[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          Welcome back, {firstName}!
        </h1>
        <p className="text-base text-gray-600">
          You have {portfolioData.activeVentures} active investments with +{portfolioData.percentageChange}% returns
        </p>
      </div>

      {/* KYC Banner (if not verified) */}
      {kycStatus !== "verified" && (
        <div 
          className="rounded-xl p-5 flex items-center gap-4 flex-wrap"
          style={{
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            border: '1px solid #f59e0b'
          }}
        >
          <span className="text-3xl">⚠️</span>
          <div className="flex-1">
            <h3 className="text-base font-bold mb-1" style={{ color: '#92400e' }}>
              Complete KYC to Start Investing
            </h3>
            <p className="text-sm" style={{ color: 'rgba(146, 64, 14, 0.7)' }}>
              Verification required for all investments
            </p>
          </div>
          <Link to="/investor/settings/kyc">
            <Button 
              size="sm"
              className="text-white"
              style={{ background: '#f59e0b' }}
            >
              Start KYC
            </Button>
          </Link>
        </div>
      )}

      {/* Featured Ventures */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary-dark mb-1">
            Featured Ventures
          </h2>
          <p className="text-sm text-gray-500">Top validated MVPs seeking funding</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVentures.map((venture) => (
            <InvestorVentureCard key={venture.id} venture={venture} />
          ))}
        </div>
      </div>

      {/* Portfolio Summary */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Your Portfolio
        </h2>

        <div 
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(103, 159, 131, 0.1), rgba(35, 105, 138, 0.1))'
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Invested */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Invested</p>
              <p className="text-3xl font-bold text-primary-dark">
                ${portfolioData.totalInvested.toLocaleString()}
              </p>
            </div>

            {/* Current Value */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Current Value</p>
              <p className="text-3xl font-bold text-primary-dark mb-1">
                ${portfolioData.currentValue.toLocaleString()}
              </p>
              <p className="text-sm font-medium" style={{ color: '#10b981' }}>
                +{portfolioData.percentageChange}%
              </p>
            </div>

            {/* Active Ventures */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Active Ventures</p>
              <p className="text-3xl font-bold text-primary-dark">
                {portfolioData.activeVentures}
              </p>
            </div>

            {/* ROI */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Average ROI</p>
              <p className="text-3xl font-bold" style={{ color: '#10b981' }}>
                +{portfolioData.avgROI}%
              </p>
            </div>
          </div>

          <Link 
            to="/portfolio" 
            className="inline-block mt-6 text-sm text-secondary-teal hover:underline"
          >
            View Full Portfolio →
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
