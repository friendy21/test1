"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './DemoSnapshot.module.css';

type ViewId = 'risk' | 'sentiment' | 'workload' | 'meetings';

type DashboardView = {
  id: ViewId;
  title: string;
  description: string;
};

const DemoSnapshot: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewId>('risk');
  const contentRef = useRef<HTMLDivElement>(null);

  const dashboardViews: DashboardView[] = [
    {
      id: 'risk',
      title: 'Risk Detection',
      description: 'Early warning system for burnout and disengagement risks across teams',
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'Monitor team morale and communication sentiment over time',
    },
    {
      id: 'workload',
      title: 'Workload Distribution',
      description: 'Identify potential overload and optimize resource allocation',
    },
    {
      id: 'meetings',
      title: 'Meeting Efficiency',
      description: 'Analyze meeting patterns and identify optimization opportunities',
    },
  ];

  const activeViewData = dashboardViews.find((view) => view.id === activeView) || dashboardViews[0];

  useEffect(() => {
    if (contentRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        contentRef.current.querySelector(`.${styles.demo__content__header}`),
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      ).fromTo(
        contentRef.current.querySelectorAll(`.${styles.demo__content__item}`),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
      );
    }
  }, [activeView]);

  return (
    <section className={styles.demo}>
      <div className={styles.demo__container}>
        <div className={styles.demo__header}>
          <h2 className={styles.demo__title}>See GLYNAC in Action: Clarity at Your Fingertips</h2>
          <p className={styles.demo__subtitle}>
            Experience how GLYNAC turns complex data into actionable insights, helping you understand and support your teams like never before.
          </p>
        </div>

        <div className={styles.demo__views}>
          <div className={styles.demo__selector} role="tablist">
            {dashboardViews.map((view) => (
              <button
                key={view.id}
                role="tab"
                aria-selected={activeView === view.id}
                aria-controls={`tabpanel-${view.id}`}
                className={`${styles.demo__button} ${activeView === view.id ? styles['demo__button--active'] : ''}`}
                onClick={() => setActiveView(view.id)}
              >
                {view.title}
              </button>
            ))}
          </div>

          <div
            className={styles.demo__content}
            ref={contentRef}
            role="tabpanel"
            id={`tabpanel-${activeView}`}
          >
            <div className={styles.demo__content__header}>
              <h3>{activeViewData.title}</h3>
              <p>{activeViewData.description}</p>
            </div>

            {activeView === 'risk' && (
              <div className={styles.demo__risk}>
                <div className={styles.demo__risk__header}>
                  <div className={styles.demo__risk__title}>Team Risk Scores</div>
                  <div className={styles.demo__risk__period}>Last 30 days</div>
                </div>
                <div className={styles.demo__risk__grid}>
                  {['Engineering', 'Marketing', 'Sales', 'Customer Success'].map((team, index) => (
                    <div
                      key={index}
                      className={`${styles.demo__risk__card} ${styles[`demo__risk__card--${index % 3}`]}`}
                    >
                      <div className={styles.demo__risk__name}>{team}</div>
                      <div className={styles.demo__risk__score}>{70 - index * 10}</div>
                      <div className={styles.demo__risk__trend}>{index % 2 === 0 ? '↑ 5%' : '↓ 3%'}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'sentiment' && (
              <div className={styles.demo__sentiment}>
                <div className={styles.demo__sentiment__chart}>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div
                      key={index}
                      className={styles.demo__sentiment__bar}
                      style={{ height: `${50 + index * 10}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {(activeView === 'workload' || activeView === 'meetings') && (
              <div className={styles.demo__placeholder}>
                <div className={styles.demo__placeholder__text}>
                  {activeView === 'workload' ? 'Workload Distribution Dashboard' : 'Meeting Efficiency Dashboard'}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.demo__footer}>
          <Link href="/contact" className={styles.demo__cta}>
            Explore Full Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DemoSnapshot;