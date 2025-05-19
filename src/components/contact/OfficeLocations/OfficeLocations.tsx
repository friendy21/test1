import React from 'react';
import styles from './OfficeLocations.module.css';

type Office = {
  name: string;
  address: string[];
  phone?: string;
  email?: string;
};

const OfficeLocations: React.FC = () => {
  const offices: Office[] = [
    {
      name: 'Headquarters',
      address: [
        '123 Tech Innovation Drive',
        'San Francisco, CA 94105',
        'United States'
      ],
      phone: '+1 (800) 555-0123',
      email: 'info@glynac.com'
    },
    {
      name: 'East Coast Office',
      address: [
        '456 Enterprise Plaza',
        'New York, NY 10001',
        'United States'
      ]
    },
    {
      name: 'European Office',
      address: [
        '78 Digital Square',
        'London, EC2A 4PS',
        'United Kingdom'
      ]
    }
  ];

  return (
    <section className={styles.officeLocationsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Office Locations</h2>
        
        <div className={styles.officesGrid}>
          {offices.map((office, index) => (
            <div key={index} className={styles.officeCard}>
              <h3 className={styles.officeName}>{office.name}</h3>
              <div className={styles.officeAddress}>
                {office.address.map((line, i) => (
                  <p key={i} className={styles.addressLine}>{line}</p>
                ))}
              </div>
              {(office.phone || office.email) && (
                <div className={styles.officeContact}>
                  {office.phone && (
                    <a href={`tel:${office.phone.replace(/\D/g, '')}`} className={styles.contactLink}>
                      <span className={styles.contactIcon}>📞</span>
                      {office.phone}
                    </a>
                  )}
                  {office.email && (
                    <a href={`mailto:${office.email}`} className={styles.contactLink}>
                      <span className={styles.contactIcon}>✉️</span>
                      {office.email}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.mapContainer}>
          {/* In a real implementation, this would be an embedded Google Map */}
          {/* For this example, we'll use a placeholder */}
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapPlaceholderText}>
              Interactive Map
              <span className={styles.mapPlaceholderSubtext}>An embedded Google Map would appear here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;