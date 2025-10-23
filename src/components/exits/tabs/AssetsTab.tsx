import { Code, Globe, Palette, Database, Server, CheckCircle } from "lucide-react";

interface AssetsTabProps {
  venture: any;
}

const AssetsTab = ({ venture }: AssetsTabProps) => {
  const technicalAssets = [
    "Full source code (GitHub repository with 2+ years of commit history)",
    "Database schemas & migrations (PostgreSQL, fully documented)",
    "API documentation (Postman collections, OpenAPI specs)",
    "CI/CD pipelines configured (GitHub Actions, automated testing)",
    "Unit & integration tests (82% code coverage)",
    "Production environment access (AWS, full admin)",
    "Staging environment (mirrors production)",
    "Developer documentation (comprehensive setup guides)"
  ];

  const techStack = [
    { category: "Frontend", tech: "React, TypeScript, Tailwind CSS" },
    { category: "Backend", tech: "Node.js, Express, PostgreSQL" },
    { category: "Infrastructure", tech: "AWS (EC2, S3, RDS, CloudFront)" },
    { category: "Other", tech: "Stripe, SendGrid, Auth0, Redis" }
  ];

  const digitalAssets = [
    { icon: "🌐", label: "Domain name", details: "ventureapp.com (expires 2027)" },
    { icon: "📱", label: "iOS App", details: "Published on App Store" },
    { icon: "📱", label: "Android App", details: "Published on Google Play" },
    { icon: "📧", label: "Email list", details: "8,500 subscribers (opt-in)" },
    { icon: "🎨", label: "Design system", details: "Complete Figma files" },
    { icon: "📝", label: "Content library", details: "240+ blog posts, SEO optimized" },
    { icon: "📊", label: "Analytics setup", details: "GA4, Mixpanel configured" },
    { icon: "🔐", label: "SSL certificates", details: "Valid through 2026" }
  ];

  const brandAssets = [
    "Logo files (SVG, PNG, all variations)",
    "Brand guidelines PDF (colors, typography, usage)",
    "Marketing templates (email, social, ads)",
    "Social media graphics library",
    "Presentation decks (investor, customer)",
    "Video assets (product demos, testimonials)",
    "Trademark registration (approved)"
  ];

  return (
    <div className="space-y-8">
      {/* Technical Assets */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-[#679f83]" />
          <h2 className="text-2xl font-bold text-white">Technology Stack & Code</h2>
        </div>
        
        <div className="space-y-3 mb-8">
          {technicalAssets.map((asset, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p className="text-white/80">{asset}</p>
            </div>
          ))}
        </div>

        <div className="bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.2)] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Tech Stack Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {techStack.map((item, index) => (
              <div key={index}>
                <p className="text-sm text-[#679f83] font-medium mb-1">{item.category}</p>
                <p className="text-white/80">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Digital Assets */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-[#679f83]" />
          <h2 className="text-2xl font-bold text-white">Digital Properties & Marketing Assets</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {digitalAssets.map((asset, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl">{asset.icon}</span>
              <div>
                <p className="text-white font-medium mb-1">{asset.label}</p>
                <p className="text-sm text-white/60">{asset.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Assets */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-[#679f83]" />
          <h2 className="text-2xl font-bold text-white">Brand & Intellectual Property</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3">
          {brandAssets.map((asset, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#4ade80] flex-shrink-0 mt-0.5" />
              <p className="text-white/80">{asset}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Data */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-6 h-6 text-[#679f83]" />
          <h2 className="text-2xl font-bold text-white">User Database & Analytics</h2>
        </div>
        
        <div className="bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.2)] rounded-xl p-6 mb-4">
          <p className="text-sm text-white/60 mb-4">
            Note: Transferred post-acquisition with proper user consent
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[#679f83] mb-1">Total user accounts</p>
              <p className="text-2xl font-bold text-white">12,847</p>
            </div>
            <div>
              <p className="text-sm text-[#679f83] mb-1">Email contacts</p>
              <p className="text-2xl font-bold text-white">10,234 (opt-in)</p>
            </div>
            <div>
              <p className="text-sm text-[#679f83] mb-1">Historical usage data</p>
              <p className="text-lg text-white">18 months</p>
            </div>
            <div>
              <p className="text-sm text-[#679f83] mb-1">GDPR compliant</p>
              <p className="text-lg text-[#4ade80] flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Yes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure */}
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Server className="w-6 h-6 text-[#679f83]" />
          <h2 className="text-2xl font-bold text-white">Hosting & Infrastructure</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-[#679f83] mb-2">Hosting Provider</p>
            <p className="text-white font-medium">AWS</p>
          </div>
          <div>
            <p className="text-sm text-[#679f83] mb-2">Monthly Cost</p>
            <p className="text-white font-medium">$890</p>
          </div>
          <div>
            <p className="text-sm text-[#679f83] mb-2">Server Locations</p>
            <p className="text-white font-medium">US-East, EU-West</p>
          </div>
          <div>
            <p className="text-sm text-[#679f83] mb-2">CDN</p>
            <p className="text-white font-medium">Cloudflare</p>
          </div>
          <div>
            <p className="text-sm text-[#679f83] mb-2">Monitoring</p>
            <p className="text-white font-medium">Datadog</p>
          </div>
          <div>
            <p className="text-sm text-[#679f83] mb-2">Uptime (12mo)</p>
            <p className="text-[#4ade80] font-bold">99.7%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsTab;
