import React from 'react';
import styles from './WhatToExpect.module.css';

type Step = {
  number: number;
  title: string;
  description: string;
};

const WhatToExpect: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Initial Conversation',
      description: 'Within one business day of your request, a Glynac representative will reach out to understand your specific needs and schedule your demo.'
    },
    {
      number: 2,
      title: 'Personalized Demo',
      description: 'Our team will provide a customized demonstration focused on your industry, organization size, and specific challenges.'
    },
    {
      number: 3,
      title: 'Follow-Up & Next Steps',
      description: 'After your demo, we\'ll provide additional resources and discuss potential implementation options, including our pilot program if you\'d like to experience Glynac with your own data.'
    }
  ];

  return (
    <section className={styles.whatToExpectSection}>
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionTitle}>What Happens Next?</h2>
        
        <div className={styles.stepsContainer}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.additionalInfo}>
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}>⏱️</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Fast Response Time</h3>
              <p className={styles.infoDescription}>We respond to all demo requests within one business day. Most customers receive a response within 4 hours during business hours.</p>
            </div>
          </div>
          
          <div className={styles.infoBox}>
            <div className={styles.infoIcon}>🎯</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Personalized Experience</h3>
              <p className={styles.infoDescription}>Our demos aren&apos;t generic walkthroughs. We&apos;ll tailor the presentation to your industry, organization size, and specific challenges.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;