import React from 'react';
import Link from 'next/link';
import styles from './PrivacySection.module.css';

type PrivacyPillar = {
  icon: string;
  title: string;
  description: string;
};

const PrivacySection: React.FC = () => {
  const privacyPillars: PrivacyPillar[] = [
    {
      icon: '👁️‍🗨️',
      title: 'Content Privacy Assured',
      description: 'We never read messages, emails, or document content. Our AI analyzes metadata patterns only (e.g., who communicates with whom, when, and how often – not what is said).'
    },
    {
      icon: '🔄',
      title: 'Data Anonymization & Aggregation',
      description: 'Insights are typically aggregated and anonymized to protect individual privacy while providing meaningful team-level understanding. Configurable for your policies.'
    },
    {
      icon: '🔒',
      title: 'Enterprise-Grade Security',
      description: 'Your data is protected with end-to-end encryption (in transit and at rest), robust access controls, and regular security audits.'
    },
    {
      icon: '✅',
      title: 'Compliance & Standards',
      description: 'We adhere to global privacy regulations like GDPR and CCPA. Our platform is SOC 2 Type II compliant and follows ISO 27001 standards.'
    }
  ];

  const complianceBadges = [
    { name: 'GDPR Compliant', image: '/images/badges/gdpr.svg' },
    { name: 'SOC 2 Type II', image: '/images/badges/soc2.svg' },
    { name: 'ISO 27001', image: '/images/badges/iso27001.svg' },
    { name: 'CCPA Compliant', image: '/images/badges/ccpa.svg' }
  ];

  return (
    <section className={styles.privacySection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Built on a Foundation of Trust, Privacy, and Security</h2>
          <p className={styles.subtitle}>
            We believe privacy and security are fundamental to workplace analytics. Our platform is designed from the ground up to protect your data and your people.
          </p>
        </div>
        
        <div className={styles.pillarsGrid}>
          {privacyPillars.map((pillar, index) => (
            <div key={index} className={styles.pillarCard}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{pillar.icon}</span>
              </div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarDescription}>{pillar.description}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.badgesContainer}>
          {complianceBadges.map((badge, index) => (
            <div key={index} className={styles.badge}>
              {/* Fallback if actual badge images aren't available */}
              <div className={styles.badgePlaceholder}>
                {badge.name}
              </div>
              {/* 
                In a real implementation, you would use:
                <Image 
                  src={badge.image} 
                  alt={badge.name} 
                  width={80} 
                  height={80} 
                  className={styles.badgeImage}
                /> 
              */}
            </div>
          ))}
        </div>
        
        <div className={styles.ctaContainer}>
          <Link href="/security" className={styles.learnMoreLink}>
            Learn more about our Privacy Commitment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;