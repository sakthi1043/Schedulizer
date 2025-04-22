import React from 'react';
import styles from './HomePage.module.css';
import { FaCalendarAlt, FaChalkboardTeacher, FaUserGraduate, FaSchool, FaClock, FaSearch, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <FaCalendarAlt className={styles.logoIcon} />
            <span>Schedulizer</span>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <a href="/login" className={styles.btn}>Login</a>
              <a href="/register" className={`${styles.btn} ${styles.btnOutline}`}>Register</a>
            </li>
          </ul>
        </nav>
        
        <div className={styles.heroContent}>
          <h1>Intelligent Scheduling Solution</h1>
          <p>Transform your institution's timetable management with our AI-powered platform</p>
          <div className={styles.heroButtons}>
            <a href="/demo" className={styles.btn}>Live Demo</a>
            <a href="#features" className={`${styles.btn} ${styles.btnOutline}`}>Explore Features</a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2 className={styles.sectionTitle}>Powerful Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <FaChalkboardTeacher className={styles.featureIcon} />
            <h3>Faculty Management</h3>
            <p>Efficiently organize faculty members, their expertise, and availability.</p>
          </div>
          <div className={styles.featureCard}>
            <FaUserGraduate className={styles.featureIcon} />
            <h3>Student Tracking</h3>
            <p>Comprehensive student records with batch and performance tracking.</p>
          </div>
          <div className={styles.featureCard}>
            <FaSchool className={styles.featureIcon} />
            <h3>Smart Room Allocation</h3>
            <p>Automated classroom assignment based on requirements and availability.</p>
          </div>
          <div className={styles.featureCard}>
            <FaClock className={styles.featureIcon} />
            <h3>Optimal Scheduling</h3>
            <p>Generate conflict-free timetables with intelligent algorithms.</p>
          </div>
          <div className={styles.featureCard}>
            <FaSearch className={styles.featureIcon} />
            <h3>Advanced Analytics</h3>
            <p>Gain insights with powerful reporting and search capabilities.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <h3>150+</h3>
          <p>Educational Partners</p>
        </div>
        <div className={styles.statItem}>
          <h3>75,000+</h3>
          <p>Students Managed</p>
        </div>
        <div className={styles.statItem}>
          <h3>15,000+</h3>
          <p>Faculty Members</p>
        </div>
        <div className={styles.statItem}>
          <h3>99.9%</h3>
          <p>Satisfaction Rate</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>Ready to Revolutionize Your Scheduling?</h2>
        <a href="/register" className={styles.btn}>Start Your Free Trial</a>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <FaCalendarAlt className={styles.footerLogoIcon} />
              <span>Schedulizer</span>
            </div>
            <p>Intelligent scheduling solutions for modern educational institutions.</p>
            <div className={styles.socialIcons}>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/pricing">Pricing</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Support</h3>
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Contact Us</h3>
            <ul className={styles.contactInfo}>
              <li><FaEnvelope /> support@schedulizer.com</li>
              <li><FaPhone /> +1 (555) 123-4567</li>
              <li><FaMapMarkerAlt /> 123 Education St, Tech City, TC 10001</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Schedulizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;