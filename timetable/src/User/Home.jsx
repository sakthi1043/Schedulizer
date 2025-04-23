import React from 'react';
import styles from './HomePage.module.css';
import { FaCalendarAlt, FaChalkboardTeacher, FaUserGraduate, FaSchool, FaClock, FaSearch } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <FaCalendarAlt className={styles.logoIcon} />
            <span>Schedulizer</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#showcase">Showcase</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
          </div>
          <div className={styles.navActions}>
            <a href="/Register" className={styles.loginLink}>Sign In</a>
            <a href="/Login" className={styles.ctaButton}>Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            <span>Revolutionize</span>
            <span>Educational</span>
            <span>Scheduling</span>
          </h1>
          <p className={styles.heroSubtitle}>AI-powered timetable optimization for modern institutions</p>
          <div className={styles.heroButtons}>
            <a href="/demo" className={styles.primaryButton}>
              Request Demo <FiArrowRight />
            </a>
            <a href="#features" className={styles.secondaryButton}>
              Explore Features
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroCard}>
            <div className={styles.cardHeader}>
              <span>Monday</span>
              <span>Week 12</span>
            </div>
            <div className={styles.scheduleItem}>
              <span>09:00 - 10:30</span>
              <span>Mathematics</span>
              <span>Room 302</span>
            </div>
            <div className={styles.scheduleItem}>
              <span>11:00 - 12:30</span>
              <span>Physics Lab</span>
              <span>Lab B</span>
            </div>
            <div className={styles.scheduleItem}>
              <span>14:00 - 15:30</span>
              <span>Literature</span>
              <span>Room 105</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          <span>Trusted by leading institutions worldwide</span>
          <span>Zero scheduling conflicts</span>
          <span>97% user satisfaction</span>
          <span>AI-powered optimization</span>
          <span>Trusted by leading institutions worldwide</span>
          <span>Zero scheduling conflicts</span>
          <span>97% user satisfaction</span>
          <span>AI-powered optimization</span>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Powerful Features</h2>
          <p>Designed to solve your most complex scheduling challenges</p>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaChalkboardTeacher />
            </div>
            <h3>Faculty Management</h3>
            <p>Intelligently assign teachers based on expertise, availability, and preferences.</p>
            <a href="#" className={styles.featureLink}>
              Learn more <FiArrowRight />
            </a>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaUserGraduate />
            </div>
            <h3>Student-Centric</h3>
            <p>Automated scheduling that prioritizes learning outcomes and student needs.</p>
            <a href="#" className={styles.featureLink}>
              Learn more <FiArrowRight />
            </a>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <FaSchool />
            </div>
            <h3>Space Optimization</h3>
            <p>Maximize resource utilization with smart room allocation algorithms.</p>
            <a href="#" className={styles.featureLink}>
              Learn more <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className={styles.showcase}>
        <div className={styles.showcaseContent}>
          <h2>Beautifully Designed Interface</h2>
          <p>Experience intuitive controls and stunning visualizations that make scheduling effortless.</p>
          <a href="/demo" className={styles.primaryButton}>
            Try Live Demo <FiArrowRight />
          </a>
        </div>
        <div className={styles.showcaseVisual}>
          {/* This would be your dashboard screenshot or mockup */}
          <div className={styles.dashboardMockup}></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <h3>95%</h3>
          <p>Reduction in scheduling conflicts</p>
        </div>
        <div className={styles.statItem}>
          <h3>40+</h3>
          <p>Hours saved per semester</p>
        </div>
        <div className={styles.statItem}>
          <h3>100%</h3>
          <p>Regulatory compliance</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to transform your scheduling process?</h2>
        <div className={styles.ctaButtons}>
          <a href="/demo" className={styles.primaryButton}>
            Get Started
          </a>
          <a href="/contact" className={styles.secondaryButton}>
            Contact Sales
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerLogo}>
              <FaCalendarAlt className={styles.logoIcon} />
              <span>Schedulizer</span>
            </div>
            <p>Intelligent scheduling solutions for the education sector.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="/demo">Demo</a>
              <a href="/updates">Updates</a>
            </div>
            <div className={styles.linkColumn}>
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="/careers">Careers</a>
              <a href="/blog">Blog</a>
              <a href="/press">Press</a>
            </div>
            <div className={styles.linkColumn}>
              <h4>Resources</h4>
              <a href="/docs">Documentation</a>
              <a href="/support">Support</a>
              <a href="/community">Community</a>
              <a href="/webinars">Webinars</a>
            </div>
            <div className={styles.linkColumn}>
              <h4>Legal</h4>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/security">Security</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Schedulizer. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;