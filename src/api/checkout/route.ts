
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with test mode secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Use a stable Stripe API version
});

export async function POST(req: NextRequest) {
  try {
    console.log('Checkout API called');
    
    // Parse the request body
    const { priceId, successUrl, cancelUrl } = await req.json();
    
    // Debug log
    console.log('Request data:', { priceId, successUrl, cancelUrl });
    
    // Validate required parameters
    if (!priceId || !successUrl || !cancelUrl) {
      console.error('Missing required parameters');
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Create a checkout session with test mode configuration
    console.log('Creating Stripe checkout session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      metadata: {
        source: 'website_pricing_page',
        test_mode: 'true'
      },
    });

    console.log('Checkout session created:', session.id);
    return NextResponse.json({ sessionId: session.id });
    
  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    let errorMessage = 'An unknown error occurred';
    let errorDetails = {};
    
    if (error instanceof Stripe.errors.StripeError) {
      errorMessage = error.message;
      errorDetails = {
        type: error.type,
        code: error.code,
        param: error.param,
      };
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    console.error('Error details:', errorMessage, errorDetails);
    
    return NextResponse.json(
      { error: errorMessage, details: errorDetails },
      { status: 500 }
    );
  }
}