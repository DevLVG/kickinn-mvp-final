import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { getSession } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import ProgressIndicator from '@/components/ProgressIndicator';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';

type Role = 'ideator' | 'executor' | 'investor' | 'buyer';

interface RoleOption {
  id: Role;
  icon: string;
  title: string;
  description: string;
}

const roleOptions: RoleOption[] = [
  { id: 'ideator', icon: '💡', title: 'Ideator', description: 'Submit problems, earn tokens' },
  { id: 'executor', icon: '🛠️', title: 'Executor', description: 'Build MVPs, get paid on-chain' },
  { id: 'investor', icon: '💰', title: 'Investor', description: 'Fund ventures, track exits' },
  { id: 'buyer', icon: '🏢', title: 'Buyer', description: 'Acquire exit-ready ventures' },
];

const RegisterStepTwo = () => {
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState<Set<Role>>(new Set());
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession();
      if (!session) {
        navigate('/register');
        return;
      }
      
      // Check for pre-selected role
      const preSelectedRole = sessionStorage.getItem('preSelectedRole');
      if (preSelectedRole && ['ideator', 'executor', 'investor', 'buyer'].includes(preSelectedRole)) {
        setSelectedRoles(new Set([preSelectedRole as Role]));
        sessionStorage.removeItem('preSelectedRole');
      }
    };
    checkSession();
  }, [navigate]);

  const toggleRole = (roleId: Role) => {
    const newRoles = new Set(selectedRoles);
    if (newRoles.has(roleId)) {
      newRoles.delete(roleId);
    } else {
      newRoles.add(roleId);
    }
    setSelectedRoles(newRoles);
    setError('');
  };

  const handleContinue = async () => {
    if (selectedRoles.size === 0) {
      setError('Please select at least one role');
      return;
    }
    
    if (!termsAccepted) {
      setError('You must agree to the terms to continue');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { session } = await getSession();
      if (!session?.user) {
        navigate('/register');
        return;
      }

      // Insert selected roles
      const rolesData = Array.from(selectedRoles).map(role => ({
        user_id: session.user.id,
        role: role,
      }));

      const { error: insertError } = await supabase
        .from('user_roles')
        .insert(rolesData);

      if (insertError) {
        setToast({ message: 'Failed to save roles. Please try again.', type: 'error' });
        setIsLoading(false);
        return;
      }

      navigate('/register?step=3');
    } catch (err) {
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)' }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="w-full max-w-[600px]">
        <Link to="/" className="block text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider cursor-pointer hover:opacity-90 transition-opacity" style={{ textShadow: '0 0 30px rgba(103, 159, 131, 0.5)' }}>
            KICK INN
          </h2>
        </Link>
        
        <ProgressIndicator currentStep={2} totalSteps={3} />
        
        <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(15,43,56,0.3)]">
          <h1 className="text-3xl font-bold text-white text-center mb-3">Choose Your Role</h1>
          <p className="text-sm text-white/70 text-center mb-10">Select one or more roles that fit you. You can add more later.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {roleOptions.map((role) => (
              <button
                key={role.id}
                onClick={() => toggleRole(role.id)}
                className={`relative bg-white/5 backdrop-blur-sm border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 text-left ${
                  selectedRoles.has(role.id)
                    ? 'border-secondary-teal bg-secondary-teal/10'
                    : 'border-secondary-teal/20 hover:border-secondary-teal/50 hover:bg-white/8'
                }`}
              >
                {selectedRoles.has(role.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4" style={{ color: '#679f83' }} />
                  </div>
                )}
                
                <div className="flex items-center justify-center w-15 h-15 mx-auto mb-4 rounded-full" style={{ background: 'linear-gradient(to right, #679f83, #23698a)' }}>
                  <span className="text-4xl">{role.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 text-center">{role.title}</h3>
                <p className="text-sm text-white/60 text-center">{role.description}</p>
              </button>
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-500 mb-4 text-center" role="alert">{error}</p>
          )}
          
          <div className="flex items-start gap-3 mb-8">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setError('');
              }}
              className="w-5 h-5 mt-0.5 rounded border-secondary-teal/30 bg-white/10 checked:bg-secondary-teal checked:border-secondary-teal cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-white/70">
              I agree to the{' '}
              <Link to="/terms" className="text-light-teal underline hover:opacity-100">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-light-teal underline hover:opacity-100">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <button
            onClick={handleContinue}
            disabled={isLoading || selectedRoles.size === 0 || !termsAccepted}
            className="w-full py-3.5 rounded-lg text-base font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(to right, #679f83, #23698a)' }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                Saving...
              </span>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStepTwo;