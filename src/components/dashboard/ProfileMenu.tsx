import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Wallet, Shield, HelpCircle, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileMenuProps {
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  const menuItems = [
    { icon: Settings, label: 'Settings', url: '/settings' },
    { icon: Wallet, label: 'Wallet', url: '/settings/wallet' },
    { icon: Shield, label: 'Security', url: '/settings/security' },
    { icon: HelpCircle, label: 'Help Center', url: '/help' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:shadow-md transition-shadow"
        style={{
          background: 'linear-gradient(135deg, #679f83, #23698a)',
          border: '2px solid white',
        }}
      >
        {user.initials}
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-xl shadow-xl z-50 py-2"
          style={{
            border: '1px solid rgba(103, 159, 131, 0.2)',
          }}
        >
          {/* User Info */}
          <div 
            className="px-4 py-3 mb-2"
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}
          >
            <p className="text-sm font-bold text-primary-dark truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <button
              key={item.url}
              onClick={() => {
                navigate(item.url);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-primary-dark hover:bg-gray-50 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}

          {/* Divider */}
          <div className="my-2" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.05)' }} />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;