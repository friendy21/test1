'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import { 
  PLANS, 
  formatCurrency, 
  createCheckoutSession, 
  PlanType, 
  getPlanPrice 
} from '@/lib/stripe';
import styles from './PricingPlans.module.css';

const PricingPlans: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');
  const [isLoading, setIsLoading] = useState<PlanType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handlePlanSelection = async (planType: PlanType) => {
    try {
      // Clear any previous errors
      setError(null);
      
      // Enterprise plan redirects to contact page
      if (planType === 'enterprise') {
        router.push('/contact?plan=enterprise');
        return;
      }
      
      setIsLoading(planType);
      
      // Get the price based on the current billing cycle
      const priceData = getPlanPrice(planType, billingCycle);
      
      // For testing, we'll use our mock checkout implementation
      const successUrl = `${siteUrl}/checkout/success`;
      const cancelUrl = `${siteUrl}/pricing`;
      
      await createCheckoutSession({
        priceId: priceData.id, 
        successUrl,
        cancelUrl,
        mode: 'subscription'
      });
      
      // NOTE: In test mode, createCheckoutSession handles the redirect directly
      
    } catch (error: any) {
      console.error('Failed to handle plan selection:', error);
      setError(error.message || 'There was an error processing your request. Please try again later.');
      setIsLoading(null);
    }
  };

  const toggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'month' ? 'year' : 'month');
  };

  // Calculate price based on billing cycle
  const getAdjustedPrice = (price: number) => {
    if (billingCycle === 'year') {
      return (price * 10); // 12 months - 2 months free (16.67% discount)
    }
    return price;
  };

  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingHeader}>
        <h2 className={styles.title}>Transparent Pricing for Every Organization</h2>
        <p className={styles.subtitle}>
          Choose the plan that fits your organization&apos;s size and needs. All plans include core analytics features.
        </p>
        
        {error && (
          <div className={styles.errorAlert}>
            <p>{error}</p>
          </div>
        )}
        
        <div className={styles.billingToggle}>
          <span className={`${styles.billingOption} ${billingCycle === 'month' ? styles.active : ''}`}>
            Monthly
          </span>
          
          <label className={styles.switch}>
            <input 
              type="checkbox" 
              checked={billingCycle === 'year'} 
              onChange={toggleBillingCycle}
            />
            <span className={styles.slider}></span>
          </label>
          
          <span className={`${styles.billingOption} ${billingCycle === 'year' ? styles.active : ''}`}>
            Annually
            <span className={styles.discount}>Save 16%</span>
          </span>
        </div>
      </div>
      
      <div className={styles.plansContainer}>
        {PLANS.map((plan) => {
          const price = plan.price.unit_amount;
          const adjustedPrice = getAdjustedPrice(price);
          const isEnterprise = plan.type === 'enterprise';
          
          return (
            <div 
              key={plan.id} 
              className={`${styles.planCard} ${plan.popular ? styles.popularPlan : ''}`}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              
              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>
              
              <div className={styles.planPricing}>
                {isEnterprise ? (
                  <div className={styles.customPricing}>Custom Pricing</div>
                ) : (
                  <>
                    <div className={styles.price}>
                      {formatCurrency(adjustedPrice)}
                      <span className={styles.billingPeriod}>
                        /{billingCycle}
                      </span>
                    </div>
                    <div className={styles.priceCaption}>
                      {billingCycle === 'month' ? 'per month' : 'billed annually'}
                    </div>
                  </>
                )}
              </div>
              
              <ul className={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.checkmark}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className={styles.planFooter}>
                {isEnterprise ? (
                  <Link href="/contact?plan=enterprise" legacyBehavior passHref>
                    <Button 
                      variant="outline" 
                      size="large" 
                      fullWidth
                    >
                      Contact Sales
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    size="large" 
                    fullWidth
                    disabled={isLoading !== null}
                    onClick={() => handlePlanSelection(plan.type)}
                  >
                    {isLoading === plan.type ? 'Processing...' : plan.callToAction}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className={styles.enterpriseNote}>
        <h3 className={styles.noteTitle}>Looking for an Enterprise solution?</h3>
        <p className={styles.noteText}>
          We offer custom implementations for organizations with specific requirements. Our team will work with you to create a solution that meets your unique needs.
        </p>
        <Link href="/contact?plan=enterprise" legacyBehavior passHref>
          <Button variant="secondary">Schedule a Consultation</Button>
        </Link>
      </div>

      {/* Test mode indicator */}
      <div className={styles.testModeIndicator}>
        <p>🧪 Test Mode Active</p>
        <small>This is running in test mode with mock Stripe checkout. No real payments are processed.</small>
      </div>
    </section>
  );
};

export default PricingPlans;