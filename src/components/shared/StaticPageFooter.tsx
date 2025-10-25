import { Link } from "react-router-dom";

const StaticPageFooter = () => {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "How It Works", path: "/documentation" },
        { label: "Documentation", path: "/documentation" },
        { label: "Help Center", path: "/help" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" }
      ]
    }
  ];

  return (
    <footer className="w-full pt-16 pb-10 px-10" style={{ background: '#0f2b38', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">KICK INN</h3>
            <p className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Where Ideas Kick In
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Transforming real-world problems into investable micro-ventures through AI orchestration and tokenized capital.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-base font-bold text-white mb-4">{section.title}</h4>
              <div className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            © 2024 Kick Inn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StaticPageFooter;
