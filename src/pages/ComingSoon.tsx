import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const ComingSoon = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user data
  const user = {
    name: 'User',
    email: 'user@kickinn.io',
    initials: 'U'
  };

  // Determine active role from path
  const getActiveRole = () => {
    if (location.pathname.includes('/executor')) return 'executor';
    if (location.pathname.includes('/buyer')) return 'buyer';
    if (location.pathname.includes('/deals') || location.pathname.includes('/portfolio') || location.pathname.includes('/exits')) return 'investor';
    return 'ideator';
  };

  const pageName = location.pathname.split('/').pop() || 'page';

  return (
    <DashboardLayout
      activeRole={getActiveRole()}
      userRoles={['ideator', 'executor', 'investor', 'buyer']}
      onRoleChange={() => {}}
      user={user}
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <span className="text-8xl mb-6">🚧</span>
        
        <h1 className="text-4xl font-bold text-primary-dark mb-4">
          Coming Soon
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          La pagina <span className="font-semibold text-secondary-teal">{pageName}</span> è in fase di sviluppo e sarà disponibile presto.
        </p>

        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Torna alla Dashboard
        </button>
      </div>
    </DashboardLayout>
  );
};

export default ComingSoon;
