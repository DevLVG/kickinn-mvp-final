-- Create wallet_connection_logs table for security tracking
CREATE TABLE public.wallet_connection_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  wallet_address TEXT NOT NULL,
  wallet_type TEXT NOT NULL CHECK (wallet_type IN ('metamask', 'ton')),
  action TEXT NOT NULL CHECK (action IN ('connected', 'disconnected', 'rejected', 'failed')),
  ip_address TEXT,
  user_agent TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS on wallet_connection_logs
ALTER TABLE public.wallet_connection_logs ENABLE ROW LEVEL SECURITY;

-- Users can only view their own connection logs
CREATE POLICY "Users can view their own connection logs"
  ON public.wallet_connection_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can insert connection logs (system level)
CREATE POLICY "Authenticated users can insert connection logs"
  ON public.wallet_connection_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_wallet_logs_user_id ON public.wallet_connection_logs(user_id);
CREATE INDEX idx_wallet_logs_created_at ON public.wallet_connection_logs(created_at DESC);