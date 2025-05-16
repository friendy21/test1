"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import ParticleBackground from "@/components/ParticleBackground/ParticleBackground";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <ParticleBackground className={styles.heroBackground} /> {/* Replace div with ParticleBackground */}
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.headline}>
            Unlock Peak Team Performance & Prevent Burnout Before It Starts
          </h1>
          <p className={styles.subheadline}>
            GLYNAC analyzes non-invasive signals from your existing work tools to provide early warnings on burnout, disengagement, and overload. Empower your managers and protect your most valuable asset – your people.
          </p>
          <div className={styles.ctaContainer}>
            <Link href="/contact" passHref legacyBehavior>
              <Button variant="primary" size="large">
                Request a Personalized Demo
              </Button>
            </Link>
            <Link href="#video-overview" className={styles.secondaryCta}>
              Watch a 2-Min Overview
            </Link>
          </div>
          <p className={styles.microCopy}>
            No credit card required for demo. Integrates in minutes.
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.dashboardPreview}>
            <Image
              src="/images/illustrations/dashboard-preview.png"
              alt="Glynac Dashboard Preview"
              width={600}
              height={400}
              className={styles.dashboardImage}
              priority
            />
            <div className={`${styles.floatingElement} ${styles.riskAlert}`}>
              <div className={styles.alertIcon}>!</div>
              <div className={styles.alertContent}>
                <div className={styles.alertTitle}>Risk Detected</div>
                <div className={styles.alertText}>Dev Team: 3 burnout signals</div>
              </div>
            </div>
            <div className={`${styles.floatingElement} ${styles.sentimentGraph}`}>
              <div className={styles.graphBar}>
                <div className={styles.graphFill} style={{ height: "75%" }}></div>
              </div>
              <div className={styles.graphBar}>
                <div className={styles.graphFill} style={{ height: "65%" }}></div>
              </div>
              <div className={styles.graphBar}>
                <div className={styles.graphFill} style={{ height: "80%" }}></div>
              </div>
              <div className={styles.graphBar}>
                <div className={styles.graphFill} style={{ height: "60%" }}></div>
              </div>
              <div className={styles.graphBar}>
                <div className={styles.graphFill} style={{ height: "90%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;