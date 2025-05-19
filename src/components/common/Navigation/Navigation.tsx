
"use client";
// src/components/common/Navigation/Navigation.tsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import gsap from 'gsap';
import styles from './Navigation.module.css';

// Properly typed interface for menu items
interface SubmenuItem {
  label: string;
  href: string;
  description?: string;
}

interface MenuItem {
  label: string;
  href: string;
  children?: SubmenuItem[];
}

const Navigation: React.FC = () => {
  // State management
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // GSAP animation refs
  const headerRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // GSAP animations setup
  useEffect(() => {
    timelineRef.current = gsap.timeline({ paused: true });
    
    if (mobileNavRef.current) {
      // Setting initial state
      gsap.set(mobileNavRef.current, { 
        xPercent: 100,
        opacity: 0
      });
      
      // Mobile menu animation
      timelineRef.current
        .to(mobileNavRef.current, { 
          xPercent: 0, 
          opacity: 1, 
          duration: 0.4, 
          ease: "power3.out" 
        })
        .fromTo(
          `.${styles.mobileNavItem}`, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: "power2.out" },
          "-=0.2"
        );
    }
    
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);
  
  // Toggle mobile menu with animation
  const toggleMobileMenu = (): void => {
    if (timelineRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileNavRef.current, { 
          xPercent: 100, 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in",
          onComplete: () => {
            document.body.style.overflow = 'visible';
            setIsMobileMenuOpen(false);
          }
        });
      } else {
        setIsMobileMenuOpen(true);
        document.body.style.overflow = 'hidden';
        timelineRef.current.play(0);
      }
    }
  };

  // Handle dropdown menu toggle
  const handleDropdownToggle = (label: string): void => {
    setActiveDropdown(activeDropdown === label ? null : label);
    
    // Animate dropdown appearance
    if (activeDropdown !== label) {
      gsap.fromTo(
        `.${styles.dropdownMenu}`,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent): void => {
      const target = e.target as Node;
      const dropdowns = document.querySelectorAll(`.${styles.dropdown}`);
      
      let isClickInsideDropdown = false;
      dropdowns.forEach(dropdown => {
        if (dropdown.contains(target)) {
          isClickInsideDropdown = true;
        }
      });
      
      if (!isClickInsideDropdown) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Menu items data
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
    <header 
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''}`}
      aria-label="Main navigation"
    >
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link href="/" className={styles.header__logoLink}>
            <Image
              src="/images/logos/glynac-logo.svg"
              alt="Glynac Logo"
              width={120}
              height={36}
              priority
              className={styles.header__logoImage}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Desktop navigation">
          <ul className={styles.nav__list}>
            {menuItems.map((item) => (
              <li key={item.label} className={styles.nav__item}>
                {item.children ? (
                  <div className={styles.dropdown}>
                    <button
                      className={styles.dropdown__toggle}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(item.label);
                      }}
                      aria-expanded={activeDropdown === item.label}
                      aria-controls={`dropdown-${item.label}`}
                    >
                      {item.label}
                      <span className={`${styles.dropdown__icon} ${activeDropdown === item.label ? styles['dropdown__icon--active'] : ''}`}>▾</span>
                    </button>
                    
                    {activeDropdown === item.label && (
                      <div 
                        id={`dropdown-${item.label}`}
                        className={styles.dropdown__menu}
                        aria-label={`${item.label} submenu`}
                      >
                        {item.children.map((child) => (
                          <Link
                            href={child.href}
                            key={child.label}
                            className={styles.dropdown__item}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className={styles.dropdown__itemTitle}>{child.label}</span>
                            {child.description && (
                              <span className={styles.dropdown__itemDescription}>{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} className={styles.nav__link}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Container */}
        <div className={styles.cta}>
          <Link href="/contact" className={styles.cta__demo}>
            <Button variant="primary" size="medium">Request Demo</Button>
          </Link>
          <Link href="https://app.glynac.com/login" className={styles.cta__login}>
            Log In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles['mobileToggle--active'] : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={styles.mobileToggle__line}></span>
          <span className={styles.mobileToggle__line}></span>
          <span className={styles.mobileToggle__line}></span>
        </button>

        {/* Mobile Navigation */}
        <div 
          ref={mobileNavRef}
          id="mobile-navigation"
          className={`${styles.mobileNav} ${isMobileMenuOpen ? styles['mobileNav--active'] : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <ul className={styles.mobileNav__list}>
            {menuItems.map((item) => (
              <li key={item.label} className={styles.mobileNavItem}>
                {item.children ? (
                  <>
                    <button
                      className={styles.mobileNav__dropdownToggle}
                      onClick={() => handleDropdownToggle(item.label)}
                      aria-expanded={activeDropdown === item.label}
                      aria-controls={`mobile-dropdown-${item.label}`}
                    >
                      {item.label}
                      <span className={`${styles.mobileNav__dropdownIcon} ${activeDropdown === item.label ? styles['mobileNav__dropdownIcon--active'] : ''}`}>+</span>
                    </button>
                    <ul 
                      id={`mobile-dropdown-${item.label}`}
                      className={`${styles.mobileNav__submenu} ${activeDropdown === item.label ? styles['mobileNav__submenu--active'] : ''}`}
                    >
                      {item.children.map((child) => (
                        <li key={child.label} className={styles.mobileNav__submenuItem}>
                          <Link
                            href={child.href}
                            className={styles.mobileNav__submenuLink}
                            onClick={() => {
                              setActiveDropdown(null);
                              setIsMobileMenuOpen(false);
                              document.body.style.overflow = 'visible';
                            }}
                          >
                            {child.label}
                            {child.description && (
                              <span className={styles.mobileNav__submenuDescription}>{child.description}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={styles.mobileNav__link}
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
            <li className={styles.mobileNav__ctaItem}>
              <Link href="/contact" className={styles.mobileNav__ctaLink}>
                <Button variant="primary" size="large" fullWidth>Request Demo</Button>
              </Link>
            </li>
            <li className={styles.mobileNav__ctaItem}>
              <Link href="https://app.glynac.com/login" className={styles.mobileNav__ctaLink}>
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