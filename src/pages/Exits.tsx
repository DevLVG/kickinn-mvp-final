import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ExitHeroSection from "@/components/exits/ExitHeroSection";
import ExitFilterPanel from "@/components/exits/ExitFilterPanel";
import ExitVentureCard from "@/components/exits/ExitVentureCard";
import { Loader2 } from "lucide-react";

interface Venture {
  id: string;
  title: string;
  description: string;
  sector: string;
  image_url: string;
  is_featured: boolean;
  metrics: {
    mrr_usd: number;
    active_users: number;
    growth_rate_monthly: number;
    revenue_multiple: number;
  };
  exit: {
    price_usd: number;
    dd_included: boolean;
    listed_at: Date;
  };
  status: 'available' | 'in_negotiation' | 'sold';
}

interface Filters {
  search: string;
  sector: string | null;
  metrics: {
    minRevenue: boolean;
    minUsers: boolean;
    minGrowth: boolean;
    isProfitable: boolean;
  };
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'recent' | 'price_asc' | 'price_desc' | 'revenue' | 'growth' | 'multiple';
}

// Mock data
const mockVentures: Venture[] = [
  {
    id: "1",
    title: "LogiTrack - Supply Chain SaaS",
    description: "AI-powered logistics optimization platform serving 500+ enterprise clients. Automated route planning and real-time tracking.",
    sector: "SaaS",
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    is_featured: true,
    metrics: {
      mrr_usd: 24500,
      active_users: 12800,
      growth_rate_monthly: 32,
      revenue_multiple: 6.2
    },
    exit: {
      price_usd: 1850000,
      dd_included: true,
      listed_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    status: 'available'
  },
  {
    id: "2",
    title: "MediConnect - Healthcare Platform",
    description: "Telemedicine platform connecting patients with specialists. HIPAA compliant with 99.9% uptime.",
    sector: "Healthcare",
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    is_featured: false,
    metrics: {
      mrr_usd: 18200,
      active_users: 8500,
      growth_rate_monthly: 28,
      revenue_multiple: 5.8
    },
    exit: {
      price_usd: 1260000,
      dd_included: true,
      listed_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    status: 'available'
  },
  {
    id: "3",
    title: "EduFlow - Online Learning Hub",
    description: "Interactive learning platform with 200+ courses. Gamified education with verified certificates.",
    sector: "EdTech",
    image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
    is_featured: true,
    metrics: {
      mrr_usd: 32000,
      active_users: 24000,
      growth_rate_monthly: 45,
      revenue_multiple: 7.5
    },
    exit: {
      price_usd: 2880000,
      dd_included: true,
      listed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    status: 'available'
  },
  {
    id: "4",
    title: "MarketNest - B2B Marketplace",
    description: "Wholesale marketplace connecting manufacturers with retailers. Automated pricing and fulfillment.",
    sector: "Marketplace",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    is_featured: false,
    metrics: {
      mrr_usd: 15800,
      active_users: 3200,
      growth_rate_monthly: 22,
      revenue_multiple: 5.2
    },
    exit: {
      price_usd: 985000,
      dd_included: true,
      listed_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    },
    status: 'available'
  },
  {
    id: "5",
    title: "FinPulse - Financial Analytics",
    description: "Real-time financial data analytics for SMBs. Automated reporting and forecasting tools.",
    sector: "Fintech",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    is_featured: false,
    metrics: {
      mrr_usd: 21000,
      active_users: 5600,
      growth_rate_monthly: 18,
      revenue_multiple: 6.0
    },
    exit: {
      price_usd: 1512000,
      dd_included: true,
      listed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    status: 'available'
  },
  {
    id: "6",
    title: "ShopFlow - E-commerce Suite",
    description: "Complete e-commerce management platform. Inventory, orders, and customer analytics in one place.",
    sector: "E-commerce",
    image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    is_featured: false,
    metrics: {
      mrr_usd: 28500,
      active_users: 9800,
      growth_rate_monthly: 35,
      revenue_multiple: 6.8
    },
    exit: {
      price_usd: 2318000,
      dd_included: true,
      listed_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    status: 'available'
  }
];

const Exits = () => {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [filteredVentures, setFilteredVentures] = useState<Venture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(12);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    sector: null,
    metrics: {
      minRevenue: false,
      minUsers: false,
      minGrowth: false,
      isProfitable: false
    },
    priceRange: {
      min: 100000,
      max: 10000000
    },
    sortBy: 'recent'
  });

  // Mock user data
  const user = {
    name: "John Buyer",
    email: "john@example.com",
    initials: "JB"
  };

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setVentures(mockVentures);
      setFilteredVentures(mockVentures);
      setIsLoading(false);
    }, 500);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...ventures];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(v => 
        v.title.toLowerCase().includes(searchLower) ||
        v.description.toLowerCase().includes(searchLower) ||
        v.sector.toLowerCase().includes(searchLower)
      );
    }

    // Sector filter
    if (filters.sector) {
      filtered = filtered.filter(v => v.sector === filters.sector);
    }

    // Metrics filters
    if (filters.metrics.minRevenue) {
      filtered = filtered.filter(v => v.metrics.mrr_usd >= 10000);
    }
    if (filters.metrics.minUsers) {
      filtered = filtered.filter(v => v.metrics.active_users >= 10000);
    }
    if (filters.metrics.minGrowth) {
      filtered = filtered.filter(v => v.metrics.growth_rate_monthly >= 20);
    }

    // Price range filter
    filtered = filtered.filter(v => 
      v.exit.price_usd >= filters.priceRange.min && 
      v.exit.price_usd <= filters.priceRange.max
    );

    // Sort
    switch (filters.sortBy) {
      case 'recent':
        filtered.sort((a, b) => b.exit.listed_at.getTime() - a.exit.listed_at.getTime());
        break;
      case 'price_asc':
        filtered.sort((a, b) => a.exit.price_usd - b.exit.price_usd);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.exit.price_usd - a.exit.price_usd);
        break;
      case 'revenue':
        filtered.sort((a, b) => b.metrics.mrr_usd - a.metrics.mrr_usd);
        break;
      case 'growth':
        filtered.sort((a, b) => b.metrics.growth_rate_monthly - a.metrics.growth_rate_monthly);
        break;
      case 'multiple':
        filtered.sort((a, b) => b.metrics.revenue_multiple - a.metrics.revenue_multiple);
        break;
    }

    // Featured first
    filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));

    setFilteredVentures(filtered);
  }, [filters, ventures]);

  const handleLoadMore = () => {
    setLoadedCount(prev => prev + 12);
  };

  const visibleVentures = filteredVentures.slice(0, loadedCount);
  const hasMore = filteredVentures.length > loadedCount;

  return (
    <DashboardLayout
      activeRole="buyer"
      userRoles={["buyer"]}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, rgba(15, 43, 56, 0.6), rgba(15, 43, 56, 0.8))' }}>
        <ExitHeroSection />
        
        <ExitFilterPanel 
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="px-4 md:px-10 py-12 md:py-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#679f83' }} />
            </div>
          ) : filteredVentures.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No ventures found</h3>
              <p className="text-base mb-6" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Try adjusting your filters or search criteria.
              </p>
              <button
                onClick={() => setFilters({
                  search: "",
                  sector: null,
                  metrics: { minRevenue: false, minUsers: false, minGrowth: false, isProfitable: false },
                  priceRange: { min: 100000, max: 10000000 },
                  sortBy: 'recent'
                })}
                className="px-8 py-3 rounded-xl font-medium transition-all"
                style={{
                  background: 'linear-gradient(135deg, #679f83, #23698a)',
                  color: 'white'
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                {visibleVentures.map((venture) => (
                  <ExitVentureCard key={venture.id} venture={venture} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="px-10 py-4 rounded-xl font-medium transition-all hover:opacity-90"
                    style={{
                      background: 'rgba(103, 159, 131, 0.2)',
                      border: '1px solid rgba(103, 159, 131, 0.4)',
                      color: '#86b39c'
                    }}
                  >
                    Load More Ventures
                  </button>
                </div>
              )}

              {!hasMore && filteredVentures.length > 0 && (
                <div className="text-center mt-12">
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    ✓ You've viewed all available ventures
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Exits;
