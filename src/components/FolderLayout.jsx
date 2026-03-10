import { useState, useCallback, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import TabNav from './TabNav';
import CoverFlap from './CoverFlap';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

const sections = {
    about: AboutSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    contact: ContactSection,
};

/*
 * Spring config for the bouncy feel.
 * stiffness: 300, damping: 30  →  snappy with a slight bounce
 */
const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

/*
 * 3D TILT-AND-SWAP for content crossfade inside the paper.
 * Exit:  card tilts back, shrinks, shadow dissolves
 * Entry: card lands from slightly scaled up with heavy shadow
 */
const contentVariants = {
    enter: {
        opacity: 0,
        scale: 1.05,
        y: 20,
        rotateX: 5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    center: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.18)',
        transition: {
            duration: 0.45,
            ease: [0, 0.55, 0.45, 1],
            opacity: { duration: 0.3 },
            boxShadow: { duration: 0.5, delay: 0.1 },
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        rotateX: -15,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        transition: {
            duration: 0.4,
            ease: [0, 0.55, 0.45, 1],
            opacity: { duration: 0.3, delay: 0.05 },
        },
    },
};

export default function FolderLayout() {
    const [activeTab, setActiveTab] = useState(null);
    const [paperOnTop, setPaperOnTop] = useState(false); // z-index toggle
    const animatingRef = useRef(false);
    const containerRef = useRef(null);
    const paperY = useMotionValue(0);
    const paperControls = useAnimation();

    /*
     * ═══════════════════════════════════════════════════
     * FOLDER CARD ANIMATION — 3-phase enter/exit
     * ═══════════════════════════════════════════════════
     *
     * ENTER (Slide Up & Cover):
     *   Phase 1: Slide UP out of folder slot  → y: -110%, scale: 1.05
     *   Phase 2: Flip z-index to TOP          → paper now above cover
     *   Phase 3: Slide DOWN onto cover        → y: 0%, scale: 1
     *
     * EXIT (Slide Up & Return):
     *   Phase 1: Slide UP off the cover       → y: -110%, scale: 1.05
     *   Phase 2: Reset z-index to BEHIND      → paper back behind cover
     *   Phase 3: Slide DOWN into slot         → y: 0%, scale: 1
     */

    const enterAnimation = useCallback(async () => {
        const h = containerRef.current?.clientHeight || 600;
        const upPos = -(h * 1.08);

        // Phase 1: Pull card up out of slot
        await animate(paperY, upPos, springConfig);
        // Phase 2: Z-index flip — card is now above cover
        setPaperOnTop(true);
        // Phase 3: Card drops back down ON TOP of cover
        await animate(paperY, 0, springConfig);
    }, [paperY]);

    const exitAnimation = useCallback(async () => {
        const h = containerRef.current?.clientHeight || 600;
        const upPos = -(h * 1.08);

        // Phase 1: Lift card up off the cover
        await animate(paperY, upPos, springConfig);
        // Phase 2: Z-index reset — card drops behind cover
        setPaperOnTop(false);
        // Phase 3: Card slides back down into its slot
        await animate(paperY, 0, springConfig);
    }, [paperY]);

    const handleTabChange = useCallback(async (tabId) => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        try {
            if (activeTab === tabId) {
                // Same tab → EXIT animation (close)
                await exitAnimation();
                setActiveTab(null);
            } else if (activeTab) {
                // Different tab while open → EXIT first, then ENTER with new content
                await exitAnimation();
                setActiveTab(tabId);
                // Small delay for content swap to render
                await new Promise((r) => setTimeout(r, 60));
                await enterAnimation();
            } else {
                // No tab open → set content, then ENTER
                setActiveTab(tabId);
                // Small delay for content to render before animation starts
                await new Promise((r) => setTimeout(r, 30));
                await enterAnimation();
            }
        } finally {
            animatingRef.current = false;
        }
    }, [activeTab, enterAnimation, exitAnimation]);

    const ActiveSection = activeTab ? sections[activeTab] : null;

    // Dynamic z-index: paper is behind cover (z-10) or above it (z-25)
    const paperZ = paperOnTop ? 'z-25' : 'z-10';

    return (
        <div className="w-full max-w-[1100px] mx-auto">


            {/* ═══ FOLDER CONTAINER ═══ */}
            <div
                ref={containerRef}
                className="relative -mt-[1px] w-full"
                style={{ height: 'clamp(480px, 85vh, 1000px)' }}
            >

                <div
                    className="absolute inset-x-0 bottom-0 top-0 z-0"
                    style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.2))' }}
                >
                    {/* Folder Tab (Top-left) */}
                    <div className="absolute -top-7 left-0 w-40 h-8 bg-manila rounded-tl-2xl" />

                    {/* Shoulder transition - creating the curve from tab to flat edge */}
                    <div
                        className="absolute -top-7 left-40 w-24 h-8 bg-manila"
                        style={{ clipPath: 'path("M 0 0 C 30 0 45 32 96 32 L 0 32 Z")' }}
                    />

                    {/* Main Back Body */}
                    <div className="absolute inset-0 bg-manila rounded-tr-3xl rounded-b-2xl">
                        <div className="absolute left-3 sm:left-4 md:left-5 top-12 bottom-8 flex flex-col justify-evenly pointer-events-none">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <div key={i} className="binding-hole" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── LAYER 2 (z-10 / z-25): PAPER SHEET ───
                     Starts at z-10 (behind cover). During enter, z flips to 25 (above cover).
                     The 3-phase animation: UP → z-flip → DOWN. */}
                <motion.div
                    className={`absolute inset-x-4 sm:inset-x-6 md:inset-x-8 lg:inset-x-10 ${paperZ}`}
                    style={{
                        top: '2px',
                        bottom: '8px',
                        y: paperY,
                        boxShadow: paperOnTop
                            ? '0 20px 50px -12px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,1)'
                            : '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                >
                    {/* Index Tabs - Integrated back into paper for perfect sync */}
                    <div className="absolute -top-4 right-4 z-10 pointer-events-auto">
                        <TabNav activeTab={activeTab} onTabChange={handleTabChange} paperY={paperY} />
                    </div>

                    {/* Close Button (Left Side) */}
                    {activeTab && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => handleTabChange(activeTab)}
                            className="absolute -top-0 left-0 z-20 w-8 h-8 bg-red-400 text-white flex items-center justify-center shadow-lg hover:bg-red-500 transition-colors pointer-events-auto"
                            style={{
                                border: '2px solid rgba(0,0,0,0.1)',
                                cursor: 'pointer'
                            }}
                            title="Close Section"
                        >
                            <FaTimes size={14} />
                        </motion.button>
                    )}

                    <div
                        className="graph-paper relative w-full h-full overflow-hidden"
                        style={{ perspective: '1200px' }}
                    >
                        <AnimatePresence mode="wait">
                            {ActiveSection && (
                                <motion.div
                                    key={activeTab}
                                    className="w-full h-full overflow-y-auto sheet-scroll"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transformOrigin: 'center bottom',
                                        backfaceVisibility: 'hidden',
                                        padding: 'clamp(0.5rem, 2vw, 1.5rem) clamp(0.5rem, 2vw, 1.75rem)',
                                    }}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <ActiveSection />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <div
                    className="absolute inset-x-0 bottom-0 top-4 z-20 pointer-events-none"
                    style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}
                >
                    {/* Right-side shoulder to cover the paper */}
                    <div className="absolute top-0 right-0 w-48 h-16 bg-manila rounded-tr-3xl" />

                    {/* Shoulder transition - curved drop to the main body line */}
                    <div
                        className="absolute top-0 right-48 w-32 h-16 bg-manila"
                        style={{ clipPath: 'path("M 32 0 C 15 0 10 64 0 64 L 32 64 Z")' }}
                    />

                    {/* Main cover body - stays lower (mt-16) to uncover the paper on the left */}
                    <div className="absolute inset-0 mt-16 bg-manila rounded-tl-3xl rounded-b-2xl overflow-hidden">
                        <CoverFlap />
                    </div>
                </div>

            </div>
            <br />

            {/* Footer */}
            <footer className="text-center mt-1 text-xs sm:text-sm text-gray-400">
                Mike Phaul 2026 –{' '}
                <a href="https://www.linkedin.com/in/mikephaul" className="text-blue-400 hover:text-blue-300 transition-colors">LinkedIn</a>
                {' – '}
                <a href="https://github.com/mikephaul0917" className="text-blue-400 hover:text-blue-300 transition-colors">GitHub</a>
            </footer>
        </div>
    );
}
