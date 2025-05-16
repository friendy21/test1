import React from 'react';
import styles from './PainPointsSection.module.css';

type PainPoint = {
  icon: string;
  title: string;
  description: string;
};

const PainPointsSection: React.FC = () => {
  const painPoints: PainPoint[] = [
    {
      icon: '🔋',
      title: 'The Silent Burnout Epidemic',
      description: 'Are you worried about team members silently struggling with overload and stress, leading to decreased productivity, errors, and eventual attrition?'
    },
    {
      icon: '🔍',
      title: 'Lack of True Visibility',
      description: 'Do you lack objective data on team dynamics, sentiment, and workload distribution, forcing you to rely on guesswork or infrequent surveys?'
    },
    {
      icon: '👻',
      title: 'Creeping Disengagement & Isolation',
      description: 'Is it challenging to spot early signs of disengagement or identify team members feeling isolated, especially in remote or hybrid setups?'
    },
    {
      icon: '🚨',
      title: 'Reactive Instead of Proactive',
      description: 'Are you tired of only addressing people-problems after they\'ve escalated, costing valuable time, resources, and talent?'
    },
    {
      icon: '🤹',
      title: 'Inefficient Workload & Meeting Overload',
      description: 'Do you suspect that uneven workloads or excessive meetings are hindering focus and efficiency, but lack the data to confirm and act?'
    }
  ];

  return (
    <section className={styles.painPointsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Feeling the Strain of Hidden Team Challenges?</h2>
          <p className={styles.subtitle}>
            In today&apos; complex work environment, it&apos; harder than ever to truly understand team well-being and identify risks before they impact performance and morale. GLYNAC helps you see what&apos; often invisible.
          </p>
        </div>
        
        <div className={styles.cardsGrid}>
          {painPoints.map((point, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{point.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{point.title}</h3>
              <p className={styles.cardDescription}>{point.description}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.closingStatement}>
          <p>You&apos;re not alone. GLYNAC provides the clarity you need.</p>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;