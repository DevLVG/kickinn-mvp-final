import { useState, useEffect } from "react";
import StaticPageHeader from "@/components/shared/StaticPageHeader";
import StaticPageFooter from "@/components/shared/StaticPageFooter";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "information-collect", label: "Information We Collect" },
    { id: "how-we-use", label: "How We Use Your Information" },
    { id: "data-sharing", label: "Data Sharing and Disclosure" },
    { id: "blockchain", label: "Blockchain Data" },
    { id: "cookies", label: "Cookies and Tracking" },
    { id: "security", label: "Data Security" },
    { id: "your-rights", label: "Your Rights (GDPR)" },
    { id: "children", label: "Children's Privacy" },
    { id: "international", label: "International Transfers" },
    { id: "changes", label: "Changes to This Policy" },
    { id: "contact", label: "Contact Us" }
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
            Privacy Policy
          </h1>
          <p className="text-base" style={{ color: '#6b7280' }}>
            Last updated: October 25, 2024
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
              {/* Section 1 */}
              <section id="introduction">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  1. Introduction
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  Kick Inn ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  By using Kick Inn, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Section 2 */}
              <section id="information-collect">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  2. Information We Collect
                </h2>
                
                <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#194a61' }}>
                  2.1 Personal Information
                </h3>
                <p className="text-base leading-relaxed mb-3" style={{ color: '#4b5563' }}>
                  We collect information that you provide directly:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Email address</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Name</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Wallet address</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>KYC documentation (for investors and buyers)</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Profile information</li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: '#194a61' }}>
                  2.2 Blockchain Data
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  All transactions and token distributions are recorded on the TON blockchain and are publicly accessible.
                </p>
              </section>

              {/* Section 3 */}
              <section id="how-we-use">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  3. How We Use Your Information
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Provide, operate, and maintain our platform</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Process transactions and send related information</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Verify your identity for KYC/AML compliance</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Send you technical notices and support messages</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Respond to your comments and questions</li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>Monitor and analyze usage and trends</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="blockchain">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  4. Blockchain Data
                </h2>
                <div 
                  className="rounded-lg p-5 mb-6"
                  style={{
                    background: 'rgba(251, 146, 60, 0.1)',
                    borderLeft: '4px solid #fb923c'
                  }}
                >
                  <p className="text-sm font-medium flex items-start gap-2" style={{ color: '#92400e' }}>
                    <span className="text-lg">⚠️</span>
                    <strong>Important:</strong> Blockchain data is immutable and permanent. Once recorded, it cannot be deleted.
                  </p>
                </div>
                <p className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                  All venture transactions, token allocations, and smart contract interactions are permanently recorded on the TON blockchain. This data is publicly accessible and cannot be modified or removed.
                </p>
              </section>

              {/* Section 5 */}
              <section id="your-rights">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  8. Your Rights (GDPR)
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  If you are in the European Economic Area (EEA), you have certain data protection rights:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Right to Access:</strong> Request copies of your personal data
                  </li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Right to Rectification:</strong> Request correction of inaccurate data
                  </li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Right to Erasure:</strong> Request deletion of your data
                  </li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Right to Restrict Processing:</strong> Request limited use of your data
                  </li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Right to Data Portability:</strong> Request transfer of your data
                  </li>
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Right to Object:</strong> Object to processing of your data
                  </li>
                </ul>
                <p className="text-base leading-relaxed mt-6" style={{ color: '#4b5563' }}>
                  To exercise these rights, contact us at <a href="mailto:privacy@kickinn.io" className="underline" style={{ color: '#679f83' }}>privacy@kickinn.io</a>
                </p>
              </section>

              {/* Section 12 */}
              <section id="contact">
                <h2 className="text-3xl font-bold pb-3 mb-6" style={{ color: '#194a61', borderBottom: '2px solid #e5e7eb' }}>
                  12. Contact Us
                </h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4b5563' }}>
                  For questions about this Privacy Policy:
                </p>
                <ul className="list-none space-y-2">
                  <li className="text-base leading-relaxed" style={{ color: '#4b5563' }}>
                    <strong>Email:</strong> <a href="mailto:privacy@kickinn.io" className="underline" style={{ color: '#679f83' }}>privacy@kickinn.io</a>
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

export default PrivacyPolicy;
