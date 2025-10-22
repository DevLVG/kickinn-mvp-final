import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmail, getSession } from '@/lib/auth';
import ProgressIndicator from '@/components/ProgressIndicator';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    const { error } = await signInWithEmail(data.email, data.password);
    
    setIsLoading(false);
    
    if (error) {
      setToast({ message: error.message || 'Invalid email or password', type: 'error' });
      return;
    }

    navigate('/dashboard');
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
        
        <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(15,43,56,0.3)]">
          <h1 className="text-3xl font-bold text-white text-center mb-3">Welcome Back</h1>
          <p className="text-base text-white/70 text-center mb-8">Log in to your account</p>
          
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
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full bg-white/10 border border-secondary-teal/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-secondary-teal focus:outline-none focus:ring-2 focus:ring-secondary-teal/50 transition-all"
              />
              {errors.password && (
                <p className="mt-2 text-xs text-red-500" role="alert">{errors.password.message}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-lg text-base font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(to right, #679f83, #23698a)' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Logging in...
                </span>
              ) : (
                'Log In'
              )}
            </button>
          </form>
          
          <p className="text-sm text-white/60 text-center mt-6">
            Don't have an account? <Link to="/register" className="text-secondary-teal underline hover:opacity-80">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;