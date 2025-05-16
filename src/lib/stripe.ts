import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error('Stripe publishable key is not defined in environment variables');
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
      id: 'price_starter',
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
      id: 'price_professional',
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
      id: 'price_enterprise',
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

export async function createCheckoutSession(priceId: string, successUrl: string, cancelUrl: string) {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        successUrl,
        cancelUrl,
      }),
    });

    const { sessionId } = await response.json();
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Failed to load Stripe.js');
    }
    
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw new Error(error.message || 'An unknown error occurred');
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}