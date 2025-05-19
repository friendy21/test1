import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import styles from './FinalCTA.module.css';

const FinalCTA: React.FC = () => {
  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to Transform Your Workplace Analytics?</h2>
          <p className={styles.description}>
            See how Glynac can help you improve retention, enhance productivity, and create a better workplace experience for your team.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link href="/contact" legacyBehavior passHref>
              <Button variant="primary" size="large">
                Request Your Personalized Demo
              </Button>
            </Link>
            
            <Link href="/features" legacyBehavior passHref>
              <Button variant="outline" size="large">
                Learn More About Our Platform
              </Button>
            </Link>
          </div>
        </div>
        
        <div className={styles.imageContainer}>
          <div className={styles.imagePlaceholder}>
            <div className={styles.placeholderText}>
              Platform Preview
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.waveDivider}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            d="M0,0 C240,95 480,120 720,95 C960,70 1200,95 1440,0 L1440,120 L0,120 Z" 
            className={styles.wavePath}>
          </path>
        </svg>
      </div>
    </section>
  );
};

export default FinalCTA;