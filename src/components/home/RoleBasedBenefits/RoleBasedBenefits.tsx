// RoleBasedBenefits.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './RoleBasedBenefits.module.css';

type RoleId = 'executives' | 'managers' | 'operations' | 'hr';

type Role = {
  id: RoleId;
  icon: string;
  title: string;
  headline: string;
  points: string[];
  ctaText: string;
  ctaLink: string;
};

const RoleBasedBenefits: React.FC = () => {
  const [activeRole, setActiveRole] = useState<RoleId>('executives');
  const contentRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const roles: Role[] = [
    {
      id: 'executives',
      icon: '👤',
      title: 'Executives',
      headline: 'Drive Strategy with Real-Time Insights',
      points: [
        'Access high-level KPIs instantly',
        'Monitor organizational performance',
        'Make data-driven strategic decisions',
      ],
      ctaText: 'Explore Executive Dashboard',
      ctaLink: '#executive-demo',
    },
    {
      id: 'managers',
      icon: '👥',
      title: 'Managers',
      headline: 'Empower Your Team with Clear Metrics',
      points: [
        'Track team performance metrics',
        'Identify bottlenecks in real-time',
        'Optimize resource allocation',
      ],
      ctaText: 'See Manager Tools',
      ctaLink: '#manager-demo',
    },
    {
      id: 'operations',
      icon: '⚙️',
      title: 'Operations',
      headline: 'Streamline Processes with Precision',
      points: [
        'Monitor operational efficiency',
        'Analyze workflow data',
        'Reduce downtime with insights',
      ],
      ctaText: 'View Operations Suite',
      ctaLink: '#operations-demo',
    },
    {
      id: 'hr',
      icon: '💼',
      title: 'HR',
      headline: 'Enhance People Management',
      points: [
        'Track employee engagement',
        'Analyze workforce trends',
        'Support talent development',
      ],
      ctaText: 'Discover HR Analytics',
      ctaLink: '#hr-demo',
    },
  ];

  const activeRoleData = roles.find(role => role.id === activeRole) || roles[0];

  useEffect(() => {
    if (contentRef.current && dashboardRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(contentRef.current.querySelector(`.${styles.tabs__content__header}`), 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
      .fromTo(contentRef.current.querySelectorAll(`.${styles.tabs__content__benefit}`), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.2'
      )
      .fromTo(contentRef.current.querySelector(`.${styles.tabs__content__footer}`), 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }, '-=0.3'
      )
      .fromTo(dashboardRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2'
      )
      .fromTo(dashboardRef.current.querySelectorAll(`.${styles.tabs__dashboard__widget}`), 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out' }, '-=0.3'
      )
      .fromTo(dashboardRef.current.querySelectorAll(`.${styles.chart__bar}`), 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' }, '-=0.2'
      );
    }
  }, [activeRole]);

  return (
    <section className={styles.role}>
      <div className={styles.role__container}>
        <div className={styles.role__header}>
          <h2 className={styles.role__title}>Tailored Insights for Strategic Impact</h2>
          <p className={styles.role__subtitle}>
            GLYNAC provides customized insights for every leader in your organization, ensuring everyone has the data they need to make an impact.
          </p>
        </div>
        
        <div className={styles.tabs}>
          <div className={styles.tabs__list} role="tablist">
            {roles.map((role) => (
              <button
                key={role.id}
                role="tab"
                aria-selected={activeRole === role.id}
                aria-controls={`tabpanel-${role.id}`}
                className={`${styles.tabs__button} ${activeRole === role.id ? styles['tabs__button--active'] : ''}`}
                onClick={() => setActiveRole(role.id)}
              >
                <span className={styles.tabs__button__icon}>{role.icon}</span>
                <span className={styles.tabs__button__label}>{role.title}</span>
              </button>
            ))}
          </div>
          
          <div 
            className={styles.tabs__content} 
            ref={contentRef} 
            role="tabpanel" 
            id={`tabpanel-${activeRole}`}
          >
            <div className={styles.tabs__content__header}>
              <h3 className={styles.tabs__content__title}>{activeRoleData.headline}</h3>
            </div>
            
            <ul className={styles.tabs__content__benefits}>
              {activeRoleData.points.map((point, index) => (
                <li key={index} className={styles.tabs__content__benefit}>
                  <span className={styles.tabs__content__check}>✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <div className={styles.tabs__content__footer}>
              <Link href={activeRoleData.ctaLink} className={styles.tabs__content__cta}>
                {activeRoleData.ctaText}
              </Link>
            </div>
            
            <div className={styles.tabs__dashboard} ref={dashboardRef}>
              <div className={styles.tabs__dashboard__placeholder}>
                <div className={styles.tabs__dashboard__header}>
                  <div className={styles.tabs__dashboard__title}>{activeRoleData.title} Dashboard</div>
                </div>
                <div className={styles.tabs__dashboard__content}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={styles.tabs__dashboard__widget}>
                      <div className={styles.widget__title}>Metric {index + 1}</div>
                      <div className={styles.widget__chart}>
                        {Array.from({ length: 5 }).map((_, barIndex) => (
                          <div key={barIndex} className={styles.chart__bar} style={{ height: `${20 + barIndex * 10}px` }}></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleBasedBenefits;