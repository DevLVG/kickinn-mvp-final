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
    const { 
      dealId, 
      ventureId, 
      amountUsdt, 
      tokensReceived, 
      tokenPrice, 
      walletAddress, 
      kycVerified,
      termsAccepted 
    } = await req.json();

    // Validate inputs
    if (!dealId || !ventureId || !amountUsdt || !tokensReceived || !walletAddress) {
      throw new Error('Missing required fields');
    }

    if (!kycVerified) {
      throw new Error('KYC verification required');
    }

    if (!termsAccepted) {
      throw new Error('Terms must be accepted');
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

    console.log('Processing investment for user:', user.id);

    // Create investment record
    const { data: investment, error: investmentError } = await supabase
      .from('investments')
      .insert({
        deal_id: dealId,
        venture_id: ventureId,
        investor_id: user.id,
        amount_usdt: amountUsdt,
        tokens_received: tokensReceived,
        token_price: tokenPrice,
        wallet_address: walletAddress,
        kyc_verified: kycVerified,
        terms_accepted: termsAccepted,
        terms_accepted_at: new Date().toISOString(),
        status: 'pending'
      })
      .select()
      .single();

    if (investmentError) {
      console.error('Investment creation error:', investmentError);
      throw new Error(`Failed to create investment: ${investmentError.message}`);
    }

    // Log investment creation
    await supabase
      .from('investment_logs')
      .insert({
        investment_id: investment.id,
        action: 'created',
        details: {
          amount_usdt: amountUsdt,
          tokens_received: tokensReceived,
          wallet_address: walletAddress
        }
      });

    console.log('Investment created:', investment.id);

    // Simulate wallet connection and transaction
    // In production, this would:
    // 1. Connect to TON/MetaMask wallet
    // 2. Request USDT transfer to smart contract
    // 3. Mint tokens and send to investor wallet
    // 4. Get transaction hash from blockchain
    
    // For MVP, we simulate a successful transaction
    const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    
    // Update investment status
    const { error: updateError } = await supabase
      .from('investments')
      .update({
        status: 'completed',
        transaction_hash: mockTransactionHash,
        completed_at: new Date().toISOString()
      })
      .eq('id', investment.id);

    if (updateError) {
      console.error('Investment update error:', updateError);
      throw new Error('Failed to complete investment');
    }

    // Log completion
    await supabase
      .from('investment_logs')
      .insert({
        investment_id: investment.id,
        action: 'payment_completed',
        details: {
          transaction_hash: mockTransactionHash,
          status: 'completed'
        }
      });

    console.log('Investment completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        investment: {
          id: investment.id,
          transaction_hash: mockTransactionHash,
          status: 'completed',
          amount_usdt: amountUsdt,
          tokens_received: tokensReceived
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in process-investment:', error);
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
