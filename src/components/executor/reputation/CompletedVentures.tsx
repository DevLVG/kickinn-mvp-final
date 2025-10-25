import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompletedVentures = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | '30d' | '6m' | '1y'>('all');

  // Mock ventures data
  const ventures = [
    {
      venture_id: "1",
      name: "ThreadCycle",
      image_url: "https://images.unsplash.com/photo-1558769132-cb1aea3c8e1e?w=400",
      role: "Lead Developer",
      duration_months: 4,
      tokens_earned: 50000,
      token_symbol: "FABR",
      rating: 4.9,
      completed_at: "2024-09-20"
    },
    {
      venture_id: "2",
      name: "AI Content Studio",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
      role: "Full-Stack Engineer",
      duration_months: 3,
      tokens_earned: 35000,
      token_symbol: "ACON",
      rating: 5.0,
      completed_at: "2024-08-15"
    },
    {
      venture_id: "3",
      name: "HealthTrack Pro",
      image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
      role: "Mobile Developer",
      duration_months: 5,
      tokens_earned: 60000,
      token_symbol: "HLTH",
      rating: 4.8,
      completed_at: "2024-07-10"
    },
    {
      venture_id: "4",
      name: "EduLearn Platform",
      image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400",
      role: "Backend Developer",
      duration_months: 4,
      tokens_earned: 45000,
      token_symbol: "EDUC",
      rating: 4.7,
      completed_at: "2024-06-05"
    },
    {
      venture_id: "5",
      name: "FinFlow Analytics",
      image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
      role: "Data Engineer",
      duration_months: 6,
      tokens_earned: 70000,
      token_symbol: "FINF",
      rating: 4.9,
      completed_at: "2024-05-20"
    },
    {
      venture_id: "6",
      name: "GreenEnergy Dashboard",
      image_url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400",
      role: "Frontend Developer",
      duration_months: 3,
      tokens_earned: 40000,
      token_symbol: "GREN",
      rating: 5.0,
      completed_at: "2024-04-15"
    }
  ];

  return (
    <section 
      className="w-full py-20 px-10"
      style={{ background: 'rgba(15, 43, 56, 0.4)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-white">
            Completed Ventures
          </h2>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 rounded-lg font-medium text-sm transition-all bg-transparent text-white"
            style={{ border: '1px solid rgba(103, 159, 131, 0.3)' }}
          >
            <option value="all">All</option>
            <option value="30d">Last 30 days</option>
            <option value="6m">Last 6 months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map((venture) => (
            <div
              key={venture.venture_id}
              onClick={() => navigate(`/ventures/${venture.venture_id}`)}
              className="rounded-2xl p-6 cursor-pointer transition-all hover:translate-y-[-4px] relative"
              style={{
                background: 'linear-gradient(135deg, rgba(103, 159, 131, 0.08), rgba(35, 105, 138, 0.08))',
                border: '1px solid rgba(103, 159, 131, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Image */}
              <img
                src={venture.image_url}
                alt={venture.name}
                className="w-full h-44 object-cover rounded-xl mb-4"
              />

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                {venture.name}
              </h3>

              {/* Role Badge */}
              <div
                className="inline-block px-3 py-1 rounded-xl text-xs mb-4"
                style={{
                  background: 'rgba(103, 159, 131, 0.2)',
                  border: '1px solid rgba(103, 159, 131, 0.4)',
                  color: '#86b39c'
                }}
              >
                {venture.role}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-white mb-1">
                    📅 {venture.duration_months}mo
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Duration
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white mb-1">
                    🪙 {(venture.tokens_earned / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Earned
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white mb-1">
                    ⭐ {venture.rating}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Rating
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div
                className="absolute bottom-4 right-4 px-3 py-1 rounded-xl text-xs font-medium"
                style={{
                  background: 'rgba(74, 222, 128, 0.2)',
                  border: '1px solid rgba(74, 222, 128, 0.4)',
                  color: '#4ade80'
                }}
              >
                ✓ Delivered
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedVentures;
