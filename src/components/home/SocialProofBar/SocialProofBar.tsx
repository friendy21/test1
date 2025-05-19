"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./SocialProofBar.module.css";

// Data: (same as before, add/adjust as needed)
const companies = [
  { name: "Salesforce", logo: "/images/logos/salesforce.svg", word: "CRM" },
  { name: "Adobe", logo: "/images/logos/adobe.svg", word: "Creativity" },
  { name: "Microsoft", logo: "/images/logos/microsoft.svg", word: "Productivity" },
  { name: "Shopify", logo: "/images/logos/shopify.svg", word: "E-Commerce" },
  { name: "Slack", logo: "/images/logos/slack.svg", word: "Collaboration" },
  { name: "HubSpot", logo: "/images/logos/hubspot.svg", word: "Marketing" },
  { name: "Zoom", logo: "/images/logos/zoom.svg", word: "Meetings" },
];

const publications = [
  { name: "Forbes", logo: "/images/logos/forbes.svg", word: "Business" },
  { name: "TechCrunch", logo: "/images/logos/techcrunch.svg", word: "Tech" },
  { name: "Fast Company", logo: "/images/logos/fastcompany.svg", word: "Innovation" },
];

const badges = [
  { name: "Top HR Tech Solution 2024", logo: "", icon: "🏆", word: "2024 Winner" },
  { name: "G2 High Performer", logo: "", icon: "⭐", word: "4.8/5 Rating" },
  { name: "Backed by Leading VCs", logo: "", icon: "🚀", word: "$28M Series B" },
];

const gridData = [
  ...companies.map((c) => ({ ...c, type: "company" })),
  ...publications.map((p) => ({ ...p, type: "publication" })),
  ...badges.map((b) => ({ ...b, type: "badge" })),
];

const SocialProofBar: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate grid hexagons in with staggered reveal using GSAP & Ganis
    if (gridRef.current) {
      const hexes = gridRef.current.querySelectorAll(`.${styles.hexCell}`);
      gsap.set(hexes, { opacity: 0, y: 40, scale: 0.94 });

      gsap.to(hexes, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: { amount: 0.7, from: "center" },
        ease: "power2.out",
        clearProps: "all",
      });
    }
  }, []);

  // Animate hover/focus on hexes (add glow, overlay text motion)
  const handleHover = (e: React.MouseEvent | React.FocusEvent, enter: boolean) => {
    const cell = (e.currentTarget as HTMLDivElement);
    const overlay = cell.querySelector(`.${styles.hexOverlay}`) as HTMLSpanElement;
    if (enter) {
      gsap.to(cell, { scale: 1.055, boxShadow: "0 8px 28px #4587fa30", duration: 0.34, ease: "power2.out" });
      gsap.to(overlay, { y: -12, opacity: 1, duration: 0.36, ease: "power2.out" });
    } else {
      gsap.to(cell, { scale: 1, boxShadow: "0 2px 14px #3b82f610", duration: 0.28, ease: "power2.out" });
      gsap.to(overlay, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <div className={styles.hexGalleryWrap}>
      <h2 className={styles.heading}>
        <span className={styles.headingAccent}>Trusted by</span> Innovative Companies
      </h2>
      <p className={styles.subheading}>Powering team insights at organizations worldwide</p>
      <div className={styles.hexGrid} ref={gridRef}>
        {gridData.map((item, i) => (
          <div
            className={styles.hexCell}
            tabIndex={0}
            aria-label={item.name}
            key={i}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
            onFocus={(e) => handleHover(e, true)}
            onBlur={(e) => handleHover(e, false)}
          >
            <div className={styles.hexImageWrap}>
              {item.type !== "badge" && item.logo ? (
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={110}
                  height={44}
                  className={styles.hexImg}
                  loading="lazy"
                  draggable={false}
                  unoptimized
                  style={{ objectFit: "contain", background: "#fff", padding: "16px" }}
                />
              ) : (
                <span className={styles.hexBadgeIcon}>{item.icon}</span>
              )}
              <span className={styles.hexOverlay}>
                <span className={styles.hexOverlayText}>
                  {item.word || item.name}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.trustPhraseWrapper}>
        <p className={styles.trustPhrase}>
          <span>Built for modern teams who prioritize</span>
          <strong className={styles.trustEmphasis}> well-being and performance</strong>
        </p>
      </div>
    </div>
  );
};

export default SocialProofBar;
