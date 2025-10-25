import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { z } from 'zod';

interface InvestmentModalProps {
  deal: {
    id: string;
    title: string;
    venture_id: string;
    tokenomics: {
      price_per_token: number;
      min_investment: number;
      max_investment: number;
    };
  };
  isKYCVerified: boolean;
  onClose: () => void;
}

type Step = 'amount' | 'wallet' | 'terms' | 'processing' | 'success';

// Validation schema
const investmentSchema = z.object({
  amount: z.number()
    .min(1000, 'Minimum investment is $1,000')
    .max(50000, 'Maximum investment is $50,000'),
  walletAddress: z.string()
    .min(10, 'Invalid wallet address')
    .regex(/^0x[a-fA-F0-9]{40}$|^EQ[a-zA-Z0-9_-]{46}$/, 'Invalid Ethereum or TON wallet address'),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms')
});

const InvestmentModal = ({ deal, isKYCVerified, onClose }: InvestmentModalProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState(deal.tokenomics.min_investment);
  const [walletAddress, setWalletAddress] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [investmentId, setInvestmentId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tokensToReceive = amount / deal.tokenomics.price_per_token;

  const handleConnectWallet = async () => {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum === 'undefined') {
      toast({
        title: 'MetaMask Not Installed',
        description: 'Please install MetaMask to continue',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsProcessing(true);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts && accounts[0]) {
        setWalletAddress(accounts[0]);
        setErrors({});
        toast({
          title: 'Wallet Connected',
          description: 'MetaMask connected successfully',
        });
      }
    } catch (error: any) {
      if (error.code === 4001) {
        toast({
          title: 'Connection Rejected',
          description: 'Please connect your wallet to continue',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Connection Failed',
          description: 'Failed to connect wallet. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const validateAndContinue = (nextStep: Step) => {
    setErrors({});

    try {
      if (nextStep === 'wallet') {
        investmentSchema.pick({ amount: true }).parse({ amount });
      } else if (nextStep === 'terms') {
        investmentSchema.pick({ walletAddress: true }).parse({ walletAddress });
      } else if (nextStep === 'processing') {
        investmentSchema.parse({ amount, walletAddress, termsAccepted });
      }
      setStep(nextStep);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: 'Validation Error',
          description: Object.values(newErrors)[0],
          variant: 'destructive',
        });
      }
    }
  };

  const handleSubmitInvestment = async () => {
    try {
      setIsProcessing(true);
      setStep('processing');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create investment record
      const { data: investment, error: investmentError } = await supabase
        .from('investments')
        .insert({
          deal_id: deal.id,
          venture_id: deal.venture_id,
          investor_id: user.id,
          amount_usdt: amount,
          tokens_received: tokensToReceive,
          token_price: deal.tokenomics.price_per_token,
          wallet_address: walletAddress,
          kyc_verified: isKYCVerified,
          terms_accepted: termsAccepted,
          terms_accepted_at: new Date().toISOString(),
          status: 'pending'
        })
        .select()
        .single();

      if (investmentError) {
        throw investmentError;
      }

      setInvestmentId(investment.id);

      // Log investment creation
      await supabase.from('investment_logs').insert({
        investment_id: investment.id,
        action: 'created',
        details: { amount, tokens: tokensToReceive }
      });

      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, here we would:
      // 1. Call smart contract to transfer USDT
      // 2. Mint tokens
      // 3. Update status to 'completed' with transaction_hash

      // For demo, mark as completed
      await supabase
        .from('investments')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          transaction_hash: `0x${Math.random().toString(16).slice(2, 66)}`
        })
        .eq('id', investment.id);

      await supabase.from('investment_logs').insert({
        investment_id: investment.id,
        action: 'payment_completed',
        details: { transaction_hash: 'demo_hash' }
      });

      setStep('success');
      toast({
        title: 'Investment Successful!',
        description: `You've invested $${amount.toLocaleString()} and received ${Math.floor(tokensToReceive).toLocaleString()} tokens`,
      });

    } catch (error) {
      console.error('Investment error:', error);
      setStep('terms');
      toast({
        title: 'Investment Failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Close Button */}
        {step !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-500"
          >
            ✕
          </button>
        )}

        {/* Step Indicator */}
        {step !== 'success' && step !== 'processing' && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`h-2 w-12 rounded-full ${step === 'amount' ? 'bg-secondary-teal' : 'bg-gray-300'}`} />
            <div className={`h-2 w-12 rounded-full ${step === 'wallet' ? 'bg-secondary-teal' : 'bg-gray-300'}`} />
            <div className={`h-2 w-12 rounded-full ${step === 'terms' ? 'bg-secondary-teal' : 'bg-gray-300'}`} />
          </div>
        )}

        {/* STEP 1: Amount Selection */}
        {step === 'amount' && (
          <>
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Choose Investment Amount</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Amount (USDT)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={deal.tokenomics.min_investment}
                max={deal.tokenomics.max_investment}
                className={`w-full bg-gray-50 border-2 ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-secondary-teal focus:border-secondary-teal`}
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
              {[1000, 5000, 10000, 25000].map(amt => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="bg-secondary-teal/10 border border-secondary-teal text-secondary-teal px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary-teal hover:text-white transition-colors"
                >
                  ${amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="bg-accent-blue/10 border border-accent-blue p-5 rounded-xl mb-6">
              <p className="text-sm text-gray-600 mb-2">You will receive</p>
              <p className="text-4xl font-bold text-accent-blue mb-1">
                {Math.floor(tokensToReceive).toLocaleString()} tokens
              </p>
              <p className="text-sm text-gray-500">
                at ${deal.tokenomics.price_per_token} per token
              </p>
            </div>

            <button
              onClick={() => validateAndContinue('wallet')}
              className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white py-4 rounded-lg font-bold text-base hover:shadow-lg transition-all"
            >
              Continue to Wallet Connection
            </button>
          </>
        )}

        {/* STEP 2: Wallet Connection */}
        {step === 'wallet' && (
          <>
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Connect Your Wallet</h2>
            
            {!walletAddress ? (
              <>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
                  <div className="text-6xl mb-4">🦊</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">MetaMask Required</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Connect your MetaMask wallet to continue with the investment
                  </p>
                  <button
                    onClick={handleConnectWallet}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {isProcessing ? 'Connecting...' : 'Connect MetaMask'}
                  </button>
                </div>

                <button
                  onClick={() => setStep('amount')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back to Amount
                </button>
              </>
            ) : (
              <>
                <div className="bg-green-50 border border-green-500 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">✅</span>
                    <h3 className="text-xl font-bold text-green-700">Wallet Connected</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Connected Address:</p>
                  <code className="block bg-white px-3 py-2 rounded text-xs font-mono break-all">
                    {walletAddress}
                  </code>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setWalletAddress(''); setStep('wallet'); }}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Change Wallet
                  </button>
                  <button
                    onClick={() => validateAndContinue('terms')}
                    className="flex-1 bg-gradient-to-r from-secondary-teal to-accent-blue text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* STEP 3: Terms & Review */}
        {step === 'terms' && (
          <>
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Review & Confirm</h2>

            <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Amount</span>
                <span className="font-bold">${amount.toLocaleString()} USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Token Price</span>
                <span className="font-bold">${deal.tokenomics.price_per_token}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tokens to Receive</span>
                <span className="font-bold">{Math.floor(tokensToReceive).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-600">Wallet Address</span>
                <code className="font-mono text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</code>
              </div>
            </div>

            <div className={`border-2 ${errors.termsAccepted ? 'border-red-500' : 'border-gray-300'} rounded-xl p-4 mb-6`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-secondary-teal"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the{' '}
                  <a href="/legal/token-agreement.pdf" target="_blank" className="text-secondary-teal font-bold underline">
                    Token Agreement
                  </a>{' '}
                  and{' '}
                  <a href="/legal/risk-disclosure.pdf" target="_blank" className="text-secondary-teal font-bold underline">
                    Risk Disclosure
                  </a>.
                  I understand that crypto investments carry risk and tokens may lose value.
                </span>
              </label>
              {errors.termsAccepted && <p className="text-red-500 text-sm mt-2">{errors.termsAccepted}</p>}
            </div>

            {!isKYCVerified && (
              <div className="bg-amber-50 border border-amber-500 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800">
                  ⚠️ <strong>KYC Required:</strong> You must complete KYC verification before investing.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep('wallet')}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmitInvestment}
                disabled={!termsAccepted || !isKYCVerified}
                className="flex-1 bg-gradient-to-r from-secondary-teal to-accent-blue text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Investment
              </button>
            </div>
          </>
        )}

        {/* STEP 4: Processing */}
        {step === 'processing' && (
          <div className="text-center py-12">
            <LoadingSpinner />
            <h3 className="text-2xl font-bold text-primary-dark mt-6 mb-2">Processing Investment</h3>
            <p className="text-gray-600">Please wait while we process your transaction...</p>
            <p className="text-sm text-gray-500 mt-4">This may take a few moments</p>
          </div>
        )}

        {/* STEP 5: Success */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className="text-7xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-green-600 mb-3">Investment Successful!</h2>
            <p className="text-base text-gray-700 mb-6">
              Your investment of <strong>${amount.toLocaleString()} USDT</strong> has been processed.
            </p>
            
            <div className="bg-green-50 border border-green-500 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-1">Tokens Received</p>
              <p className="text-4xl font-bold text-green-600">
                {Math.floor(tokensToReceive).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">{deal.title} tokens</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/portfolio')}
                className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                View Portfolio
              </button>
              <button
                onClick={() => navigate('/deals')}
                className="w-full border border-secondary-teal text-secondary-teal py-3 rounded-lg font-medium hover:bg-secondary-teal/10 transition-colors"
              >
                Explore More Deals
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentModal;
