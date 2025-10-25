import { useState, useEffect } from "react";
import StaticPageHeader from "@/components/shared/StaticPageHeader";
import StaticPageFooter from "@/components/shared/StaticPageFooter";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "acceptance", label: "Acceptance of Terms" },
    { id: "eligibility", label: "Eligibility" },
    { id: "registration", label: "Account Registration" },
    { id: "user-roles", label: "User Roles and Responsibilities" },
    { id: "token-economics", label: "Token Economics" },
    { id: "prohibited", label: "Prohibited Activities" },
    { id: "disclaimers", label: "Disclaimers" },
    { id: "limitation", label: "Limitation of Liability" },
    { id: "contact", label: "Contact Information" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <StaticPageHeader />

      {/* Hero Section */}
      <section className="w-full py-20 px-10" style={{ background: '#f5f7f8' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#194a61' }}>
            Terms of Service
          </h1>
          <p className="text-base mb-2" style={{ color: '#6b7280' }}>
            Last updated: October 25, 2024
          </p>
          <p className="text-base" style={{ color: '#6b7280' }}>
            Effective: January 1, 2025
          </p>
        </div>
      </section>

      {/* Acceptance Banner */}
      <section className="w-full py-6 px-10 bg-white">
        <div 
          className="max-w-5xl mx-auto rounded-xl p-5"
          style={{
            background: 'rgba(96, 165, 250, 0.1)',
            border: '1px solid rgba(96, 165, 250, 0.3)'
          }}
        >
          <p className="text-sm font-medium flex items-start gap-2" style={{ color: '#1e40af' }}>
            <span className="text-lg">ℹ️</span>
            By accessing or using Kick Inn, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-16 px-10 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-10">
          {/* Table of Contents - Sidebar */}
          <aside 
            className="lg:col-span-1 rounded-xl p-6 h-fit lg:sticky lg:top-24"
            style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb'
            }}
          >
            <h3 className="text-base font-bold mb-5" style={{ color: '#194a61' }}>
              Table of Contents
            </h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="block text-sm text-left w-full py-1 transition-colors"
                  style={{
                    color: activeSection === section.id ? '#679f83' : '#6b7280',
                    fontWeight: activeSection === section.id ? '600' : '400'
                  }}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-3 max-w-4xl">
            <article className="prose prose-lg max-w-none space-y-12">
              {/* Section 2 */}
              <section id="eligibility">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  2. Eligibility
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  To use Kick Inn, you must:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Be at least 18 years old</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Have the legal capacity to enter into binding contracts</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Not be prohibited from using the platform under applicable laws</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Not be located in a restricted jurisdiction</li>
                </ul>
                <div 
                  className="rounded-lg p-5"
                  style={{
                    background: 'rgba(251, 146, 60, 0.1)',
                    borderLeft: '4px solid #fb923c'
                  }}
                >
                  <p className="text-sm font-medium flex items-start gap-2" style={{ color: '#92400e' }}>
                    <span className="text-lg">⚠️</span>
                    <strong>Restricted Jurisdictions:</strong> United States, China, North Korea, Iran, Syria, Cuba
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="user-roles">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  4. User Roles and Responsibilities
                </h2>
                
                <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#194a61' }}>
                  4.1 Ideators
                </h3>
                <p className="text-base leading-relaxed mb-3" style={{ color: '#4b5563' }}>
                  Ideators agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Submit original problems they have personally observed</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Provide accurate information in submissions</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Not submit copyrighted or confidential information</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Accept AI validation decisions</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#194a61' }}>
                  4.2 Executors
                </h3>
                <p className="text-base leading-relaxed mb-3" style={{ color: '#4b5563' }}>
                  Executors agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Accurately represent their skills and experience</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Deliver milestones on time and to specification</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Maintain confidentiality of venture information</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Comply with smart contract obligations</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#194a61' }}>
                  4.3 Investors
                </h3>
                <p className="text-base leading-relaxed mb-3" style={{ color: '#4b5563' }}>
                  Investors agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Complete KYC verification before investing</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Understand token economics and risks</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Accept investment decisions without recourse</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Comply with applicable securities laws</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#194a61' }}>
                  4.4 Buyers
                </h3>
                <p className="text-base leading-relaxed mb-3" style={{ color: '#4b5563' }}>
                  Buyers agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Complete KYC verification before making offers</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Honor acquisition commitments</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Accept assets "as-is" with provided due diligence</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Comply with transfer procedures</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="token-economics">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  6. Token Economics
                </h2>
                
                <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#194a61' }}>
                  6.1 Deal Tokens
                </h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Each venture issues its own utility token</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Tokens are subject to vesting schedules</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Token value may fluctuate</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Tokens can be traded on supported DEX platforms</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#194a61' }}>
                  6.2 No Investment Advice
                </h3>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  Kick Inn does not provide investment advice. All investment decisions are solely yours.
                </p>
                
                <div 
                  className="rounded-lg p-5"
                  style={{
                    background: 'rgba(251, 146, 60, 0.1)',
                    borderLeft: '4px solid #fb923c'
                  }}
                >
                  <p className="text-sm font-medium flex items-start gap-2" style={{ color: '#92400e' }}>
                    <span className="text-lg">⚠️</span>
                    <strong>Risk Warning:</strong> Tokens are highly speculative and may lose all value. Invest only what you can afford to lose.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="prohibited">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  10. Prohibited Activities
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  You may not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Use the platform for illegal purposes</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Submit false or misleading information</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Manipulate token prices</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Circumvent KYC requirements</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Reverse engineer smart contracts</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Use bots or automated tools</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Impersonate other users</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Share account credentials</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Violate intellectual property rights</li>
                </ul>
              </section>

              {/* Section 13 */}
              <section id="disclaimers">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  13. Disclaimers
                </h2>
                <p className="text-base leading-relaxed mb-4 uppercase font-bold" style={{ color: '#4b5563' }}>
                  THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. KICK INN DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  We do not guarantee:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Platform availability or uptime</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Success of any venture</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Token value or liquidity</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>AI validation accuracy</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Smart contract functionality</li>
                </ul>
              </section>

              {/* Section 14 */}
              <section id="limitation">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  14. Limitation of Liability
                </h2>
                <p className="text-base leading-relaxed mb-4 uppercase font-bold" style={{ color: '#4b5563' }}>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, KICK INN SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Indirect, incidental, or consequential damages</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Loss of profits, data, or goodwill</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Damages exceeding $100 USD</li>
                </ul>
              </section>

              {/* Section 20 */}
              <section id="contact">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  20. Contact Information
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  For questions about these Terms:
                </p>
                <ul className="list-none space-y-2">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Email:</strong> <a href="mailto:legal@kickinn.io" className="underline" style={{ color: '#679f83' }}>legal@kickinn.io</a>
                  </li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Address:</strong> [Company Address]
                  </li>
                </ul>
              </section>
            </article>
          </main>
        </div>
      </section>

      <StaticPageFooter />
    </div>
  );
};

export default TermsOfService;
