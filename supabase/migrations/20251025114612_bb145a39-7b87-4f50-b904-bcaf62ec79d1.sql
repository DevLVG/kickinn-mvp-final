-- Create investments table
CREATE TABLE public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id TEXT NOT NULL,
  venture_id TEXT NOT NULL,
  investor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount_usdt DECIMAL(12,2) NOT NULL,
  tokens_received DECIMAL(18,2) NOT NULL,
  token_price DECIMAL(10,4) NOT NULL,
  wallet_address TEXT NOT NULL,
  transaction_hash TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  kyc_verified BOOLEAN NOT NULL DEFAULT false,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  terms_accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own investments"
  ON public.investments
  FOR SELECT
  USING (auth.uid() = investor_id);

CREATE POLICY "Users can insert their own investments"
  ON public.investments
  FOR INSERT
  WITH CHECK (auth.uid() = investor_id);

CREATE POLICY "Users can update their own investments"
  ON public.investments
  FOR UPDATE
  USING (auth.uid() = investor_id);

-- Create indexes
CREATE INDEX idx_investments_deal_id ON public.investments(deal_id);
CREATE INDEX idx_investments_investor_id ON public.investments(investor_id);
CREATE INDEX idx_investments_status ON public.investments(status);
CREATE INDEX idx_investments_venture_id ON public.investments(venture_id);

-- Create trigger for updated_at
CREATE TRIGGER update_investments_updated_at
  BEFORE UPDATE ON public.investments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create investment logs table for audit trail
CREATE TABLE public.investment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('created', 'wallet_connected', 'terms_accepted', 'payment_initiated', 'payment_completed', 'payment_failed', 'refunded')),
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.investment_logs ENABLE ROW LEVEL SECURITY;

-- Policies (users can view logs for their investments)
CREATE POLICY "Users can view their own investment logs"
  ON public.investment_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.investments
      WHERE investments.id = investment_logs.investment_id
      AND investments.investor_id = auth.uid()
    )
  );

CREATE POLICY "System can insert investment logs"
  ON public.investment_logs
  FOR INSERT
  WITH CHECK (true);

-- Create index
CREATE INDEX idx_investment_logs_investment_id ON public.investment_logs(investment_id);
CREATE INDEX idx_investment_logs_created_at ON public.investment_logs(created_at DESC);