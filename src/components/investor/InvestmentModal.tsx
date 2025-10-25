import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import LoadingSpinner from '@/components/LoadingSpinner';

interface InvestmentModalProps {
  deal: {
    id: string;
    venture_id: string;
    title: string;
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

const InvestmentModal = ({ deal, isKYCVerified, onClose }: InvestmentModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<Step>('amount');
  const [amount, setAmount] = useState(deal.tokenomics.min_investment);
  const [walletAddress, setWalletAddress] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  
  const tokensToReceive = amount / deal.tokenomics.price_per_token;
  const isAmountValid = amount >= deal.tokenomics.min_investment && amount <= deal.tokenomics.max_investment;

  const handleConnectWallet = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate MetaMask connection
      const ethereum = (window as any).ethereum;
      
      if (typeof ethereum === 'undefined') {
        toast({
          title: 'MetaMask Not Installed',
          description: 'Please install MetaMask to connect your wallet.',
          variant: 'destructive',
        });
        setIsProcessing(false);
        return;
      }

      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts && accounts[0]) {
        setWalletAddress(accounts[0]);
        setCurrentStep('terms');
        toast({
          title: 'Wallet Connected',
          description: 'Successfully connected to MetaMask',
        });
      }
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      toast({
        title: 'Connection Failed',
        description: error.code === 4001 ? 'User rejected the request' : 'Failed to connect wallet',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitInvestment = async () => {
    if (!termsAccepted || !walletAddress) {
      return;
    }

    setIsProcessing(true);
    setCurrentStep('processing');

    try {
      const { data, error } = await supabase.functions.invoke('process-investment', {
        body: {
          dealId: deal.id,
          ventureId: deal.venture_id,
          amountUsdt: amount,
          tokensReceived: Math.floor(tokensToReceive),
          tokenPrice: deal.tokenomics.price_per_token,
          walletAddress,
          kycVerified: isKYCVerified,
          termsAccepted
        }
      });

      if (error) {
        throw error;
      }

      if (data?.investment) {
        setTransactionHash(data.investment.transaction_hash);
        setCurrentStep('success');
        toast({
          title: 'Investment Successful!',
          description: `You've successfully invested $${amount.toLocaleString()} and received ${Math.floor(tokensToReceive).toLocaleString()} tokens`,
        });
      }
    } catch (error) {
      console.error('Investment error:', error);
      toast({
        title: 'Investment Failed',
        description: error instanceof Error ? error.message : 'Failed to process investment. Please try again.',
        variant: 'destructive',
      });
      setCurrentStep('terms');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-3 mb-8">
      {(['amount', 'wallet', 'terms', 'processing'] as const).map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              currentStep === step
                ? 'bg-gradient-to-r from-secondary-teal to-accent-blue text-white'
                : ['amount', 'wallet', 'terms'].indexOf(currentStep) > index
                ? 'bg-success text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {['amount', 'wallet', 'terms'].indexOf(currentStep) > index ? '✓' : index + 1}
          </div>
          {index < 3 && (
            <div className={`w-12 h-1 mx-2 ${
              ['amount', 'wallet', 'terms'].indexOf(currentStep) > index ? 'bg-success' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Close Button */}
        {currentStep !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-red-500"
          >
            ✕
          </button>
        )}

        {/* Step Indicator */}
        {currentStep !== 'success' && renderStepIndicator()}

        {/* Step 1: Amount */}
        {currentStep === 'amount' && (
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
                step={100}
                className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-4 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-secondary-teal focus:border-secondary-teal"
              />
              <p className="text-xs text-gray-500 mt-1">
                Min: ${deal.tokenomics.min_investment.toLocaleString()} | Max: ${deal.tokenomics.max_investment.toLocaleString()}
              </p>
            </div>

            {/* Quick Amount Buttons */}
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

            {/* Token Calculator */}
            <div className="bg-accent-blue/10 border border-accent-blue p-5 rounded-xl mb-6">
              <p className="text-sm text-gray-600 mb-2">You will receive</p>
              <p className="text-4xl font-bold text-accent-blue mb-1">
                {Math.floor(tokensToReceive).toLocaleString()} tokens
              </p>
              <p className="text-sm text-gray-500">
                at ${deal.tokenomics.price_per_token} per token
              </p>
            </div>

            <Button
              onClick={() => setCurrentStep('wallet')}
              disabled={!isKYCVerified || !isAmountValid}
              className="w-full h-12"
            >
              {isKYCVerified ? 'Continue to Wallet' : 'Complete KYC First'}
            </Button>
          </>
        )}

        {/* Step 2: Wallet Connection */}
        {currentStep === 'wallet' && (
          <>
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Connect Your Wallet</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Connect your wallet to complete the investment. Your USDT will be transferred securely to the smart contract.
              </p>
              
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🦊</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">MetaMask Required</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Please ensure you have sufficient USDT and gas fees
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('amount')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConnectWallet}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? <LoadingSpinner /> : 'Connect Wallet'}
              </Button>
            </div>
          </>
        )}

        {/* Step 3: Terms & Confirmation */}
        {currentStep === 'terms' && (
          <>
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Review & Confirm</h2>
            
            {/* Investment Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-gray-700 mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Venture</span>
                  <span className="font-bold">{deal.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Investment Amount</span>
                  <span className="font-bold">${amount.toLocaleString()} USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tokens to Receive</span>
                  <span className="font-bold">{Math.floor(tokensToReceive).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wallet Address</span>
                  <span className="font-mono text-xs">{walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}</span>
                </div>
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  I agree to the <a href="/legal/token-agreement.pdf" target="_blank" className="text-accent-blue underline">Token Agreement</a> and <a href="/legal/risk-disclosure.pdf" target="_blank" className="text-accent-blue underline">Risk Disclosure</a>. I understand that tokens are not refundable if funding succeeds.
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('wallet')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmitInvestment}
                disabled={!termsAccepted || isProcessing}
                className="flex-1"
              >
                {isProcessing ? <LoadingSpinner /> : 'Confirm Investment'}
              </Button>
            </div>
          </>
        )}

        {/* Step 4: Processing */}
        {currentStep === 'processing' && (
          <div className="text-center py-12">
            <LoadingSpinner />
            <h2 className="text-2xl font-bold text-primary-dark mt-6 mb-3">Processing Transaction...</h2>
            <p className="text-gray-600">
              Please wait while we process your investment. Do not close this window.
            </p>
          </div>
        )}

        {/* Success State */}
        {currentStep === 'success' && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-primary-dark mb-3">Investment Successful!</h2>
            <p className="text-base text-gray-700 mb-6">
              Your investment of <strong>${amount.toLocaleString()}</strong> has been processed successfully.
            </p>
            
            <div className="bg-success/10 border border-success rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Tokens Received</p>
              <p className="text-4xl font-bold text-success mb-2">
                {Math.floor(tokensToReceive).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 font-mono break-all">
                Transaction: {transactionHash}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate('/portfolio')}
                className="w-full"
              >
                View Portfolio
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/deals')}
                className="w-full"
              >
                Browse More Deals
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentModal;
