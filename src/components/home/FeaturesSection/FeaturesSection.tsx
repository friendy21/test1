import React from 'react';
import styles from './FeaturesSection.module.css';

type Feature = {
  icon: string;
  title: string;
  description: string;
};

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: '🛡️',
      title: 'Predictive Risk Detection',
      description: 'Identify potential burnout, disengagement, or overload risks at team and individual levels before they escalate, allowing for timely intervention.'
    },
    {
      icon: '🔔',
      title: 'Burnout & Overload Alerts',
      description: 'Receive real-time, configurable notifications when critical thresholds are crossed, enabling managers to offer support exactly when it\'s needed.'
    },
    {
      icon: '📊',
      title: 'Team Sentiment Analysis',
      description: 'Gain a continuous understanding of overall team morale and sentiment trends from communication patterns – without intrusive surveys.'
    },
    {
      icon: '👥',
      title: 'Manager Empowerment Dashboards',
      description: 'Equip managers with actionable, privacy-protected insights to better understand their team\'s well-being, workload, and collaboration patterns.'
    },
    {
      icon: '📅',
      title: 'Workload & Meeting Optimization',
      description: 'Visualize workload distribution and meeting density to identify inefficiencies, reduce meeting fatigue, and promote focused work.'
    },
    {
      icon: '⚙️',
      title: 'Customizable Triggers & Reporting',
      description: 'Tailor alerts, define specific risk indicators, and generate custom reports that align with your organization\'s unique culture and priorities.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private by Design',
      description: 'Built on a foundation of trust with end-to-end encryption, data anonymization techniques, and adherence to global privacy standards. We never access message content.'
    },
    {
      icon: '🔄',
      title: 'Seamless Tool Integration',
      description: 'Connect effortlessly with the tools your teams already use, ensuring rapid deployment and data collection without disrupting workflows.'
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Everything You Need to Build Resilient, High-Performing Teams</h2>
          <p className={styles.subtitle}>
            Our comprehensive platform provides the tools to understand, support, and optimize your team&apos;s well-being and performance.
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.ctaContainer}>
          <button className={styles.ctaButton}>Explore All Features</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;