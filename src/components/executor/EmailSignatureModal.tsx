import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface EmailSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractId: string;
}

const EmailSignatureModal = ({ isOpen, onClose, contractId }: EmailSignatureModalProps) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [canResend, setCanResend] = useState(true);

  if (!isOpen) return null;

  const handleSendEmail = async () => {
    setIsSending(true);

    // Simulate email sending
    setTimeout(() => {
      setIsSending(false);
      setEmailSent(true);
      setCanResend(false);

      toast({
        title: 'Verification email sent',
        description: 'Check your inbox for the signature link',
      });

      // Enable resend after 60 seconds
      setTimeout(() => {
        setCanResend(true);
      }, 60000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <span className="text-5xl">✉️</span>
        </div>

        <h3 className="text-2xl font-bold text-[hsl(var(--primary-dark))] text-center mb-3">
          Email Verification
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          We'll send you a verification link to sign the contract electronically
        </p>

        {emailSent ? (
          <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <span>✓</span>
              <span className="font-bold text-sm">Email sent to john@example.com</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Check your inbox and click the verification link to complete signature. Link expires
              in 1 hour.
            </p>
            {canResend && (
              <button
                onClick={handleSendEmail}
                className="text-xs text-[hsl(var(--secondary-teal))] underline hover:no-underline mt-2"
              >
                Didn't receive email? Resend
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            <Button
              onClick={handleSendEmail}
              disabled={isSending}
              className="w-full bg-gradient-to-r from-[hsl(var(--secondary-teal))] to-[hsl(var(--accent-blue))] text-white font-bold py-6"
            >
              {isSending ? 'Sending...' : 'Send Verification Email'}
            </Button>
          </div>
        )}

        <Button variant="outline" onClick={onClose} className="w-full">
          {emailSent ? 'Close' : 'Cancel'}
        </Button>
      </div>
    </div>
  );
};

export default EmailSignatureModal;
