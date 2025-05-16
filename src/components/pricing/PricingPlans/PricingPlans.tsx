'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import { PLANS, formatCurrency, createCheckoutSession, PlanType } from '@/lib/stripe';
import styles from './PricingPlans.module.css';

const PricingPlans: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('month');
  const [isLoading, setIsLoading] = useState<PlanType | null>(null);
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const handlePlanSelection = async (planType: PlanType) => {
    try {
      const plan = PLANS.find(p => p.type === planType);
      
      if (!plan) {
        throw new Error('Plan not found');
      }
      
      // Enterprise plan redirects to contact page
      if (planType === 'enterprise') {
        router.push('/contact?plan=enterprise');
        return;
      }
      
      // Check if the plan has a price
      if (!plan.price.id) {
        throw new Error('This plan is not available for direct purchase');
      }
      
      setIsLoading(planType);
      
      const successUrl = `${siteUrl}/checkout/success`;
      const cancelUrl = `${siteUrl}/pricing`;
      
      await createCheckoutSession(
        plan.price.id, 
        successUrl,
        cancelUrl
      );
      
    } catch (error) {
      console.error('Failed to handle plan selection:', error);
      alert('There was an error processing your request. Please try again later.');
    } finally {
      setIsLoading(null);
    }
  };

  const toggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'month' ? 'year' : 'month');
  };

  // Apply discount for annual billing (2 months free)
  const getAdjustedPrice = (price: number, interval: 'month' | 'year') => {
    if (interval === 'year') {
      return (price * 10); // 12 months - 2 months free
    }
    return price;
  };

  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingHeader}>
        <h2 className={styles.title}>Transparent Pricing for Every Organization</h2>
        <p className={styles.subtitle}>
          Choose the plan that fits your organization&apos; size and needs. All plans include core analytics features.
        </p>
        
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
          const adjustedPrice = getAdjustedPrice(price, billingCycle);
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
    </section>
  );
};

export default PricingPlans;