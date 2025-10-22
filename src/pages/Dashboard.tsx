import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/LoadingSpinner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import IdeatorDashboard from '@/components/dashboard/IdeatorDashboard';

interface UserRole {
  role: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    initials: '',
  });
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [activeRole, setActiveRole] = useState<'ideator' | 'executor' | 'investor' | 'buyer'>('ideator');

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      const email = session.user.email || '';
      
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // Load user roles
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);

      const rolesArray = roles ? roles.map((r: UserRole) => r.role) : [];
      
      // Set user data
      const name = email.split('@')[0]; // Fallback name from email
      const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      setUser({
        id: session.user.id,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        initials,
      });

      setUserRoles(rolesArray);
      
      // Set default active role to first available role
      if (rolesArray.length > 0) {
        setActiveRole(rolesArray[0] as any);
      }

      setIsLoading(false);
    };

    loadUserData();
  }, [navigate]);

  const handleRoleChange = (newRole: 'ideator' | 'executor' | 'investor' | 'buyer') => {
    setActiveRole(newRole);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg">
        <LoadingSpinner />
      </div>
    );
  }

  // Render role-specific dashboard
  const renderDashboard = () => {
    switch (activeRole) {
      case 'ideator':
        return <IdeatorDashboard user={user} />;
      case 'executor':
        return <div className="text-center py-12">Executor Dashboard (Coming Soon)</div>;
      case 'investor':
        return <div className="text-center py-12">Investor Dashboard (Coming Soon)</div>;
      case 'buyer':
        return <div className="text-center py-12">Buyer Dashboard (Coming Soon)</div>;
      default:
        return <IdeatorDashboard user={user} />;
    }
  };

  return (
    <DashboardLayout
      activeRole={activeRole}
      userRoles={userRoles}
      onRoleChange={handleRoleChange}
      user={user}
    >
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;