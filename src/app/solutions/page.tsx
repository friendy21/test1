import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Solutions | Glynac Workplace Analytics',
  description: 'Discover how Glynac\'s workplace analytics solutions can address your organization\'s specific challenges across departments and roles.',
};

type BusinessChallenge = {
  id: string;
  title: string;
  description: string;
  how_glynac_helps: string[];
  key_metrics: string[];
  impact_highlight: string;
};

type DepartmentSolution = {
  id: string;
  title: string;
  key_challenges: string[];
  glynac_solutions: string[];
  dashboard_name: string;
};

export default function SolutionsPage() {
  const businessChallenges: BusinessChallenge[] = [
    {
      id: 'turnover',
      title: 'Reducing Employee Turnover',
      description: 'The average cost of replacing an employee ranges from 50-200% of their annual salary. Beyond these direct costs, turnover disrupts teams, impacts institutional knowledge, and affects customer relationships.',
      how_glynac_helps: [
        'Identifies flight risk employees before they start job hunting',
        'Detects burnout signals across teams and individuals',
        'Provides early warning of satisfaction issues through sentiment analysis',
        'Monitors workload balance to prevent overwork',
        'Benchmarks departments to identify retention problem areas'
      ],
      key_metrics: [
        'Retention risk scores by employee and department',
        'Burnout indicators dashboard',
        'Communication sentiment trends',
        'Workload distribution analysis'
      ],
      impact_highlight: 'Organizations using Glynac\'s retention analytics have reduced voluntary turnover by an average of 18% within the first year.'
    },
    {
      id: 'performance',
      title: 'Improving Team Performance',
      description: 'Productivity obstacles often remain invisible until they\'ve already impacted performance. Most organizations lack visibility into the factors blocking their teams from doing their best work.',
      how_glynac_helps: [
        'Identifies meeting overload and calendar conflicts',
        'Detects process bottlenecks between teams',
        'Analyzes communication patterns to find collaboration issues',
        'Provides focus time metrics and improvement opportunities',
        'Highlights untapped talent and skills across the organization'
      ],
      key_metrics: [
        'Meeting hours vs. focus time ratio',
        'Response time benchmarks',
        'Process handoff analysis',
        'Department comparison matrix',
        'Performance drag identification'
      ],
      impact_highlight: 'Teams using Glynac\'s performance insights have reclaimed an average of 5.2 hours per employee per week in productivity improvements.'
    },
    {
      id: 'risks',
      title: 'Reducing Workplace Risks',
      description: 'Organizations face numerous workplace risks that often go undetected until they become serious issues—from harassment and compliance violations to security concerns and team conflicts.',
      how_glynac_helps: [
        'Detects potential harassment patterns in communications',
        'Identifies security risks and data handling concerns',
        'Monitors compliance with workplace policies',
        'Alerts leaders to emerging team conflicts',
        'Provides custom risk rules for industry-specific concerns'
      ],
      key_metrics: [
        'Risk alerts by type and severity',
        'Department risk comparisons',
        'Compliance monitoring dashboards',
        'Custom risk rule effectiveness'
      ],
      impact_highlight: 'Glynac typically identifies 15-20 potential risk situations per month that would otherwise go undetected in a 500-person organization.'
    }
  ];

  const departmentSolutions: DepartmentSolution[] = [
    {
      id: 'hr',
      title: 'Human Resources',
      key_challenges: [
        'Reducing turnover and improving retention',
        'Detecting workplace issues before they escalate',
        'Supporting employee wellbeing effectively',
        'Measuring the impact of HR initiatives'
      ],
      glynac_solutions: [
        'Retention risk dashboards with proactive alerts',
        'Sentiment analysis across departments and teams',
        'Workload distribution and balance monitoring',
        'HR program effectiveness measurement'
      ],
      dashboard_name: 'CHRO View'
    },
    {
      id: 'operations',
      title: 'Operations',
      key_challenges: [
        'Optimizing processes and removing bottlenecks',
        'Balancing workload across teams',
        'Improving meeting effectiveness',
        'Ensuring efficient resource allocation'
      ],
      glynac_solutions: [
        'Process bottleneck identification',
        'Department comparison matrix',
        'Meeting efficiency analytics',
        'Resource utilization dashboards'
      ],
      dashboard_name: 'COO View'
    },
    {
      id: 'executives',
      title: 'Executive Leadership',
      key_challenges: [
        'Maintaining visibility across the organization',
        'Identifying emerging issues before they escalate',
        'Making data-driven strategic decisions',
        'Balancing performance and wellbeing'
      ],
      glynac_solutions: [
        'Comprehensive organizational health metrics',
        'Comparative analysis across departments',
        'Strategic risk identification',
        'Performance and wellbeing balance tracking'
      ],
      dashboard_name: 'CEO View'
    },
    {
      id: 'managers',
      title: 'People Managers',
      key_challenges: [
        'Understanding individual team member needs',
        'Identifying burnout and disengagement signals',
        'Balancing workload and priorities',
        'Building team cohesion and collaboration'
      ],
      glynac_solutions: [
        'Team health scorecards and alerts',
        'Individual performance and wellbeing insights',
        'Meeting and collaboration analysis',
        'Team dynamics and interaction patterns'
      ],
      dashboard_name: 'Manager View'
    }
  ];

  return (
    <div className={styles.solutionsPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Workplace Analytics That Solve Real Business Challenges</h1>
            <p className={styles.heroDescription}>
              Glynac transforms workplace data into actionable insights that address critical business challenges. Our solutions are designed to help organizations improve employee wellbeing, optimize performance, and reduce risks across departments.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.navigationSection}>
        <div className={styles.container}>
          <nav className={styles.solutionsNav}>
            <div className={styles.navSection}>
              <h2 className={styles.navTitle}>By Business Challenge</h2>
              <ul className={styles.navList}>
                {businessChallenges.map((challenge) => (
                  <li key={challenge.id}>
                    <a href={`#${challenge.id}`} className={styles.navLink}>
                      {challenge.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.navSection}>
              <h2 className={styles.navTitle}>By Department</h2>
              <ul className={styles.navList}>
                {departmentSolutions.map((dept) => (
                  <li key={dept.id}>
                    <a href={`#${dept.id}`} className={styles.navLink}>
                      {dept.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>

      <section className={styles.challengesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Solutions by Business Challenge</h2>
          
          <div className={styles.challengesContainer}>
            {businessChallenges.map((challenge, index) => (
              <div key={challenge.id} id={challenge.id} className={styles.challengeCard}>
                <div className={styles.challengeHeader}>
                  <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                  <div className={styles.challengeNumber}>{index + 1}</div>
                </div>
                
                <p className={styles.challengeDescription}>{challenge.description}</p>
                
                <div className={styles.helpSection}>
                  <h4 className={styles.helpTitle}>How Glynac Helps:</h4>
                  <ul className={styles.helpList}>
                    {challenge.how_glynac_helps.map((item, i) => (
                      <li key={i} className={styles.helpItem}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.metricsSection}>
                  <h4 className={styles.metricsTitle}>Key Metrics:</h4>
                  <ul className={styles.metricsList}>
                    {challenge.key_metrics.map((metric, i) => (
                      <li key={i} className={styles.metricItem}>{metric}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.impactHighlight}>
                  <h4 className={styles.impactTitle}>Impact Highlight:</h4>
                  <p className={styles.impactText}>{challenge.impact_highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.departmentSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Solutions by Department</h2>
          
          <div className={styles.departmentsContainer}>
            {departmentSolutions.map((dept) => (
              <div key={dept.id} id={dept.id} className={styles.departmentCard}>
                <h3 className={styles.departmentTitle}>{dept.title}</h3>
                
                <div className={styles.challengesSection}>
                  <h4 className={styles.sectionSubtitle}>Key Challenges:</h4>
                  <ul className={styles.bulletList}>
                    {dept.key_challenges.map((challenge, i) => (
                      <li key={i}>{challenge}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.solutionsSection}>
                  <h4 className={styles.sectionSubtitle}>Glynac Solutions:</h4>
                  <ul className={styles.bulletList}>
                    {dept.glynac_solutions.map((solution, i) => (
                      <li key={i}>{solution}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.dashboardPreview}>
                  <h4 className={styles.dashboardTitle}>Featured Dashboard: {dept.dashboard_name}</h4>
                  <div className={styles.dashboardPlaceholder}>
                    <div className={styles.dashboardText}>
                      {dept.dashboard_name} Dashboard Preview
                    </div>
                  </div>
                  <p className={styles.dashboardCaption}>
                    The {dept.dashboard_name} provides a comprehensive view tailored for {dept.title.toLowerCase()} professionals, highlighting key metrics and insights relevant to their role.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>See Glynac in Action for Your Specific Challenges</h2>
            <p className={styles.ctaDescription}>
              Our team will tailor a demonstration to address your organization&#39;s specific challenges and show you exactly how Glynac can deliver measurable improvements.
            </p>
            <Link href="/contact" passHref>
              <Button variant="primary" size="large">Request a Customized Demo</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}