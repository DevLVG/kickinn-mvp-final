import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getSession, signOut } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';

interface UserRole {
  role: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const { session } = await getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      setUserEmail(session.user.email || '');

      // Load user roles
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);

      if (roles) {
        setUserRoles(roles.map((r: UserRole) => r.role));
      }

      setIsLoading(false);
    };

    loadUserData();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)' }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        <div className="flex justify-between items-center mb-12">
          <Link to="/">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider cursor-pointer hover:opacity-90 transition-opacity" style={{ textShadow: '0 0 30px rgba(103, 159, 131, 0.5)' }}>
              KICK INN
            </h2>
          </Link>
          
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(15,43,56,0.3)]">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to Your Dashboard! 🎉</h1>
          
          <div className="mb-8">
            <p className="text-lg text-white/80 mb-2">Email: <span className="font-medium text-white">{userEmail}</span></p>
            <p className="text-lg text-white/80 mb-2">Your Roles:</p>
            <div className="flex flex-wrap gap-2">
              {userRoles.map((role) => (
                <span
                  key={role}
                  className="px-4 py-2 bg-secondary-teal/20 border border-secondary-teal/40 rounded-lg text-white capitalize"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/submit-idea"
                className="p-6 bg-white/5 border border-secondary-teal/20 rounded-xl hover:border-secondary-teal/50 hover:bg-white/10 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-2">💡 Submit an Idea</h3>
                <p className="text-sm text-white/60">Share a problem you've identified</p>
              </Link>
              
              <Link
                to="/explore"
                className="p-6 bg-white/5 border border-secondary-teal/20 rounded-xl hover:border-secondary-teal/50 hover:bg-white/10 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-2">🔍 Explore Opportunities</h3>
                <p className="text-sm text-white/60">Find projects to work on or invest in</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;