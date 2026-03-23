import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CoverFlap() {
    const [isDropped, setIsDropped] = useState(false);

    useEffect(() => {
        if (!isDropped) return;
        const resetDrop = () => setIsDropped(false);
        // Delay attachment to avoid catching the initial click
        const timer = setTimeout(() => window.addEventListener('click', resetDrop), 10);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', resetDrop);
        };
    }, [isDropped]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 md:flex-row md:gap-16 p-4 sm:p-6 md:p-12 lg:p-16 overflow-hidden pointer-events-auto">
            {/* ── Title label (sticky-note style) ── */}
            <div className="md:self-start md:mt-12 lg:mt-20 mb-4 md:mb-0">
                <div className="bg-white/90 px-4 py-3 sm:px-5 sm:py-3 -rotate-2 shadow-md inline-block rounded-sm">
                    <h1 className="font-[family-name:var(--font-handwritten)] text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-gray-800 whitespace-nowrap">
                        Mike Phaul's Stuff
                    </h1>
                </div>
            </div>

            {/* ── Polaroid photo with single tape ── */}
            <div className="relative flex-shrink-0">
                {/* Tape strip — top center only */}
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-5 sm:h-6 md:h-7 bg-[#d4c5a9]/70 rounded-sm z-10 shadow-sm border border-[#c4b596]/30" />

                {/* Polaroid frame — responsive sizing via clamp, uses min(vw, vh) for landscape */}
                <motion.div
                    className="polaroid-frame relative z-20 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isDropped) setIsDropped(true);
                    }}
                    initial={false}
                    animate={isDropped ? {
                        y: '100vh',
                        rotate: 15,
                        transition: { type: 'spring', damping: 15, stiffness: 60 }
                    } : {
                        y: 0,
                        rotate: 1,
                        transition: { type: 'spring', damping: 20, stiffness: 100 }
                    }}
                    style={{
                        background: 'white',
                        padding: 'clamp(12px, 3vw, 16px)',
                        paddingBottom: 'clamp(36px, 10vw, 56px)',
                        borderRadius: '6px',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <img
                        src="/profile/profile.jpg"
                        alt="Mike Phaul - Profile Photo"
                        className="polaroid-img"
                        style={{
                            display: 'block',
                            width: 'clamp(160px, min(50vw, 40vh), 280px)',
                            height: 'clamp(160px, min(50vw, 40vh), 280px)',
                            objectFit: 'cover',
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.1)',
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML += `
                                <div style="width:140px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f9fafb;color:#9ca3af;">
                                    <span style="font-size:1.5rem;">📷</span>
                                    <span style="font-size:10px;margin-top:4px;">Profile Photo</span>
                                </div>
                            `;
                        }}
                    />
                </motion.div>
            </div>

            {/* ── Stamp badge — bottom-left ── */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-14 md:left-16 lg:bottom-16 lg:left-24 z-30">
                <motion.div
                    initial={{ scale: 3.5, opacity: 0, rotate: 10 }}
                    animate={{ scale: 1, opacity: 0.88, rotate: -12 }}
                    transition={{
                        type: 'spring',
                        damping: 10,
                        stiffness: 200,
                        mass: 0.8,
                        delay: 0.4
                    }}
                    style={{
                        width: 'clamp(130px, min(30vw, 30vh), 180px)',
                        height: 'clamp(130px, min(30vw, 30vh), 180px)',
                        borderRadius: '50%',
                        border: '3px solid #c2410c',
                        outline: '2px dashed #c2410c',
                        outlineOffset: '4px',
                        color: '#c2410c',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'monospace',
                        textAlign: 'center',
                        padding: '0.25rem',
                        gap: '2px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                    }}>
                    <span style={{ fontSize: 'clamp(0.4rem, 2.2vw, 0.65rem)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                        <div>Computer Science</div>
                        <div>Student</div>
                    </span>
                    <span style={{ fontSize: 'clamp(0.9rem, 4.5vw, 1.6rem)', fontWeight: 900, lineHeight: 1.05, margin: '2px 0', whiteSpace: 'nowrap' }}>
                        <div>INTERN</div>
                        <div>READY</div>
                    </span>
                    <span style={{ fontSize: 'clamp(0.4rem, 2.2vw, 0.65rem)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        <div>Class of 2026</div>
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
