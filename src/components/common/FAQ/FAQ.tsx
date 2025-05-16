'use client';

import React, { useState } from 'react';
import styles from './FAQ.module.css';

export type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
};

type FAQProps = {
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
};

const FAQ: React.FC<FAQProps> = ({
  title = 'Frequently Asked Questions',
  description,
  items,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`${styles.faqContainer} ${className}`}>
      <div className={styles.faqHeader}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      
      <div className={styles.faqList}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
          >
            <button 
              className={styles.question}
              onClick={() => toggleQuestion(index)}
              aria-expanded={activeIndex === index}
            >
              {item.question}
              <span className={styles.icon}>
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            
            <div 
              className={styles.answer}
              style={{ 
                maxHeight: activeIndex === index ? '1000px' : '0',
                opacity: activeIndex === index ? 1 : 0,
              }}
            >
              <div className={styles.answerContent}>
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;