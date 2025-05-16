"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './RoleBasedBenefits.module.css';

type Role = {
  id: string;
  icon: string;
  title: string;
  headline: string;
  points: string[];
  ctaText: string;
  ctaLink: string;
};

const RoleBasedBenefits: React.FC = () => {
  const [activeRole, setActiveRole] = useState('executives');
  
  const roles: Role[] = [
    {
      id: 'executives',
      icon: '📈',
      title: 'For CXOs & Executives',
      headline: 'Strategic Oversight & Organizational Health',
      points: [
        'Gain unprecedented visibility into enterprise-wide people-risk and well-being trends.',
        'Make data-driven decisions to optimize talent retention, productivity, and innovation.',
        'Proactively mitigate risks associated with burnout, attrition, and disengagement.'
      ],
      ctaText: 'See Solution for Executives',
      ctaLink: '/solutions#executives'
    },
    {
      id: 'managers',
      icon: '👥',
      title: 'For People Managers & Team Leads',
      headline: 'Empower Your Teams to Thrive',
      points: [
        'Understand individual and team needs without micromanaging or waiting for issues to surface.',
        'Receive early warnings to provide timely support for workload, stress, or disengagement.',
        'Foster a culture of trust and psychological safety within your team.'
      ],
      ctaText: 'See Solution for Managers',
      ctaLink: '/solutions#managers'
    },
    {
      id: 'operations',
      icon: '⚙️',
      title: 'For Operations & Project Leaders',
      headline: 'Optimize Workflows & Collaboration',
      points: [
        'Identify bottlenecks, balance workloads across teams, and improve resource allocation.',
        'Analyze meeting effectiveness and reduce unnecessary collaborative overhead.',
        'Enhance cross-functional collaboration by understanding communication patterns.'
      ],
      ctaText: 'See Solution for Ops Leaders',
      ctaLink: '/solutions#operations'
    },
    {
      id: 'hr',
      icon: '🧠',
      title: 'For HR & People Ops Professionals',
      headline: 'Drive Proactive HR Initiatives & Boost Retention',
      points: [
        'Access leading indicators for attrition, burnout, and engagement to inform HR strategy.',
        'Develop targeted well-being programs based on real data, not just surveys.',
        'Champion a data-informed culture of employee well-being and proactive support.'
      ],
      ctaText: 'See Solution for HR Professionals',
      ctaLink: '/solutions#hr'
    }
  ];
  
  const activeRoleData = roles.find(role => role.id === activeRole) || roles[0];

  return (
    <section className={styles.roleBasedSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Tailored Insights for Strategic Impact</h2>
          <p className={styles.subtitle}>
            GLYNAC provides customized insights for every leader in your organization, ensuring everyone has the data they need to make an impact.
          </p>
        </div>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {roles.map((role) => (
              <button
                key={role.id}
                className={`${styles.tabButton} ${activeRole === role.id ? styles.activeTab : ''}`}
                onClick={() => setActiveRole(role.id)}
              >
                <span className={styles.tabIcon}>{role.icon}</span>
                <span className={styles.tabLabel}>{role.title}</span>
              </button>
            ))}
          </div>
          
          <div className={styles.tabContent}>
            <div className={styles.roleHeader}>
              <h3 className={styles.roleTitle}>{activeRoleData.headline}</h3>
            </div>
            
            <ul className={styles.benefitsList}>
              {activeRoleData.points.map((point, index) => (
                <li key={index} className={styles.benefitItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <div className={styles.roleFooter}>
              <Link href={activeRoleData.ctaLink} className={styles.roleCtaButton}>
                {activeRoleData.ctaText}
              </Link>
            </div>
            
            <div className={styles.roleDashboardPreview}>
              {/* In a real implementation, this would be a dashboard preview image */}
              <div className={styles.dashboardPlaceholder}>
                <div className={styles.dashboardHeader}>
                  <div className={styles.dashboardTitle}>{activeRoleData.title} Dashboard</div>
                </div>
                <div className={styles.dashboardContent}>
                  <div className={styles.dashboardWidget}></div>
                  <div className={styles.dashboardWidget}></div>
                  <div className={styles.dashboardWidget}></div>
                  <div className={styles.dashboardWidget}></div>
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