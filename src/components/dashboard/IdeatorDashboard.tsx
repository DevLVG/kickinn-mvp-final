import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb } from "lucide-react";
import SubmissionCard from "./SubmissionCard";
import VentureCard from "./VentureCard";

interface IdeatorDashboardProps {
  user: {
    name: string;
  };
}

// Mock data
type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'building';

const mockSubmissions: Array<{
  id: string;
  title: string;
  status: SubmissionStatus;
  submittedDate: string;
  validationScores?: {
    marketDepth: number;
    urgency: number;
    uniqueness: number;
  };
}> = [
  {
    id: '1',
    title: 'Logistics Platform for SMEs',
    status: 'approved',
    submittedDate: '2024-01-15',
    validationScores: {
      marketDepth: 8.5,
      urgency: 9.0,
      uniqueness: 7.8,
    },
  },
  {
    id: '2',
    title: 'AI-Powered Inventory Management',
    status: 'building',
    submittedDate: '2024-01-10',
  },
  {
    id: '3',
    title: 'Green Energy Marketplace',
    status: 'pending',
    submittedDate: '2024-01-20',
  },
];

const mockVentures = [
  {
    id: '1',
    title: 'ThreadCycle - Fashion Resale Platform',
    status: 'Building MVP',
    progress: 75,
    executorCount: 3,
  },
  {
    id: '2',
    title: 'LogiTrack - Last-Mile Delivery',
    status: 'Seeking Funding',
    progress: 100,
    executorCount: 5,
  },
];

const mockTokens = [
  { symbol: 'THRD', amount: '10,000', value: '$2,500' },
  { symbol: 'LOGI', amount: '15,000', value: '$3,750' },
  { symbol: 'GREN', amount: '8,000', value: '$2,000' },
];

const IdeatorDashboard = ({ user }: IdeatorDashboardProps) => {
  const firstName = user.name.split(' ')[0];
  const activeIdeas = mockSubmissions.filter(s => s.status !== 'rejected').length;
  const activeVentures = mockVentures.length;

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Section 1: Welcome Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-primary-dark mb-2">
          Welcome back, {firstName}! 👋
        </h1>
        <p className="text-base text-gray-600">
          You have {activeIdeas} active ideas and {activeVentures} ventures in progress
        </p>
      </div>

      {/* Section 2: Quick Action */}
      <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
        <Link to="/submit-idea">
          <Button
            className="w-full py-4 text-base font-bold text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(to right, #679f83, #23698a)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(103, 159, 131, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Lightbulb className="w-6 h-6" />
            Submit Your Next Idea
          </Button>
        </Link>
      </div>

      {/* Section 3: Active Submissions */}
      <div className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-bold text-primary-dark">My Ideas</h2>
          <p className="text-sm text-gray-500">{mockSubmissions.length}/3 active submissions</p>
        </div>

        {mockSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <span className="text-6xl opacity-30 block mb-4">💭</span>
            <p className="text-base text-gray-500 mb-6">You haven't submitted any ideas yet</p>
            <Link to="/submit-idea">
              <Button
                style={{ background: 'linear-gradient(to right, #679f83, #23698a)' }}
                className="text-white"
              >
                Submit Your First Idea
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSubmissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        )}
      </div>

      {/* Section 4: Active Ventures */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">Active Ventures</h2>

        {mockVentures.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <span className="text-6xl opacity-30 block mb-4">🚀</span>
            <p className="text-base text-gray-500">No active ventures yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVentures.map((venture) => (
              <VentureCard key={venture.id} venture={venture} />
            ))}
          </div>
        )}
      </div>

      {/* Section 5: Token Summary */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">Token Balance</h2>
        
        <div 
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(103, 159, 131, 0.1), rgba(35, 105, 138, 0.1))',
            border: '1px solid rgba(103, 159, 131, 0.2)',
          }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Token Value</p>
              <p className="text-4xl font-bold text-primary-dark mb-1">$12,450</p>
              <p className="text-sm text-green-600">+8.2% (24h)</p>
            </div>

            {/* Right Column */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Top Holdings</p>
              <div className="space-y-2">
                {mockTokens.map((token) => (
                  <div key={token.symbol} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-primary-dark">{token.symbol}</p>
                      <p className="text-xs text-gray-600">{token.amount} tokens</p>
                    </div>
                    <p className="text-xs text-gray-600">{token.value}</p>
                  </div>
                ))}
              </div>
              <Link to="/portfolio" className="text-sm text-secondary-teal hover:underline mt-3 inline-block">
                View Full Portfolio →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeatorDashboard;