// This is a script to create test price IDs on Stripe
// Run it with Node.js to create your test prices

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createTestProducts() {
  try {
    // Create Starter Product
    const starterProduct = await stripe.products.create({
      name: 'Starter Plan',
      description: 'Perfect for teams getting started with workplace analytics',
    });
    
    // Create monthly price for Starter
    const starterMonthlyPrice = await stripe.prices.create({
      unit_amount: 99900, // $999.00
      currency: 'usd',
      recurring: { interval: 'month' },
      product: starterProduct.id,
      nickname: 'Starter Monthly',
    });
    
    // Create yearly price for Starter (with 16% discount)
    const starterYearlyPrice = await stripe.prices.create({
      unit_amount: 999000, // $9,990.00 (yearly)
      currency: 'usd',
      recurring: { interval: 'year' },
      product: starterProduct.id,
      nickname: 'Starter Yearly',
    });

    // Create Professional Product
    const professionalProduct = await stripe.products.create({
      name: 'Professional Plan',
      description: 'Comprehensive analytics for mid-sized organizations',
    });
    
    // Create monthly price for Professional
    const professionalMonthlyPrice = await stripe.prices.create({
      unit_amount: 249900, // $2,499.00
      currency: 'usd',
      recurring: { interval: 'month' },
      product: professionalProduct.id,
      nickname: 'Professional Monthly',
    });
    
    // Create yearly price for Professional (with 16% discount)
    const professionalYearlyPrice = await stripe.prices.create({
      unit_amount: 2499000, // $24,990.00 (yearly)
      currency: 'usd',
      recurring: { interval: 'year' },
      product: professionalProduct.id,
      nickname: 'Professional Yearly',
    });

    console.log('Test products and prices created:');
    console.log('Starter Monthly Price ID:', starterMonthlyPrice.id);
    console.log('Starter Yearly Price ID:', starterYearlyPrice.id);
    console.log('Professional Monthly Price ID:', professionalMonthlyPrice.id);
    console.log('Professional Yearly Price ID:', professionalYearlyPrice.id);
    
    // Use these IDs in your application
  } catch (error) {
    console.error('Error creating test products and prices:', error);
  }
}

createTestProducts();