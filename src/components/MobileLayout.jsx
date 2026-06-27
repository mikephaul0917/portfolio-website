import { useState, useEffect, useRef } from 'react';
import { FaUser, FaCode, FaLaptopCode, FaEnvelope } from 'react-icons/fa';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

const sections = [
    { id: 'hero', label: 'Home', icon: null },
    { id: 'about', label: 'About', icon: <FaUser size={18} />, color: '#14b8a6' },
    { id: 'skills', label: 'Skills', icon: <FaCode size={18} />, color: '#3b82f6' },
    { id: 'projects', label: 'Projects', icon: <FaLaptopCode size={18} />, color: '#ef4444' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope size={18} />, color: '#eab308' },
];

const navItems = sections.filter((s) => s.icon); // exclude hero from nav

export default function MobileLayout() {
    const [activeSection, setActiveSection] = useState('hero');
    const sectionRefs = useRef({});

    /* ── Intersection Observer to track which section is in view ── */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const setRef = (id) => (el) => {
        sectionRefs.current[id] = el;
    };

    return (
        <div className="mobile-layout">
            {/* ═══ HERO SECTION ═══ */}
            <section id="hero" ref={setRef('hero')} className="mobile-hero">
                {/* Profile Photo */}
                <div className="mobile-hero-photo-wrap">
                    <div className="mobile-hero-tape" />
                    <div className="mobile-hero-polaroid">
                        <img
                            src="/profile/profile.jpg"
                            alt="Mike Phaul"
                            className="mobile-hero-img"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML =
                                    '<div style="width:100%;height:100%;background:linear-gradient(135deg,#14b8a6,#0f766e);display:flex;align-items:center;justify-content:center;color:white;font-size:2.5rem;font-weight:700">MP</div>';
                            }}
                        />
                    </div>
                </div>

                {/* Name & Tagline */}
                <div className="mobile-hero-text">
                    <h1 className="font-[family-name:var(--font-handwritten)]" style={{ fontSize: '2rem', color: '#1f2937', lineHeight: 1.2 }}>
                        Mike Phaul
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                        Computer Science Student — Seeking Internship
                    </p>
                </div>


            </section>

            {/* ═══ CONTENT CARDS ═══ */}
            <section id="about" ref={setRef('about')} className="mobile-card">
                <AboutSection />
            </section>

            <section id="skills" ref={setRef('skills')} className="mobile-card">
                <SkillsSection />
            </section>

            <section id="projects" ref={setRef('projects')} className="mobile-card">
                <ProjectsSection />
            </section>

            <section id="contact" ref={setRef('contact')} className="mobile-card">
                <ContactSection />
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="mobile-footer">
                Mike Phaul 2026 –{' '}
                <a href="https://www.linkedin.com/in/mikephaul" style={{ color: '#60a5fa' }}>LinkedIn</a>
                {' – '}
                <a href="https://github.com/mikephaul0917" style={{ color: '#60a5fa' }}>GitHub</a>
            </footer>

            {/* ═══ FLOATING BOTTOM NAV ═══ */}
            <nav className="mobile-bottom-nav">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                            style={{
                                '--nav-color': item.color,
                            }}
                        >
                            <span className="mobile-nav-icon">{item.icon}</span>
                            <span className="mobile-nav-label">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
