import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaCode, FaServer, FaMobileAlt, FaDocker, FaTimes, FaSearchPlus } from 'react-icons/fa';

const skillCategories = [
    {
        title: 'Frontend Development',
        icon: <FaCode className="text-xl" />,
        bgIcon: '#3b82f6',
        skills: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
    },
    {
        title: 'Backend Development',
        icon: <FaServer className="text-xl" />,
        bgIcon: '#3b82f6',
        skills: ['Node.js', 'Express.js', 'Python', 'MongoDB', 'Rest API', 'MySQL', 'PHP', 'Laravel'],
    },
];

const certifications = [
    {
        title: 'Introduction to Cybersecurity',
        category: 'Cybersecurity',
        skills: 'Cyber Best Practices, Cybersecurity, Network Vulnerabilities, Privacy and Data Confidentiality, Threat Detection and Response, Risk Management, Vulnerability Assessment, Security Audit and Compliance',
        date: 'Dec 2025',
        image: '/CERTIFICATIONS/Intro-to-Cybersecurity/introduction-to-cybersecurity.png',
        logo: 'cisco.png',
    },
    {
        title: 'JavaScript Essential 1',
        category: 'Web Development',
        skills: 'Data Types, Debugging, User Interaction, Conditional Execution, Control Flow',
        date: 'Dec 2025',
        image: '/CERTIFICATIONS/javascript-essential-1/javascript-essentials-1.png',
        logo: 'cisco.png',
    },
    {
        title: 'JavaScript Essential 2',
        category: 'Web Development',
        skills: 'Array Techniques, Comparison Strategies, Deep Cloning, Enumerating Properties, Getters, Inheritance, Notation Nuances, Object Manipulation, Object Methods, Property Management, Prototypes, Set and Map, Setters, Testing Techniques',
        date: 'Dec 2025',
        image: '/CERTIFICATIONS/javascript-essentials-2/javascript-essentials-2.png',
        logo: 'cisco.png',
    },
    {
        title: 'Introduction to Data Science',
        category: 'Data Science',
        skills: 'Data Analysis, Data Validation, Data Collection',
        date: 'Dec 2025',
        image: '/CERTIFICATIONS/introduction-to-data-science/introduction-to-data-science.png',
        logo: 'cisco.png',
    },
    {
        title: 'Data Analytics Essentials',
        category: 'Data Analytics',
        skills: 'Data Analysis, Tableau, Microsoft Excel, Data Visualization, Data Storytelling',
        date: 'Dec 2025',
        image: '/CERTIFICATIONS/data-analytics-essentials/data-analytics-essentials.png',
        logo: 'cisco.png',
    },
    {
        title: 'Generative AI Fundamentals',
        category: 'Generative AI',
        skills: 'Generative artificial intelligence (AI)',
        date: 'Nov 2025',
        image: '/CERTIFICATIONS/generative-ai-fundamentals/databricks.png',
        logo: 'databricks.png',
    },
    {
        title: 'Gemini Certified Student',
        category: 'Generative AI',
        skills: 'Google AI',
        date: 'Oct 2025',
        image: '/CERTIFICATIONS/gemini-certificate/gemini.png',
        logo: 'gemini.avif',
    },
    {
        title: 'HTML Fundamentals',
        category: 'Web Development',
        skills: 'HTML',
        date: 'Oct 2025',
        image: '/CERTIFICATIONS/codecred-certifications/HTML Fundamentals.png',
        logo: 'CodeCred',
    },
    {
        title: 'OpeniT Codefest 2025',
        category: 'Web/App Development',
        skills: 'project pitching, API integration, and innovative problem-solving',
        date: 'Nov 2025',
        image: '/CERTIFICATIONS/openit_certificate/hackthon.jpg',
        logo: 'Open_iT.png',
    }
];

export default function SkillsSection() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div style={{ padding: 'clamp(1rem, 4vw, 2.5rem) clamp(0.75rem, 3vw, 2rem)' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="font-[family-name:var(--font-handwritten)]" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Skills & Experience
                </h2>
                <div style={{ height: '4px', width: '6rem', background: '#3b82f6', margin: '0 auto', borderRadius: '9999px' }}></div>
            </div>

            {/* Skills Grid */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', marginLeft: '0.5rem' }}>
                    <h3 className="font-[family-name:var(--font-sketch)]" style={{ fontSize: '1.25rem', color: '#1f2937' }}>Technical Expertise</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem' }}>
                    {skillCategories.map((cat) => (
                        <div key={cat.title} style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: '-2px', background: 'linear-gradient(to right, #e5e7eb, #f3f4f6)', borderRadius: '1rem', filter: 'blur(3px)', opacity: 0.5 }}></div>
                            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.92)', borderRadius: '1rem', padding: 'clamp(1rem, 2.5vw, 1.5rem)', border: '1px solid #f3f4f6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: cat.bgIcon, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                                        {cat.icon}
                                    </div>
                                    <h4 style={{ fontWeight: 700, color: '#1f2937', fontSize: '1rem' }}>{cat.title}</h4>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                                    {cat.skills.map((skill) => (
                                        <span key={skill} style={{ padding: '0.25rem 0.75rem', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '0.5rem', fontSize: '0.8rem', color: '#4b5563', fontWeight: 500 }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education Timeline */}
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-4px', background: 'linear-gradient(to right, rgba(59,130,246,0.15), rgba(20,184,166,0.15))', borderRadius: '1rem', filter: 'blur(4px)', opacity: 0.4 }}></div>
                <div style={{ position: 'relative', borderLeft: '6px solid #3b82f6', background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)', padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderRadius: '0 1rem 1rem 0', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: 'rgba(219,234,254,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: '1.2rem' }}>🎓</span>
                        </div>
                        <h3 className="font-[family-name:var(--font-sketch)]" style={{ fontSize: '1.25rem', color: '#1f2937' }}>Education & Journey</h3>
                    </div>

                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Vertical line */}
                        <div style={{ position: 'absolute', left: '1.15rem', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, transparent, #3b82f6, transparent)' }}></div>

                        {certifications.map((cert, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, flexShrink: 0, boxShadow: '0 2px 8px rgba(59,130,246,0.4)', zIndex: 1, overflow: 'hidden' }}>
                                    {cert.logo === 'CodeCred' ? (
                                        <p style={{ fontSize: '0.4rem' }}>CodeCred</p>
                                    ) : (
                                        <img src={cert.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    )}
                                </div>
                                <div style={{ flex: 1, padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid #dbeafe', background: 'rgba(239,246,255,0.6)', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'row' }}>
                                        {/* Image Container with Hover Effect */}
                                        <div
                                            onClick={() => setSelectedImage(cert.image)}
                                            className="group"
                                            style={{
                                                width: 'clamp(50px, 12vw, 80px)',
                                                height: 'clamp(50px, 12vw, 80px)',
                                                flexShrink: 0,
                                                borderRadius: '0.5rem',
                                                overflow: 'hidden',
                                                border: '1px solid #dbeafe',
                                                background: '#f0f6ff',
                                                cursor: 'pointer',
                                                position: 'relative'
                                            }}
                                        >
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                onError={e => { e.target.style.display = 'flex'; e.target.parentElement.style.display = 'flex'; e.target.parentElement.style.alignItems = 'center'; e.target.parentElement.style.justifyContent = 'center'; e.target.parentElement.innerHTML = '<span style="font-size:0.65rem;color:#93c5fd;text-align:center;padding:4px">No Image</span>'; }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                                onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                            />
                                            {/* Hover Icon Overlays */}
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'rgba(59, 130, 246, 0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                opacity: 0,
                                                transition: 'opacity 0.2s ease',
                                                pointerEvents: 'none'
                                            }}
                                                onMouseEnter={e => e.target.style.opacity = 1}
                                                onMouseLeave={e => e.target.style.opacity = 0}
                                            >
                                                <FaSearchPlus style={{ color: 'white', fontSize: '1.2rem' }} />
                                            </div>
                                        </div>
                                        {/* Text content */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                                                <h4 style={{ fontWeight: 700, color: '#1f2937', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>{cert.title}</h4>
                                                <span style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)', fontWeight: 700, color: '#3b82f6', padding: '0.15rem 0.5rem', background: 'white', borderRadius: '9999px', border: '1px solid #dbeafe', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{cert.category}</span>
                                            </div>
                                            <p style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.875rem)', color: '#6b7280', fontStyle: 'italic', marginBottom: '0.4rem' }}><strong>Skills:</strong> {cert.skills}</p>
                                            <p style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cert.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {/* Modal Overlay using Portal */}
            {selectedImage && createPortal(
                <div
                    onClick={() => setSelectedImage(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        cursor: 'zoom-out'
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            maxWidth: 'min(1200px, 95vw)',
                            maxHeight: '90vh',
                            background: 'transparent',
                            borderRadius: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'default',
                            animation: 'scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '0px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'white',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                color: '#1f2937',
                                cursor: 'pointer',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease',
                                zIndex: 10000
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                                e.currentTarget.style.background = '#3b82f6';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.color = '#1f2937';
                            }}
                        >
                            <FaTimes />
                        </button>

                        <div style={{
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            boxShadow: '0 25px 70px -10px rgba(0, 0, 0, 0.6)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <img
                                src={selectedImage}
                                alt="Full Certification"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '85vh',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    </div>

                    <style>
                        {`
                            @keyframes scaleIn {
                                from { transform: scale(0.9); opacity: 0; }
                                to { transform: scale(1); opacity: 1; }
                            }
                        `}
                    </style>
                </div>,
                document.body
            )}
        </div>
    );
}