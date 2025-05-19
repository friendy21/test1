import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('Stripe publishable key is not defined');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export type PriceData = {
  id: string;
  name: string;
  description: string;
  recurring?: {
    interval: 'month' | 'year';
  };
  unit_amount: number;
  currency: string;
};

export type PlanType = 'starter' | 'professional' | 'enterprise';

export type PlanData = {
  id: string;
  type: PlanType;
  name: string;
  description: string;
  price: PriceData;
  features: string[];
  popular?: boolean;
  callToAction: string;
};

// These would typically come from your Stripe dashboard or API
export const PLANS: PlanData[] = [
  {
    id: 'plan_starter',
    type: 'starter',
    name: 'Starter',
    description: 'Perfect for teams getting started with workplace analytics',
    price: {
      id: 'price_starter_monthly', 
      name: 'Starter Plan',
      description: 'Monthly subscription for Starter Plan',
      recurring: {
        interval: 'month'
      },
      unit_amount: 99900, // $999.00
      currency: 'usd'
    },
    features: [
      'Up to 100 employees',
      'Basic risk detection',
      'Workload analytics',
      'Weekly summary reports',
      'Email support',
      '30-day data retention'
    ],
    callToAction: 'Get Started'
  },
  {
    id: 'plan_professional',
    type: 'professional',
    name: 'Professional',
    description: 'Comprehensive analytics for mid-sized organizations',
    price: {
      id: 'price_professional_monthly', // This should match your actual Stripe price ID
      name: 'Professional Plan',
      description: 'Monthly subscription for Professional Plan',
      recurring: {
        interval: 'month'
      },
      unit_amount: 249900, // $2,499.00
      currency: 'usd'
    },
    features: [
      'Up to 500 employees',
      'Advanced risk detection',
      'Sentiment analysis',
      'Custom dashboards',
      'Department comparisons',
      'Priority support',
      '90-day data retention'
    ],
    popular: true,
    callToAction: 'Subscribe Now'
  },
  {
    id: 'plan_enterprise',
    type: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: {
      id: '', // Enterprise plans typically don't have a fixed price ID
      name: 'Enterprise Plan',
      description: 'Custom pricing for Enterprise Plan',
      unit_amount: 0, // Custom pricing
      currency: 'usd'
    },
    features: [
      'Unlimited employees',
      'Custom risk rules',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated success manager',
      'On-premise deployment option',
      'Custom data retention',
      'SLA guarantees'
    ],
    callToAction: 'Contact Sales'
  }
];

export const formatCurrency = (amount: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100);
};

// Get plan by interval (month/year)
export const getPlanPrice = (planType: PlanType, interval: 'month' | 'year'): PriceData => {
  const plan = PLANS.find(p => p.type === planType);
  
  if (!plan) {
    throw new Error(`Plan not found for type: ${planType}`);
  }
  
  // If it's an enterprise plan with no fixed price
  if (planType === 'enterprise') {
    return plan.price;
  }
  
  // For annual billing, we could either:
  // 1. Use a different price ID (recommended)
  // 2. Calculate a discounted amount (as shown below)
  if (interval === 'year') {
    return {
      ...plan.price,
      id: plan.price.id.replace('_monthly', '_yearly'), // Assuming you have yearly price IDs
      unit_amount: plan.price.unit_amount * 10, // 12 months with 2 months free
      recurring: {
        interval: 'year'
      }
    };
  }
  
  return plan.price;
};

export interface CheckoutOptions {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  mode?: 'subscription' | 'payment';
}

export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  mode = 'subscription'
}: CheckoutOptions) {
  try {
    // Make API call to your backend endpoint
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        successUrl,
        cancelUrl,
        mode,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API request failed');
    }

    const { sessionId } = await response.json();
    
    // Get Stripe instance
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Failed to load Stripe.js');
    }
    
    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Stripe redirect error:', error);
      throw new Error(error.message || 'Failed to redirect to checkout');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}