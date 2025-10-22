import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface RoleSwitcherProps {
  activeRole: 'ideator' | 'executor' | 'investor' | 'buyer';
  userRoles: string[];
  onRoleChange: (role: 'ideator' | 'executor' | 'investor' | 'buyer') => void;
}

const roleLabels: Record<string, string> = {
  ideator: 'Ideator',
  executor: 'Executor',
  investor: 'Investor',
  buyer: 'Buyer',
};

const RoleSwitcher = ({ activeRole, userRoles, onRoleChange }: RoleSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (role: 'ideator' | 'executor' | 'investor' | 'buyer') => {
    onRoleChange(role);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all"
        style={{
          borderColor: isOpen ? '#679f83' : 'rgba(103, 159, 131, 0.2)',
          background: isOpen ? 'rgba(103, 159, 131, 0.05)' : 'transparent',
        }}
      >
        <span className="text-sm font-medium text-primary-dark">
          {roleLabels[activeRole]}
        </span>
        <ChevronDown className="w-4 h-4 text-secondary-teal" />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-[200px] bg-white rounded-xl shadow-xl z-50 py-2"
          style={{
            border: '1px solid rgba(103, 159, 131, 0.2)',
          }}
        >
          {userRoles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSelect(role as any)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-primary-dark hover:bg-secondary-teal/10 transition-colors rounded-lg mx-1"
              style={{
                background: activeRole === role ? 'rgba(103, 159, 131, 0.15)' : 'transparent',
              }}
            >
              <span>{roleLabels[role]}</span>
              {activeRole === role && (
                <Check className="w-4 h-4 text-secondary-teal" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;