import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import RoleCard from "@/components/RoleCard";
import ProcessStep from "@/components/ProcessStep";
import StatCard from "@/components/StatCard";
import HeroVisual from "@/components/HeroVisual";
import { Twitter, Linkedin, Send } from "lucide-react";

const Index = () => {
  return (
    <div className="w-full">
      {/* Section 1: Hero */}
      <section 
        className="min-h-screen px-8 md:px-16 py-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)',
        }}
      >
        {/* Radial accent overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(103, 159, 131, 0.15), transparent 50%)'
          }}
        />
        
        {/* Decorative grid pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `linear-gradient(#679f83 1px, transparent 1px),
                             linear-gradient(90deg, #679f83 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Logo with glow effect - clickable */}
          <div className="mb-16 md:mb-20">
            <Link to="/">
              <h2 
                className="text-2xl md:text-3xl font-bold text-white tracking-wider cursor-pointer hover:opacity-90 transition-opacity inline-block" 
                style={{ textShadow: '0 0 30px rgba(103, 159, 131, 0.5)' }}
              >
                KICK INN
              </h2>
            </Link>
          </div>
          
          {/* Hero Grid */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-4xl md:text-[56px] font-bold text-white leading-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                Where Ideas <span className="bg-gradient-primary bg-clip-text text-transparent">Kick In</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                From problem to prototype. From insight to investability.
              </p>
              <div className="pt-4">
                <Link to="/register">
                  <Button 
                    className="px-8 py-6 rounded-lg text-base font-medium transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(to right, #679f83, #23698a)',
                      boxShadow: '0 8px 24px rgba(103, 159, 131, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="flex justify-center md:justify-end">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What is Kick Inn */}
      <section 
        className="px-8 md:px-16 py-24 md:py-32 relative overflow-hidden"
        style={{ background: 'rgba(15, 43, 56, 0.5)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
            A Virtual Incubator <span className="bg-gradient-primary bg-clip-text text-transparent">Without Founders</span>
          </h2>
          <p className="text-lg text-white/70 text-center max-w-[700px] mx-auto mb-20 leading-relaxed">
            Kick Inn is a founderless, modular venture engine. It turns real-world insights into investable, exit-ready startups through AI orchestration, Executor networks, and tokenized capital.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🧩"
              title="Founderless"
              description="Problems come from the field, not pitch decks"
            />
            <FeatureCard
              icon="🪙"
              title="Tokenized"
              description="Executors earn and investors engage via liquid tokens"
            />
            <FeatureCard
              icon="⚙️"
              title="Governed by Code"
              description="No gatekeepers. Milestones and payouts are AI-verified"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Community Pillars */}
      <section 
        className="px-8 md:px-16 py-24 md:py-32 relative overflow-hidden"
        style={{ background: 'rgba(25, 74, 97, 0.5)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-20">
            Our Community Pillars
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <RoleCard
              icon="💡"
              title="Ideator"
              description="Submit problems you see every day. AI validates, Executors build. You earn 10% equity tokens."
              memberCount="5,200 members"
            />
            <RoleCard
              icon="🛠️"
              title="Executor"
              description="Build validated MVPs. Get matched by AI based on your skills. Earn 35% equity tokens for milestone delivery."
              memberCount="3,100 members"
            />
            <RoleCard
              icon="💰"
              title="Investor"
              description="Fund post-MVP ventures with traction. Receive 25% equity tokens. Exit in 12-36 months via acquisition or DEX."
              memberCount="1,500 members"
            />
            <RoleCard
              icon="🏢"
              title="Buyer"
              description="Acquire exit-ready digital ventures with proven traction. Access code, users, revenue. Full due diligence support."
              memberCount="200+ acquisitions"
            />
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section 
        className="px-8 md:px-16 py-24"
        style={{ background: 'rgba(15, 43, 56, 0.6)' }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-20">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <ProcessStep
              number="1"
              title="Submit"
              description="Real-world problems via voice, video, or text. AI validates market depth, urgency, uniqueness."
            />
            <ProcessStep
              number="2"
              title="Build"
              description="AI matches Executors to validated ideas. MVP built with smart contract milestones. No founder involvement."
            />
            <ProcessStep
              number="3"
              title="Fund & Exit"
              description="Investors fund post-MVP. Ventures exit in 12-36 months via acquisition or token trading. All stakeholders earn proportional payouts."
            />
          </div>
        </div>
      </section>

      {/* Section 5: Stats */}
      <section 
        className="px-8 md:px-16 py-24"
        style={{ 
          background: 'linear-gradient(135deg, hsla(150, 25%, 52%, 0.08), hsla(199, 60%, 34%, 0.08))' 
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-20">
            Why Kick Inn?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <StatCard number="12-36" label="Month Exits" />
            <StatCard number="78%" label="MVP Success Rate" />
            <StatCard number="10%" label="Ideator Share" />
            <StatCard number="$250K" label="Avg Funding" />
          </div>
        </div>
      </section>

      {/* Section 6: CTA Final */}
      <section 
        className="px-8 md:px-16 py-24"
        style={{ background: 'rgba(103, 159, 131, 0.12)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className="max-w-[900px] mx-auto rounded-3xl p-12 md:p-20 backdrop-blur-md"
            style={{
              background: 'rgba(103, 159, 131, 0.15)',
              border: '1px solid rgba(103, 159, 131, 0.3)'
            }}
          >
            <h2 className="text-3xl md:text-[44px] font-bold text-white text-center mb-6 leading-tight">
              Ready to turn ideas into ventures?
            </h2>
            <p className="text-lg text-white/80 text-center mb-10 leading-relaxed">
              Join Kick Inn today and start your journey from idea to successful venture.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register?role=ideator">
                <Button 
                  className="px-8 py-6 rounded-lg text-base font-medium text-white transition-all duration-300"
                  style={{ background: '#194a61' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#23698a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#194a61';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Submit an Idea
                </Button>
              </Link>
              <Link to="/register?role=executor">
                <Button 
                  className="px-8 py-6 rounded-lg text-base font-medium text-white transition-all duration-300"
                  style={{ background: '#679f83' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#86b39c';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#679f83';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Join as Executor
                </Button>
              </Link>
              <Link to="/register?role=investor">
                <Button 
                  className="px-8 py-6 rounded-lg text-base font-medium text-white transition-all duration-300"
                  style={{ background: '#23698a' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Explore Deals
                </Button>
              </Link>
              <Link to="/register?role=buyer">
                <Button 
                  className="px-8 py-6 rounded-lg text-base font-medium transition-all duration-300"
                  style={{ background: '#86b39c', color: '#0f2b38' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#679f83';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#86b39c';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Buy Your App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="px-8 md:px-16 py-16"
        style={{ 
          background: '#0f2b38',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Links */}
            <div className="flex flex-wrap gap-2 text-sm text-white/70">
              <Link to="/documentation" className="hover:text-white hover:opacity-100 transition-colors">Product</Link>
              <span>|</span>
              <Link to="/pricing" className="hover:text-white hover:opacity-100 transition-colors">Pricing</Link>
              <span>|</span>
              <Link to="/about" className="hover:text-white hover:opacity-100 transition-colors">About Us</Link>
              <span>|</span>
              <Link to="/contact" className="hover:text-white hover:opacity-100 transition-colors">Contact</Link>
              <span>|</span>
              <Link to="/documentation" className="hover:text-white hover:opacity-100 transition-colors">Resources</Link>
              <span>|</span>
              <Link to="/blog" className="hover:text-white hover:opacity-100 transition-colors">Blog</Link>
              <span>|</span>
              <Link to="/help" className="hover:text-white hover:opacity-100 transition-colors">Help Center</Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-white hover:opacity-100 transition-colors">Terms of Service</Link>
              <span>|</span>
              <Link to="/privacy" className="hover:text-white hover:opacity-100 transition-colors">Privacy Policy</Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-6 justify-start md:justify-end">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:opacity-100 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:opacity-100 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:opacity-100 transition-colors">
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-xs text-white/50">
            ©2024 Kick Inn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
