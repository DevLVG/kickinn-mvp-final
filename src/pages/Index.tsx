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
        className="min-h-screen px-4 md:px-8 lg:px-16 pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden"
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
                className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-tight"
              >
                Turn Ideas Into Funded Ventures. <span className="bg-gradient-to-r from-[#679f83] to-[#86b39c] bg-clip-text text-transparent">No Founder Needed.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl"
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
                    <CheckCircle className="h-5 w-5 text-[#10b981] flex-shrink-0" />
                    <feature.icon className="h-5 w-5 text-[#679f83] flex-shrink-0" />
                    <span className="text-white/90">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Dual CTAs */}
              <motion.div 
                className="flex flex-col md:flex-row gap-3 md:gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link to="/register?role=ideator" className="w-full md:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Button 
                      size="lg"
                      className="w-full md:w-auto text-sm md:text-base font-medium px-8 py-6 text-white bg-gradient-to-r from-[#679f83] to-[#23698a] hover:-translate-y-0.5 transition-all"
                      style={{ 
                        boxShadow: '0 8px 24px rgba(103, 159, 131, 0.3)'
                      }}
                    >
                      Submit Your Idea Free
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/register?role=executor" className="w-full md:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <Button 
                      size="lg"
                      variant="ghost"
                      className="w-full md:w-auto text-sm md:text-base font-medium px-8 py-6 text-white border-2 border-white/30 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
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
            <div className="hidden md:flex justify-center md:justify-end">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section 
        className="px-4 md:px-8 lg:px-16 py-8 md:py-12"
        style={{ background: 'rgba(15, 43, 56, 0.8)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <CheckCircle className="h-10 w-10 text-[#10b981] mb-3" />
              <div className="text-3xl font-bold text-white mb-1">2,400+</div>
              <div className="text-white/80">Ideas Validated</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <DollarSign className="h-10 w-10 text-[#679f83] mb-3" />
              <div className="text-3xl font-bold text-white mb-1">$12M+</div>
              <div className="text-white/80">Funded</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <TrendingUp className="h-10 w-10 text-[#60a5fa] mb-3" />
              <div className="text-3xl font-bold text-white mb-1">180</div>
              <div className="text-white/80">Exits Completed</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Kick Inn Beats Traditional VC */}
      <section 
        className="px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32"
        style={{ background: '#f5f7f8' }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#194a61' }}>
              Why Kick Inn Beats Traditional VC
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
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
                className="text-base font-medium px-8 py-6 text-white bg-gradient-to-r from-[#679f83] to-[#23698a] hover:-translate-y-0.5 transition-all"
              >
                See the Difference
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section 
        className="px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'rgba(25, 74, 97, 0.5)' }}
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
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              How Kick Inn Works
            </h2>
            <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              From idea to exit-ready venture in 4 automated stages
            </p>
          </motion.div>
          
          {/* Process Timeline - Desktop */}
          <div className="hidden lg:flex gap-8 mb-12 md:mb-16 relative">
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

          {/* Process Timeline - Mobile/Tablet */}
          <div className="lg:hidden space-y-6 md:space-y-8 mb-12 md:mb-16">
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
            className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 md:gap-4"
          >
            <Link to="/register?role=ideator" className="w-full md:w-auto">
              <Button 
                size="lg"
                className="w-full md:w-auto text-sm md:text-base font-medium px-6 md:px-8 py-5 md:py-6 text-white bg-gradient-to-r from-[#679f83] to-[#23698a] hover:-translate-y-0.5 transition-all"
                style={{ 
                  boxShadow: '0 8px 24px rgba(103, 159, 131, 0.3)'
                }}
              >
                Start Your Idea
              </Button>
            </Link>
            <Link to="/register?role=executor" className="w-full md:w-auto">
              <Button 
                size="lg"
                className="w-full md:w-auto text-sm md:text-base font-medium px-6 md:px-8 py-5 md:py-6 text-white border-2 border-white bg-transparent hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              >
                Browse Opportunities
              </Button>
            </Link>
            <Link to="/exits" className="text-white/80 hover:text-white transition-colors text-sm font-medium group mt-2 md:mt-0">
              See Exit Success Stories 
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Join Our Marketplace */}
      <section 
        className="px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'rgba(15, 43, 56, 0.6)' }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Join 10,000+ Members Building the Future
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
              badge="Hiring Now"
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

      {/* Section 5: FAQ */}
      <section 
        className="px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'rgba(103, 159, 131, 0.08)' }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#194a61' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#194a61', opacity: 0.8 }}>
              Everything you need to know about turning your idea into a funded venture
            </p>
          </motion.div>
          
          <div className="space-y-0">
            <FAQItem
              question="Do I need to be technical to submit an idea?"
              answer="No technical skills required. Our AI validates your concept and matches it with experienced Executors who handle all the building. You just need a real problem worth solving."
              index={0}
            />
            <FAQItem
              question="How long does the validation process take?"
              answer="AI validation completes in 48 hours. You'll receive a detailed scorecard on market fit, urgency, and uniqueness. If approved, Executor matching begins immediately."
              index={1}
            />
            <FAQItem
              question="What equity do I keep as an Ideator?"
              answer="Ideators receive 10% equity tokens. Executors get 35%, Investors 25%, and the platform retains 30% for operations and liquidity. All allocations are tokenized and transparent."
              index={2}
            />
            <FAQItem
              question="When can I exit my investment?"
              answer="Target exit window is 12-36 months via acquisition or secondary token trading. Investors receive liquidity through DEX listings or strategic buyer acquisitions."
              index={3}
            />
            <FAQItem
              question="What happens if the MVP fails?"
              answer="Executors are only paid for completed milestones via smart contracts. Investors fund post-MVP with traction, reducing early-stage risk. Our 78% success rate ensures quality validation."
              index={4}
            />
          </div>
        </div>
      </section>

      {/* Section 6: CTA Final */}
      <section 
        className="px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32"
        style={{ background: 'rgba(103, 159, 131, 0.12)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className="max-w-[900px] mx-auto rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-20 bg-white/5 backdrop-blur-md border border-[#679f83]/20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-6 leading-tight" style={{ color: '#194a61' }}>
              Ready to turn ideas into ventures?
            </h2>
            <p className="text-base md:text-lg text-center mb-8 md:mb-10 leading-relaxed" style={{ color: '#194a61', opacity: 0.85 }}>
              Join Kick Inn today and start your journey from idea to successful venture.
            </p>
            
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 md:gap-4">
              <Link to="/register?role=ideator" className="w-full md:w-auto">
                <Button 
                  className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6 rounded-lg text-sm md:text-base font-medium text-white bg-gradient-to-r from-[#679f83] to-[#23698a] hover:-translate-y-0.5 transition-all duration-300"
                  aria-label="Submit your business idea to Kick Inn"
                >
                  Submit an Idea
                </Button>
              </Link>
              <Link to="/register?role=executor" className="w-full md:w-auto">
                <Button 
                  className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6 rounded-lg text-sm md:text-base font-medium border-2 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ 
                    color: '#194a61',
                    borderColor: '#194a61',
                    background: 'transparent'
                  }}
                  aria-label="Join Kick Inn as an Executor to build MVPs"
                >
                  Join as Executor
                </Button>
              </Link>
              <Link to="/register?role=investor" className="w-full md:w-auto">
                <Button 
                  className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6 rounded-lg text-sm md:text-base font-medium border-2 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ 
                    color: '#194a61',
                    borderColor: '#194a61',
                    background: 'transparent'
                  }}
                  aria-label="Explore investment deals on Kick Inn"
                >
                  Explore Deals
                </Button>
              </Link>
              <Link to="/exits" className="w-full md:w-auto flex items-center">
                <Button 
                  variant="ghost"
                  className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6 rounded-lg text-sm md:text-base font-medium hover:-translate-y-0.5 transition-all duration-300"
                  style={{ color: '#679f83' }}
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
        className="px-4 md:px-8 lg:px-16 py-12 md:py-16"
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
