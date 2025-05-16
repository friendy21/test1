import React from 'react';
import Image from 'next/image';
import styles from './SocialProofBar.module.css';

const SocialProofBar: React.FC = () => {
  // Mock company logos - in a real implementation, these would be actual logos
  const companies = [
    { name: 'Company 1', logo: '/images/logos/company1.svg' },
    { name: 'Company 2', logo: '/images/logos/company2.svg' },
    { name: 'Company 3', logo: '/images/logos/company3.svg' },
    { name: 'Company 4', logo: '/images/logos/company4.svg' },
    { name: 'Company 5', logo: '/images/logos/company5.svg' },
  ];

  const publications = [
    { name: 'Publication 1', logo: '/images/logos/publication1.svg' },
    { name: 'Publication 2', logo: '/images/logos/publication2.svg' },
  ];

  return (
    <section className={styles.socialProofBar}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Trusted by Innovative Companies and Industry Leaders</h2>
        
        <div className={styles.logoGrid}>
          {companies.map((company, index) => (
            <div key={index} className={styles.logoItem}>
              {/* Fallback colored box with text if image fails to load */}
              <div className={styles.logoFallback}>{company.name}</div>
              {/* 
                In a real implementation, you would use:
                <Image 
                  src={company.logo} 
                  alt={company.name} 
                  width={120} 
                  height={40} 
                  className={styles.logo}
                />
              */}
            </div>
          ))}
        </div>
        
        <div className={styles.publicationsSection}>
          <span className={styles.asSeenIn}>As seen in</span>
          <div className={styles.publicationLogos}>
            {publications.map((publication, index) => (
              <div key={index} className={styles.publicationLogo}>
                {/* Fallback colored box with text if image fails to load */}
                <div className={styles.logoFallback}>{publication.name}</div>
                {/* 
                  In a real implementation, you would use:
                  <Image 
                    src={publication.logo} 
                    alt={publication.name} 
                    width={100} 
                    height={30} 
                    className={styles.logo}
                  />
                */}
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.trustBadges}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🏆</span>
            <span className={styles.badgeText}>Top HR Tech Solution</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>⭐</span>
            <span className={styles.badgeText}>G2 High Performer</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🚀</span>
            <span className={styles.badgeText}>Backed by Leading VCs</span>
          </div>
        </div>
        
        <p className={styles.trustPhrase}>Built for modern teams who prioritize well-being and performance.</p>
      </div>
    </section>
  );
};

export default SocialProofBar;