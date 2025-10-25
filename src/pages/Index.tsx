import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroMockup from "@/components/HeroMockup";
import FeatureCard from "@/components/FeatureCard";
import RoleCard from "@/components/RoleCard";
import ProcessStep from "@/components/ProcessStep";
import StatCard from "@/components/StatCard";
import { Twitter, Linkedin, Send, Zap, Users, TrendingUp, CheckCircle, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <div className="w-full">
      <Navbar />

      {/* Section 1: Hero */}
      <section 
        className="min-h-screen px-8 md:px-16 pt-32 pb-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)',
        }}
      >
        {/* Radial accent overlay - reduced opacity */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 70% 20%, rgba(103, 159, 131, 0.08), transparent 60%)'
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

        {/* Hexagon decoration - top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-10 w-32 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #679f83, #23698a)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Grid - Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-[56px] font-bold text-white leading-tight"
              >
                Turn Ideas Into Funded Ventures. <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">No Founder Needed.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-white/80 leading-relaxed max-w-xl"
              >
                AI validates your concept. Executors build the MVP. Investors fund it. You keep equity.
              </motion.p>

              {/* Feature bullets */}
              <motion.div 
                className="space-y-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  { icon: Zap, text: "AI validation in 48 hours" },
                  { icon: Users, text: "500+ verified Executors ready to build" },
                  { icon: TrendingUp, text: "Avg. $250K seed funding" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <feature.icon className="h-5 w-5 text-teal-400 flex-shrink-0" />
                    <span className="text-white/90">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Dual CTAs */}
              <motion.div 
                className="flex flex-wrap gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link to="/register?role=ideator">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg"
                      className="text-base font-medium px-8 py-6 text-white"
                      style={{ 
                        background: 'linear-gradient(to right, #10b981, #14b8a6)',
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      Submit Your Idea Free
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/register?role=executor">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg"
                      variant="ghost"
                      className="text-base font-medium px-8 py-6 text-white border-2 border-white/30 hover:bg-white/10"
                    >
                      I'm an Executor
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                className="flex flex-wrap items-center gap-6 pt-6 opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.9 }}
              >
                <Badge variant="outline" className="text-white border-white/30 px-3 py-1">
                  Backed by Y Combinator
                </Badge>
                <Badge variant="outline" className="text-white border-white/30 px-3 py-1">
                  Featured in TechCrunch
                </Badge>
              </motion.div>
            </div>
            
            {/* Right Column - Dashboard Mockup */}
            <div className="flex justify-center md:justify-end">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section 
        className="px-8 md:px-16 py-12"
        style={{ background: 'rgba(15, 43, 56, 0.8)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <CheckCircle className="h-10 w-10 text-emerald-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">2,400+</div>
              <div className="text-white/70">Ideas Validated</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <DollarSign className="h-10 w-10 text-teal-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">$12M+</div>
              <div className="text-white/70">Funded</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <TrendingUp className="h-10 w-10 text-blue-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">180</div>
              <div className="text-white/70">Exits Completed</div>
            </motion.div>
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
