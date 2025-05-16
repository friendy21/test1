import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import styles from './FinalCTA.module.css';

const FinalCTA: React.FC = () => {
  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to Transform Your Team&apos;s Well-being?</h2>
          <p className={styles.description}>
            See how Glynac can help you improve retention, enhance productivity, and create a better workplace experience for your team.
          </p>
          
          <div className={styles.ctaButtons}>
            <Link href="/contact" passHref>
              <Button variant="primary" size="large">
                Request a Personalized Demo
              </Button>
            </Link>
            
            <Link href="/features" passHref>
              <Button variant="outline" size="large">
                Learn More About Our Platform
              </Button>
            </Link>
          </div>
          
          <div className={styles.quickLinks}>
            <Link href="/pricing" className={styles.quickLink}>Pricing</Link>
            <span className={styles.divider}>|</span>
            <Link href="/solutions" className={styles.quickLink}>Solutions Overview</Link>
            <span className={styles.divider}>|</span>
            <Link href="/success-stories" className={styles.quickLink}>Read Case Studies</Link>
          </div>
        </div>
        
        <div className={styles.backgroundDecoration}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;