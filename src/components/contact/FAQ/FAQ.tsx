import React from 'react';
import FAQComponent, { FAQItem } from '@/components/common/FAQ/FAQ';
import styles from './FAQ.module.css';

const FAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "What happens during a demo?",
      answer: "During your personalized demo, one of our workplace analytics specialists will walk you through the Glynac platform with specific examples relevant to your industry and organizational challenges. You'll see how our dashboards work, how insights are generated, and have the opportunity to ask questions specific to your situation. Demos typically last 30-45 minutes."
    },
    {
      question: "How long does implementation take?",
      answer: "Most organizations are up and running with basic insights within 3-5 business days of starting implementation. Full system calibration typically takes 2-4 weeks as Glynac learns your organization's specific patterns and baselines."
    },
    {
      question: "What data sources does Glynac connect with?",
      answer: "Glynac integrates with Microsoft 365, Google Workspace, Slack, Teams, Asana, Jira, and many common HRIS systems. Our Enterprise plan includes custom integrations for specialized systems."
    },
    {
      question: "How does Glynac protect our data and employee privacy?",
      answer: "Glynac employs enterprise-grade security with SOC 2 Type II compliance and comprehensive data privacy controls. Our platform focuses on communication patterns rather than content, employs robust access controls, and provides transparency in how data is used."
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <FAQComponent
          title="Frequently Asked Questions"
          items={faqItems}
        />
        
        <div className={styles.additionalHelp}>
          <p className={styles.helpText}>
            Still have questions? Our team is happy to help.
          </p>
          <div className={styles.contactOptions}>
            <a href="mailto:info@glynac.com" className={styles.contactLink}>
              <span className={styles.contactIcon}>✉️</span>
              Email Us
            </a>
            <a href="tel:+18005550123" className={styles.contactLink}>
              <span className={styles.contactIcon}>📞</span>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;