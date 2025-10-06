import { loadStripe, Stripe } from '@stripe/stripe-js';
import { supabase } from '@/integrations/supabase/client';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error('Stripe publishable key not found in environment variables');
      return Promise.resolve(null);
    }
    
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export interface CreateCheckoutSessionParams {
  packageId: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface PaymentSuccessResponse {
  session: {
    id: string;
    status: string;
    amount_total: number;
    currency: string;
    customer_email?: string;
  };
  payment: {
    package_id: string;
    credits_purchased: number;
    amount_paid: number;
    status: string;
    created_at: string;
    completed_at?: string;
  };
  user: {
    current_credits: number;
  };
  history?: {
    id: string;
    payment_method: string;
    receipt_url?: string;
    created_at: string;
  } | null;
}

export const createCheckoutSession = async (
  params: CreateCheckoutSessionParams
): Promise<CheckoutSessionResponse> => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('User not authenticated');
  }

  const response = await supabase.functions.invoke('create-checkout-session', {
    body: params,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (response.error) {
    throw new Error(response.error.message || 'Failed to create checkout session');
  }

  return response.data;
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await getStripe();
  
  if (!stripe) {
    throw new Error('Stripe not initialized');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    throw new Error(error.message || 'Failed to redirect to checkout');
  }
};

export const handlePaymentSuccess = async (
  sessionId: string
): Promise<PaymentSuccessResponse> => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('User not authenticated');
  }

  const response = await supabase.functions.invoke('handle-payment-success', {
    body: { sessionId },
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (response.error) {
    throw new Error(response.error.message || 'Failed to handle payment success');
  }

  return response.data;
};

export const formatCurrency = (amount: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount / 100); // Stripe uses cents
};

export default getStripe;