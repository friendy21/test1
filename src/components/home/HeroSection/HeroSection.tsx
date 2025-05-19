"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/common/Button/Button";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create particles effect
    if (!particlesRef.current) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    particlesRef.current.appendChild(canvas);
    
    const resizeCanvas = () => {
      if (!particlesRef.current) return;
      canvas.width = particlesRef.current.offsetWidth;
      canvas.height = particlesRef.current.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle settings
    const particlesArray: Particle[] = [];
    const numberOfParticles = 100;
    
    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas.width, canvas.height, ctx));
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Connect particles with lines if they're close enough
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (particlesRef.current && canvas.parentNode === particlesRef.current) {
        particlesRef.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <div ref={particlesRef} className={styles.heroBackground}></div>
      
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.tagline}>
            <span className={styles.taglineDot}></span>
            AI-Powered Team Analytics
          </div>
          
          <h1 className={styles.headline}>
            Unlock Peak Team Performance & Prevent Burnout Before It Starts
          </h1>
          
          <p className={styles.subheadline}>
            GLYNAC analyzes non-invasive signals from your existing work tools to provide early warnings on burnout, disengagement, and overload. Empower your managers and protect your most valuable asset – your people.
          </p>
          
          <div className={styles.ctaContainer}>
            <Link href="/contact" passHref>
              <Button variant="primary" size="large" className={styles.primaryCta}>
                Request a Personalized Demo
              </Button>
            </Link>
            
            <Link href="#video-overview" className={styles.secondaryCta}>
              <span className={styles.playIcon}></span>
              Watch a 2-Min Overview
            </Link>
          </div>
          
          <div className={styles.trustSignals}>
            <p className={styles.microCopy}>
              No credit card required for demo. Integrates in minutes.
            </p>
            
            <div className={styles.clientLogos}>
              <span className={styles.asSeenOn}>Trusted by teams at</span>
              <div className={styles.logoContainer}>
                {/* Replace with actual client logos */}
                <div className={styles.clientLogo}></div>
                <div className={styles.clientLogo}></div>
                <div className={styles.clientLogo}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.heroVisual}>
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardControls}>
              </div>
              <div className={styles.cardTitle}>Team Health Dashboard</div>
            </div>
            
            <div className={styles.dashboardPreview}>
              <Image
                src="/images/illustrations/dashboard-preview.png"
                alt="Glynac Dashboard Preview"
                width={600}
                height={400}
                className={styles.dashboardImage}
                priority
              />
              
            </div>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>87%</div>
              <div className={styles.statLabel}>Burnout Prevention</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>23%</div>
              <div className={styles.statLabel}>Turnover Reduction</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.decorationBlob}></div>
      <div className={styles.decorationCircle}></div>
    </section>
  );
};

// Helper class for particle animation
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  canvasWidth: number;
  canvasHeight: number;
  ctx: CanvasRenderingContext2D;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number, ctx: CanvasRenderingContext2D) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = ctx;
    
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    
    // Randomly choose between blue and teal with opacity
    const colors = ['rgba(59, 130, 246, 0.7)', 'rgba(13, 148, 136, 0.7)'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x > this.canvasWidth || this.x < 0) {
      this.speedX *= -1;
    }
    
    if (this.y > this.canvasHeight || this.y < 0) {
      this.speedY *= -1;
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export default HeroSection;