import React from 'react';
import FAQ, { FAQItem } from '@/components/common/FAQ/FAQ';
import styles from './PricingFAQ.module.css';

const PricingFAQ: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      question: "How does your pricing work?",
      answer: "Our pricing is based on the number of employees in your organization. We offer three tiers: Starter (up to 100 employees), Professional (up to 500 employees), and Enterprise (unlimited employees). All plans include our core analytics features, with more advanced capabilities available in higher tiers. We offer both monthly and annual billing, with a 16% discount for annual commitments."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial of our Professional plan with full access to all features. No credit card is required to start your trial. During your trial, our customer success team will provide personalized onboarding to help you get the most out of the platform."
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely! You can upgrade your plan at any time, and the new charges will be prorated for the remainder of your billing cycle. If you need to downgrade, the change will take effect at the start of your next billing cycle. There are no penalties for changing plans."
    },
    {
      question: "What forms of payment do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and ACH bank transfers. For Enterprise plans, we also offer invoicing with net-30 payment terms. International payments are processed in USD."
    },
    {
      question: "Do you offer discounts for non-profits or educational institutions?",
      answer: "Yes, we offer special pricing for non-profit organizations, educational institutions, and startups. Please contact our sales team to discuss your eligibility and receive a custom quote based on your specific needs."
    },
    {
      question: "What happens if we exceed our employee limit mid-subscription?",
      answer: "If you exceed your plan's employee limit, we'll notify you and provide a 30-day grace period. During this time, you can either upgrade to a higher tier or reduce your employee count to stay within your current plan. We don't automatically upgrade your account or charge additional fees without your approval."
    },
    {
      question: "What's included in the implementation fee?",
      answer: "The one-time implementation fee covers the complete setup of your Glynac instance, including data source connections, custom dashboard configuration, initial system calibration, and comprehensive training for your team. This ensures you're fully operational and seeing value from day one."
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <FAQ 
          title="Frequently Asked Questions About Pricing" 
          description="Have questions about our pricing model or what's included? Find answers to the most common questions below." 
          items={faqItems}
        />
        
        <div className={styles.contactInfo}>
          <p className={styles.moreQuestions}>
            Have more questions? Our team is happy to help.
          </p>
          <a href="mailto:sales@glynac.com" className={styles.contactLink}>
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;