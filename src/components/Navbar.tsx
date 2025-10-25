import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h2 
              className="text-2xl font-bold text-white tracking-wider hover:opacity-90 transition-opacity" 
              style={{ textShadow: '0 0 30px rgba(103, 159, 131, 0.5)' }}
            >
              KICK INN
            </h2>
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/how-it-works" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              Success Stories
            </Link>
            <Link 
              to="/pricing" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
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
                className="text-sm font-medium px-6 text-white"
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
