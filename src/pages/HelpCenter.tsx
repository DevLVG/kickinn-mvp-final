import { useState } from "react";
import StaticPageHeader from "@/components/shared/StaticPageHeader";
import StaticPageFooter from "@/components/shared/StaticPageFooter";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      icon: "🚀",
      title: "Getting Started",
      description: "Everything you need to start on Kick Inn",
      articles: 15
    },
    {
      icon: "💡",
      title: "For Ideators",
      description: "Submit ideas and track ventures",
      articles: 12
    },
    {
      icon: "🛠️",
      title: "For Executors",
      description: "Find opportunities and deliver milestones",
      articles: 18
    },
    {
      icon: "💰",
      title: "For Investors",
      description: "Invest in ventures and manage portfolio",
      articles: 14
    },
    {
      icon: "🏢",
      title: "For Buyers",
      description: "Acquire exit-ready ventures",
      articles: 10
    },
    {
      icon: "🪙",
      title: "Tokens & Payments",
      description: "Understanding tokenomics and transactions",
      articles: 16
    },
    {
      icon: "🔐",
      title: "Account & Security",
      description: "Account settings, KYC, and security",
      articles: 11
    },
    {
      icon: "🔧",
      title: "Technical Support",
      description: "Troubleshooting and technical issues",
      articles: 9
    }
  ];

  const faqs = [
    {
      question: "What is Kick Inn?",
      answer: "Kick Inn is a blockchain-powered platform that transforms real-world problems into investable micro-ventures through AI orchestration, Executor networks, and tokenized capital structures."
    },
    {
      question: "How do I get started?",
      answer: "Simply create an account, choose your role (Ideator, Executor, Investor, or Buyer), connect your TON wallet, and start exploring opportunities in your chosen role."
    },
    {
      question: "What are the different user roles?",
      answer: "Kick Inn has four main roles: Ideators who submit problems, Executors who build solutions, Investors who fund ventures, and Buyers who acquire exit-ready ventures."
    },
    {
      question: "How does token distribution work?",
      answer: "Tokens are distributed proportionally to all stakeholders based on their contribution. Ideators, Executors, and Investors each receive allocated tokens that vest over time according to predefined schedules."
    },
    {
      question: "What is the vesting schedule?",
      answer: "Vesting schedules vary by role and venture. Typically, Executor tokens vest over 6-12 months with milestone-based unlocks, while Ideator tokens vest over 12-24 months with quarterly releases."
    },
    {
      question: "How do I invest in a venture?",
      answer: "Browse the Deals page, review venture details and due diligence materials, complete KYC verification if you haven't already, and commit funds through your connected wallet."
    },
    {
      question: "What is KYC and who needs it?",
      answer: "KYC (Know Your Customer) is identity verification required for Investors and Buyers to comply with financial regulations. The process takes 24-48 hours and requires government ID and proof of address."
    },
    {
      question: "How do I claim my tokens?",
      answer: "Navigate to your Earnings dashboard, view vested tokens, connect your TON wallet if not already connected, and click 'Claim' to transfer vested tokens to your wallet."
    },
    {
      question: "What blockchain does Kick Inn use?",
      answer: "Kick Inn is built on the TON (The Open Network) blockchain, chosen for its speed, low transaction costs, and advanced smart contract capabilities."
    },
    {
      question: "How do exits work?",
      answer: "Ventures can exit through two paths: acquisition by verified Buyers on our Exit Marketplace, or token redemption where Investors can sell back tokens to the venture treasury at fair market value."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <StaticPageHeader />

      {/* Hero Section */}
      <section 
        className="w-full py-24 px-10"
        style={{
          background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            How Can We Help?
          </h1>

          {/* Search Bar */}
          <div 
            className="relative rounded-xl overflow-hidden shadow-xl"
            style={{ background: 'white' }}
          >
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6" style={{ color: '#6b7280' }} />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-5 px-16 text-base focus:outline-none"
              style={{ color: '#194a61' }}
            />
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            {["Getting Started", "Payments", "Tokens", "Account", "Security"].map((link) => (
              <button
                key={link}
                className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-100"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  opacity: 0.9
                }}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-20 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12" style={{ color: '#194a61' }}>
            Browse by Category
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/documentation"
                className="rounded-2xl p-8 transition-all hover:shadow-xl cursor-pointer"
                style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#194a61' }}>
                  {category.title}
                </h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: '#6b7280' }}>
                  {category.description}
                </p>
                <p className="text-sm font-medium flex items-center gap-1" style={{ color: '#679f83' }}>
                  📄 {category.articles} articles
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 px-10" style={{ background: '#f5f7f8' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#194a61' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="py-6"
                style={{ borderBottom: '1px solid #e5e7eb' }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left transition-colors hover:opacity-80"
                >
                  <h3 className="text-lg font-bold pr-4" style={{ color: '#194a61' }}>
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: '#679f83' }} />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: '#6b7280' }} />
                  )}
                </button>
                {expandedFaq === index && (
                  <p className="mt-4 text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="w-full py-16 px-10 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#194a61' }}>
            Still Need Help?
          </h2>
          <p className="text-base mb-8" style={{ color: '#6b7280' }}>
            Can't find what you're looking for? Our support team is ready to assist.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact">
              <button
                className="px-8 py-4 rounded-lg font-bold text-base text-white transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #679f83, #23698a)'
                }}
              >
                Contact Support
              </button>
            </Link>
            <a href="mailto:support@kickinn.io">
              <button
                className="px-8 py-4 rounded-lg font-bold text-base transition-all hover:bg-gray-50"
                style={{
                  border: '1px solid #d1d5db',
                  color: '#194a61'
                }}
              >
                Email Us
              </button>
            </a>
          </div>
        </div>
      </section>

      <StaticPageFooter />
    </div>
  );
};

export default HelpCenter;
