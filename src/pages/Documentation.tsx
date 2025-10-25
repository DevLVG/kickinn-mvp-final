import { useState } from "react";
import StaticPageHeader from "@/components/shared/StaticPageHeader";
import StaticPageFooter from "@/components/shared/StaticPageFooter";
import { Search } from "lucide-react";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("platform-overview");
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    {
      category: "Getting Started",
      items: [
        { id: "platform-overview", label: "Platform Overview" },
        { id: "registration", label: "Registration & Setup" },
        { id: "choosing-role", label: "Choosing Your Role" },
        { id: "wallet-connection", label: "Wallet Connection" }
      ]
    },
    {
      category: "For Ideators",
      items: [
        { id: "submitting-ideas", label: "Submitting Ideas" },
        { id: "ai-validation", label: "AI Validation Process" },
        { id: "tracking-venture", label: "Tracking Your Venture" },
        { id: "token-distribution", label: "Token Distribution" }
      ]
    },
    {
      category: "For Executors",
      items: [
        { id: "finding-opportunities", label: "Finding Opportunities" },
        { id: "application-process", label: "Application Process" },
        { id: "milestone-delivery", label: "Milestone Delivery" },
        { id: "earning-vesting", label: "Earning & Vesting" }
      ]
    },
    {
      category: "For Investors",
      items: [
        { id: "deal-discovery", label: "Deal Discovery" },
        { id: "investment-process", label: "Investment Process" },
        { id: "portfolio-management", label: "Portfolio Management" }
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <StaticPageHeader />

      {/* Hero Section */}
      <section 
        className="w-full py-20 px-10"
        style={{
          background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Platform Documentation
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Everything you need to know to succeed on Kick Inn
          </p>

          {/* Search Bar */}
          <div 
            className="relative max-w-2xl mx-auto rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white opacity-70" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 px-12 bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16 px-10 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-10">
          {/* Sidebar Navigation */}
          <aside 
            className="lg:col-span-1 rounded-xl p-6 h-fit lg:sticky lg:top-24"
            style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb'
            }}
          >
            <h3 className="text-base font-bold mb-5" style={{ color: '#194a61' }}>
              Contents
            </h3>
            <nav className="space-y-4">
              {navigation.map((section) => (
                <div key={section.category}>
                  <h4 className="text-sm font-bold mb-2" style={{ color: '#194a61' }}>
                    {section.category}
                  </h4>
                  <ul className="space-y-2 pl-3">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveSection(item.id)}
                          className="text-sm transition-colors text-left"
                          style={{
                            color: activeSection === item.id ? '#679f83' : '#6b7280',
                            fontWeight: activeSection === item.id ? '600' : '400'
                          }}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-3 max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <h2 
                className="text-4xl font-bold pb-4 mb-6"
                style={{ 
                  color: '#194a61',
                  borderBottom: '2px solid #e5e7eb'
                }}
              >
                Platform Overview
              </h2>

              <p className="text-base leading-relaxed mb-5" style={{ color: '#4b5563' }}>
                Kick Inn is a blockchain-based venture creation platform that transforms real-world problems into investable micro-ventures through AI orchestration, Executor networks, and tokenized capital.
              </p>

              <h3 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#194a61' }}>
                Key Concepts
              </h3>

              <ul className="space-y-3 mb-8">
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <strong style={{ color: '#194a61' }}>Founderless Ventures:</strong> Ideas validated by AI, built by Executors
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <strong style={{ color: '#194a61' }}>Tokenized Participation:</strong> Stakeholders earn liquid tokens
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <strong style={{ color: '#194a61' }}>Smart Contract Governance:</strong> Automated milestones and payouts
                </li>
              </ul>

              {/* Info Box */}
              <div 
                className="rounded-lg p-5 mb-8"
                style={{
                  background: 'rgba(96, 165, 250, 0.1)',
                  borderLeft: '4px solid #60a5fa'
                }}
              >
                <p className="text-sm font-medium flex items-start gap-2" style={{ color: '#1e40af' }}>
                  <span className="text-lg">ℹ️</span>
                  All ventures are tokenized using TON blockchain smart contracts.
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#194a61' }}>
                How Kick Inn Works
              </h3>

              <ol className="space-y-3 mb-8 list-decimal list-inside">
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <strong>Ideators</strong> submit real-world problems
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <strong>AI</strong> validates market potential and urgency
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <strong>Executors</strong> build validated MVPs
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <strong>Investors</strong> fund post-MVP ventures
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  <strong>Buyers</strong> acquire exit-ready ventures
                </li>
              </ol>

              <h3 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#194a61' }}>
                Getting Started
              </h3>

              <p className="text-base leading-relaxed mb-5" style={{ color: '#4b5563' }}>
                To get started on Kick Inn, you'll need to:
              </p>

              <ol className="space-y-4 mb-8 list-decimal list-inside">
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  Create an account and choose your primary role
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  Connect your TON wallet for transactions
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  Complete your profile with relevant information
                </li>
                <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  Begin exploring opportunities in your role
                </li>
              </ol>

              {/* Success Box */}
              <div 
                className="rounded-lg p-5 mb-8"
                style={{
                  background: 'rgba(74, 222, 128, 0.1)',
                  borderLeft: '4px solid #4ade80'
                }}
              >
                <p className="text-sm font-medium flex items-start gap-2" style={{ color: '#065f46' }}>
                  <span className="text-lg">✅</span>
                  Ready to dive deeper? Explore the role-specific guides in the sidebar.
                </p>
              </div>
            </article>
          </main>
        </div>
      </section>

      <StaticPageFooter />
    </div>
  );
};

export default Documentation;
