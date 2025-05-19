import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('STUB: Checkout API called');
    
    const { priceId, successUrl, cancelUrl } = await req.json();
    console.log('Request data:', { priceId, successUrl, cancelUrl });
    
    // Validate required parameters
    if (!priceId || !successUrl || !cancelUrl) {
      console.error('Missing required parameters');
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // For testing, we'll just create a mock session ID
    const mockSessionId = `cs_test_mock_${Math.random().toString(36).substring(2, 15)}`;
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('STUB: Created mock checkout session:', mockSessionId);
    return NextResponse.json({ sessionId: mockSessionId });
    
  } catch (error) {
    console.error('STUB: Checkout error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred in test mode checkout' },
      { status: 500 }
    );
  }
}