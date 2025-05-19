"use client";

import React, { useState } from 'react';
import styles from './ComparisonTable.module.css';

type FeatureCategory = {
  name: string;
  features: Feature[];
};

type Feature = {
  name: string;
  description?: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
};

const ComparisonTable: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const featureCategories: FeatureCategory[] = [
    {
      name: "Core Analytics",
      features: [
        {
          name: "Team Risk Detection",
          description: "Identify potential burnout and disengagement risks across teams",
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: "Workload Distribution Analysis",
          description: "Visualize workload balance across teams and individuals",
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: "Meeting Efficiency Metrics",
          description: "Analyze meeting patterns and identify optimization opportunities",
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: "Basic Sentiment Analysis",
          description: "Track team sentiment based on communication patterns",
          starter: true,
          professional: true,
          enterprise: true
        }
      ]
    },
    {
      name: "Advanced Features",
      features: [
        {
          name: "Individual Risk Prediction",
          description: "AI-powered prediction of individual retention risks",
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: "Custom Dashboards",
          description: "Create tailored dashboards for specific departments or use cases",
          starter: "Limited",
          professional: true,
          enterprise: true
        },
        {
          name: "Advanced Sentiment Analysis",
          description: "Deep sentiment analysis with topic detection and trend tracking",
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: "Custom Risk Rules",
          description: "Create organization-specific risk detection rules",
          starter: false,
          professional: "Limited",
          enterprise: true
        }
      ]
    },
    {
      name: "Reporting & Integrations",
      features: [
        {
          name: "Scheduled Reports",
          description: "Automated report delivery to stakeholders",
          starter: "Weekly",
          professional: "Daily",
          enterprise: "Custom"
        },
        {
          name: "Data Export",
          description: "Export analytics data for external use",
          starter: "CSV",
          professional: "CSV, Excel",
          enterprise: "All Formats"
        },
        {
          name: "Standard Integrations",
          description: "Connect with common workplace tools",
          starter: "3 Sources",
          professional: "10 Sources",
          enterprise: "Unlimited"
        },
        {
          name: "Custom Integrations",
          description: "Support for proprietary or specialized systems",
          starter: false,
          professional: false,
          enterprise: true
        }
      ]
    },
    {
      name: "Support & Services",
      features: [
        {
          name: "Implementation Support",
          description: "Assistance with platform setup and configuration",
          starter: "Basic",
          professional: "Standard",
          enterprise: "Premium"
        },
        {
          name: "Technical Support",
          description: "Access to technical help and troubleshooting",
          starter: "Email",
          professional: "Email, Chat",
          enterprise: "Priority"
        },
        {
          name: "Success Management",
          description: "Dedicated support for optimal platform usage",
          starter: false,
          professional: "Shared",
          enterprise: "Dedicated"
        },
        {
          name: "Training",
          description: "User training for platform administrators and end users",
          starter: "Documentation",
          professional: "Webinars",
          enterprise: "Custom"
        }
      ]
    },
    {
      name: "Security & Compliance",
      features: [
        {
          name: "Data Encryption",
          description: "Protection of data in transit and at rest",
          starter: true,
          professional: true,
          enterprise: true
        },
        {
          name: "Role-Based Access",
          description: "Granular control over user permissions",
          starter: "Basic",
          professional: "Advanced",
          enterprise: "Custom"
        },
        {
          name: "Compliance Reports",
          description: "Documentation for regulatory requirements",
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: "Custom Data Retention",
          description: "Configure data retention policies",
          starter: false,
          professional: false,
          enterprise: true
        }
      ]
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className={styles.checkmark}>✓</span>
      ) : (
        <span className={styles.dash}>—</span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <section className={styles.comparisonSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Compare Plan Features</h2>
          <p className={styles.subtitle}>
            See which plan is right for your organization&apos; specific needs.
          </p>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th className={styles.featureHeader}>Features</th>
                <th className={styles.planHeader}>Starter</th>
                <th className={styles.planHeader}>Professional</th>
                <th className={styles.planHeader}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featureCategories.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <tr 
                    className={styles.categoryRow}
                    onClick={() => toggleCategory(category.name)}
                  >
                    <td className={styles.categoryName}>
                      <div className={styles.categoryHeader}>
                        <span>{category.name}</span>
                        <span className={styles.expandIcon}>
                          {expandedCategory === category.name ? '−' : '+'}
                        </span>
                      </div>
                    </td>
                    <td colSpan={3}></td>
                  </tr>
                  
                  {expandedCategory === category.name && (
                    <>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className={styles.featureRow}>
                          <td className={styles.featureName}>
                            <div className={styles.feature}>
                              <span>{feature.name}</span>
                              {feature.description && (
                                <span className={styles.featureDescription}>
                                  {feature.description}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className={`${styles.featureValue} ${styles.starter}`}>
                            {renderFeatureValue(feature.starter)}
                          </td>
                          <td className={`${styles.featureValue} ${styles.professional}`}>
                            {renderFeatureValue(feature.professional)}
                          </td>
                          <td className={`${styles.featureValue} ${styles.enterprise}`}>
                            {renderFeatureValue(feature.enterprise)}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className={styles.tableFooter}>
          <p>This is not an exhaustive list of features. <a href="/contact" className={styles.footerLink}>Contact us</a> for a complete feature breakdown or custom requirements.</p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;