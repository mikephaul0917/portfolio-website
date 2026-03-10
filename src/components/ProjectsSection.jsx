import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaExternalLinkAlt, FaGithub, FaLaptopCode, FaChevronLeft, FaChevronRight, FaSearchPlus, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        title: 'E-Clearance System',
        description: 'The E-Clearance System is a web-based Software-as-a-Service (SaaS) application developed to automate and manage student and employee clearance processes for academic institutions. ',
        techStack: ['React', 'Tailwind v4', 'Framer Motion', 'Vite', 'Typescript', 'node.js', 'mongoDB'],
        githubUrl: '#',
        liveUrl: '#',
        icon: <FaLaptopCode style={{ fontSize: '1.75rem' }} />,
        images: ['projects/ClearEd1.png', 'projects/ClearEd2.png', 'projects/ClearEd3.png', 'projects/ClearEd4.png', 'projects/ClearEd5.png', 'projects/ClearEd6.png', 'projects/ClearEd7.png', 'projects/ClearEd8.png', 'projects/ClearEd9.png'], // Add more images here to enable the carousel
    },
    {
        title: 'My Portfolio (This website!)',
        description: 'A unique digital experience exploring skeuomorphic design in a modern web context. Features custom physics-based animations for the folder interaction.',
        techStack: ['React', 'Tailwind v4', 'Framer Motion', 'Vite'],
        githubUrl: '#',
        liveUrl: '#',
        icon: <FaLaptopCode style={{ fontSize: '1.75rem' }} />,
        images: ['projects/myportfolio.png', 'projects/myportfolio2.png', 'projects/myportfolio3.png', 'projects/myportfolio4.png', 'projects/myportfolio5.png'], // Add more images here to enable the carousel
    },
    {
        title: 'Student Grade Management System',
        description: 'Student Grade Management System – A web-based application built using C#, ASP.NET, and SQL Server that helps manage student grades efficiently. The system allows instructors to input, update, and compute student grades while storing all records securely in a database. It provides an organized way to track academic performance and generate grade reports.',
        techStack: ['C#', 'ASP.NET', 'SQL Server'],
        githubUrl: 'https://github.com/mikephaul0917/Student-Grade-Management-System.git',
        liveUrl: '#',
        icon: <FaLaptopCode style={{ fontSize: '1.75rem' }} />,
        images: ['projects/sg1.png', 'projects/sg2.png', 'projects/sg3.png', 'projects/sg4.png', 'projects/sg5.png', 'projects/sg6.png', 'projects/sg7.png', 'projects/sg8.png'], // Add more images here to enable the carousel
    },
    {
        title: 'Kentouka Restaurant Website',
        description: 'Kentouka Restaurant Website – A responsive restaurant website built using HTML, CSS, and JavaScript. The site showcases the restaurant’s menu, featured dishes, location, and contact information with a clean and modern design. It focuses on user-friendly navigation and an engaging layout to enhance the online dining experience. 🍜',
        techStack: ['HTML', 'JavaScript', 'CSS'],
        githubUrl: 'https://github.com/mikephaul0917/Kentouka-Restaurant-Website.git',
        liveUrl: '#',
        icon: <FaLaptopCode style={{ fontSize: '1.75rem' }} />,
        images: ['projects/food1.png', 'projects/food2.png', 'projects/food3.png', 'projects/food4.png', 'projects/food5.png'], // Add more images here to enable the carousel
    },
    {
        title: 'Weather Analysis Dashboard',
        description: 'A data visualization dashboard built using Power BI and a Weather REST API that analyzes real-time and historical weather data. The dashboard presents insights such as temperature trends, precipitation patterns, and weather conditions through interactive charts and reports, helping users easily understand and explore weather patterns. 🌦️📊',
        techStack: ['Power BI', 'Weather REST API'],
        githubUrl: '#',
        liveUrl: '#',
        icon: <FaLaptopCode style={{ fontSize: '1.75rem' }} />,
        images: ['projects/powerbi.png'], // Add more images here to enable the carousel
    }

];

export default function ProjectsSection() {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    // Track current image index for each project
    const [currentImageIndices, setCurrentImageIndices] = useState(
        projects.reduce((acc, _, i) => ({ ...acc, [i]: 0 }), {})
    );

    const nextImage = (projectIndex) => {
        setCurrentImageIndices(prev => ({
            ...prev,
            [projectIndex]: (prev[projectIndex] + 1) % projects[projectIndex].images.length
        }));
    };

    const prevImage = (projectIndex) => {
        setCurrentImageIndices(prev => ({
            ...prev,
            [projectIndex]: (prev[projectIndex] - 1 + projects[projectIndex].images.length) % projects[projectIndex].images.length
        }));
    };

    return (
        <div style={{ padding: 'clamp(1rem, 4vw, 2.5rem) clamp(0.75rem, 3vw, 2rem)' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="font-[family-name:var(--font-handwritten)]" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Projects & Creations
                </h2>
                <div style={{ height: '4px', width: '6rem', background: '#ef4444', margin: '0 auto', borderRadius: '9999px' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {projects.map((project, pIdx) => (
                    <div key={pIdx} style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: '-2px', background: 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(59, 130, 246, 0.1))', borderRadius: '1rem', filter: 'blur(3px)', opacity: 0.4 }}></div>
                        <div style={{ position: 'relative', border: '1px solid #f3f4f6', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', padding: 'clamp(1rem, 3vw, 2rem)', borderRadius: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>

                            {/* Project Image Carousel / Placeholder */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '16/9',
                                background: '#f8fafc',
                                borderRadius: '1rem',
                                marginBottom: '1.5rem',
                                overflow: 'hidden',
                                border: '1px solid #f1f5f9',
                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                            }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndices[pIdx]}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ width: '100%', height: '100%', cursor: 'zoom-in', position: 'relative' }}
                                        onClick={() => setSelectedProjectIndex(pIdx)}
                                        className="group"
                                    >
                                        <img
                                            src={project.images[currentImageIndices[pIdx]]}
                                            alt={`${project.title} screenshot`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                                background: '#f8fafc'
                                            }}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:1rem;color:#94a3b8">
                                                        <div style="width:4rem;height:4rem;border-radius:1rem;background:white;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.05)">
                                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM80 32C35.82 32 0 67.82 0 112v288c0 8.84 7.16 16 16 16h56c8.84 0 16-7.16 16-16V112c0-8.84-7.16-16-16-16H80zm544 64H176c-8.84 0-16 7.16-16 16v256c0 8.84 7.16 16 16 16h448c8.84 0 16-7.16 16-16V112c0-8.84-7.16-16-16-16zm-8 256H184V112h432v240zM496 160c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM192 336h416V227.17L494.63 113.8a48.016 48.016 0 0 0-67.81 0L304 236.44l-44.17-44.17a48.016 48.016 0 0 0-67.81 0L192 192.21V336z"></path></svg>
                                                        </div>
                                                        <span style="font-weight:700;text-transform:uppercase;letter-spacing:0.1em;font-size:0.75rem">Project Preview</span>
                                                    </div>
                                                `;
                                            }}
                                        />
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 flex items-center justify-center absolute inset-0 pointer-events-none">
                                            <FaSearchPlus className="text-white text-3xl" />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Carousel Controls */}
                                {project.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); prevImage(pIdx); }}
                                            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10 }}
                                        >
                                            <FaChevronLeft style={{ color: '#ef4444', fontSize: '0.85rem' }} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); nextImage(pIdx); }}
                                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10 }}
                                        >
                                            <FaChevronRight style={{ color: '#ef4444', fontSize: '0.85rem' }} />
                                        </button>
                                        <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.4rem', zIndex: 10 }}>
                                            {project.images.map((_, i) => (
                                                <div
                                                    key={i}
                                                    style={{
                                                        width: '5px',
                                                        height: '5px',
                                                        borderRadius: '50%',
                                                        backgroundColor: i === currentImageIndices[pIdx] ? '#ef4444' : 'rgba(255,255,255,0.5)',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                <h3 className="font-[family-name:var(--font-handwritten)]" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.85rem)', color: '#1f2937' }}>{project.title}</h3>
                                <div style={{ display: 'flex', gap: '0.85rem' }}>
                                    <a href={project.githubUrl} className="hover:scale-110 transition-transform text-red-500"><FaGithub size={20} /></a>
                                    <a href={project.liveUrl} className="hover:scale-110 transition-transform text-red-500"><FaExternalLinkAlt size={18} /></a>
                                </div>
                            </div>

                            <p style={{ color: '#4b5563', fontSize: 'clamp(0.8rem, 2vw, 1rem)', lineHeight: '1.75', marginBottom: '1rem' }}>
                                {project.description}
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                                {project.techStack.map((tech) => (
                                    <span key={tech} style={{ padding: '0.25rem 0.75rem', background: '#fef2f2', color: '#ef4444', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', fontWeight: 600, borderRadius: '9999px', border: '1px solid #fee2e2' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Overlay using Portal */}
            {selectedProjectIndex !== null && createPortal(
                <div
                    onClick={() => setSelectedProjectIndex(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        backdropFilter: 'blur(15px)',
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
                            width: 'min(1400px, 92vw)',
                            maxHeight: '85vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'default',
                            animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    >
                        {/* Modal Carousel Controls */}
                        {projects[selectedProjectIndex].images.length > 1 && (
                            <>
                                <button
                                    onClick={() => prevImage(selectedProjectIndex)}
                                    style={{ position: 'absolute', left: 'clamp(8px, 2vw, -80px)', background: 'white', border: 'none', width: 'clamp(2rem, 5vw, 3.5rem)', height: 'clamp(2rem, 5vw, 3.5rem)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', zIndex: 10001, top: '50%', transform: 'translateY(-50%)' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <FaChevronLeft style={{ color: '#ef4444', fontSize: '1.25rem' }} />
                                </button>
                                <button
                                    onClick={() => nextImage(selectedProjectIndex)}
                                    style={{ position: 'absolute', right: 'clamp(8px, 2vw, -80px)', background: 'white', border: 'none', width: 'clamp(2rem, 5vw, 3.5rem)', height: 'clamp(2rem, 5vw, 3.5rem)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', zIndex: 10001, top: '50%', transform: 'translateY(-50%)' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <FaChevronRight style={{ color: '#ef4444', fontSize: '1.25rem' }} />
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => setSelectedProjectIndex(null)}
                            style={{
                                position: 'absolute',
                                top: '-65px',
                                right: '-20px',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: 'white',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                color: '#ef4444',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease',
                                zIndex: 10002
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                                e.currentTarget.style.background = '#ef4444';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.color = '#ef4444';
                            }}
                        >
                            <FaTimes />
                        </button>

                        <div style={{
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.9)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: '#f8fafc'
                        }}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndices[selectedProjectIndex]}
                                    src={projects[selectedProjectIndex].images[currentImageIndices[selectedProjectIndex]]}
                                    alt="Full Project Screenshot"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '80vh',
                                        objectFit: 'contain'
                                    }}
                                />
                            </AnimatePresence>
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