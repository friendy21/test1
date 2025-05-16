import React from 'react';
import Image from 'next/image';
import styles from './HowItWorksSection.module.css';

type Step = {
  number: number;
  icon: string;
  title: string;
  description: string;
  microDetail?: string;
};

const HowItWorksSection: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      icon: '🔌',
      title: 'Connect Your Work Tools',
      description: 'Securely integrate GLYNAC with your existing platforms (e.g., Slack, Microsoft Teams, Jira, Google Workspace, Asana) in minutes. No complex setup, no disruption.',
      microDetail: 'We analyze metadata, never content.'
    },
    {
      number: 2,
      icon: '🧠',
      title: 'AI Analyzes Anonymous Work Signals',
      description: 'Our advanced AI ethically processes anonymized metadata—like communication patterns, meeting cadences, activity levels, and interaction sentiment (not message content)—to identify trends and potential risks.'
    },
    {
      number: 3,
      icon: '📊',
      title: 'Get Clear Insights & Proactive Alerts',
      description: 'Access intuitive dashboards with real-time insights on team well-being, burnout risk, engagement levels, and workload balance. Receive timely alerts to address issues proactively.'
    }
  ];

  return (
    <section className={styles.howItWorksSection} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>How GLYNAC Works – The Simple Path to Insight</h2>
          <p className={styles.subtitle}>
            Our platform transforms workplace data into actionable insights in just three simple steps
          </p>
        </div>
        
        <div className={styles.stepsContainer}>
          <div className={styles.stepsFlow}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepContent}>
                  <div className={styles.iconContainer}>
                    <span className={styles.icon}>{step.icon}</span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                  {step.microDetail && (
                    <p className={styles.microDetail}>{step.microDetail}</p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Connecting lines between steps */}
            <div className={styles.connectionLine}></div>
          </div>
          
          <div className={styles.illustration}>
            {/* In a real implementation, this would be an actual image or animation */}
            <div className={styles.illustrationPlaceholder}>
              <div className={styles.dataFlow}>
                <div className={styles.dataPoint}></div>
                <div className={styles.dataPoint}></div>
                <div className={styles.dataPoint}></div>
                <div className={styles.processingCenter}></div>
                <div className={styles.insightPoint}></div>
                <div className={styles.insightPoint}></div>
                <div className={styles.insightPoint}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.emphasisBox}>
          <div className={styles.emphasisItem}>
            <span className={styles.emphasisIcon}>⚡</span>
            <p className={styles.emphasisText}>Get your first insights within 24 hours.</p>
          </div>
          <div className={styles.emphasisItem}>
            <span className={styles.emphasisIcon}>🔒</span>
            <p className={styles.emphasisText}>Privacy-first by design. We focus on patterns, not personal data.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;