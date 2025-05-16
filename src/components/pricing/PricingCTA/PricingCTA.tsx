import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import styles from './PricingCTA.module.css';

const PricingCTA: React.FC = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <div className={styles.content}>
            <h2 className={styles.title}>Ready to get started?</h2>
            <p className={styles.description}>
              Start your 14-day free trial today. No credit card required.
            </p>
            
            <div className={styles.ctaButtons}>
              <Link href="/contact" legacyBehavior passHref>
                <Button variant="primary" size="large">
                  Request a Demo
                </Button>
              </Link>
              
              <Link href="/contact?sales=true" legacyBehavior passHref>
                <Button variant="outline" size="large">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={styles.guaranteeContainer}>
            <div className={styles.guaranteeBadge}>
              <div className={styles.badgeIcon}>✓</div>
              <div className={styles.badgeContent}>
                <div className={styles.badgeTitle}>Satisfaction Guarantee</div>
                <div className={styles.badgeText}>
                  Try risk-free for 30 days
                </div>
              </div>
            </div>
            <div className={styles.guaranteeBadge}>
              <div className={styles.badgeIcon}>🔒</div>
              <div className={styles.badgeContent}>
                <div className={styles.badgeTitle}>Cancel Anytime</div>
                <div className={styles.badgeText}>
                  No long-term contracts
                </div>
              </div>
            </div>
            <div className={styles.guaranteeBadge}>
              <div className={styles.badgeIcon}>🚀</div>
              <div className={styles.badgeContent}>
                <div className={styles.badgeTitle}>Quick Setup</div>
                <div className={styles.badgeText}>
                  Be up and running in days, not weeks
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.enterpriseBox}>
          <div className={styles.enterpriseContent}>
            <h3 className={styles.enterpriseTitle}>Need an Enterprise solution?</h3>
            <p className={styles.enterpriseText}>
              Looking for custom features, dedicated support, or special compliance requirements? Our Enterprise plan can be tailored to your specific needs.
            </p>
            <Link href="/contact?plan=enterprise" className={styles.enterpriseLink}>
              Contact our Enterprise team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;