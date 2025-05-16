
// src/components/common/Footer/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blog', href: '/blog' }
    ],
    platform: [
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Features', href: '/features' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security & Privacy', href: '/security' },
      { label: 'Request Demo', href: '/contact' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' }
    ],
    social: [
      { label: 'LinkedIn', href: 'https://linkedin.com/company/glynac', icon: '/images/icons/linkedin.svg' },
      { label: 'Twitter', href: 'https://twitter.com/glynacHQ', icon: '/images/icons/twitter.svg' },
      { label: 'Medium', href: 'https://medium.com/glynac', icon: '/images/icons/medium.svg' }
    ]
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logoLink}>
              <Image 
                src="/images/logos/glynac-logo.svg" 
                alt="Glynac Logo" 
                width={130} 
                height={40} 
              />
            </Link>
            <p className={styles.tagline}>
              Illuminating Team Potential, Protecting Well-being
            </p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.linkList}>
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Platform</h3>
              <ul className={styles.linkList}>
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Legal</h3>
              <ul className={styles.linkList}>
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className={styles.socialLinks}>
                <h3 className={styles.columnTitle}>Follow Us</h3>
                <div className={styles.socialIconsContainer}>
                  {footerLinks.social.map((social) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                      aria-label={social.label}
                    >
                      <Image 
                        src={social.icon} 
                        alt={social.label} 
                        width={24} 
                        height={24} 
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Glynac Inc. All rights reserved.
          </p>
          <div className={styles.langSelector}>
            <span className={styles.globeIcon}>🌐</span>
            <select className={styles.langDropdown}>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;