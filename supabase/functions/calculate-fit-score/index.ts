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
    const { opportunityId, requiredSkills, timelineWeeks } = await req.json();

    if (!opportunityId || !requiredSkills) {
      throw new Error('opportunityId and requiredSkills are required');
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

    console.log('Calculating fit score for opportunity:', opportunityId, 'user:', user.id);

    // Get executor profile
    const { data: executorProfile, error: profileError } = await supabase
      .from('executor_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileError) {
      console.error('Error fetching executor profile:', profileError);
      throw new Error('Failed to fetch executor profile');
    }

    // If no profile exists, create a default one for demo
    if (!executorProfile) {
      console.log('No executor profile found, creating default profile');
      const { data: newProfile, error: insertError } = await supabase
        .from('executor_profiles')
        .insert({
          user_id: user.id,
          skills: ['React', 'TypeScript', 'Node.js'],
          completed_projects: 5,
          total_projects: 6,
          average_delivery_speed: 95.00,
          reputation_score: 85.00,
          active_projects_count: 1
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating executor profile:', insertError);
        throw new Error('Failed to create executor profile');
      }
    }

    // Re-fetch after potential insert
    const { data: profile } = await supabase
      .from('executor_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Check if fit score already exists
    const { data: existingScore } = await supabase
      .from('opportunity_fit_scores')
      .select('*')
      .eq('opportunity_id', opportunityId)
      .eq('executor_id', user.id)
      .maybeSingle();

    if (existingScore) {
      console.log('Fit score already exists, returning cached result');
      return new Response(
        JSON.stringify({ 
          success: true, 
          fitScore: existingScore 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Call Lovable AI to calculate fit score
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are an AI matching system for Kick Inn platform. Calculate how well an executor fits an opportunity based on their profile.

Analyze these 4 components (with their weights):
1. Skills Match (40%) - How many required skills does the executor have?
2. Experience Level (25%) - Based on completed projects and reputation
3. Success Rate (20%) - Based on completion rate and reputation score
4. Delivery Speed (15%) - Based on historical delivery speed

Return ONLY a JSON object with this exact structure:
{
  "overall_score": 85.5,
  "skills_match": {
    "score": 80.0,
    "explanation": "Has 4 out of 5 required skills. Missing: Advanced Testing"
  },
  "experience_level": {
    "score": 90.0,
    "explanation": "Solid experience with 5 completed projects and 85% reputation score"
  },
  "success_rate": {
    "score": 83.3,
    "explanation": "83% project completion rate (5/6 projects completed)"
  },
  "delivery_speed": {
    "score": 95.0,
    "explanation": "Consistently delivers 5% faster than estimates"
  }
}

Scores must be between 0-100. Overall score is weighted average.`;

    const userPrompt = `Calculate fit score for this executor:

Executor Profile:
- Skills: ${profile?.skills?.join(', ') || 'None'}
- Completed Projects: ${profile?.completed_projects || 0}
- Total Projects: ${profile?.total_projects || 0}
- Average Delivery Speed: ${profile?.average_delivery_speed || 100}% of estimate
- Reputation Score: ${profile?.reputation_score || 0}/100
- Active Projects: ${profile?.active_projects_count || 0}

Opportunity Requirements:
- Required Skills: ${Array.isArray(requiredSkills) ? requiredSkills.join(', ') : requiredSkills}
- Timeline: ${timelineWeeks || 'Not specified'} weeks

Calculate the fit score components.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        throw new Error('AI rate limit exceeded. Please try again in a moment.');
      }
      if (aiResponse.status === 402) {
        throw new Error('AI credits depleted. Please contact support.');
      }
      throw new Error('Failed to calculate fit score');
    }

    const aiData = await aiResponse.json();
    const generatedContent = aiData.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated by AI');
    }

    console.log('AI generated fit score:', generatedContent);

    // Parse AI response
    let fitData;
    try {
      const jsonMatch = generatedContent.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : generatedContent;
      fitData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Failed to parse AI fit score calculation');
    }

    // Save to database
    const { data: fitScore, error: dbError } = await supabase
      .from('opportunity_fit_scores')
      .insert({
        opportunity_id: opportunityId,
        executor_id: user.id,
        overall_score: fitData.overall_score,
        skills_match_score: fitData.skills_match.score,
        skills_match_explanation: fitData.skills_match.explanation,
        experience_score: fitData.experience_level.score,
        experience_explanation: fitData.experience_level.explanation,
        success_rate_score: fitData.success_rate.score,
        success_rate_explanation: fitData.success_rate.explanation,
        delivery_speed_score: fitData.delivery_speed.score,
        delivery_speed_explanation: fitData.delivery_speed.explanation
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Failed to save fit score: ${dbError.message}`);
    }

    console.log('Fit score calculated and saved successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        fitScore 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in calculate-fit-score:', error);
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
