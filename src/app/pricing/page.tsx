import React from 'react';
import { Metadata } from 'next';
import PricingHero from '@/components/pricing/PricingHero/PricingHero';
import PricingPlans from '@/components/pricing/PricingPlans/PricingPlans';
import PricingFAQ from '@/components/pricing/PricingFAQ/PricingFAQ';
import ComparisonTable from '@/components/pricing/ComparisonTable/ComparisonTable';
import Testimonials from '@/components/pricing/Testimonials/Testimonials';
import PricingCTA from '@/components/pricing/PricingCTA/PricingCTA';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description: 'Choose the right Glynac workplace analytics plan for your organization. Flexible pricing options for teams of all sizes.',
};

export default function PricingPage() {
  return (
    <div className={styles.pricingPage}>
      <PricingHero />
      
      <div className={styles.container}>
        <PricingPlans />
      </div>
      
      <div className={styles.comparisonSection}>
        <div className={styles.container}>
          <ComparisonTable />
        </div>
      </div>
      
      <div className={styles.faqSection}>
        <div className={styles.container}>
          <PricingFAQ />
        </div>
      </div>
      
      <div className={styles.testimonialsSection}>
        <div className={styles.container}>
          <Testimonials />
        </div>
      </div>
      
      <PricingCTA />
    </div>
  );
}