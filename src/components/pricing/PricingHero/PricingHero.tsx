import React from 'react';
import styles from './PricingHero.module.css';

const PricingHero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Simple, Transparent Pricing for Every Organization</h1>
          <p className={styles.subtitle}>
            Choose the plan that fits your needs. All plans include core analytics features, with advanced capabilities available in higher tiers.
          </p>
          <div className={styles.highlights}>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>✓</div>
              <span>No hidden fees</span>
            </div>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>✓</div>
              <span>Cancel anytime</span>
            </div>
            <div className={styles.highlightItem}>
              <div className={styles.highlightIcon}>✓</div>
              <span>Free onboarding</span>
            </div>
          </div>
        </div>
        
        <div className={styles.decorativeElement}>
          <div className={styles.shapesContainer}>
            <div className={`${styles.shape} ${styles.shape1}`}></div>
            <div className={`${styles.shape} ${styles.shape2}`}></div>
            <div className={`${styles.shape} ${styles.shape3}`}></div>
            <div className={styles.pricingLabel}>
              <div className={styles.labelInner}>
                <div className={styles.percentOff}>Save 16%</div>
                <div className={styles.yearlyText}>with annual billing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.waveDivider}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path 
            d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z" 
            className={styles.wavePath}>
          </path>
        </svg>
      </div>
    </section>
  );
};

export default PricingHero;