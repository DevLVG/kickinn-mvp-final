-- Create executor profiles table to store executor stats
CREATE TABLE public.executor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  skills TEXT[] NOT NULL DEFAULT '{}',
  specializations TEXT[] DEFAULT '{}',
  completed_projects INT NOT NULL DEFAULT 0,
  total_projects INT NOT NULL DEFAULT 0,
  average_delivery_speed DECIMAL(5,2) DEFAULT 100.00, -- percentage vs estimate (100 = on time, <100 = faster, >100 = slower)
  reputation_score DECIMAL(5,2) DEFAULT 0.00,
  active_projects_count INT NOT NULL DEFAULT 0,
  bio TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.executor_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Executor profiles are viewable by everyone"
  ON public.executor_profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own executor profile"
  ON public.executor_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own executor profile"
  ON public.executor_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create fit scores table
CREATE TABLE public.opportunity_fit_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id TEXT NOT NULL,
  executor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  overall_score DECIMAL(5,2) NOT NULL,
  skills_match_score DECIMAL(5,2) NOT NULL,
  skills_match_weight INT NOT NULL DEFAULT 40,
  skills_match_explanation TEXT,
  experience_score DECIMAL(5,2) NOT NULL,
  experience_weight INT NOT NULL DEFAULT 25,
  experience_explanation TEXT,
  success_rate_score DECIMAL(5,2) NOT NULL,
  success_rate_weight INT NOT NULL DEFAULT 20,
  success_rate_explanation TEXT,
  delivery_speed_score DECIMAL(5,2) NOT NULL,
  delivery_speed_weight INT NOT NULL DEFAULT 15,
  delivery_speed_explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(opportunity_id, executor_id)
);

-- Enable RLS
ALTER TABLE public.opportunity_fit_scores ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own fit scores"
  ON public.opportunity_fit_scores
  FOR SELECT
  USING (auth.uid() = executor_id);

CREATE POLICY "Users can insert their own fit scores"
  ON public.opportunity_fit_scores
  FOR INSERT
  WITH CHECK (auth.uid() = executor_id);

CREATE POLICY "Users can update their own fit scores"
  ON public.opportunity_fit_scores
  FOR UPDATE
  USING (auth.uid() = executor_id);

-- Create indexes
CREATE INDEX idx_executor_profiles_user_id ON public.executor_profiles(user_id);
CREATE INDEX idx_fit_scores_opportunity ON public.opportunity_fit_scores(opportunity_id);
CREATE INDEX idx_fit_scores_executor ON public.opportunity_fit_scores(executor_id);

-- Create trigger for updated_at
CREATE TRIGGER update_executor_profiles_updated_at
  BEFORE UPDATE ON public.executor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fit_scores_updated_at
  BEFORE UPDATE ON public.opportunity_fit_scores
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();