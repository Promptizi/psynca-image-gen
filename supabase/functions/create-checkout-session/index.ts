import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  packageId: string;
  successUrl?: string;
  cancelUrl?: string;
}

const packageConfigs = {
  basic: {
    name: "Pacote Básico",
    credits: 10,
    price: 999, // R$ 9.99 em centavos
    description: "Ideal para começar"
  },
  premium: {
    name: "Pacote Premium", 
    credits: 60,
    price: 4999, // R$ 49.99 em centavos
    description: "20% de bônus"
  },
  professional: {
    name: "Pacote Profissional",
    credits: 125,
    price: 9999, // R$ 99.99 em centavos
    description: "25% de bônus"
  }
};

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
    const { packageId, successUrl, cancelUrl }: RequestBody = await req.json()

    // Validate package
    const packageConfig = packageConfigs[packageId as keyof typeof packageConfigs]
    if (!packageConfig) {
      return new Response(
        JSON.stringify({ error: 'Invalid package ID' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user has Stripe customer record
    let { data: customerData } = await supabaseClient
      .from('studio_stripe_customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    let customerId = customerData?.stripe_customer_id

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
          project: 'psynka-studio'
        }
      })

      customerId = customer.id

      // Save customer to database
      await supabaseClient
        .from('studio_stripe_customers')
        .insert({
          user_id: user.id,
          stripe_customer_id: customerId
        })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: packageConfig.name,
              description: `${packageConfig.credits} créditos - ${packageConfig.description}`,
              metadata: {
                package_id: packageId,
                credits: packageConfig.credits.toString()
              }
            },
            unit_amount: packageConfig.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${req.headers.get('origin')}/credits?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/credits?cancelled=true`,
      metadata: {
        user_id: user.id,
        package_id: packageId,
        credits_amount: packageConfig.credits.toString()
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
    })

    // Save session to database
    await supabaseClient
      .from('studio_payment_sessions')
      .insert({
        user_id: user.id,
        stripe_session_id: session.id,
        package_id: packageId,
        credits_amount: packageConfig.credits,
        price_amount: packageConfig.price,
        status: 'pending',
        expires_at: new Date(session.expires_at * 1000).toISOString()
      })

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error creating checkout session:', error)
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