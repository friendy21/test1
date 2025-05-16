"use client";

import React from 'react';
import Link from 'next/link';
import styles from './AlternativeContact.module.css';

type ContactDetail = {
  icon: string;
  label: string;
  value: string;
  isLink?: boolean;
  href?: string;
};

const AlternativeContact: React.FC = () => {
  const contactSections = [
    {
      title: 'General Inquiries',
      details: [
        {
          icon: '✉️',
          label: 'Email',
          value: 'info@glynac.com',
          isLink: true,
          href: 'mailto:info@glynac.com',
        },
        {
          icon: '📞',
          label: 'Phone',
          value: '+1 (800) 555-0123',
          isLink: true,
          href: 'tel:+18005550123',
        },
        {
          icon: '🕒',
          label: 'Hours',
          value: 'Monday-Friday, 9am-5pm EST',
        },
      ],
    },
    {
      title: 'Sales Team',
      details: [
        {
          icon: '✉️',
          label: 'Email',
          value: 'sales@glynac.com',
          isLink: true,
          href: 'mailto:sales@glynac.com',
        },
        {
          icon: '📞',
          label: 'Phone',
          value: '+1 (800) 555-0124',
          isLink: true,
          href: 'tel:+18005550124',
        },
      ],
    },
    {
      title: 'Support (for Early Adopters)',
      details: [
        {
          icon: '✉️',
          label: 'Email',
          value: 'support@glynac.com',
          isLink: true,
          href: 'mailto:support@glynac.com',
        },
        {
          icon: '🔗',
          label: 'Portal',
          value: 'Access Support Portal',
          isLink: true,
          href: 'https://support.glynac.com',
        },
      ],
    },
    {
      title: 'Media Inquiries',
      details: [
        {
          icon: '✉️',
          label: 'Email',
          value: 'press@glynac.com',
          isLink: true,
          href: 'mailto:press@glynac.com',
        },
      ],
    },
  ];

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.title}>Other Ways to Connect</h2>
      
      <div className={styles.sectionsGrid}>
        {contactSections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <ul className={styles.contactList}>
              {section.details.map((detail, detailIndex) => (
                <li key={detailIndex} className={styles.contactItem}>
                  <span className={styles.icon}>{detail.icon}</span>
                  <div className={styles.contactInfo}>
                    <span className={styles.label}>{detail.label}</span>
                    {detail.isLink ? (
                      <Link href={detail.href || '#'} className={styles.link}>
                        {detail.value}
                      </Link>
                    ) : (
                      <span className={styles.value}>{detail.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlternativeContact;