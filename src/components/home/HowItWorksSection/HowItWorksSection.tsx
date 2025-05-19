"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from '@studio-freight/lenis';
import styles from './HowItWorksSection.module.css';

// Register GSAP plugins (only in browser environment)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
}

type Step = {
  number: number;
  title: string;
  description: string;
  microDetail?: string;
};

const HowItWorksSection: React.FC = () => {
  // Refs for animation targeting
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const stepDescRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const emphasisBoxRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Create custom eases for more refined animations
    CustomEase.create("verticalReveal", "0.25, 0.1, 0.25, 1");
    CustomEase.create("textBlur", "0.65, 0, 0.35, 1");
    CustomEase.create("smoothStep", "0.4, 0, 0.2, 1");
    
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2
    });
    
    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      ScrollTrigger.update();
      // Update scroll progress for custom animations
      setScrollProgress(scroll / limit);
    });
    
    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    // Disable GSAP lag smoothing for better Lenis integration
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      // Clean up Lenis
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
  
  // Split text for line-by-line animation
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || typeof window === 'undefined') return;
    
    // Split title text into lines for animation
    const titleElement = titleRef.current;
    const titleText = titleElement.textContent || '';
    
    // Clear the original content
    titleElement.textContent = '';
    
    // Split into words and wrap each in a span with the line class
    titleText.split(' ').forEach((word, i) => {
      const wordSpan = document.createElement('span');
      wordSpan.textContent = word + ' ';
      wordSpan.className = styles.textLine;
      titleElement.appendChild(wordSpan);
    });
    
    // Do similar splitting for subtitle, but with different styling
    const subtitleElement = subtitleRef.current;
    const subtitleText = subtitleElement.textContent || '';
    subtitleElement.textContent = '';
    
    subtitleText.split('. ').forEach((sentence, i) => {
      if (sentence.trim() === '') return;
      
      const lineSpan = document.createElement('span');
      lineSpan.textContent = sentence + (i < subtitleText.split('. ').length - 1 ? '. ' : '');
      lineSpan.className = styles.textLine;
      subtitleElement.appendChild(lineSpan);
    });
    
    // Split step titles and descriptions too
    stepTitleRefs.current.forEach((titleElem) => {
      if (!titleElem) return;
      
      const text = titleElem.textContent || '';
      titleElem.textContent = '';
      
      text.split(' ').forEach((word) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word + ' ';
        wordSpan.className = styles.stepTextLine;
        titleElem.appendChild(wordSpan);
      });
    });
    
    stepDescRefs.current.forEach((descElem) => {
      if (!descElem) return;
      
      const text = descElem.textContent || '';
      descElem.textContent = '';
      
      // Split by sentences for paragraph text
      text.split('. ').forEach((sentence, i) => {
        if (sentence.trim() === '') return;
        
        const lineSpan = document.createElement('span');
        lineSpan.textContent = sentence + (i < text.split('. ').length - 1 ? '. ' : '');
        lineSpan.className = styles.stepTextLine;
        descElem.appendChild(lineSpan);
      });
    });
  }, []);
  
  // Main animations setup
  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === 'undefined') return;
    
    const ctx = gsap.context(() => {
      // Header animations - line by line text reveal
      const titleLines = headerRef.current?.querySelectorAll(`.${styles.textLine}`);
      if (titleLines) {
        gsap.set(titleLines, { 
          y: '100%',
          opacity: 0,
          filter: 'blur(10px)'
        });
        
        gsap.to(titleLines, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "center 60%",
            scrub: 0.6
          },
          y: '0%',
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.05,
          duration: 1,
          ease: "verticalReveal",
        });
      }
      
      // Steps animation with scroll-driven reveal
      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        
        // Get all text lines within this step
        const stepLines = step.querySelectorAll(`.${styles.stepTextLine}`);
        
        // Set initial state
        gsap.set(stepLines, { 
          y: '100%', 
          opacity: 0,
          filter: 'blur(4px)'
        });
        
        // Create a timeline for this step's animation
        const stepTl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            end: "center 60%",
            scrub: 0.4
          }
        });
        
        // Animate the step card with clip-path for vertical reveal
        stepTl.fromTo(
          step.querySelector(`.${styles.stepContent}`),
          { clipPath: 'inset(100% 0 0 0)' },
          { 
            clipPath: 'inset(0% 0 0 0)', 
            duration: 0.8,
            ease: "smoothStep"
          },
          0
        );
        
        // Animate the step number with a grow effect
        stepTl.fromTo(
          step.querySelector(`.${styles.stepNumber}`),
          { scale: 0, filter: 'blur(10px)' },
          { 
            scale: 1, 
            filter: 'blur(0px)',
            duration: 0.5, 
            ease: "back.out(1.5)" 
          },
          0.2
        );
        
        // Animate text lines with staggered reveal
        stepTl.to(
          stepLines, 
          {
            y: '0%',
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.04,
            duration: 0.7,
            ease: "verticalReveal"
          }, 
          0.3
        );
        
        // Animate connection line based on scroll position
        const connectionLine = step.querySelector(`.${styles.connectionLine}`);
        if (connectionLine && index < 2) { // Only first two steps have connection lines
          gsap.fromTo(
            connectionLine,
            { height: '0%' },
            {
              height: '100%',
              scrollTrigger: {
                trigger: step,
                start: "top 70%",
                end: "bottom 50%",
                scrub: true
              },
              ease: "none"
            }
          );
          
          // Animated dots follow the connection line growth
          const dots = step.querySelectorAll(`.${styles.connectorDots} span`);
          dots.forEach((dot, i) => {
            gsap.fromTo(
              dot,
              { opacity: 0, scale: 0 },
              {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                  trigger: step,
                  start: `top ${60 - i*5}%`, // Staggered start positions
                  end: `center ${50 - i*5}%`,
                  scrub: 0.8
                },
                ease: "elastic.out(1, 0.8)"
              }
            );
          });
        }
      });
      
      // Data visualization animation
      if (illustrationRef.current) {
        // Make the illustration card visible with scroll
        gsap.fromTo(
          illustrationRef.current.closest(`.${styles.illustrationCard}`),
          { y: 80, opacity: 0, filter: 'blur(15px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scrollTrigger: {
              trigger: illustrationRef.current,
              start: "top 85%",
              end: "center 60%",
              scrub: 0.6
            },
            duration: 1,
            ease: "textBlur"
          }
        );
        
        // Select animation elements
        const dataParticles = illustrationRef.current.querySelectorAll(`.${styles.dataParticle}`);
        const insightParticles = illustrationRef.current.querySelectorAll(`.${styles.insightParticle}`);
        const processingCore = illustrationRef.current.querySelector(`.${styles.processingCore}`);
        
        // Data flow animation timeline
        const dataTimeline = gsap.timeline({ 
          repeat: -1,
          defaults: { ease: "none" }
        });
        
        // Animate each data particle
        dataParticles.forEach((particle, index) => {
          dataTimeline.fromTo(
            particle, 
            { y: -20, opacity: 0, scale: 0.8 },
            { y: 120, opacity: [0, 0.8, 0.8, 0], scale: [0.8, 1, 1, 0.8], duration: 3 },
            index * 0.5
          );
        });
        
        // Insight particles animation timeline
        const insightTimeline = gsap.timeline({ 
          repeat: -1,
          defaults: { ease: "none" }
        });
        
        // Animate each insight particle
        insightParticles.forEach((particle, index) => {
          insightTimeline.fromTo(
            particle, 
            { y: 100, opacity: 0, scale: 0.8 },
            { y: 0, opacity: [0, 0.8, 0.8, 0], scale: [0.8, 1, 1, 0.8], duration: 3 },
            index * 0.5
          );
        });
        
        // Processing core pulsing animation
        gsap.to(processingCore, { 
          scale: 1.05, 
          filter: "drop-shadow(0 0 30px rgba(13, 148, 136, 0.7))",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut"
        });
      }
      
      // Emphasis boxes reveal with scroll-driven clip-path animation
      const emphasisItems = emphasisBoxRef.current?.querySelectorAll(`.${styles.emphasisItem}`);
      if (emphasisItems) {
        gsap.set(emphasisItems, {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0.4
        });
        
        gsap.to(emphasisItems, {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          scrollTrigger: {
            trigger: emphasisBoxRef.current,
            start: "top 80%",
            end: "center 60%",
            scrub: 0.6
          },
          ease: "smoothStep"
        });
      }
    }, sectionRef);
    
    // Clean up animations when component unmounts
    return () => ctx.revert();
  }, []);
  
  // Animation for connection lines - using CSS variables for better performance
  useEffect(() => {
    const animateConnectionLines = () => {
      const connectionLines = document.querySelectorAll(`.${styles.connectionLine}`);
      connectionLines.forEach((line) => {
        gsap.to(line as Element, {
          "--line-offset": "100%", 
          duration: 3,
          repeat: -1,
          ease: "none",
        });
        
        gsap.to(line as Element, {
          "--glow-opacity": 0.5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    };
    
    if (typeof window !== 'undefined') {
      animateConnectionLines();
    }
  }, []);
  
  const steps: Step[] = [
    {
      number: 1,
      title: 'Connect Your Work Tools',
      description: 'Securely integrate GLYNAC with your existing platforms (e.g., Slack, Microsoft Teams, Jira, Google Workspace, Asana) in minutes. No complex setup, no disruption.',
      microDetail: 'We analyze metadata, never content.'
    },
    {
      number: 2,
      title: 'AI Analyzes Anonymous Work Signals',
      description: 'Our advanced AI ethically processes anonymized metadata—like communication patterns, meeting cadences, activity levels, and interaction sentiment (not message content)—to identify trends and potential risks.'
    },
    {
      number: 3,
      title: 'Get Clear Insights & Proactive Alerts',
      description: 'Access intuitive dashboards with real-time insights on team well-being, burnout risk, engagement levels, and workload balance. Receive timely alerts to address issues proactively.'
    }
  ];
  
  // Calculate progress bar width from scroll position
  const progressWidth = `${scrollProgress * 100}%`;

  return (
    <section className={styles.howItWorksSection} id="how-it-works" ref={sectionRef}>
      {/* Scroll progress indicator */}
      <div className={styles.scrollProgress}>
        <div className={styles.scrollProgressBar} style={{ width: progressWidth }}></div>
      </div>
      
      <div className={styles.backgroundDecoration}></div>
      
      <div className={styles.container}>
        <div className={styles.sectionHeader} ref={headerRef}>
          <div className={styles.sectionBadge}>Simple Integration</div>
          <h2 className={styles.sectionTitle} ref={titleRef}>How GLYNAC Works – The Simple Path to Insight</h2>
          <p className={styles.sectionSubtitle} ref={subtitleRef}>
            Our platform transforms workplace data into actionable insights in just three simple steps
          </p>
        </div>
        
        <div className={styles.stepsContainer} ref={stepsRef}>
          <div className={styles.stepsFlow}>
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`${styles.step} ${styles[`step${step.number}`]}`}
                ref={el => stepRefs.current[index] = el}
              >
                <div className={styles.stepConnector}>
                  <div className={styles.stepNumber}>
                    <span>{step.number}</span>
                    <div className={styles.stepNumberGlow}></div>
                  </div>
                  {step.number < 3 && (
                    <div className={styles.connectionLine}>
                      <div className={styles.connectionLineInner}></div>
                      <div className={styles.connectionLineGlow}></div>
                      <div className={styles.connectorDots}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepShine}></div>
                  <div className={styles.iconContainer}>
                    {step.number === 1 && (
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8V7C18 5.34315 16.6569 4 15 4H9C7.34315 4 6 5.34315 6 7V8M18 8C19.1046 8 20 8.89543 20 10V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V10C4 8.89543 4.89543 8 6 8M18 8H6M12 11V15M9 11V15M15 11V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {step.number === 2 && (
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 14C18 14 16.8 14 16 15C15.5 15.5 15 17 13 17C11 17 10.5 15.5 10 15C9.2 14 8 14 8 14M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8 9C8 9.55228 7.55228 10 7 10C6.44772 10 6 9.55228 6 9C6 8.44772 6.44772 8 7 8C7.55228 8 8 8.44772 8 9ZM18 9C18 9.55228 17.5523 10 17 10C16.4477 10 16 9.55228 16 9C16 8.44772 16.4477 8 17 8C17.5523 8 18 8.44772 18 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {step.number === 3 && (
                      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    <div className={styles.iconGlow}></div>
                  </div>
                  <h3 
                    className={styles.stepTitle} 
                    ref={el => stepTitleRefs.current[index] = el}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className={styles.stepDescription}
                    ref={el => stepDescRefs.current[index] = el}
                  >
                    {step.description}
                  </p>
                  {step.microDetail && (
                    <div className={styles.microDetailContainer}>
                      <div className={styles.microDetailIcon}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className={styles.microDetail}>{step.microDetail}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.illustration}>
            <div className={styles.illustrationCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardControls}>
                  <span className={styles.controlDot}></span>
                  <span className={styles.controlDot}></span>
                  <span className={styles.controlDot}></span>
                </div>
                <div className={styles.cardTitle}>GLYNAC Data Flow</div>
              </div>
              <div className={styles.illustrationContent} ref={illustrationRef}>
                <div className={styles.sourceSystemsContainer}>
                  <div className={`${styles.sourceSystem} ${styles.sourceSystem_slack}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.sourceIcon}>
                      <path d="M14.5 2C13.67 2 13 2.67 13 3.5V10.5C13 11.33 13.67 12 14.5 12C15.33 12 16 11.33 16 10.5V3.5C16 2.67 15.33 2 14.5 2Z" fill="#3B82F6"/>
                      <path d="M9.5 12C8.67 12 8 12.67 8 13.5V20.5C8 21.33 8.67 22 9.5 22C10.33 22 11 20.5V13.5C11 12.67 10.33 12 9.5 12Z" fill="#0D9488"/>
                      <path d="M3.5 8C2.67 8 2 8.67 2 9.5C2 10.33 2.67 11 3.5 11H10.5C11.33 11 12 10.33 12 9.5C12 8.67 11.33 8 10.5 8H3.5Z" fill="#0D9488"/>
                      <path d="M20.5 13C21.33 13 22 13.67 22 14.5C22 15.33 21.33 16 20.5 16H13.5C12.67 16 12 15.33 12 14.5C12 13.67 12.67 13 13.5 13H20.5Z" fill="#3B82F6"/>
                    </svg>
                    <div className={styles.sourceGlow}></div>
                  </div>
                  <div className={`${styles.sourceSystem} ${styles.sourceSystem_teams}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.sourceIcon}>
                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#3B82F6"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#3B82F6" strokeWidth="2"/>
                    </svg>
                    <div className={styles.sourceGlow}></div>
                  </div>
                  <div className={`${styles.sourceSystem} ${styles.sourceSystem_jira}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.sourceIcon}>
                      <path d="M9.5 7L12 4.5L14.5 7L12 9.5L9.5 7Z" fill="#0D9488"/>
                      <path d="M7 9.5L9.5 7L12 9.5L9.5 12L7 9.5Z" fill="#0D9488"/>
                      <path d="M12 9.5L14.5 7L17 9.5L14.5 12L12 9.5Z" fill="#3B82F6"/>
                      <path d="M9.5 12L12 9.5L14.5 12L12 14.5L9.5 12Z" fill="#3B82F6"/>
                      <path d="M12 14.5L9.5 12L7 14.5L9.5 17L12 14.5Z" fill="#0D9488"/>
                      <path d="M14.5 12L12 14.5L14.5 17L17 14.5L14.5 12Z" fill="#0D9488"/>
                    </svg>
                    <div className={styles.sourceGlow}></div>
                  </div>
                </div>
                <div className={styles.dataStreamsContainer}>
                  <div className={styles.dataStream}>
                    <div className={styles.dataParticle}></div>
                    <div className={styles.dataParticle}></div>
                    <div className={styles.dataParticle}></div>
                    <div className={styles.dataParticle}></div>
                  </div>
                </div>
                <div className={styles.processingCenter}>
                  <div className={styles.processingRing}></div>
                  <div className={styles.processingRing}></div>
                  <div className={styles.processingRing}></div>
                  <div className={styles.processingCore}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.processingIcon}>
                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="white"/>
                      <path d="M8 12H4M20 12H16M12 4V8M12 16V20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className={styles.insightsContainer}>
                  <div className={styles.insightStream}>
                    <div className={styles.insightParticle}></div>
                    <div className={styles.insightParticle}></div>
                    <div className={styles.insightParticle}></div>
                  </div>
                  <div className={styles.insightDashboard}>
                    <div className={styles.dashboardGraph}><div className={styles.graphShine}></div></div>
                    <div className={styles.dashboardGraph}><div className={styles.graphShine}></div></div>
                    <div className={styles.dashboardGraph}><div className={styles.graphShine}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.emphasisBox} ref={emphasisBoxRef}>
          <div className={styles.emphasisItem}>
            <div className={styles.emphasisIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.emphasisIconGlow}></div>
            </div>
            <p className={styles.emphasisText}>Get your first insights within 24 hours.</p>
            <div className={styles.emphasisShine}></div>
          </div>
          <div className={styles.emphasisItem}>
            <div className={styles.emphasisIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V11M5 11H19C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.emphasisIconGlow}></div>
            </div>
            <p className={styles.emphasisText}>Privacy-first by design. We focus on patterns, not personal data.</p>
            <div className={styles.emphasisShine}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;