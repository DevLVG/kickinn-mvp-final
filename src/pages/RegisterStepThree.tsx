import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getSession } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import ProgressIndicator from '@/components/ProgressIndicator';
import LoadingSpinner from '@/components/LoadingSpinner';
import Toast from '@/components/Toast';

const RegisterStepThree = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletType, setWalletType] = useState<'metamask' | 'ton' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession();
      if (!session) {
        navigate('/register');
        return;
      }
      
      // Check if user has roles (completed step 2)
      const { data: roles } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', session.user.id);
      
      if (!roles || roles.length === 0) {
        navigate('/register?step=2');
      }
    };
    checkSession();
  }, [navigate]);

  const logWalletConnection = async (
    address: string,
    type: 'metamask' | 'ton',
    action: 'connected' | 'rejected' | 'failed',
    errorMessage?: string
  ) => {
    try {
      const { session } = await getSession();
      if (!session?.user) return;

      await supabase.from('wallet_connection_logs').insert({
        user_id: session.user.id,
        wallet_address: address,
        wallet_type: type,
        action,
        user_agent: navigator.userAgent,
        error_message: errorMessage || null,
      });
    } catch (err) {
      console.error('Failed to log wallet connection:', err);
    }
  };

  const connectMetaMask = async () => {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum === 'undefined') {
      setToast({ message: 'MetaMask not installed. Install MetaMask extension', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Request accounts
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || !accounts[0]) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];

      // Step 2: Check if wallet is already connected to another account
      const { data: existingWallet } = await supabase
        .from('wallets')
        .select('user_id')
        .eq('wallet_address', address)
        .single();

      if (existingWallet) {
        const { session } = await getSession();
        if (existingWallet.user_id !== session?.user.id) {
          setToast({ 
            message: 'This wallet is already connected to another account', 
            type: 'error' 
          });
          await logWalletConnection(address, 'metamask', 'failed', 'Wallet already linked to another account');
          setIsLoading(false);
          return;
        }
      }

      // Step 3: Verify wallet ownership with signature
      const message = `Kick Inn - Verify wallet ownership\n\nWallet: ${address}\nTimestamp: ${new Date().toISOString()}`;
      
      try {
        const signature = await ethereum.request({
          method: 'personal_sign',
          params: [message, address],
        });

        if (!signature) {
          throw new Error('Signature failed');
        }

        // Success
        setWalletAddress(address);
        setWalletType('metamask');
        setIsConnected(true);
        setToast({ message: 'Wallet connected successfully!', type: 'success' });
        await logWalletConnection(address, 'metamask', 'connected');

      } catch (signError: any) {
        if (signError.code === 4001) {
          setToast({ 
            message: 'Signature required to verify wallet ownership', 
            type: 'error' 
          });
          await logWalletConnection(address, 'metamask', 'rejected', 'User rejected signature request');
        } else {
          throw signError;
        }
      }

    } catch (error: any) {
      if (error.code === 4001) {
        setToast({ message: 'Wallet connection was rejected. Try again?', type: 'error' });
        await logWalletConnection('', 'metamask', 'rejected', 'User rejected connection');
      } else {
        setToast({ message: 'Failed to connect wallet. Please try again.', type: 'error' });
        await logWalletConnection('', 'metamask', 'failed', error.message || 'Unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const connectTON = async () => {
    // TON Connect integration to be implemented
    // Reference: https://docs.ton.org/develop/dapps/ton-connect/overview
    setToast({ message: 'TON Wallet integration coming soon!', type: 'info' });
    await logWalletConnection('', 'ton', 'failed', 'TON integration not yet implemented');
  };

  const handleDisconnect = async () => {
    if (walletAddress && walletType) {
      await logWalletConnection(walletAddress, walletType, 'rejected', 'User disconnected before saving');
    }
    setIsConnected(false);
    setWalletAddress('');
    setWalletType(null);
  };

  const handleSkip = async () => {
    navigate('/dashboard');
    setToast({ message: 'Welcome to Kick Inn! 🎉', type: 'success' });
  };

  const handleContinue = async () => {
    if (!isConnected || !walletAddress || !walletType) return;

    setIsLoading(true);
    try {
      const { session } = await getSession();
      if (!session?.user) {
        navigate('/register');
        return;
      }

      const { error } = await supabase
        .from('wallets')
        .insert({
          user_id: session.user.id,
          wallet_address: walletAddress,
          wallet_type: walletType,
        });

      if (error) {
        if (error.message.includes('already connected')) {
          setToast({ message: 'This wallet is already connected to another account.', type: 'error' });
        } else {
          setToast({ message: 'Failed to save wallet. Please try again.', type: 'error' });
        }
        setIsLoading(false);
        return;
      }

      navigate('/dashboard');
      setToast({ message: 'Welcome to Kick Inn! 🎉', type: 'success' });
    } catch (err) {
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
      setIsLoading(false);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setToast({ message: 'Address copied!', type: 'success' });
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
        
        <ProgressIndicator currentStep={3} totalSteps={3} />
        
        <div className="bg-white/5 backdrop-blur-md border border-secondary-teal/20 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_rgba(15,43,56,0.3)]">
          <Link to="/register?step=2" className="block text-sm text-white/60 hover:opacity-100 transition-opacity mb-6">
            ← Back to Roles
          </Link>
          
          <h1 className="text-3xl font-bold text-white text-center mb-3">Connect Your Wallet (Optional)</h1>
          <p className="text-sm text-white/70 text-center mb-10">Optional now. Required to claim tokens or fund ventures.</p>
          
          {!isConnected ? (
            <div className="space-y-4 mb-6">
              <button
                onClick={connectMetaMask}
                disabled={isLoading}
                className="w-full bg-white/10 border-2 border-secondary-teal/30 hover:border-secondary-teal hover:bg-white/15 rounded-lg p-4 flex items-center gap-3 transition-all disabled:opacity-50"
              >
                <span className="text-2xl">🦊</span>
                <span className="flex-1 text-base font-medium text-white text-center">Connect with MetaMask</span>
              </button>
              
              <button
                onClick={connectTON}
                disabled={isLoading}
                className="w-full bg-white/10 border-2 border-secondary-teal/30 hover:border-secondary-teal hover:bg-white/15 rounded-lg p-4 flex items-center gap-3 transition-all disabled:opacity-50"
              >
                <span className="text-2xl">💎</span>
                <span className="flex-1 text-base font-medium text-white text-center">Connect with TON Wallet</span>
              </button>
              
              <button
                onClick={handleSkip}
                className="w-full border border-white/30 text-white/70 hover:bg-white/5 rounded-lg py-3.5 text-base font-medium transition-all mt-6"
              >
                Skip for Now
              </button>
            </div>
          ) : (
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-white mb-3">Wallet Connected</h2>
              <div className="bg-white/10 border border-secondary-teal/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-white/60 mb-1">Wallet Address</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-white/80 font-mono text-sm">{truncateAddress(walletAddress)}</code>
                  <button
                    onClick={copyToClipboard}
                    className="text-secondary-teal hover:opacity-80 transition-opacity"
                    aria-label="Copy address"
                  >
                    📋
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleDisconnect}
                  className="flex-1 border border-white/30 text-white/70 hover:bg-white/5 rounded-lg py-2.5 text-sm font-medium transition-all"
                >
                  Disconnect
                </button>
                <button
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50"
                  style={{ background: 'linear-gradient(to right, #679f83, #23698a)' }}
                >
                  {isLoading ? <LoadingSpinner /> : 'Continue to Dashboard'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterStepThree;