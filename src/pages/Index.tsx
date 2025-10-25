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
import FAQItem from "@/components/FAQItem";
import ComparisonCard from "@/components/ComparisonCard";
import { Twitter, Linkedin, Send, Zap, Users, TrendingUp, CheckCircle, DollarSign, MessageSquarePlus, Code, Target, Lightbulb, Wrench, Building2, UserX, Lock, Coins, Cpu } from "lucide-react";

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

      {/* Section 2: Why Kick Inn Beats Traditional VC */}
      <section 
        className="px-8 md:px-16 py-24 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Kick Inn Beats Traditional VC
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <ComparisonCard
              title="No Founder Bottleneck"
              oldWay="Need charismatic founder + pitch deck"
              kickInnWay="AI validates problem, Executors build"
              oldIcon={UserX}
              newIcon={Users}
              index={0}
            />
            <ComparisonCard
              title="Liquid Equity Day 1"
              oldWay="7-10 year lock-up, illiquid"
              kickInnWay="Tokenized equity, exit in 12-36mo"
              oldIcon={Lock}
              newIcon={Coins}
              index={1}
            />
            <ComparisonCard
              title="Smart Contract Governance"
              oldWay="Board politics, manual oversight"
              kickInnWay="Automated milestones, AI-verified"
              oldIcon={Users}
              newIcon={Cpu}
              index={2}
            />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/about">
              <Button 
                size="lg"
                variant="outline"
                className="text-base font-medium px-8 py-6 text-slate-900 border-2 border-slate-900 hover:bg-slate-100"
              >
                See the Difference
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section 
        className="px-8 md:px-16 py-24 md:py-32 relative overflow-hidden"
        style={{ background: 'rgba(25, 74, 97, 0.5)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Join 10,000+ Members Building the Future
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard
              icon={Lightbulb}
              title="Ideator"
              description="Submit ideas, earn equity tokens"
              memberCount="5.2K members"
              ctaText="Submit Your Idea"
              ctaLink="/register?role=ideator"
              index={0}
            />
            <RoleCard
              icon={Wrench}
              title="Executor"
              description="Build MVPs, get paid on-chain"
              memberCount="3.1K members"
              badge="🔥 Hiring"
              ctaText="Browse Projects"
              ctaLink="/register?role=executor"
              index={1}
            />
            <RoleCard
              icon={TrendingUp}
              title="Investor"
              description="Fund ventures, exit in 12-36mo"
              memberCount="1.8K members"
              ctaText="See Deals"
              ctaLink="/register?role=investor"
              index={2}
            />
            <RoleCard
              icon={Building2}
              title="Buyer"
              description="Acquire revenue-ready businesses"
              memberCount="200+ acquisitions"
              ctaText="View Exits"
              ctaLink="/register?role=buyer"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section 
        className="px-8 md:px-16 py-24 relative overflow-hidden"
        style={{ background: 'rgba(15, 43, 56, 0.6)' }}
        aria-label="Platform process timeline"
      >
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `linear-gradient(#679f83 1px, transparent 1px),
                             linear-gradient(90deg, #679f83 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How Kick Inn Works
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              From idea to exit-ready venture in 4 automated stages
            </p>
          </motion.div>
          
          {/* Process Timeline - Desktop */}
          <div className="hidden md:flex gap-8 mb-16 relative">
            <ProcessStep
              icon={MessageSquarePlus}
              iconColor="#14b8a6"
              title="Submit Your Idea"
              description="Answer 5 questions. Our AI validates market fit in 48 hours."
              microStat="2.4K ideas submitted/month"
              index={0}
            />
            <ProcessStep
              icon={Code}
              iconColor="#10b981"
              title="Executors Build MVP"
              description="Vetted builders compete to develop your prototype on-chain equity."
              microStat="Avg. 90 days to launch"
              index={1}
            />
            <ProcessStep
              icon={TrendingUp}
              iconColor="#3b82f6"
              title="Investors Back It"
              description="Liquid token deals with transparent terms. No pitch deck needed."
              microStat="$250K avg. seed round"
              index={2}
            />
            <ProcessStep
              icon={Target}
              iconColor="#a855f7"
              title="Buyers Acquire"
              description="Revenue-ready businesses with clear due diligence. Exit in 18mo avg."
              microStat="180 exits completed"
              index={3}
              isLast
            />
          </div>

          {/* Process Timeline - Mobile */}
          <div className="md:hidden space-y-8 mb-16">
            <ProcessStep
              icon={MessageSquarePlus}
              iconColor="#14b8a6"
              title="Submit Your Idea"
              description="Answer 5 questions. Our AI validates market fit in 48 hours."
              microStat="2.4K ideas submitted/month"
              index={0}
              isLast
            />
            <ProcessStep
              icon={Code}
              iconColor="#10b981"
              title="Executors Build MVP"
              description="Vetted builders compete to develop your prototype on-chain equity."
              microStat="Avg. 90 days to launch"
              index={1}
              isLast
            />
            <ProcessStep
              icon={TrendingUp}
              iconColor="#3b82f6"
              title="Investors Back It"
              description="Liquid token deals with transparent terms. No pitch deck needed."
              microStat="$250K avg. seed round"
              index={2}
              isLast
            />
            <ProcessStep
              icon={Target}
              iconColor="#a855f7"
              title="Buyers Acquire"
              description="Revenue-ready businesses with clear due diligence. Exit in 18mo avg."
              microStat="180 exits completed"
              index={3}
              isLast
            />
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-4"
          >
            <Link to="/register?role=ideator">
              <Button 
                size="lg"
                className="text-base font-medium px-8 py-6 text-white"
                style={{ 
                  background: 'linear-gradient(to right, #10b981, #14b8a6)',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                }}
              >
                Start Your Idea
              </Button>
            </Link>
            <Link to="/register?role=executor">
              <Button 
                size="lg"
                variant="outline"
                className="text-base font-medium px-8 py-6 text-white border-2 border-white bg-transparent hover:bg-white/10"
              >
                Browse Opportunities
              </Button>
            </Link>
            <Link to="/exits" className="text-white/80 hover:text-white transition-colors text-sm font-medium group">
              See Exit Success Stories 
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Join Our Marketplace */}
      <section 
        className="px-8 md:px-16 py-24"
        style={{ background: 'linear-gradient(to bottom right, #0f172a, #134e4a)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className="max-w-[900px] mx-auto rounded-3xl p-12 md:p-20 backdrop-blur-md border border-white/10"
          >
            <h2 className="text-3xl md:text-[44px] font-bold text-white text-center mb-6 leading-tight">
              Ready to turn ideas into ventures?
            </h2>
            <p className="text-lg text-slate-300 text-center mb-10 leading-relaxed">
              Join Kick Inn today and start your journey from idea to successful venture.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register?role=ideator">
                <Button 
                  className="px-8 py-6 rounded-lg text-base font-medium text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-300"
                  aria-label="Submit your business idea to Kick Inn"
                >
                  Submit an Idea
                </Button>
              </Link>
              <Link to="/register?role=executor">
                <Button 
                  variant="outline"
                  className="px-8 py-6 rounded-lg text-base font-medium text-white border-2 border-white bg-transparent hover:bg-white/10 transition-all duration-300"
                  aria-label="Join Kick Inn as an Executor to build MVPs"
                >
                  Join as Executor
                </Button>
              </Link>
              <Link to="/register?role=investor">
                <Button 
                  variant="outline"
                  className="px-8 py-6 rounded-lg text-base font-medium text-white border-2 border-white bg-transparent hover:bg-white/10 transition-all duration-300"
                  aria-label="Explore investment deals on Kick Inn"
                >
                  Explore Deals
                </Button>
              </Link>
              <Link to="/exits" className="flex items-center">
                <Button 
                  variant="ghost"
                  className="px-8 py-6 rounded-lg text-base font-medium text-emerald-300 hover:text-emerald-200 transition-all duration-300"
                  aria-label="Browse available acquisitions on Kick Inn"
                >
                  Browse Acquisitions
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
