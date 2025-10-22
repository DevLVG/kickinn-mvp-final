import { Button } from "@/components/ui/button";
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
          background: 'linear-gradient(135deg, hsl(199, 55%, 14%) 0%, hsl(199, 55%, 24%) 50%, hsl(199, 55%, 14%) 100%)',
        }}
      >
        {/* Radial accent overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 50%, hsla(150, 25%, 52%, 0.15), transparent 50%)'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Logo */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white">KICK INN</h2>
          </div>
          
          {/* Hero Grid */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-[56px] font-bold text-white leading-tight">
                Where Ideas Kick In
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                From problem to prototype. From insight to investability.
              </p>
              <Button 
                className="bg-gradient-primary text-white px-8 py-6 rounded-lg text-base font-medium hover:-translate-y-0.5 transition-all duration-300"
                style={{ boxShadow: '0 8px 24px hsla(150, 25%, 52%, 0.3)' }}
              >
                Explore Platform
              </Button>
            </div>
            
            {/* Right Column */}
            <div>
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What is Kick Inn */}
      <section 
        className="px-8 md:px-16 py-24"
        style={{ background: 'hsla(199, 55%, 14%, 0.5)' }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
            A Virtual Incubator Without Founders
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
        className="px-8 md:px-16 py-24"
        style={{ background: 'hsla(199, 55%, 24%, 0.5)' }}
      >
        <div className="max-w-7xl mx-auto">
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
        style={{ background: 'hsla(199, 55%, 14%, 0.6)' }}
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
        style={{ background: 'hsla(150, 25%, 52%, 0.12)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className="max-w-4xl mx-auto rounded-3xl p-12 md:p-20 backdrop-blur-md"
            style={{
              background: 'hsla(150, 25%, 52%, 0.15)',
              border: '1px solid hsla(150, 25%, 52%, 0.3)'
            }}
          >
            <h2 className="text-3xl md:text-[44px] font-bold text-white text-center mb-6 leading-tight">
              Ready to turn ideas into ventures?
            </h2>
            <p className="text-lg text-white/80 text-center mb-10 leading-relaxed">
              Join Kick Inn today and start your journey from idea to successful venture.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-primary-dark hover:bg-accent-blue text-white px-8 py-6 rounded-lg text-base font-medium transition-all duration-300 hover:-translate-y-0.5">
                Submit an Idea
              </Button>
              <Button className="bg-secondary-teal hover:bg-light-teal text-white px-8 py-6 rounded-lg text-base font-medium transition-all duration-300 hover:-translate-y-0.5">
                Join as Executor
              </Button>
              <Button className="bg-accent-blue hover:opacity-90 text-white px-8 py-6 rounded-lg text-base font-medium transition-all duration-300 hover:-translate-y-0.5">
                Explore Deals
              </Button>
              <Button className="bg-light-teal hover:bg-secondary-teal text-dark-navy px-8 py-6 rounded-lg text-base font-medium transition-all duration-300 hover:-translate-y-0.5">
                Buy Your App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="px-8 md:px-16 py-16"
        style={{ 
          background: 'hsl(199, 55%, 14%)',
          borderTop: '1px solid hsla(255, 255%, 255%, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Links */}
            <div className="flex flex-wrap gap-2 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">Product</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">About Us</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Resources</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-6 justify-start md:justify-end">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
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
