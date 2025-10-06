import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  sessionId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Initialize Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')

    // Get user from JWT token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse request body
    const { sessionId }: RequestBody = await req.json()

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Session ID is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Session not found' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify the session belongs to the authenticated user
    if (session.metadata?.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: 'Session does not belong to user' }),
        { 
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get payment session from database
    const { data: paymentSession, error: sessionError } = await supabaseClient
      .from('studio_payment_sessions')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .eq('user_id', user.id)
      .single()

    if (sessionError || !paymentSession) {
      return new Response(
        JSON.stringify({ error: 'Payment session not found' }),
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get payment history if it exists
    const { data: paymentHistory } = await supabaseClient
      .from('studio_payment_history')
      .select('*')
      .eq('stripe_payment_intent_id', session.payment_intent as string)
      .eq('user_id', user.id)
      .single()

    // Get current user credits
    const { data: userCredits } = await supabaseClient
      .from('studio_user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single()

    const response = {
      session: {
        id: session.id,
        status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email,
      },
      payment: {
        package_id: paymentSession.package_id,
        credits_purchased: paymentSession.credits_amount,
        amount_paid: paymentSession.price_amount,
        status: paymentSession.status,
        created_at: paymentSession.created_at,
        completed_at: paymentSession.completed_at,
      },
      user: {
        current_credits: userCredits?.credits || 0,
      },
      history: paymentHistory ? {
        id: paymentHistory.id,
        payment_method: paymentHistory.payment_method,
        receipt_url: paymentHistory.receipt_url,
        created_at: paymentHistory.created_at,
      } : null
    }

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error handling payment success:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})