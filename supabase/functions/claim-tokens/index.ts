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
    const { ventureId, amount, tokenSymbol, walletAddress } = await req.json();

    if (!ventureId || !amount || !tokenSymbol || !walletAddress) {
      throw new Error('Missing required fields');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('Processing token claim for user:', user.id);

    // Get current balance
    const { data: balance } = await supabase
      .from('token_balances')
      .select('*')
      .eq('venture_id', ventureId)
      .eq('user_id', user.id)
      .single();

    if (!balance || balance.claimable < amount) {
      throw new Error('Insufficient claimable tokens');
    }

    // Create transaction record
    const { data: transaction, error: txError } = await supabase
      .from('token_transactions')
      .insert({
        venture_id: ventureId,
        user_id: user.id,
        transaction_type: 'claim',
        amount: amount,
        token_symbol: tokenSymbol,
        wallet_address: walletAddress,
        status: 'pending'
      })
      .select()
      .single();

    if (txError) {
      console.error('Transaction creation error:', txError);
      throw new Error('Failed to create transaction');
    }

    // Simulate TON blockchain interaction
    // In production, this would:
    // 1. Connect to TON blockchain
    // 2. Call smart contract to transfer tokens
    // 3. Wait for confirmation
    // 4. Get transaction hash
    
    const mockTxHash = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const mockGasFee = 0.75;

    // Update transaction with hash
    await supabase
      .from('token_transactions')
      .update({
        status: 'completed',
        transaction_hash: mockTxHash,
        gas_fee: mockGasFee,
        completed_at: new Date().toISOString()
      })
      .eq('id', transaction.id);

    // Update balance
    await supabase
      .from('token_balances')
      .update({
        claimed: balance.claimed + amount,
        claimable: balance.claimable - amount,
        wallet_address: walletAddress,
        updated_at: new Date().toISOString()
      })
      .eq('venture_id', ventureId)
      .eq('user_id', user.id);

    console.log('Token claim completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        transaction: {
          id: transaction.id,
          transaction_hash: mockTxHash,
          amount: amount,
          gas_fee: mockGasFee,
          status: 'completed'
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in claim-tokens:', error);
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
