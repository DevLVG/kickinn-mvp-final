import { NavLink, useLocation } from "react-router-dom";
import { Lightbulb, FileText, Rocket, Wallet, Briefcase, TrendingUp, DollarSign, Award, Search, BarChart3, ShoppingCart, FileCheck, Building2, FileQuestion, Phone } from "lucide-react";

interface DashboardSidebarProps {
  activeRole: 'ideator' | 'executor' | 'investor' | 'buyer';
}

const navigationConfig = {
  ideator: [
    { title: "Submit Idea", url: "/submit-idea", icon: Lightbulb },
    { title: "My Ideas", url: "/ideas", icon: FileText },
    { title: "Active Ventures", url: "/ventures", icon: Rocket },
    { title: "Portfolio", url: "/portfolio", icon: Wallet },
  ],
  executor: [
    { title: "Opportunities", url: "/executor/opportunities", icon: Search },
    { title: "Active Projects", url: "/executor/active", icon: Briefcase },
    { title: "Earnings", url: "/executor/earnings", icon: DollarSign },
    { title: "Reputation", url: "/executor/reputation", icon: Award },
  ],
  investor: [
    { title: "Explore Deals", url: "/deals", icon: TrendingUp },
    { title: "Portfolio", url: "/portfolio", icon: Wallet },
    { title: "Exit Opportunities", url: "/exits", icon: BarChart3 },
  ],
  buyer: [
    { title: "Exit Marketplace", url: "/exits", icon: ShoppingCart },
    { title: "Active Offers", url: "/buyer/offers", icon: FileCheck },
    { title: "Acquired Ventures", url: "/buyer/acquired", icon: Building2 },
  ],
};

const DashboardSidebar = ({ activeRole }: DashboardSidebarProps) => {
  const location = useLocation();
  const navItems = navigationConfig[activeRole];

  const isActive = (url: string) => location.pathname === url;

  return (
    <aside 
      className="w-[280px] h-[calc(100vh-72px)] bg-white overflow-y-auto flex flex-col"
      style={{ 
        borderRight: '1px solid rgba(103, 159, 131, 0.1)'
      }}
    >
      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive: navIsActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${navIsActive || isActive(item.url)
                ? 'bg-gradient-to-r from-secondary-teal/10 to-accent-blue/10 border-l-3 border-secondary-teal font-semibold text-primary-dark'
                : 'text-primary-dark hover:bg-secondary-teal/5 hover:translate-x-0.5'
              }
            `}
          >
            <item.icon className="w-5 h-5 text-secondary-teal" />
            <span className="text-sm font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div 
        className="p-4 space-y-2 mt-auto"
        style={{ 
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          paddingTop: '1rem'
        }}
      >
        <NavLink
          to="/documentation"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-primary-dark transition-colors"
        >
          <FileQuestion className="w-4 h-4" />
          Documentation
        </NavLink>
        <NavLink
          to="/contact"
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-primary-dark transition-colors"
        >
          <Phone className="w-4 h-4" />
          Contact Support
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;