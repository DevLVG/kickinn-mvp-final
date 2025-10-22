import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OpportunityCard from "./OpportunityCard";
import ExecutorProjectCard from "./ExecutorProjectCard";

interface ExecutorDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const ExecutorDashboard = ({ user }: ExecutorDashboardProps) => {
  // Mock data - in production, fetch from API
  const reputationData = {
    score: 4.8,
    completedVentures: 12,
    completionRate: 96,
    onTimeDelivery: "11/12",
    avgResponseTime: "2.3 hours"
  };

  const matchedOpportunities = [
    {
      id: "1",
      fitScore: 93,
      ventureTitle: "ThreadCycle - Sustainable Fashion Platform",
      role: "Frontend Developer",
      scope: "5 screens, API integration, 3 weeks",
      skills: ["React", "TypeScript", "Tailwind"],
      tokenReward: 13000,
      tokenValue: 3900,
      timeline: "3 weeks",
      deadline: "18 hours"
    },
    {
      id: "2",
      fitScore: 88,
      ventureTitle: "FitTrack - AI Fitness Coach",
      role: "Full Stack Developer",
      scope: "Mobile app, ML integration, 4 weeks",
      skills: ["React Native", "Node.js", "TensorFlow"],
      tokenReward: 18000,
      tokenValue: 5400,
      timeline: "4 weeks",
      deadline: "2 days"
    },
    {
      id: "3",
      fitScore: 85,
      ventureTitle: "LocalBites - Restaurant Discovery",
      role: "Backend Developer",
      scope: "API design, Database setup, 2 weeks",
      skills: ["Node.js", "PostgreSQL", "Redis"],
      tokenReward: 10000,
      tokenValue: 3000,
      timeline: "2 weeks",
      deadline: "5 days"
    }
  ];

  const activeProjects = [
    {
      id: "1",
      ventureTitle: "ThreadCycle - Sustainable Fashion Platform",
      role: "Frontend Developer",
      currentMilestone: "Design Implementation",
      progress: 60,
      deadline: "5 days",
      tokensAllocated: 13000
    },
    {
      id: "2",
      ventureTitle: "CarbonTrack - Carbon Footprint Tracker",
      role: "Mobile Developer",
      currentMilestone: "API Integration",
      progress: 35,
      deadline: "2 days",
      tokensAllocated: 15000
    }
  ];

  const earningsData = {
    vested: {
      tokens: 25000,
      value: 6250
    },
    vesting: {
      tokens: 50000,
      value: 12500,
      dailyUnlock: 137
    },
    totalEarned: {
      value: 18750,
      ventures: 12
    }
  };

  const firstName = user.name.split(' ')[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          Welcome back, {firstName}!
        </h1>
        <p className="text-base text-gray-600">
          You have {activeProjects.length} active projects and {matchedOpportunities.length} new opportunities
        </p>
      </div>

      {/* Reputation Score Card */}
      <div 
        className="rounded-2xl p-6 text-white"
        style={{
          background: 'linear-gradient(135deg, #679f83, #23698a)'
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-6">
          {/* Left: Main Score */}
          <div>
            <p className="text-sm opacity-80 mb-2">Your Reputation</p>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-bold">{reputationData.score}</span>
              <span className="text-2xl">★</span>
            </div>
            <p className="text-sm opacity-80">
              Based on {reputationData.completedVentures} completed ventures
            </p>
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs opacity-80 mb-1">Completion Rate</p>
              <p className="text-lg font-bold">{reputationData.completionRate}%</p>
            </div>
            <div>
              <p className="text-xs opacity-80 mb-1">On-Time Delivery</p>
              <p className="text-lg font-bold">{reputationData.onTimeDelivery}</p>
            </div>
            <div>
              <p className="text-xs opacity-80 mb-1">Avg Response Time</p>
              <p className="text-lg font-bold">{reputationData.avgResponseTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Matched Opportunities */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary-dark mb-1">
            Top Opportunities for You
          </h2>
          <p className="text-sm text-gray-500">AI-matched based on your skills</p>
        </div>

        <div className="space-y-4">
          {matchedOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>

      {/* Active Projects */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary-dark mb-1">
            Active Projects
          </h2>
          <p className="text-sm text-gray-500">
            {activeProjects.length}/3 concurrent ventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeProjects.map((project) => (
            <ExecutorProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Earnings Summary */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Your Earnings
        </h2>

        <div className="bg-white rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vested */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Vested Tokens</p>
              <p className="text-2xl font-bold text-primary-dark mb-1">
                {earningsData.vested.tokens.toLocaleString()} tokens
              </p>
              <p className="text-sm text-gray-500 mb-3">
                ${earningsData.vested.value.toLocaleString()}
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
              >
                Claim
              </Button>
            </div>

            {/* Vesting */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Vesting</p>
              <p className="text-2xl font-bold text-primary-dark mb-1">
                {earningsData.vesting.tokens.toLocaleString()} tokens
              </p>
              <p className="text-sm text-gray-500 mb-1">
                ${earningsData.vesting.value.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                {earningsData.vesting.dailyUnlock} tokens unlock daily
              </p>
            </div>

            {/* Total Earned */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Earned</p>
              <p className="text-2xl font-bold text-primary-dark mb-1">
                ${earningsData.totalEarned.value.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Across {earningsData.totalEarned.ventures} ventures
              </p>
            </div>
          </div>

          <Link 
            to="/executor/earnings" 
            className="inline-block mt-6 text-sm text-secondary-teal hover:underline"
          >
            View Full Breakdown →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExecutorDashboard;
