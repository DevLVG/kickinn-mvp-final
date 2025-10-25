import StaticPageHeader from "@/components/shared/StaticPageHeader";
import StaticPageFooter from "@/components/shared/StaticPageFooter";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: "🔍",
      title: "Radical Transparency",
      description: "Every action on-chain, every decision traceable, no black boxes."
    },
    {
      icon: "🎯",
      title: "Pure Meritocracy",
      description: "Opportunities based on skills and track record, not connections."
    },
    {
      icon: "⚡",
      title: "Zero Waste",
      description: "Lean operations, no bloat, only value-creating activities."
    },
    {
      icon: "🌍",
      title: "Global Access",
      description: "Anyone, anywhere can participate and earn based on contribution."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <StaticPageHeader />

      {/* Hero Section */}
      <section 
        className="w-full py-32 px-10"
        style={{
          background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)'
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Building the Future of Venture Creation
          </h1>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Kick Inn is a blockchain-powered platform transforming how ventures are created, funded, and scaled - without traditional founders.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-24 px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16" style={{ color: '#194a61' }}>
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: '#4b5563' }}>
                Kick Inn removes the friction from venture creation by replacing traditional founders with AI orchestration, modular Executor networks, and tokenized capital structures.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#4b5563' }}>
                We believe the best ideas come from people experiencing real-world problems, not from pitch decks. Our platform validates, builds, and scales these ideas into investable micro-ventures with proven traction.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800" 
                alt="Team collaboration"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="w-full py-24 px-10" style={{ background: '#f5f7f8' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16" style={{ color: '#194a61' }}>
            How We're Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧩",
                title: "Founderless Ventures",
                description: "Ideas validated by AI, built by expert Executors, managed by smart contracts. No single founder, no equity dilution drama."
              },
              {
                icon: "🪙",
                title: "Tokenized Capital",
                description: "All stakeholders - Ideators, Executors, Investors - earn liquid tokens proportional to their contribution. Exit anytime via DEX or acquisition."
              },
              {
                icon: "⚙️",
                title: "Code-Governed Operations",
                description: "No gatekeepers. Milestones verified by AI, payments automated via smart contracts, complete transparency on-chain."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 transition-all hover:shadow-xl"
                style={{ border: '1px solid #e5e7eb' }}
              >
                <div className="text-5xl mb-5">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#194a61' }}>
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full py-24 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16" style={{ color: '#194a61' }}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#194a61' }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="w-full py-20 px-10"
        style={{
          background: 'linear-gradient(135deg, rgba(103, 159, 131, 0.1), rgba(35, 105, 138, 0.1))'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-5" style={{ color: '#194a61' }}>
            Ready to Join Us?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#6b7280' }}>
            Whether you have an idea, skills to build, or capital to invest - Kick Inn has a place for you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <button
                className="px-8 py-4 rounded-lg font-bold text-base text-white transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #679f83, #23698a)'
                }}
              >
                Get Started
              </button>
            </Link>
            <Link to="/documentation">
              <button
                className="px-8 py-4 rounded-lg font-bold text-base transition-all hover:bg-gray-50"
                style={{
                  border: '1px solid #d1d5db',
                  color: '#194a61'
                }}
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <StaticPageFooter />
    </div>
  );
};

export default About;
