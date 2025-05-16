"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './DemoSnapshot.module.css';

type DashboardView = {
  id: string;
  title: string;
  description: string;
};

const DemoSnapshot: React.FC = () => {
  const [activeView, setActiveView] = useState('risk');
  
  const dashboardViews: DashboardView[] = [
    {
      id: 'risk',
      title: 'Risk Detection',
      description: 'Early warning system for burnout and disengagement risks across teams'
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'Monitor team morale and communication sentiment over time'
    },
    {
      id: 'workload',
      title: 'Workload Distribution',
      description: 'Identify potential overload and optimize resource allocation'
    },
    {
      id: 'meetings',
      title: 'Meeting Efficiency',
      description: 'Analyze meeting patterns and identify optimization opportunities'
    }
  ];
  
  const activeViewData = dashboardViews.find(view => view.id === activeView) || dashboardViews[0];

  return (
    <section className={styles.demoSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>See GLYNAC in Action: Clarity at Your Fingertips</h2>
          <p className={styles.subtitle}>
            Experience how GLYNAC turns complex data into actionable insights, helping you understand and support your teams like never before.
          </p>
        </div>
        
        <div className={styles.demoContainer}>
          <div className={styles.viewSelector}>
            {dashboardViews.map((view) => (
              <button 
                key={view.id}
                className={`${styles.viewButton} ${activeView === view.id ? styles.activeView : ''}`}
                onClick={() => setActiveView(view.id)}
              >
                {view.title}
              </button>
            ))}
          </div>
          
          <div className={styles.dashboardContainer}>
            <div className={styles.dashboardTitle}>
              <h3>{activeViewData.title}</h3>
              <p>{activeViewData.description}</p>
            </div>
            
            <div className={styles.dashboard}>
              {/* Interactive dashboard mockup with highlighted elements */}
              {activeView === 'risk' && (
                <div className={styles.riskDashboard}>
                  <div className={styles.riskHeader}>
                    <div className={styles.riskTitle}>Team Risk Scores</div>
                    <div className={styles.riskPeriod}>Last 30 days</div>
                  </div>
                  
                  <div className={styles.riskGrid}>
                    <div className={`${styles.riskCard} ${styles.alertLevel}`}>
                      <div className={styles.riskName}>Engineering</div>
                      <div className={styles.riskScore}>74</div>
                      <div className={styles.riskTrend}>↑ 12%</div>
                    </div>
                    
                    <div className={`${styles.riskCard} ${styles.warningLevel}`}>
                      <div className={styles.riskName}>Marketing</div>
                      <div className={styles.riskScore}>53</div>
                      <div className={styles.riskTrend}>↑ 5%</div>
                    </div>
                    
                    <div className={`${styles.riskCard} ${styles.goodLevel}`}>
                      <div className={styles.riskName}>Sales</div>
                      <div className={styles.riskScore}>28</div>
                      <div className={styles.riskTrend}>↓ 7%</div>
                    </div>
                    
                    <div className={`${styles.riskCard} ${styles.goodLevel}`}>
                      <div className={styles.riskName}>Customer Success</div>
                      <div className={styles.riskScore}>32</div>
                      <div className={styles.riskTrend}>↑ 2%</div>
                    </div>
                  </div>
                  
                  <div className={styles.riskDetail}>
                    <div className={styles.detailHeader}>
                      <div className={styles.detailTitle}>Engineering Team - Burnout Signals</div>
                      <div className={styles.riskFilters}>
                        <span className={styles.activeFilter}>All Signals</span>
                        <span>Working Hours</span>
                        <span>Meeting Load</span>
                        <span>Communication</span>
                      </div>
                    </div>
                    
                    <div className={styles.signalsList}>
                      <div className={styles.signalItem}>
                        <div className={styles.signalIcon}>🕒</div>
                        <div className={styles.signalInfo}>
                          <div className={styles.signalTitle}>After-hours work increased 38%</div>
                          <div className={styles.signalDetail}>7 team members affected</div>
                        </div>
                      </div>
                      
                      <div className={styles.signalItem}>
                        <div className={styles.signalIcon}>📅</div>
                        <div className={styles.signalInfo}>
                          <div className={styles.signalTitle}>Meeting overload detected</div>
                          <div className={styles.signalDetail}>27+ hours weekly for senior developers</div>
                        </div>
                      </div>
                      
                      <div className={styles.signalItem}>
                        <div className={styles.signalIcon}>💬</div>
                        <div className={styles.signalInfo}>
                          <div className={styles.signalTitle}>Communication sentiment declining</div>
                          <div className={styles.signalDetail}>12% decrease in positive language</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeView === 'sentiment' && (
                <div className={styles.sentimentDashboard}>
                  {/* Sentiment analysis dashboard placeholder */}
                  <div className={styles.sentimentHeader}>
                    <div className={styles.sentimentTitle}>Team Sentiment Trends</div>
                    <div className={styles.sentimentPeriod}>Last 90 days</div>
                  </div>
                  
                  <div className={styles.sentimentChart}>
                    <div className={styles.chartLabels}>
                      <div className={styles.yAxis}>
                        <span>Positive</span>
                        <span>Neutral</span>
                        <span>Negative</span>
                      </div>
                    </div>
                    <div className={styles.chartLines}>
                      <div className={styles.chartLine} style={{ "--height": "70%" } as React.CSSProperties}></div>
                      <div className={styles.chartLine} style={{ "--height": "60%" } as React.CSSProperties}></div>
                      <div className={styles.chartLine} style={{ "--height": "75%" } as React.CSSProperties}></div>
                      <div className={styles.chartLine} style={{ "--height": "55%" } as React.CSSProperties}></div>
                      <div className={styles.chartLine} style={{ "--height": "65%" } as React.CSSProperties}></div>
                      <div className={styles.chartLine} style={{ "--height": "45%" } as React.CSSProperties}></div>
                      <div className={styles.chartLine} style={{ "--height": "40%" } as React.CSSProperties}></div>
                    </div>
                    <div className={styles.xAxis}>
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                    </div>
                  </div>
                </div>
              )}
              
              {(activeView === 'workload' || activeView === 'meetings') && (
                <div className={styles.placeholderDashboard}>
                  <div className={styles.placeholderText}>
                    {activeView === 'workload' ? 'Workload Distribution Dashboard' : 'Meeting Efficiency Dashboard'}
                  </div>
                  <div className={styles.placeholderDescription}>
                    {activeView === 'workload' 
                      ? 'Visualize team workload balance and identify potential overloaded team members' 
                      : 'Analyze meeting patterns and optimize your team\'s calendar efficiency'}
                  </div>
                  <div className={styles.placeholderElements}>
                    <div className={styles.placeholderChart}></div>
                    <div className={styles.placeholderList}>
                      <div className={styles.placeholderItem}></div>
                      <div className={styles.placeholderItem}></div>
                      <div className={styles.placeholderItem}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.demoFooter}>
          <Link href="/contact" className={styles.demoButton}>
            Explore Full Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DemoSnapshot;