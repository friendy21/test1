"use client";
// src/components/common/Navigation/Navigation.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import styles from './Navigation.module.css';

type MenuItem = {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
};

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'visible' : 'hidden';
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const menuItems: MenuItem[] = [
    {
      label: 'Solutions',
      href: '/solutions',
      children: [
        {
          label: 'For CXOs & Executives',
          href: '/solutions#executives',
          description: 'Strategic oversight for executive leadership'
        },
        {
          label: 'For People Managers',
          href: '/solutions#managers',
          description: 'Tools to empower your teams'
        },
        {
          label: 'For Operations',
          href: '/solutions#operations',
          description: 'Optimize workflows and collaboration'
        },
        {
          label: 'For HR Professionals',
          href: '/solutions#hr',
          description: 'Drive proactive HR initiatives'
        }
      ]
    },
    {
      label: 'How It Works',
      href: '/#how-it-works'
    },
    {
      label: 'Features',
      href: '/features'
    },
    {
      label: 'Success Stories',
      href: '/success-stories'
    },
    {
      label: 'Pricing',
      href: '/pricing'
    }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/images/logos/glynac-logo.svg"
              alt="Glynac Logo"
              width={120}
              height={36}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {menuItems.map((item) => (
              <li key={item.label} className={styles.navItem}>
                {item.children ? (
                  <div className={styles.dropdown}>
                    <button
                      className={styles.dropdownToggle}
                      onClick={() => handleDropdownToggle(item.label)}
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <span className={styles.dropdownIcon}>▾</span>
                    </button>
                    {activeDropdown === item.label && (
                      <div className={styles.dropdownMenu}>
                        {item.children.map((child) => (
                          <Link
                            href={child.href}
                            key={child.label}
                            className={styles.dropdownItem}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className={styles.dropdownItemTitle}>{child.label}</span>
                            {child.description && (
                              <span className={styles.dropdownItemDescription}>{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.ctaContainer}>
          <Link href="/contact">
            <Button variant="primary" size="medium">Request Demo</Button>
          </Link>
          <Link href="https://app.glynac.com/login" className={styles.loginLink}>
            Log In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul className={styles.mobileNavList}>
            {menuItems.map((item) => (
              <li key={item.label} className={styles.mobileNavItem}>
                {item.children ? (
                  <>
                    <button
                      className={styles.mobileDropdownToggle}
                      onClick={() => handleDropdownToggle(item.label)}
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <span className={`${styles.mobileDropdownIcon} ${activeDropdown === item.label ? styles.active : ''}`}>+</span>
                    </button>
                    <ul className={`${styles.mobileSubmenu} ${activeDropdown === item.label ? styles.active : ''}`}>
                      {item.children.map((child) => (
                        <li key={child.label} className={styles.mobileSubmenuItem}>
                          <Link
                            href={child.href}
                            className={styles.mobileSubmenuLink}
                            onClick={() => {
                              setActiveDropdown(null);
                              setIsMobileMenuOpen(false);
                              document.body.style.overflow = 'visible';
                            }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.body.style.overflow = 'visible';
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className={styles.mobileCta}>
              <Link href="/contact" passHref>
                <Button variant="primary" size="large" fullWidth>Request Demo</Button>
              </Link>
            </li>
            <li className={styles.mobileCta}>
              <Link href="https://app.glynac.com/login" passHref legacyBehavior>
                <Button variant="secondary" size="large" fullWidth>Log In</Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navigation;