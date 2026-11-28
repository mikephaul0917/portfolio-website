import { useId } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

/* ───────────────────────────────────────────────────────────────
   Rubber-stamp badge
   - double ring (thick + thin), solid, like a real stamp die
   - text runs around the ring, separated by stars
   - SVG filter roughens the edges and knocks out patches of ink
   - multiply blend so the ink soaks into whatever is under it
   ─────────────────────────────────────────────────────────────── */

const INK = '#7a2314'; // darker red-brown: still ink-like, but far better contrast on the peach folder
const STAMP_FONT = "'Oswald', 'Bebas Neue', 'Arial Narrow', Impact, sans-serif";

// 5-point star as an SVG points string
function starPoints(cx, cy, r) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const rad = i % 2 === 0 ? r : r * 0.42;
        pts.push(`${(cx + rad * Math.cos(angle)).toFixed(2)},${(cy + rad * Math.sin(angle)).toFixed(2)}`);
    }
    return pts.join(' ');
}

function Stamp() {
    const uid = useId().replace(/:/g, '');
    const filterId = `ink-${uid}`;
    const topId = `top-${uid}`;
    const bottomId = `bottom-${uid}`;

    return (
        <svg
            viewBox="0 0 200 200"
            width="100%"
            height="100%"
            role="img"
            aria-label="Computer science student, open to work, class of 2026"
            style={{ display: 'block', overflow: 'visible' }}
        >
            <defs>
                {/* Top arc runs left → right over the top (letters face outward) */}
                <path id={topId} d="M 33,100 A 67,67 0 0 1 167,100" />
                {/* Bottom arc runs left → right under the bottom (letters face inward) */}
                <path id={bottomId} d="M 23,100 A 77,77 0 0 0 177,100" />

                <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
                    {/* 1. wobble the edges slightly */}
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="edgeNoise" />
                    <feDisplacementMap in="SourceGraphic" in2="edgeNoise" scale="1.3" xChannelSelector="R" yChannelSelector="G" result="rough" />

                    {/* 2. fine speckle: tiny holes where ink didn't take */}
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="5" result="grain" />
                    <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  5 0 0 0 -1.0" result="grainAlpha" />

                    {/* 3. large blotches: uneven pressure, some areas lighter */}
                    <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="2" seed="11" result="blotch" />
                    <feColorMatrix in="blotch" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -0.25" result="blotchAlpha" />

                    <feComposite in="rough" in2="grainAlpha" operator="in" result="grainy" />
                    <feComposite in="grainy" in2="blotchAlpha" operator="in" />
                </filter>
            </defs>

            <g filter={`url(#${filterId})`} fill={INK} stroke={INK}>
                {/* Rings */}
                <circle cx="100" cy="100" r="95" fill="none" strokeWidth="6" />
                <circle cx="100" cy="100" r="86.5" fill="none" strokeWidth="1.6" />
                <circle cx="100" cy="100" r="57" fill="none" strokeWidth="1.6" />

                {/* Ring text */}
                <text fontFamily={STAMP_FONT} fontWeight="700" fontSize="14.5" letterSpacing="0.8" textAnchor="middle" stroke="none">
                    <textPath href={`#${topId}`} startOffset="50%">COMPUTER SCIENCE STUDENT</textPath>
                </text>
                <text fontFamily={STAMP_FONT} fontWeight="700" fontSize="16" letterSpacing="2.5" textAnchor="middle" stroke="none">
                    <textPath href={`#${bottomId}`} startOffset="50%">CLASS OF 2027</textPath>
                </text>

                {/* Separator stars at 9 and 3 o'clock */}
                <polygon points={starPoints(28, 100, 6)} stroke="none" />
                <polygon points={starPoints(172, 100, 6)} stroke="none" />

                {/* Center band */}
                <line x1="45.8" y1="82.5" x2="154.2" y2="82.5" strokeWidth="2.2" />
                <line x1="45.8" y1="117.5" x2="154.2" y2="117.5" strokeWidth="2.2" />
                <text
                    x="100"
                    y="101"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily={STAMP_FONT}
                    fontWeight="700"
                    fontSize="27"
                    textLength="106"
                    lengthAdjust="spacingAndGlyphs"
                    stroke="none"
                >
                    OPEN TO WORK
                </text>
                <polygon points={starPoints(100, 65, 6)} stroke="none" />
                <polygon points={starPoints(100, 135, 6)} stroke="none" />
            </g>
        </svg>
    );
}

export default function CoverFlap() {
    const swing = useAnimationControls();

    // Pendulum: swing out from the tape, then settle with shrinking oscillations.
    // `null` as the first keyframe starts from wherever the photo currently is,
    // so clicking mid-swing doesn't snap.
    const swingPolaroid = () => {
        swing.start({
            rotate: [null, 13, -9, 6, -3.5, 2, 1],
            transition: {
                duration: 2.6,
                ease: 'easeInOut',
                times: [0, 0.16, 0.38, 0.58, 0.76, 0.9, 1],
            },
        });
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 md:flex-row md:gap-16 p-4 sm:p-6 md:p-12 lg:p-16 overflow-hidden pointer-events-auto"
            // Children size themselves from this box (cqw/cqh), so the cover scales with the folder
            style={{ containerType: 'size' }}
        >
            {/* ── Title label (sticky-note style) ── */}
            <div className="md:self-start md:mt-12 lg:mt-20 mb-4 md:mb-0">
                <div className="bg-white/90 px-4 py-3 sm:px-5 sm:py-3 -rotate-2 shadow-md inline-block rounded-sm">
                    <h1 className="font-[family-name:var(--font-handwritten)] text-gray-800 whitespace-nowrap"
                        style={{ fontSize: 'clamp(1.5rem, 3.6cqw, 5rem)' }}
                    >
                        Mike Phaul's Stuff
                    </h1>
                </div>
            </div>

            {/* ── Polaroid photo with single tape ── */}
            <div
                className="relative flex-shrink-0"
                // --photo = photo edge length. Everything on the polaroid is a ratio of it.
                style={{ '--photo': 'clamp(130px, min(26cqw, 52cqh), 640px)' }}
            >
                {/* Tape strip — top center only */}
                <div className="absolute left-1/2 -translate-x-1/2 bg-[#d4c5a9]/70 rounded-sm z-10 shadow-sm border border-[#c4b596]/30"
                    style={{ width: 'calc(var(--photo) * 0.34)', height: 'calc(var(--photo) * 0.1)', top: 'calc(var(--photo) * -0.05)' }}
                />

                {/* Polaroid frame — responsive sizing via clamp, uses min(vw, vh) for landscape */}
                <motion.div
                    className="polaroid-frame relative z-20 cursor-pointer"
                    onClick={swingPolaroid}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            swingPolaroid();
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Swing the photo"
                    initial={{ rotate: 1 }}
                    animate={swing}
                    style={{
                        originX: 0.5,
                        originY: 0, // pivot where the tape holds it
                        background: 'white',
                        padding: 'calc(var(--photo) * 0.057)',
                        paddingBottom: 'calc(var(--photo) * 0.2)',
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
                            width: 'var(--photo)',
                            height: 'var(--photo)',
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

                    {/* Handwritten caption in the polaroid's bottom strip */}
                    <div
                        className="absolute inset-x-0 bottom-0 flex items-center justify-center pointer-events-none"
                        style={{ height: 'calc(var(--photo) * 0.2)' }}
                    >
                        <span className="font-[family-name:var(--font-handwritten)] text-gray-700 -rotate-1 whitespace-nowrap"
                            style={{ fontSize: 'calc(var(--photo) * 0.085)' }}
                        >
                            Mike, CS '27
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* ── Ink stamp — bottom-left, same spot as before ──
                mix-blend-mode sits on the element that has the z-index so it can blend with the folder. */}
            <motion.div
                className="absolute pointer-events-none"
                initial={{ scale: 2.6, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                transition={{
                    type: 'spring',
                    damping: 14,
                    stiffness: 220,
                    mass: 0.7,
                    delay: 0.5,
                }}
                style={{
                    zIndex: 30,
                    mixBlendMode: 'multiply',
                    left: 'clamp(12px, 6cqw, 220px)',
                    bottom: 'clamp(12px, 8cqh, 180px)',
                    width: 'clamp(110px, min(20cqw, 38cqh), 480px)',
                    height: 'clamp(110px, min(20cqw, 38cqh), 480px)',
                }}
            >
                <Stamp />
            </motion.div>
        </div>
    );
}