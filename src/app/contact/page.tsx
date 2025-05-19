import React from 'react';
import { Metadata } from 'next';
import styles from './page.module.css';

import ContactHero from '@/components/contact/ContactHero/ContactHero';
import DemoRequestForm from '@/components/contact/DemoRequestForm/DemoRequestForm';
import AlternativeContact from '@/components/contact/AlternativeContact/AlternativeContact';
import QuickContactForm from '@/components/contact/QuickContactForm/QuickContactForm';
import FAQ from '@/components/contact/FAQ/FAQ';
import WhatToExpect from '@/components/contact/WhatToExpect/WhatToExpect';
import Testimonials from '@/components/contact/Testimonials/Testimonials';
import OfficeLocations from '@/components/contact/OfficeLocations/OfficeLocations';
import FinalCTA from '@/components/contact/FinalCTA/FinalCTA';

export const metadata: Metadata = {
  title: 'Contact & Request a Demo',
  description: 'Request a personalized demo of Glynac Workplace Analytics and see how our platform can transform your organization\'s understanding of workplace dynamics.',
};

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <ContactHero />
      
      <div className={styles.mainContentContainer}>
        <div className={styles.container}>
          <div className={styles.formSection}>
            <DemoRequestForm />
          </div>
          <div className={styles.complementaryContent}>
            <AlternativeContact />
            <QuickContactForm />
          </div>
        </div>
      </div>
      
      <div className={styles.secondarySection}>
        <div className={styles.container}>
          <FAQ />
        </div>
      </div>
      
      <div className={styles.tertiarySection}>
        <div className={styles.container}>
          <WhatToExpect />
        </div>
      </div>
      
      <div className={styles.secondarySection}>
        <div className={styles.container}>
          <Testimonials />
        </div>
      </div>
      
      <div className={styles.container}>
        <OfficeLocations />
      </div>
      
      <FinalCTA />
    </div>
  );
}