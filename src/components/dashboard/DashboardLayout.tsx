import { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  activeRole: 'ideator' | 'executor' | 'investor' | 'buyer';
  userRoles: string[];
  onRoleChange: (role: 'ideator' | 'executor' | 'investor' | 'buyer') => void;
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

const DashboardLayout = ({ children, activeRole, userRoles, onRoleChange, user }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-neutral-bg">
      <DashboardHeader 
        activeRole={activeRole}
        userRoles={userRoles}
        onRoleChange={onRoleChange}
        user={user}
      />
      
      <div className="flex w-full">
        <DashboardSidebar activeRole={activeRole} />
        
        <main className="flex-1 p-8 md:p-8 min-h-[calc(100vh-72px)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;