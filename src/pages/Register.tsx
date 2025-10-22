import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpWithEmail, getSession } from '@/lib/auth';
import ProgressIndicator from '@/components/ProgressIndicator';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(254, 'Email must be less than 254 characters'),
});

type EmailFormData = z.infer<typeof emailSchema>;

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const preSelectedRole = searchParams.get('role');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession();
      if (session) {
        navigate('/register?step=2');
      }
    };
    checkSession();
  }, [navigate]);

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    
    // Generate a random password for magic link simulation
    const tempPassword = Math.random().toString(36).slice(-12) + 'Aa1!';
    
    const { data: authData, error } = await signUpWithEmail(data.email, tempPassword);
    
    setIsLoading(false);
    
    if (error) {
      if (error.message.includes('already registered')) {
        setToast({ message: 'This email is already registered. Log in instead?', type: 'error' });
      } else {
        setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      }
      return;
    }

    if (authData?.user) {
      setEmailSent(data.email);
      setShowSuccess(true);
      
      // Store pre-selected role if exists
      if (preSelectedRole) {
        sessionStorage.setItem('preSelectedRole', preSelectedRole);
      }
      
      // Auto-redirect after signup (email is auto-confirmed)
      setTimeout(() => {
        navigate('/register?step=2');
      }, 2000);
    }
  };

  const handleResend = async () => {
    if (emailSent) {
      const tempPassword = Math.random().toString(36).slice(-12) + 'Aa1!';
      await signUpWithEmail(emailSent, tempPassword);
      setToast({ message: 'Link resent! Check your email.', type: 'success' });
    }
  };

  if (showSuccess) {
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
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 30px rgba(103, 159, 131, 0.5)' }}>
              KICK INN
            </h2>
          </Link>
          
          <ProgressIndicator currentStep={1} totalSteps={3} />
          
          <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(15,43,56,0.3)] text-center">
            <div className="text-5xl mb-6">✉️</div>
            <h2 className="text-2xl font-bold text-white mb-3">Check Your Email</h2>
            <p className="text-sm text-white/70 mb-2">We've sent a magic link to <strong>{emailSent}</strong>. Click the link to continue.</p>
            <p className="text-xs text-white/60 mb-6">Link expires in 15 minutes</p>
            <p className="text-sm text-white/70 mb-4">Redirecting you now...</p>
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

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
        
        <ProgressIndicator currentStep={1} totalSteps={3} />
        
        <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(15,43,56,0.3)]">
          <h1 className="text-3xl font-bold text-white text-center mb-3">Welcome to Kick Inn</h1>
          <p className="text-base text-white/70 text-center mb-8">Enter your email to get started</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full bg-white/10 border border-secondary-teal/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary-teal focus:outline-none focus:ring-2 focus:ring-secondary-teal/50 transition-all"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-500" role="alert">{errors.email.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-lg text-base font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(to right, #679f83, #23698a)' }}
              onMouseEnter={(e) => !isLoading && (e.currentTarget.style.boxShadow = '0 8px 24px rgba(103, 159, 131, 0.4)')}
              onMouseLeave={(e) => !isLoading && (e.currentTarget.style.boxShadow = 'none')}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Sending...
                </span>
              ) : (
                'Send Magic Link'
              )}
            </button>
          </form>
          
          <p className="text-sm text-white/60 text-center mt-6">
            Already have an account? <Link to="/login" className="text-secondary-teal underline hover:opacity-80">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;