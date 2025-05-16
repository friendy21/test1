import React from 'react';
import styles from './ImpactSection.module.css';

type StatisticItem = {
  metric: string;
  description: string;
  source?: string;
};

type TestimonialItem = {
  quote: string;
  author: string;
  title: string;
  company: string;
};

const ImpactSection: React.FC = () => {
  const statistics: StatisticItem[] = [
    {
      metric: '25%',
      description: 'Reduction in self-reported burnout signals within 6 months',
      source: 'Aggregate customer data'
    },
    {
      metric: '15%',
      description: 'Improvement in employee engagement scores (eNPS or similar)',
      source: 'Technology Industry Average'
    },
    {
      metric: '40%',
      description: 'Faster identification of teams needing workload adjustments',
      source: 'Customer Benchmarks'
    },
    {
      metric: '8%',
      description: 'Decrease in voluntary attrition in high-risk departments',
      source: 'Enterprise Customer Results'
    }
  ];
  
  const testimonials: TestimonialItem[] = [
    {
      quote: 'GLYNAC gave us the early warnings we needed to support our teams proactively. We\'ve seen a noticeable drop in burnout and our managers feel more empowered.',
      author: 'Sarah Johnson',
      title: 'VP of People',
      company: 'TechInnovate'
    },
    {
      quote: 'The visibility into workload and meeting patterns has been a game-changer for our operational efficiency. We\'re finally making data-driven decisions about how we work.',
      author: 'Michael Chen',
      title: 'COO',
      company: 'DataFirst'
    },
    {
      quote: 'After implementing GLYNAC, we identified patterns we never would have seen otherwise. It\'s transformed how we think about team well-being and performance.',
      author: 'Elena Rodriguez',
      title: 'Director of Engineering',
      company: 'CloudSphere'
    }
  ];

  return (
    <section className={styles.impactSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Real Results, Measurable Impact</h2>
          <p className={styles.subtitle}>
            Companies using GLYNAC see significant improvements in team well-being, efficiency, and retention.
          </p>
        </div>
        
        <div className={styles.statisticsContainer}>
          {statistics.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.metric}>{stat.metric}</div>
              <div className={styles.statDescription}>{stat.description}</div>
              {stat.source && (
                <div className={styles.source}>{stat.source}</div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.testimonialsContainer}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>&quot;</div>
              <blockquote className={styles.quote}>
                {testimonial.quote}
              </blockquote>
              <div className={styles.author}>
                <div className={styles.authorName}>{testimonial.author}</div>
                <div className={styles.authorTitle}>
                  {testimonial.title}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;