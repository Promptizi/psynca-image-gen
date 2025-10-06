import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use service role for admin operations
)

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  if (!signature || !webhookSecret) {
    return new Response('Webhook signature missing', { status: 400 })
  }

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    
    console.log(`Received event: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
        
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
        
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent)
        break
        
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: 'Webhook handler failed', message: error.message }),
      { status: 400 }
    )
  }
})

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const userId = session.metadata?.user_id
    const packageId = session.metadata?.package_id
    const creditsAmount = parseInt(session.metadata?.credits_amount || '0')

    if (!userId || !packageId || !creditsAmount) {
      throw new Error('Missing required metadata in session')
    }

    console.log(`Processing checkout completion for user ${userId}, package ${packageId}`)

    // Update payment session status
    const { error: sessionError } = await supabaseClient
      .from('studio_payment_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('stripe_session_id', session.id)

    if (sessionError) {
      console.error('Error updating payment session:', sessionError)
    }

    // Get current user credits
    const { data: currentCredits, error: creditsError } = await supabaseClient
      .from('studio_user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single()

    if (creditsError) {
      console.error('Error fetching current credits:', creditsError)
      throw new Error('Failed to get current credits')
    }

    // Add purchased credits
    const newCreditsTotal = (currentCredits?.credits || 0) + creditsAmount

    const { error: updateError } = await supabaseClient
      .from('studio_user_credits')
      .update({
        credits: newCreditsTotal,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating credits:', updateError)
      throw new Error('Failed to update credits')
    }

    // Create payment history record
    const { error: historyError } = await supabaseClient
      .from('studio_payment_history')
      .insert({
        user_id: userId,
        stripe_payment_intent_id: session.payment_intent as string,
        package_id: packageId,
        credits_purchased: creditsAmount,
        amount_paid: session.amount_total || 0,
        currency: session.currency || 'brl',
        payment_method: 'card', // Will be updated in payment_intent.succeeded
        status: 'succeeded'
      })

    if (historyError) {
      console.error('Error creating payment history:', historyError)
    }

    console.log(`Successfully processed payment for user ${userId}: +${creditsAmount} credits (total: ${newCreditsTotal})`)

  } catch (error) {
    console.error('Error in handleCheckoutCompleted:', error)
    throw error
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log(`Payment succeeded: ${paymentIntent.id}`)

    // Update payment history with payment method details
    if (paymentIntent.charges.data.length > 0) {
      const charge = paymentIntent.charges.data[0]
      
      const { error } = await supabaseClient
        .from('studio_payment_history')
        .update({
          stripe_charge_id: charge.id,
          payment_method: charge.payment_method_details?.type || 'unknown',
          stripe_fee: charge.application_fee_amount || 0,
          net_amount: charge.amount - (charge.application_fee_amount || 0),
          receipt_url: charge.receipt_url,
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntent.id)

      if (error) {
        console.error('Error updating payment history with charge details:', error)
      }
    }

  } catch (error) {
    console.error('Error in handlePaymentSucceeded:', error)
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log(`Payment failed: ${paymentIntent.id}`)

    // Update payment history
    const { error } = await supabaseClient
      .from('studio_payment_history')
      .update({
        status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('stripe_payment_intent_id', paymentIntent.id)

    if (error) {
      console.error('Error updating failed payment:', error)
    }

    // Update session status
    const { error: sessionError } = await supabaseClient
      .from('studio_payment_sessions')
      .update({
        status: 'failed'
      })
      .eq('stripe_session_id', paymentIntent.metadata?.session_id)

    if (sessionError) {
      console.error('Error updating session status:', sessionError)
    }

  } catch (error) {
    console.error('Error in handlePaymentFailed:', error)
  }
}