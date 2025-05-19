import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in your environment variables');
}

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28',
});

export async function GET(req: NextRequest) {
  try {
    // Get the session ID from the query parameters
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
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

    return NextResponse.json(responseData);
    
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
    
    return NextResponse.json(
      { error: errorMessage, success: false },
      { status: errorCode }
    );
  }
}