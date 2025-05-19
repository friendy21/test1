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

// For testing purposes, we're using Stripe's test mode price ID format
// In test mode, Stripe accepts this format even for non-existent products
// Format: price_XXXXXXXXXXXXXXXXXXXXXXXX
// DO NOT use these in production - they're for testing only
const TEST_PRICE_IDS = {
  starter: {
    monthly: 'price_1234567890', // Dummy ID for testing
    yearly: 'price_0987654321',  // Dummy ID for testing
  },
  professional: {
    monthly: 'price_1357924680', // Dummy ID for testing
    yearly: 'price_0864297531',  // Dummy ID for testing
  }
};

// These would typically come from your Stripe dashboard or API
export const PLANS: PlanData[] = [
  {
    id: 'plan_starter',
    type: 'starter',
    name: 'Starter',
    description: 'Perfect for teams getting started with workplace analytics',
    price: {
      id: TEST_PRICE_IDS.starter.monthly, 
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
      id: TEST_PRICE_IDS.professional.monthly,
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
  
  // For annual billing, use the yearly price ID
  if (interval === 'year') {
    const yearlyPriceId = planType === 'starter' 
      ? TEST_PRICE_IDS.starter.yearly 
      : TEST_PRICE_IDS.professional.yearly;
      
    return {
      ...plan.price,
      id: yearlyPriceId,
      unit_amount: plan.price.unit_amount * 10, // 12 months with 2 months free (16.67% discount)
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

// Mock implementation for testing
export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  mode = 'subscription'
}: CheckoutOptions): Promise<{ success: boolean }> {
  // For testing, we'll just simulate a successful redirect to the success page
  console.log('TEST MODE: Creating mock checkout session with:', { priceId, successUrl, cancelUrl, mode });
  
  // Mock delay to simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In test mode, just redirect to the success page directly
  window.location.href = `${successUrl}?session_id=cs_test_mock_session_id_${Math.random().toString(36).substring(2, 15)}`;
  
  return { success: true };
}