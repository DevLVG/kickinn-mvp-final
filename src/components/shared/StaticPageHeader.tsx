import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StaticPageHeader = () => {
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Documentation", path: "/documentation" },
    { label: "Help", path: "/help" },
    { label: "Contact", path: "/contact" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold" style={{ color: '#194a61' }}>
          KICK INN
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium transition-colors relative"
              style={{
                color: isActive(link.path) ? '#679f83' : '#6b7280',
                borderBottom: isActive(link.path) ? '2px solid #679f83' : 'none',
                paddingBottom: '4px'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link to="/register">
          <Button
            className="px-6 py-2 rounded-lg font-medium text-sm text-white transition-opacity hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #679f83, #23698a)'
            }}
          >
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default StaticPageHeader;
