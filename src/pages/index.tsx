import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Physical AI & <span className={styles.accent}>Humanoid</span> Robotics
            </h1>
            <p className={styles.heroSubtitle}>
              Mastering Embodied Intelligence: From Theory to Humanoid Deployment
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryBtn} to="/docs/module-1-ros2">
                Explore the Textbook →
              </Link>
              <Link className={styles.secondaryBtn} to="/docs/introduction-to-robotics">
                Quick Start
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.robotContainer}>
              <div className={styles.robotBody}></div>
              <div className={styles.robotHead}></div>
              <div className={styles.robotArmLeft}></div>
              <div className={styles.robotArmRight}></div>
              <div className={styles.glowOrb}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.waveDivider}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,0 C320,80 480,120 720,80 C960,40 1120,80 1440,60 L1440,120 L0,120 Z" fill="#f8fafc" />
        </svg>
      </div>
    </header>
  );
}

const ModuleCard = ({title, description, link, week}) => {
  return (
    <Link to={link} className={styles.moduleCard}>
      <div className={styles.weekTag}>{week}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.cardHover}>
        <span>Explore →</span>
      </div>
    </Link>
  );
};

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  const modules = [
    { title: 'ROS 2 Nervous System', description: 'Core communication & robot control middleware', link: '/docs/module-1-ros2', week: 'Weeks 1–4' },
    { title: 'The Digital Twin', description: 'Simulation mastery with Gazebo & Unity', link: '/docs/module-2-digital-twin', week: 'Weeks 5–7' },
    { title: 'The AI-Robot Brain', description: 'NVIDIA Isaac for perception & manipulation', link: '/docs/module-3-isaac', week: 'Weeks 8–10' },
    { title: 'Vision-Language-Action (VLA)', description: 'Natural language to robot behavior', link: '/docs/module-4-vla-humanoids', week: 'Weeks 11–13' },
  ];

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <section className={styles.curriculumSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Curriculum Journey</h2>
            <div className={styles.moduleGrid}>
              {modules.map((mod, idx) => (
                <ModuleCard key={idx} {...mod} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.featuresSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why This Textbook?</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🤖</span>
                <h3>AI-Native Design</h3>
                <p>Built with 2025 AI tools for real-world humanoid applications</p>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>⚡</span>
                <h3>Hands-On Projects</h3>
                <p>Executable code, simulations, and capstone challenges</p>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🌐</span>
                <h3>Future-Proof Skills</h3>
                <p>VLA, digital twins, and embodied intelligence mastery</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container text-center">
            <h2>Begin Your Robotics Journey</h2>
            <p>The future of physical AI starts here</p>
            <Link className={styles.primaryBtn} to="/docs/module-1-ros2">
              Get Started →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}