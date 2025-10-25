-- Create table for AI clarification questions and answers
CREATE TABLE public.idea_clarifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  questions JSONB NOT NULL, -- Array of {id, question, helperText}
  answers JSONB DEFAULT '{}', -- Object with question_id: answer pairs
  status TEXT NOT NULL CHECK (status IN ('pending', 'answered', 'processed')) DEFAULT 'pending',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '48 hours'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.idea_clarifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own clarifications
CREATE POLICY "Users can view their own clarifications"
  ON public.idea_clarifications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own clarifications
CREATE POLICY "Users can insert their own clarifications"
  ON public.idea_clarifications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own clarifications
CREATE POLICY "Users can update their own clarifications"
  ON public.idea_clarifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_clarifications_idea_id ON public.idea_clarifications(idea_id);
CREATE INDEX idx_clarifications_user_id ON public.idea_clarifications(user_id);
CREATE INDEX idx_clarifications_status ON public.idea_clarifications(status);

-- Create trigger for updated_at
CREATE TRIGGER update_clarifications_updated_at
  BEFORE UPDATE ON public.idea_clarifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();