-- Enable realtime for investments table
ALTER PUBLICATION supabase_realtime ADD TABLE public.investments;

-- Enable realtime for investment_logs table
ALTER PUBLICATION supabase_realtime ADD TABLE public.investment_logs;