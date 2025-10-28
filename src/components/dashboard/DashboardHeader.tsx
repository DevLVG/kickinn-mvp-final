import { Link } from "react-router-dom";
import RoleSwitcher from "./RoleSwitcher";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";
import kickInnLogo from "@/assets/kick-inn-logo.png";

interface DashboardHeaderProps {
  activeRole: 'ideator' | 'executor' | 'investor' | 'buyer';
  userRoles: string[];
  onRoleChange: (role: 'ideator' | 'executor' | 'investor' | 'buyer') => void;
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

const DashboardHeader = ({ activeRole, userRoles, onRoleChange, user }: DashboardHeaderProps) => {
  return (
    <header 
      className="h-[72px] bg-white flex items-center justify-between px-6"
      style={{ 
        borderBottom: '1px solid rgba(103, 159, 131, 0.1)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Left: Logo */}
      <Link to="/dashboard" className="flex items-center">
        <img 
          src={kickInnLogo} 
          alt="Kick Inn Logo" 
          className="h-8 w-auto hover:opacity-90 transition-opacity"
        />
      </Link>

      {/* Right: Role Switcher, Notifications, Profile */}
      <div className="flex items-center gap-4">
        <RoleSwitcher 
          activeRole={activeRole}
          userRoles={userRoles}
          onRoleChange={onRoleChange}
        />
        
        <NotificationBell />
        
        <ProfileMenu user={user} />
      </div>
    </header>
  );
};

export default DashboardHeader;