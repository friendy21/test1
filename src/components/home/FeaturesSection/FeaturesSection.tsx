"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import styles from "./FeaturesSection.module.css";

// Register GSAP plugins (browser only)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}

type Feature = {
  icon: string;
  title: string;
  description: string;
  color?: string;
};

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Features data
  const features: Feature[] = [
    {
      icon: "🛡️",
      title: "Predictive Risk Detection",
      description:
        "Identify potential burnout, disengagement, or overload risks at team and individual levels before they escalate, allowing for timely intervention.",
      color: "#2563eb",
    },
    {
      icon: "🔔",
      title: "Burnout & Overload Alerts",
      description:
        "Receive real-time, configurable notifications when critical thresholds are crossed, enabling managers to offer support exactly when it's needed.",
      color: "#f59e0b",
    },
    {
      icon: "📊",
      title: "Team Sentiment Analysis",
      description:
        "Gain a continuous understanding of overall team morale and sentiment trends from communication patterns – without intrusive surveys.",
      color: "#7c3aed",
    },
    {
      icon: "👥",
      title: "Manager Empowerment Dashboards",
      description:
        "Equip managers with actionable, privacy-protected insights to better understand their team's well-being, workload, and collaboration patterns.",
      color: "#10b981",
    },
    {
      icon: "📅",
      title: "Workload & Meeting Optimization",
      description:
        "Visualize workload distribution and meeting density to identify inefficiencies, reduce meeting fatigue, and promote focused work.",
      color: "#ec4899",
    },
    {
      icon: "⚙️",
      title: "Customizable Triggers & Reporting",
      description:
        "Tailor alerts, define specific risk indicators, and generate custom reports that align with your organization's unique culture and priorities.",
      color: "#06b6d4",
    },
    {
      icon: "🔒",
      title: "Secure & Private by Design",
      description:
        "Built on a foundation of trust with end-to-end encryption, data anonymization techniques, and adherence to global privacy standards. We never access message content.",
      color: "#4f46e5",
    },
    {
      icon: "🔄",
      title: "Seamless Tool Integration",
      description:
        "Connect effortlessly with the tools your teams already use, ensuring rapid deployment and data collection without disrupting workflows.",
      color: "#dc2626",
    },
  ];

  // Track scroll position for parallax effects
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- TITLE & SUBTITLE SPLITTING (Proper wrapping, animates lines not words) ---
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // Title (split at commas, wrap phrase in span)
    const titleElement = titleRef.current;
    const rawTitle =
      titleElement.dataset.text || titleElement.textContent || "";
    titleElement.innerHTML = "";
    rawTitle.split(", ").forEach((phrase, idx, arr) => {
      const span = document.createElement("span");
      span.className = styles.textLine;
      span.textContent = phrase + (idx < arr.length - 1 ? ", " : "");
      titleElement.appendChild(span);
    });

    // Subtitle (just one span for all text)
    const subtitleElement = subtitleRef.current;
    const rawSubtitle =
      subtitleElement.dataset.text || subtitleElement.textContent || "";
    subtitleElement.innerHTML = "";
    const span = document.createElement("span");
    span.className = styles.subtitleLine;
    span.textContent = rawSubtitle;
    subtitleElement.appendChild(span);
  }, []);

  // --- GSAP Animations ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    CustomEase.create("textReveal", "0.25, 0.1, 0.25, 1");
    CustomEase.create("cardReveal", "0.33, 1, 0.68, 1");
    const ctx = gsap.context(() => {
      // Animate each phrase in the header (textLine)
      const titleLines = titleRef.current?.querySelectorAll(
        `.${styles.textLine}`
      );
      if (titleLines) {
        gsap.set(titleLines, {
          y: "100%",
          opacity: 0,
          filter: "blur(8px)",
        });
        gsap.to(titleLines, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.13,
          ease: "textReveal",
        });
      }

      // Animate the whole subtitle (subtitleLine)
      const subtitleLines = subtitleRef.current?.querySelectorAll(
        `.${styles.subtitleLine}`
      );
      if (subtitleLines) {
        gsap.set(subtitleLines, {
          y: "100%",
          opacity: 0,
          filter: "blur(5px)",
        });
        gsap.to(subtitleLines, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.02,
          ease: "textReveal",
        });
      }

      // Animate cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.set(card, {
          y: 50,
          opacity: 0,
          clipPath: "inset(10% 10% 10% 10% round var(--border-radius-lg))",
        });
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 70%",
            scrub: 0.4,
          },
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0% round var(--border-radius-lg))",
          duration: 1,
          ease: "cardReveal",
          delay: index * 0.05,
        });

        // Icon entrance
        const iconContainer = card.querySelector(`.${styles.iconContainer}`);
        if (iconContainer) {
          gsap.set(iconContainer, {
            scale: 0.5,
            rotation: -10,
            opacity: 0,
          });
          gsap.to(iconContainer, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 65%",
              scrub: 0.3,
            },
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
          });
        }

        // Card hover effect (3D tilt)
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = ((y - rect.height / 2) / rect.height) * -5;
          const rotateY = ((x - rect.width / 2) / rect.width) * 5;
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            boxShadow: `
              0 ${15 + rotateX}px ${25 + Math.abs(rotateX)}px -5px rgba(0, 0, 0, 0.1),
              0 ${10 + rotateY}px ${10 + Math.abs(rotateY)}px -5px rgba(0, 0, 0, 0.04)
            `,
            duration: 0.5,
            ease: "power2.out",
          });
          if (iconContainer) {
            gsap.to(iconContainer, {
              x: (x - rect.width / 2) * 0.05,
              y: (y - rect.height / 2) * 0.05,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            boxShadow: "var(--shadow-md)",
            duration: 0.5,
            ease: "power1.out",
          });
          if (iconContainer) {
            gsap.to(iconContainer, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power1.out",
            });
          }
        });
      });

      // CTA button animation
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 30 });
        gsap.to(ctaRef.current, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "bottom 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        // CTA button pulse effect
        const ctaButton = ctaRef.current.querySelector(
          `.${styles.ctaButton}`
        ) as HTMLElement;
        if (ctaButton) {
          const tlPulse = gsap.timeline({ repeat: -1, repeatDelay: 2 });
          tlPulse.to(ctaButton, {
            boxShadow: "0 0 0 4px rgba(37, 99, 235, 0.3)",
            scale: 1.03,
            duration: 0.4,
            ease: "sine.inOut",
          });
          tlPulse.to(ctaButton, {
            boxShadow: "var(--shadow-md)",
            scale: 1,
            duration: 0.4,
            ease: "sine.inOut",
          });
        }
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.featuresSection} ref={sectionRef}>
      <div className={styles.backgroundDecoration}>
        <div
          className={styles.gradientOrb1}
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        ></div>
        <div
          className={styles.gradientOrb2}
          style={{ transform: `translateY(${-scrollY * 0.07}px)` }}
        ></div>
        <div className={styles.patternGrid}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.sectionHeader} ref={headerRef}>
          <h2
            className={styles.title}
            ref={titleRef}
            data-text="Everything You Need to Build Resilient, High-Performing Teams"
          >
            Everything You Need to Build Resilient, High-Performing Teams
          </h2>
          <p
            className={styles.subtitle}
            ref={subtitleRef}
            data-text="Our comprehensive platform provides the tools to understand, support, and optimize your team's well-being and performance."
          >
            Our comprehensive platform provides the tools to understand, support, and optimize your team's well-being and performance.
          </p>
        </div>

        <div className={styles.featuresGrid} ref={gridRef}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.featureCard} ${styles[`featureCard${index + 1}`]}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={styles.iconContainer}
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <span className={styles.icon}>{feature.icon}</span>
                <div
                  className={styles.iconGlow}
                  style={{ boxShadow: `0 0 20px ${feature.color}30` }}
                ></div>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <div
                className={styles.cardHighlight}
                style={{
                  background: `linear-gradient(135deg, ${feature.color}05, ${feature.color}15)`,
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer} ref={ctaRef}>
          <button className={styles.ctaButton}>
            <span className={styles.btnText}>Explore All Features</span>
            <div className={styles.btnGlow}></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
