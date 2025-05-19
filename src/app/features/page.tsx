import React from 'react';
import { Metadata } from 'next';
import styles from './page.module.css';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';

export const metadata: Metadata = {
  title: 'Platform Features',
  description: 'Explore the powerful features of Glynac Workplace Analytics designed to transform how you understand and optimize your workplace.',
};

type FeatureCategory = {
  title: string;
  id: string;
  description: string;
  features: Feature[];
};

type Feature = {
  title: string;
  description: string;
  icon: string;
  key_capabilities?: string[];
  business_impact?: string;
};

export default function FeaturesPage() {
  const featureCategories: FeatureCategory[] = [
    {
      title: "Core Platform Features",
      id: "core-features",
      description: "Our comprehensive feature set provides leaders with unprecedented visibility into organizational dynamics.",
      features: [
        {
          title: "AI-Powered Risk Detection",
          description: "Glynac's sophisticated AI algorithms continuously monitor workplace communications and patterns to identify potential risks before they escalate into serious issues.",
          icon: "🛡️",
          key_capabilities: [
            "Harassment Detection: Identifies concerning patterns in workplace communications",
            "Burnout Analysis: Monitors work hours, response times, and communication tone to detect burnout risk",
            "Security Risk Alerts: Flags potential data security concerns and policy violations",
            "Custom Risk Rules: Create organization-specific monitoring parameters",
            "Alert Prioritization: Intelligent severity ranking based on urgency and impact"
          ],
          business_impact: "Organizations typically identify 15-20 potential risk situations per month that would otherwise go undetected, allowing for early intervention and prevention."
        },
        {
          title: "Sentiment Analysis Engine",
          description: "Our advanced natural language processing analyzes communication patterns to gauge employee sentiment across teams, departments, and the entire organization.",
          icon: "📊",
          key_capabilities: [
            "Longitudinal Tracking: Monitors sentiment trends over time",
            "Department Comparisons: Identifies teams with concerning patterns",
            "Communication Tone Analysis: Measures positive, neutral, and negative communications",
            "Topic Detection: Identifies recurring themes in workplace communications",
            "Early Warning System: Alerts when sentiment trends show concerning changes"
          ],
          business_impact: "Detect morale issues 2-3 months before they would surface in traditional engagement surveys, allowing for proactive intervention."
        },
        {
          title: "Workload Intelligence",
          description: "Glynac analyzes work patterns, calendar data, and communication timing to provide unprecedented visibility into how work is distributed across your organization.",
          icon: "📅",
          key_capabilities: [
            "Meeting Load Analysis: Tracks meeting hours across teams and individuals",
            "Focus Time Metrics: Identifies whether employees have sufficient uninterrupted time",
            "After-Hours Work Patterns: Monitors work outside standard hours",
            "Workload Comparison: Benchmarks across departments and roles"
          ],
          business_impact: "Teams using Glynac workload intelligence have reclaimed an average of 5.2 hours per employee per week through improved scheduling and work distribution."
        }
      ]
    },
    {
      title: "Role-Based Dashboards",
      id: "dashboards",
      description: "Tailored dashboards for different roles within your organization provide exactly the insights each team member needs.",
      features: [
        {
          title: "Executive Dashboard",
          description: "Provides organizational leadership with a comprehensive view of company health, highlighting areas requiring attention and tracking key performance indicators.",
          icon: "📈",
          key_capabilities: [
            "Glynac Score trend over time",
            "Department comparison matrix",
            "Risk distribution across organization",
            "Sentiment analysis by department",
            "Retention risk overview"
          ]
        },
        {
          title: "CHRO Dashboard",
          description: "Equips HR leaders with comprehensive people analytics focused on retention, wellbeing, and organizational culture.",
          icon: "👥",
          key_capabilities: [
            "Flight risk employee identification",
            "Wellbeing score trends",
            "Communication sentiment analysis",
            "Complaint trend monitoring",
            "Employee insights table"
          ]
        },
        {
          title: "COO Dashboard",
          description: "Provides operations leaders with visibility into process efficiency, resource allocation, and productivity metrics.",
          icon: "⚙️",
          key_capabilities: [
            "Operational overview metrics",
            "Department comparison matrix",
            "Untapped talent analysis",
            "Process bottleneck identification",
            "Team performance metrics"
          ]
        }
      ]
    },
    {
      title: "Security & Compliance",
      id: "security",
      description: "Enterprise-grade security and privacy controls ensure your data remains protected and employee privacy is respected.",
      features: [
        {
          title: "Data Security & Privacy",
          description: "Enterprise-grade security and privacy controls ensure your data remains protected and employee privacy is respected.",
          icon: "🔒",
          key_capabilities: [
            "SOC 2 Type II compliance",
            "Role-based access controls",
            "Data minimization practices",
            "Encryption at rest and in transit",
            "Comprehensive audit logs"
          ],
          business_impact: "Meets or exceeds security requirements for even the most regulated industries, including financial services and healthcare."
        },
        {
          title: "Integration Ecosystem",
          description: "Seamless connections with your existing workplace tools provide comprehensive analytics without disrupting workflows.",
          icon: "🔄",
          key_capabilities: [
            "Microsoft 365 Suite",
            "Google Workspace",
            "Slack and Teams",
            "Jira, and project tools",
            "Custom API connections"
          ],
          business_impact: "Most organizations can implement Glynac within 3-5 days with minimal IT resources required."
        }
      ]
    }
  ];

  return (
    <div className={styles.featuresPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Powerful Analytics Tools for Workplace Transformation</h1>
            <p className={styles.heroDescription}>
              Glynac combines advanced AI with intuitive visualizations to transform workplace data into actionable intelligence. Our comprehensive feature set provides leaders with unprecedented visibility into organizational dynamics while respecting privacy and security.
            </p>
          </div>
        </div>
      </section>

      <nav className={styles.categoryNav}>
        <div className={styles.container}>
          <ul className={styles.categoryList}>
            {featureCategories.map((category) => (
              <li key={category.id}>
                <a href={`#${category.id}`} className={styles.categoryLink}>
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {featureCategories.map((category, categoryIndex) => (
        <section 
          key={category.id} 
          id={category.id} 
          className={`${styles.featureCategory} ${categoryIndex % 2 === 1 ? styles.alternateBg : ''}`}
        >
          <div className={styles.container}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <p className={styles.categoryDescription}>{category.description}</p>
            </div>
            
            <div className={styles.featuresGrid}>
              {category.features.map((feature, featureIndex) => (
                <div key={`${category.id}-${featureIndex}`} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                  
                  {feature.key_capabilities && (
                    <div className={styles.capabilitiesSection}>
                      <h4 className={styles.capabilitiesTitle}>Key Capabilities:</h4>
                      <ul className={styles.capabilitiesList}>
                        {feature.key_capabilities.map((capability, capabilityIndex) => (
                          <li key={capabilityIndex} className={styles.capabilityItem}>
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {feature.business_impact && (
                    <div className={styles.impactSection}>
                      <h4 className={styles.impactTitle}>Business Impact:</h4>
                      <p className={styles.impactText}>{feature.business_impact}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Experience Glynac&apos; Features with Your Own Data</h2>
            <p className={styles.ctaDescription}>
              See how Glynac&apos; capabilities apply to your specific organizational challenges with a personalized demonstration using your own data structure.
            </p>
            <Link href="/contact" passHref>
              <Button variant="primary" size="large">Request a Live Demo</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}