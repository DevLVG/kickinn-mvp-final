import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import kickInnLogo from "@/assets/kick-inn-logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#0f2b38]/95 backdrop-blur-md shadow-lg border-b border-white/10" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={kickInnLogo} 
              alt="Kick Inn Logo" 
              className="h-8 md:h-10 w-auto hover:opacity-90 transition-opacity"
              style={{ filter: 'drop-shadow(0 0 20px rgba(103, 159, 131, 0.4))' }}
            />
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/how-it-works" 
              className="text-slate-50 hover:text-[#86efac] transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="text-slate-50 hover:text-[#86efac] transition-colors text-sm font-medium"
            >
              Success Stories
            </Link>
            <Link 
              to="/pricing" 
              className="text-slate-50 hover:text-[#86efac] transition-colors text-sm font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 text-sm"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                className="px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(103,159,131,0.4)] focus:ring-2 focus:ring-offset-2 focus:ring-[#679f83]"
                style={{ 
                  background: 'linear-gradient(135deg, #679f83, #4ade80)'
                }}
              >
                Start Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-white/10 mt-4">
                <Link 
                  to="/how-it-works" 
                  className="block text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  to="/about" 
                  className="block text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Success Stories
                </Link>
                <Link 
                  to="/pricing" 
                  className="block text-white/80 hover:text-white transition-colors text-sm font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <div className="flex flex-col gap-3 pt-4">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className="w-full text-white hover:bg-white/10 text-sm"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      className="w-full text-sm font-medium text-white"
                      style={{ 
                        background: 'linear-gradient(to right, #679f83, #23698a)',
                        boxShadow: '0 4px 12px rgba(103, 159, 131, 0.3)'
                      }}
                    >
                      Start Free
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
