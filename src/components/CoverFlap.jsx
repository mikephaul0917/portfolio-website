export default function CoverFlap() {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 md:flex-row md:gap-16 p-4 sm:p-6 md:p-12 lg:p-16 overflow-hidden">

            {/* ── Title label (sticky-note style) ── */}
            <div className="md:self-start md:mt-12 lg:mt-20">
                <div className="bg-white/90 px-3 py-2 sm:px-5 sm:py-3 -rotate-2 shadow-md inline-block rounded-sm">
                    <h1 className="font-[family-name:var(--font-handwritten)] text-lg sm:text-xl md:text-3xl lg:text-4xl text-gray-800 whitespace-nowrap">
                        Mike Phaul's Stuff
                    </h1>
                </div>
            </div>

            {/* ── Polaroid photo with single tape ── */}
            <div className="relative flex-shrink-0">
                {/* Tape strip — top center only */}
                <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-24 h-4 sm:h-5 md:h-7 bg-[#d4c5a9]/70 rounded-sm z-10 shadow-sm border border-[#c4b596]/30" />

                {/* Polaroid frame — responsive sizing via clamp */}
                <div
                    className="polaroid-frame"
                    style={{
                        background: 'white',
                        padding: 'clamp(10px, 3vw, 16px)',
                        paddingBottom: 'clamp(32px, 10vw, 56px)',
                        borderRadius: '6px',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                        transform: 'rotate(1deg)',
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <img
                        src="/profile/profile.jpg"
                        alt="Mike Phaul - Profile Photo"
                        className="polaroid-img"
                        style={{
                            display: 'block',
                            width: 'clamp(140px, 35vw, 240px)',
                            height: 'clamp(140px, 35vw, 240px)',
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
                </div>
            </div>

            {/* ── Stamp badge — bottom-left ── */}
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-14 md:left-16 lg:bottom-16 lg:left-24">
                <div style={{
                    width: 'clamp(80px, 18vw, 130px)',
                    height: 'clamp(80px, 18vw, 130px)',
                    borderRadius: '50%',
                    border: '3px solid #c2410c',
                    outline: '2px dashed #c2410c',
                    outlineOffset: '3px',
                    color: '#c2410c',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(-12deg)',
                    opacity: 0.88,
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    padding: '0.5rem',
                    gap: '1px',
                }}>
                    <span style={{ fontSize: 'clamp(0.3rem, 1vw, 0.5rem)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Computer Science Student</span>
                    <span style={{ fontSize: 'clamp(0.7rem, 2.2vw, 1.3rem)', fontWeight: 900, lineHeight: 1.1 }}>INTERN READY</span>
                    <span style={{ fontSize: 'clamp(0.3rem, 1vw, 0.5rem)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Class of 2026</span>
                </div>
            </div>
        </div>
    );
}
