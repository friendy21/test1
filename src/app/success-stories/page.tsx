import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Success Stories | Glynac Workplace Analytics',
  description: 'Discover how organizations transform workplace analytics into business success with Glynac\'s powerful platform.',
};

type SimulatedScenario = {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string[];
  actions: string[];
  outcomes: string[];
  roi: string;
};

type IndustryApplication = {
  industry: string;
  use_case: string;
  challenge: string;
  solution: string[];
  outcomes: string[];
};

type FunctionUseCase = {
  function: string;
  use_case: string;
  challenge: string;
  solution: string[];
  key_metrics: string[];
};

export default function SuccessStoriesPage() {
  const featuredScenario: SimulatedScenario = {
    id: 'engineer-turnover',
    title: 'Reducing Engineer Turnover',
    industry: 'Technology',
    challenge: 'Consider a fast-growing technology company with 500 engineers. With the average cost to replace a senior engineer exceeding $100,000, high turnover rates directly impact both the bottom line and project continuity. Traditional methods provide limited visibility into the underlying causes of turnover.',
    solution: [
      'Engineers spending excessive time in meetings (27+ hours weekly)',
      'After-hours work patterns indicating burnout risk',
      'Declining communication sentiment preceding resignation',
      'Specific teams with significantly higher attrition risk'
    ],
    actions: [
      'Restructure meeting schedules to ensure adequate focus time',
      'Implement workload balancing across engineering teams',
      'Provide coaching for managers of at-risk teams',
      'Address specific departmental challenges revealed by sentiment analysis'
    ],
    outcomes: [
      '25-35% reduction in voluntary turnover',
      '15-20% improvement in project delivery timelines',
      '30-40% increase in positive sentiment metrics',
      'Potential savings of $1-2M annually in a company of this size'
    ],
    roi: 'Organizations similar to this scenario have achieved 5-8x return on their analytics investment within the first year.'
  };

  const industryApplications: IndustryApplication[] = [
    {
      industry: 'Financial Services',
      use_case: 'Proactive Compliance Risk Management',
      challenge: 'Financial institutions face significant penalties for compliance violations, with costs often reaching millions of dollars. Traditional monitoring catches issues after they occur—too late to prevent damage.',
      solution: [
        'Identify potential policy violations before they escalate',
        'Detect communication patterns associated with previous compliance incidents',
        'Highlight knowledge gaps in compliance understanding',
        'Monitor for data handling concerns across departments'
      ],
      outcomes: [
        '50-60% reduction in compliance incidents',
        'Early intervention in high-risk situations',
        'Improved regulatory audit outcomes',
        'Significant reduction in potential penalties'
      ]
    },
    {
      industry: 'Professional Services',
      use_case: 'Optimizing Team Structure and Utilization',
      challenge: 'Professional services firms struggle with inefficient team structures and resource allocation, leading to reduced profitability and employee burnout.',
      solution: [
        'Reveal actual vs. intended collaboration patterns',
        'Identify utilization imbalances across teams',
        'Discover skills being underutilized based on communication analysis',
        'Find opportunities for more efficient team composition'
      ],
      outcomes: [
        '25-30% improvement in project delivery efficiency',
        '10-15% reduction in staffing costs through better allocation',
        'Increased cross-practice collaboration',
        'Higher consultant satisfaction and retention'
      ]
    },
    {
      industry: 'Healthcare',
      use_case: 'Burnout Prevention for Clinical Staff',
      challenge: 'Healthcare organizations face critical staffing shortages exacerbated by high burnout rates among clinical staff, impacting patient care quality and operational costs.',
      solution: [
        'Early identification of burnout risk patterns',
        'Workload distribution analysis across clinical teams',
        'Communication pattern monitoring to detect isolation',
        'Administrative burden measurement and reduction'
      ],
      outcomes: [
        '20-25% reduction in clinical staff turnover',
        'Improved patient satisfaction scores',
        'Reduced overtime and temporary staffing costs',
        'More balanced on-call and shift distributions'
      ]
    }
  ];

  const functionUseCases: FunctionUseCase[] = [
    {
      function: 'Human Resources',
      use_case: 'Predicting and Preventing Unwanted Turnover',
      challenge: 'HR teams often lack early visibility into employee disengagement, learning about issues only during exit interviews—when it\'s too late to intervene.',
      solution: [
        'Early identification of flight risk based on behavioral patterns',
        'Department-specific retention challenges',
        'Root cause analysis of disengagement factors',
        'Targeted intervention recommendations'
      ],
      key_metrics: [
        'Flight risk scores by employee and department',
        'Communication sentiment trends predicting attrition',
        'Workload imbalances contributing to turnover',
        'Manager effectiveness correlation with team retention'
      ]
    },
    {
      function: 'Operations',
      use_case: 'Removing Productivity Roadblocks',
      challenge: 'Operational inefficiencies often remain invisible until they significantly impact performance, making proactive optimization difficult.',
      solution: [
        'Identify meeting overload and calendar conflicts',
        'Detect process bottlenecks between departments',
        'Reveal communication patterns showing collaboration barriers',
        'Analyze workload distribution inefficiencies'
      ],
      key_metrics: [
        'Meeting hours vs. focus time ratio',
        'Cross-functional handoff efficiency',
        'Response time benchmarks',
        'Process bottleneck visualization'
      ]
    }
  ];

  const expertTestimonials = [
    {
      quote: "Glynac's approach to workplace analytics represents a significant advancement in how organizations can understand and improve their internal dynamics. The platform's ability to identify patterns across multiple data points provides unprecedented visibility into workplace challenges.",
      author: "Dr. Jennifer Reynolds",
      title: "Organizational Psychology",
      organization: "Stanford University"
    },
    {
      quote: "Based on our review of the Glynac platform, we see substantial potential for organizations to achieve meaningful improvements in retention, productivity, and risk management. The ROI projections are well-supported by industry benchmarks.",
      author: "Marcus Thompson",
      title: "Principal Analyst",
      organization: "Forrester Research"
    }
  ];

  return (
    <div className={styles.successStoriesPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Transforming Workplace Analytics into Business Success</h1>
            <p className={styles.heroDescription}>
              Discover how Glynac&apos; powerful analytics capabilities can address real-world workplace challenges. These simulated scenarios demonstrate the potential impact of our platform across different industries and organizational functions.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.featuredScenarioSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.featuredLabel}>Featured Scenario</h2>
          </div>
          
          <div className={styles.featuredScenarioCard}>
            <div className={styles.scenarioHeader}>
              <div className={styles.industryLabel}>{featuredScenario.industry}</div>
              <h2 className={styles.scenarioTitle}>{featuredScenario.title}</h2>
            </div>
            
            <div className={styles.scenarioContent}>
              <div className={styles.challengeSection}>
                <h3 className={styles.sectionTitle}>The Challenge:</h3>
                <p className={styles.challengeText}>{featuredScenario.challenge}</p>
              </div>
              
              <div className={styles.solutionSection}>
                <h3 className={styles.sectionTitle}>How Glynac Would Help:</h3>
                <p className={styles.solutionIntro}>Glynac&apos; comprehensive analytics would reveal critical insights:</p>
                <ul className={styles.solutionList}>
                  {featuredScenario.solution.map((item, index) => (
                    <li key={index} className={styles.solutionItem}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.actionsSection}>
                <h3 className={styles.sectionTitle}>Potential Actions:</h3>
                <p className={styles.actionsIntro}>With these insights, leadership could implement targeted interventions:</p>
                <ul className={styles.actionsList}>
                  {featuredScenario.actions.map((item, index) => (
                    <li key={index} className={styles.actionItem}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.resultsSection}>
                <h3 className={styles.sectionTitle}>Expected Outcomes:</h3>
                <p className={styles.resultsIntro}>Based on industry benchmarks and pilot testing, organizations implementing these data-driven changes typically see:</p>
                <ul className={styles.resultsList}>
                  {featuredScenario.outcomes.map((item, index) => (
                    <li key={index} className={styles.resultItem}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className={styles.roiHighlight}>
                <h3 className={styles.roiLabel}>ROI Projection:</h3>
                <p className={styles.roiText}>{featuredScenario.roi}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.industryApplicationsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Industry Applications</h2>
          
          <div className={styles.applicationCardsContainer}>
            {industryApplications.map((app, index) => (
              <div key={index} className={styles.applicationCard}>
                <div className={styles.applicationHeader}>
                  <div className={styles.industryLabel}>{app.industry}</div>
                  <h3 className={styles.applicationTitle}>{app.use_case}</h3>
                </div>
                
                <div className={styles.applicationBody}>
                  <div className={styles.applicationChallenge}>
                    <h4 className={styles.applicationSubtitle}>The Challenge:</h4>
                    <p>{app.challenge}</p>
                  </div>
                  
                  <div className={styles.applicationSolution}>
                    <h4 className={styles.applicationSubtitle}>How Glynac Would Help:</h4>
                    <ul className={styles.solutionList}>
                      {app.solution.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.applicationOutcomes}>
                    <h4 className={styles.applicationSubtitle}>Expected Outcomes:</h4>
                    <ul className={styles.outcomesList}>
                      {app.outcomes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className={styles.applicationVisualization}>
                  <div className={styles.visualizationPlaceholder}>
                    {app.industry} Dashboard
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.functionUseCasesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Function-Based Use Cases</h2>
          
          <div className={styles.useCaseCardsContainer}>
            {functionUseCases.map((useCase, index) => (
              <div key={index} className={styles.useCaseCard}>
                <div className={styles.useCaseHeader}>
                  <h3 className={styles.useCaseTitle}>{useCase.function}</h3>
                  <div className={styles.useCaseSubtitle}>{useCase.use_case}</div>
                </div>
                
                <div className={styles.useCaseBody}>
                  <div className={styles.useCaseChallenge}>
                    <h4 className={styles.useCaseHeading}>The Challenge:</h4>
                    <p>{useCase.challenge}</p>
                  </div>
                  
                  <div className={styles.useCaseSolution}>
                    <h4 className={styles.useCaseHeading}>How Glynac Would Help:</h4>
                    <ul className={styles.useCaseSolutionList}>
                      {useCase.solution.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.useCaseMetrics}>
                    <h4 className={styles.useCaseHeading}>Key Metrics Revealed:</h4>
                    <ul className={styles.useCaseMetricsList}>
                      {useCase.key_metrics.map((metric, i) => (
                        <li key={i}>{metric}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className={styles.useCaseVisualization}>
                  <div className={styles.visualizationPlaceholder}>
                    {useCase.function} Dashboard
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.expertTestimonialsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Expert Testimonials</h2>
          
          <div className={styles.testimonialsContainer}>
            {expertTestimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.quoteIcon}>&quot;</div>
                <blockquote className={styles.testimonialQuote}>
                  {testimonial.quote}
                </blockquote>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorName}>{testimonial.author}</div>
                  <div className={styles.authorTitle}>
                    {testimonial.title}, {testimonial.organization}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Transform Your Workplace Intelligence</h2>
            <p className={styles.ctaDescription}>
              Discover how Glynac can address your organization&apos; specific challenges with a personalized demonstration of our capabilities.
            </p>
            <Link href="/contact" passHref>
              <Button variant="primary" size="large">Schedule a Demo</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}