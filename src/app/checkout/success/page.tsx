'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Button from '@/components/common/Button/Button';
import styles from '../success/page.module.css';

export default function CheckoutSuccessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDetails, setSessionDetails] = useState<{
    customerEmail?: string;
    planName?: string;
    subscriptionId?: string;
  } | null>(null);
  
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setIsLoading(false);
      return;
    }

    const verifySession = async () => {
      try {
        // In a production app, this would be a real API call to verify the session
        // and get customer details from your database or Stripe
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to verify checkout session');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setSessionDetails({
            customerEmail: data.customer.email || 'customer@example.com',
            planName: data.subscription.plan || 'Professional Plan',
            subscriptionId: data.subscription.id || 'sub_123456789'
          });
        }
      } catch (error) {
        console.error('Error verifying checkout session:', error);
        toast.error('Could not verify your subscription. Please contact support.');
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate API call to verify session
    setTimeout(() => {
      setSessionDetails({
        customerEmail: 'customer@example.com',
        planName: 'Professional Plan',
        subscriptionId: 'sub_123456789'
      });
      setIsLoading(false);
    }, 1500);
    
    // In a real app, uncomment this:
    // verifySession();
  }, [sessionId]);

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
        
        {sessionDetails?.customerEmail && (
          <div className={styles.detailsCard}>
            <p className={styles.detailsText}>
              We've sent a confirmation email to <strong>{sessionDetails.customerEmail}</strong> with your order details and next steps.
              {sessionDetails.subscriptionId && (
                <span> Your subscription ID is <strong>{sessionDetails.subscriptionId}</strong>.</span>
              )}
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