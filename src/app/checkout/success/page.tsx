'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import styles from './page.module.css';

export default function CheckoutSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // In a real application, you would verify the checkout session
      // with your backend and get customer details
      fetchCheckoutSession(sessionId);
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  const fetchCheckoutSession = async (sessionId: string) => {
    try {
      // Simulate API call to get session details
      // In a real app, you would fetch this from your API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock email for demo purposes
      setCustomerEmail('customer@example.com');
    } catch (error) {
      console.error('Error fetching checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Processing your order...</p>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className={styles.errorContainer}>
        <h1>Invalid Checkout Session</h1>
        <p>We couldn't find your checkout session. If you believe this is an error, please contact support.</p>
        <Link href="/pricing" legacyBehavior passHref>
          <Button variant="primary">Return to Pricing</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.successContainer}>
      <div className={styles.successCard}>
        <div className={styles.successIcon}>
          <Image 
            src="/images/icons/success-checkmark.svg" 
            alt="Success" 
            width={80} 
            height={80}
            priority
          />
        </div>
        
        <h1 className={styles.title}>Payment Successful!</h1>
        
        <p className={styles.message}>
          Thank you for subscribing to Glynac. We're excited to help you transform your workplace analytics!
        </p>
        
        {customerEmail && (
          <div className={styles.detailsCard}>
            <p className={styles.detailsText}>
              We've sent a confirmation email to <strong>{customerEmail}</strong> with your order details and next steps.
            </p>
          </div>
        )}
        
        <div className={styles.nextSteps}>
          <h2 className={styles.nextStepsTitle}>What happens next?</h2>
          
          <ol className={styles.stepsList}>
            <li className={styles.step}>
              <span className={styles.stepNumber}>1</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Account Setup</h3>
                <p className={styles.stepDescription}>
                  Our team will create your account and send login credentials within 24 hours.
                </p>
              </div>
            </li>
            
            <li className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Onboarding Call</h3>
                <p className={styles.stepDescription}>
                  Schedule an onboarding call with our customer success team to help you get started.
                </p>
              </div>
            </li>
            
            <li className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Integration Setup</h3>
                <p className={styles.stepDescription}>
                  We'll guide you through connecting Glynac with your existing workplace tools.
                </p>
              </div>
            </li>
          </ol>
        </div>
        
        <div className={styles.actions}>
          <Link href="/" legacyBehavior passHref>
            <Button variant="primary" size="large">Go to Homepage</Button>
          </Link>
          
          <Link href="/contact?subject=order_support" legacyBehavior passHref>
            <Button variant="outline" size="large">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}