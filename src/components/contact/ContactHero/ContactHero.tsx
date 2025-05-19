import React from 'react';
import Image from 'next/image';
import styles from './ContactHero.module.css';

const ContactHero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.headline}>
            Experience the Power of Glynac Workplace Analytics
          </h1>
          <p className={styles.subheadline}>
            See how our platform can transform your organization&#39;s understanding of workplace dynamics and drive measurable improvements.
          </p>
        </div>
        
        <div className={styles.heroVisual}>
          <div className={styles.dashboardWrapper}>
            <Image 
              src="/images/illustrations/dashboard-preview.png" 
              alt="Glynac Dashboard Preview" 
              width={500} 
              height={300}
              className={styles.dashboardImage}
              priority
            />
            <div className={styles.overlayGradient}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;