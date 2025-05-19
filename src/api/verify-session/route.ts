
import { NextApiRequest, NextApiResponse } from 'next/types';
import Stripe from 'stripe';

// Initialize Stripe with test mode secret key
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session_id: sessionId } = req.query;
    
    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'Missing session_id parameter' });
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription', 'line_items']
    });

    // Format and return the response data
    const responseData = {
      success: true,
      customer: {
        email: session.customer_email || (session.customer as Stripe.Customer)?.email,
        name: (session.customer as Stripe.Customer)?.name,
      },
      subscription: {
        id: session.subscription?.id,
        status: (session.subscription as Stripe.Subscription)?.status,
        plan: (session.subscription as Stripe.Subscription)?.items?.data[0]?.plan?.nickname,
      },
      payment: {
        amount: session.amount_total,
        currency: session.currency,
        status: session.payment_status,
      }
    };

    return res.status(200).json(responseData);
    
  } catch (error) {
    console.error('Error verifying session:', error);
    
    let errorMessage = 'An unknown error occurred';
    let errorCode = 500;
    
    if (error instanceof Stripe.errors.StripeError) {
      errorMessage = error.message;
      errorCode = error.statusCode || 500;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return res.status(errorCode).json({ error: errorMessage, success: false });
  }
}