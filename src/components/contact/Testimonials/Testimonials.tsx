"use client";

import React from 'react';
import styles from './Testimonials.module.css';

type Testimonial = {
  quote: string;
  author: string;
  position: string;
  company: string;
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "The Glynac demo was incredibly relevant to our specific challenges. The team took the time to understand our needs and showed us exactly how the platform could address our retention issues.",
      author: "Sarah Thompson",
      position: "Director of HR",
      company: "TechVision Inc."
    },
    {
      quote: "I appreciated how the Glynac team focused on business outcomes rather than just features. They clearly demonstrated the ROI potential for our organization.",
      author: "Marcus Chen",
      position: "COO",
      company: "GrowthWorks"
    },
    {
      quote: "After seeing the demo, the value was immediately clear. The Glynac team showed us issues we didn't even know we had and how their platform could help solve them.",
      author: "Jessica Martinez",
      position: "People Analytics Manager",
      company: "InnovateCorp"
    }
  ];

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>What Others Are Saying About Glynac Demos</h2>
        
        <div className={styles.testimonialCardsContainer}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>&quot;</div>
              <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{testimonial.author}</div>
                <div className={styles.authorDetails}>
                  {testimonial.position}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;