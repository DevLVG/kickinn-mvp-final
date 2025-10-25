import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clarificationId, answers } = await req.json();

    if (!clarificationId || !answers) {
      throw new Error('clarificationId and answers are required');
    }

    // Create Supabase client with auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('Submitting answers for clarification:', clarificationId);

    // Update clarification with answers
    const { data: clarification, error: updateError } = await supabase
      .from('idea_clarifications')
      .update({
        answers,
        status: 'answered',
        updated_at: new Date().toISOString()
      })
      .eq('id', clarificationId)
      .eq('user_id', user.id) // Ensure user owns this clarification
      .select()
      .single();

    if (updateError) {
      console.error('Database error:', updateError);
      throw new Error(`Failed to save answers: ${updateError.message}`);
    }

    if (!clarification) {
      throw new Error('Clarification not found or access denied');
    }

    console.log('Answers saved successfully');

    // TODO: In production, trigger re-validation workflow here
    // This could be:
    // 1. Call another edge function to re-analyze the idea with new answers
    // 2. Update idea status to trigger validation pipeline
    // 3. Send notification to idea owner when re-validation completes

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Answers submitted successfully. The AI will re-analyze your submission within 24 hours.',
        clarification 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in submit-clarification-answers:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
