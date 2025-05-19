import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

import HeroSection from '../components/home/HeroSection/HeroSection';
import SocialProofBar from '../components/home/SocialProofBar/SocialProofBar';
import PainPointsSection from '../components/home/PainPointsSection/PainPointsSection';
import HowItWorksSection from '../components/home/HowItWorksSection/HowItWorksSection';
import FeaturesSection from '../components/home/FeaturesSection/FeaturesSection';
import RoleBasedBenefits from '../components/home/RoleBasedBenefits/RoleBasedBenefits';
import DemoSnapshot from '../components/home/DemoSnapshot/DemoSnapshot';
import ImpactSection from '../components/home/ImpactSection/ImpactSection';
import PrivacySection from '../components/home/PrivacySection/PrivacySection';
import FinalCTA from '../components/home/FinalCTA/FinalCTA';

export default function Home() {
  return (
    <div className={styles.homepage}>
      <HeroSection />
      <SocialProofBar />
      <PainPointsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <RoleBasedBenefits />
      <DemoSnapshot />
      <ImpactSection />
      <PrivacySection />
      <FinalCTA />
    </div>
  );
}