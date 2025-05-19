"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from './PainPointsSection.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface for panel data
interface PainPoint {
  title: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
}

const PainPointsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  // Panel data
  const panels: PainPoint[] = [
    {
      title: 'TEAM BURNOUT PREVENTION',
      description: 'Proactively identify team members experiencing overload before productivity decreases, quality suffers, and valuable talent exits your organization.',
      imageSrc: '/images/burnout.jpg',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          <path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path>
          <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path>
          <path d="M18 8a6 6 0 0 0-9.33-5"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      )
    },
    {
      title: 'DATA-DRIVEN INSIGHTS',
      description: 'Access real-time analytics on team dynamics, sentiment, and workload distribution to replace guesswork with actionable intelligence.',
      imageSrc: '/images/analytics.jpg',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="12" y1="2" x2="12" y2="22"></line>
        </svg>
      )
    },
    {
      title: 'ENHANCED TEAM ENGAGEMENT',
      description: 'Detect early warning signs of disengagement and isolation, especially crucial in today\'s remote and hybrid work environments.',
      imageSrc: '/images/engagement.jpg',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: 'PROACTIVE MANAGEMENT',
      description: 'Transform from reactive problem-solving to proactive team optimization, preventing issues before they impact performance and morale.',
      imageSrc: '/images/management.jpg',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <path d="M14 2v6h6"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
          <path d="M10 9H8"></path>
        </svg>
      )
    },
    {
      title: 'WORKFLOW OPTIMIZATION',
      description: 'Identify and address uneven workloads and meeting inefficiencies with precise data, enabling focused productivity improvement.',
      imageSrc: '/images/workflow.jpg',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      )
    }
  ];

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Connect Lenis to RAF (request animation frame)
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // GSAP animations for section entrance
  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;
    
    const mm = gsap.matchMedia();
    
    // Create responsive animations
    mm.add("(min-width: 768px)", () => {
      // Desktop animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none none"
        }
      });
      
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        itemsRef.current,
        { y: 30, opacity: 0, stagger: 0.1 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        closingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      );
      
      timelineRef.current = tl;
    });
    
    mm.add("(max-width: 767px)", () => {
      // Mobile animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
      
      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        itemsRef.current,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.08, 
          duration: 0.5, 
          ease: "power1.out" 
        },
        "-=0.3"
      )
      .fromTo(
        closingRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power1.out" },
        "-=0.1"
      );
      
      timelineRef.current = tl;
    });
    
    return () => {
      mm.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Handle panel interactions with GSAP
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof window === 'undefined') return;

    // Function to handle panel activation with GSAP
    const setActiveItem = (index: number) => {
      if (index === activeIndex) return;
      
      // First, create a grid template for the transition
      const cols = new Array(panels.length)
        .fill('')
        .map((_, i) => {
          if (i === index) return '5fr';
          return '1fr';
        })
        .join(' ');
      
      // Smoothly animate the grid template columns
      gsap.to(list, {
        gridTemplateColumns: cols,
        duration: 0.6,
        ease: "power3.inOut"
      });
      
      // Animate the previous active panel's content out
      if (itemsRef.current[activeIndex]) {
        const prevContent = itemsRef.current[activeIndex]?.querySelector(`.${styles.panelContent}`);
        const prevBg = itemsRef.current[activeIndex]?.querySelector(`.${styles.panelBackground}`);
        const prevTitle = itemsRef.current[activeIndex]?.querySelector(`.${styles.titleContainer}`);
        const prevIcon = itemsRef.current[activeIndex]?.querySelector(`.${styles.iconContainer}`);
        
        gsap.to(prevContent, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.inOut"
        });
        
        gsap.to(prevBg, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut"
        });
        
        gsap.to([prevTitle, prevIcon], {
          opacity: 1,
          duration: 0.4,
          ease: "power1.inOut",
          stagger: 0.05
        });
      }
      
      // Set data attributes for CSS styling
      itemsRef.current.forEach((item, i) => {
        if (item) {
          item.dataset.active = (i === index).toString();
          
          // For new active panel, load the background image with animation
          if (i === index) {
            item.style.backgroundImage = `url(${panels[i].imageSrc})`;
            gsap.fromTo(item, 
              { backgroundSize: "110%" },
              { backgroundSize: "cover", duration: 1.2, ease: "power2.out" }
            );
          }
        }
      });
      
      // Animate the new active panel's content in
      const newContent = itemsRef.current[index]?.querySelector(`.${styles.panelContent}`);
      const newBg = itemsRef.current[index]?.querySelector(`.${styles.panelBackground}`);
      const newTitle = itemsRef.current[index]?.querySelector(`.${styles.titleContainer}`);
      const newIcon = itemsRef.current[index]?.querySelector(`.${styles.iconContainer}`);
      
      // Animate background fade
      gsap.to(newBg, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
      
      // Animate title and icon out
      gsap.to([newTitle, newIcon], {
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
        stagger: 0.05
      });
      
      // Animate content in with slight delay
      gsap.to(newContent, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.15,
        ease: "power3.out"
      });
      
      // Update state
      setActiveIndex(index);
    };

    // Set initial active item with animation
    setActiveItem(activeIndex);

    // Event handlers for interaction
    const handleClick = (event: MouseEvent) => {
      const closest = (event.target as HTMLElement).closest('li');
      if (closest) {
        const index = itemsRef.current.indexOf(closest as HTMLLIElement);
        if (index !== -1) {
          setActiveItem(index);
        }
      }
    };
    
    // Mouse enter handlers for each panel
    const mouseEnterListeners = panels.map((_, index) => {
      return () => setActiveItem(index);
    });

    itemsRef.current.forEach((item, index) => {
      if (item) {
        item.addEventListener('mouseenter', mouseEnterListeners[index]);
      }
    });

    // Keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveItem((activeIndex + 1) % panels.length);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveItem((activeIndex - 1 + panels.length) % panels.length);
      }
    };
    
    // Add event listeners
    list.addEventListener('click', handleClick as EventListener);
    list.addEventListener('keydown', handleKeyDown as EventListener);

    // Cleanup event listeners
    return () => {
      list.removeEventListener('click', handleClick as EventListener);
      list.removeEventListener('keydown', handleKeyDown as EventListener);
      
      itemsRef.current.forEach((item, index) => {
        if (item) {
          item.removeEventListener('mouseenter', mouseEnterListeners[index]);
        }
      });
    };
  }, [activeIndex, panels.length]);

  return (
    <section ref={sectionRef} className={styles.panelSection}>
      <div className={styles.container}>
        <h2 ref={titleRef} className={styles.sectionTitle}>
          Overcome Hidden Team Challenges with Data-Driven Insights
        </h2>
        
        <div ref={subtitleRef} className={styles.subtitleContainer}>
          <p className={styles.subtitle}>
            In today's complex work environment, identifying team performance bottlenecks before they impact productivity 
            and morale requires advanced analytics and actionable intelligence. GLYNAC delivers visibility into what matters most.
          </p>
        </div>
        
        <ul 
          ref={listRef} 
          className={styles.panelsList}
          role="tablist"
          aria-orientation="horizontal"
        >
          {panels.map((panel, index) => (
            <li 
              key={index} 
              ref={el => { itemsRef.current[index] = el; }}
              data-active={index === activeIndex ? 'true' : 'false'}
              className={styles.panelItem}
              role="tab"
              aria-selected={index === activeIndex}
              tabIndex={0}
              aria-controls={`panel-content-${index}`}
            >
              <div className={styles.panelBackground}></div>
              
              <div className={styles.titleContainer}>
                <h3 className={styles.verticalTitle}>{panel.title}</h3>
              </div>
              
              <div className={styles.iconContainer}>{panel.icon}</div>
              
              <div 
                id={`panel-content-${index}`}
                role="tabpanel"
                className={styles.panelContent}
              >
                <div className={styles.contentInner}>
                  <p className={styles.panelDescription}>{panel.description}</p>
                  
                  <a href="#" className={styles.actionButton}>
                    <span>Learn more</span>
                    <svg className={styles.actionButtonIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        <div ref={closingRef} className={styles.closingStatement}>
          <p>Gain unprecedented clarity into your team's dynamics with GLYNAC</p>
          <a href="#contact" className={styles.ctaButton}>
            Schedule a Demo
            <svg className={styles.ctaIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;