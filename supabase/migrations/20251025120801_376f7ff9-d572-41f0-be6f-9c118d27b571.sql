-- Create token transactions table
CREATE TABLE IF NOT EXISTS public.token_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venture_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  transaction_type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  token_symbol TEXT NOT NULL,
  transaction_hash TEXT,
  wallet_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  gas_fee NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create token balances table
CREATE TABLE IF NOT EXISTS public.token_balances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venture_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  token_symbol TEXT NOT NULL,
  total_allocated NUMERIC NOT NULL DEFAULT 0,
  vested NUMERIC NOT NULL DEFAULT 0,
  claimed NUMERIC NOT NULL DEFAULT 0,
  claimable NUMERIC NOT NULL DEFAULT 0,
  wallet_address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(venture_id, user_id)
);

-- Enable RLS
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_balances ENABLE ROW LEVEL SECURITY;

-- RLS Policies for token_transactions
CREATE POLICY "Users can view their own transactions"
  ON public.token_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON public.token_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for token_balances
CREATE POLICY "Users can view their own balances"
  ON public.token_balances FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own balances"
  ON public.token_balances FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own balances"
  ON public.token_balances FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_token_transactions_user_id ON public.token_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_token_transactions_venture_id ON public.token_transactions(venture_id);
CREATE INDEX IF NOT EXISTS idx_token_balances_user_venture ON public.token_balances(user_id, venture_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.token_transactions;