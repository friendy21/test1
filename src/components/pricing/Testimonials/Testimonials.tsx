import React from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';

type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
  logo?: string;
  highlight?: string;
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "I was initially skeptical about the ROI, but Glynac has paid for itself many times over. We reduced turnover by 22% in the first six months, saving us an estimated $400,000 in replacement costs alone.",
      author: "Jennifer Marshall",
      title: "CHRO",
      company: "TechSolutions Inc.",
      highlight: "22% reduction in turnover",
    },
    {
      quote: "The Professional plan gives us the perfect balance of advanced features and affordability. The insights we've gained into workload distribution have transformed how we structure our teams and allocate resources.",
      author: "David Chen",
      title: "VP of Operations",
      company: "InnovateCo",
      highlight: "Transformed team structure",
    },
    {
      quote: "After comparing several workplace analytics solutions, Glynac offered the most value for our mid-sized company. The implementation was smooth, and the support team has been incredibly responsive.",
      author: "Sarah Johnson",
      title: "Director of People Ops",
      company: "GrowthWave",
      highlight: "Best value for mid-sized company",
    }
  ];

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>What Our Customers Say</h2>
          <p className={styles.subtitle}>
            Hear from organizations that have transformed their workplace with Glynac.
          </p>
        </div>
        
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteContent}>
                <span className={styles.quoteIcon}>&quot;</span>
                <blockquote className={styles.quote}>
                  {testimonial.quote}
                </blockquote>
                {testimonial.highlight && (
                  <div className={styles.highlightTag}>
                    {testimonial.highlight}
                  </div>
                )}
              </div>
              
              <div className={styles.testimonialFooter}>
                <div className={styles.author}>
                  <div className={styles.authorAvatar}>
                    {/* Placeholder for avatar */}
                    <div className={styles.avatarPlaceholder}>
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>{testimonial.author}</div>
                    <div className={styles.authorTitle}>
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
                
                {testimonial.logo ? (
                  <div className={styles.companyLogo}>
                    <Image 
                      src={testimonial.logo} 
                      alt={testimonial.company} 
                      width={80} 
                      height={30} 
                    />
                  </div>
                ) : (
                  <div className={styles.companyLogo}>
                    <div className={styles.logoPlaceholder}>
                      {testimonial.company.substring(0, 2)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.testimonialsFooter}>
          <a href="/success-stories" className={styles.readMoreLink}>
            Read more customer stories
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;