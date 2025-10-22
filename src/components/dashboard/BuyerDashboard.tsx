import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ExitVentureCard from "./ExitVentureCard";
import BuyerOfferCard from "./BuyerOfferCard";
import AcquiredVentureCard from "./AcquiredVentureCard";

interface BuyerDashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const BuyerDashboard = ({ user }: BuyerDashboardProps) => {
  // Mock data - in production, fetch from API
  const exitVentures = [
    {
      id: "1",
      title: "ThreadCycle - Sustainable Fashion Platform",
      category: "Logistics",
      traction: "6 months live",
      mrr: 18000,
      users: 2400,
      growth: 180,
      totalRevenue: 108000,
      exitPrice: 850000
    },
    {
      id: "2",
      title: "CarbonTrack - Carbon Footprint Tracker",
      category: "ClimateType",
      traction: "8 months live",
      mrr: 24000,
      users: 5200,
      growth: 220,
      totalRevenue: 192000,
      exitPrice: 1200000
    },
    {
      id: "3",
      title: "LocalBites - Restaurant Discovery",
      category: "FoodTech",
      traction: "4 months live",
      mrr: 12000,
      users: 1800,
      growth: 150,
      totalRevenue: 48000,
      exitPrice: 600000
    }
  ];

  const activeOffers = [
    {
      id: "1",
      ventureTitle: "ThreadCycle - Sustainable Fashion Platform",
      status: "pending" as const,
      offerAmount: 850000,
      submittedDays: 3,
      dueDiligenceDays: 4
    },
    {
      id: "2",
      ventureTitle: "FitTrack - AI Fitness Coach",
      status: "in_due_diligence" as const,
      offerAmount: 1100000,
      submittedDays: 8,
      dueDiligenceDays: 2
    }
  ];

  const acquiredVentures = [
    {
      id: "1",
      title: "SmartCart - AI Shopping Assistant",
      acquiredMonths: 2,
      mrrGrowth: 45,
      users: 3200,
      newUsers: 800
    },
    {
      id: "2",
      title: "HealthHub - Telemedicine Platform",
      acquiredMonths: 5,
      mrrGrowth: 62,
      users: 8500,
      newUsers: 3200
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
          You have {activeOffers.length} active offers and {acquiredVentures.length} acquired ventures
        </p>
      </div>

      {/* Exit Marketplace Preview */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary-dark mb-1">
            Exit-Ready Ventures
          </h2>
          <p className="text-sm text-gray-500">Proven traction, ready for acquisition</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exitVentures.map((venture) => (
            <ExitVentureCard key={venture.id} venture={venture} />
          ))}
        </div>
      </div>

      {/* Active Offers */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Your Active Offers
        </h2>

        {activeOffers.length > 0 ? (
          <div className="space-y-4">
            {activeOffers.map((offer) => (
              <BuyerOfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center">
            <span className="text-6xl opacity-30">📋</span>
            <p className="text-base text-gray-500 mt-4 mb-4">No active offers</p>
            <Link to="/exits">
              <Button className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Acquired Ventures */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Acquired Ventures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {acquiredVentures.map((venture) => (
            <AcquiredVentureCard key={venture.id} venture={venture} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
