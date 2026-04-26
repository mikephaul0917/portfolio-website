import { useState } from 'react';

export default function AboutSection() {
    const [photoTouched, setPhotoTouched] = useState(false);

    return (
        <div className="p-4 sm:p-6 md:p-10 relative">
            {/* Header with profile */}
            <div style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '1rem', padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2.5rem)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div className="flex flex-col items-center text-center gap-2 sm:items-start sm:text-left sm:flex-row sm:justify-between sm:w-full">
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
                        <h2 className="font-[family-name:var(--font-sketch)] text-sm sm:text-base md:text-lg text-teal-600/70">Who am I ?</h2>
                        <h3 className="font-[family-name:var(--font-handwritten)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight">
                            Mike Phaul
                        </h3>
                        <div className="h-1 w-16 sm:w-20 bg-teal-500/30 rounded-full mt-1 mb-1 mx-auto sm:mx-0"></div>
                        <p className="text-gray-500 font-medium text-sm sm:text-base md:text-lg mt-1">Computer Science Student – Seeking Internship</p>
                    </div>
                    <div
                        className={`group relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-gray-100 transition-transform hover:rotate-0 duration-300 cursor-pointer ${photoTouched ? 'rotate-0' : 'rotate-3'}`}
                        onClick={() => setPhotoTouched((prev) => !prev)}
                    >
                        <img
                            src="/profile/profile.jpg"
                            alt="Mike Phaul - Profile Photo"
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${photoTouched ? 'scale-110' : ''}`}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;background:linear-gradient(135deg,#14b8a6,#0f766e);display:flex;align-items:center;justify-content:center;color:white;font-size:1.875rem;font-weight:700">MP</div>';
                            }}
                        />
                        {/* POV Camera Cover Animation - 3D Reaching Hand */}
                        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
                            {/* The realistic hand image */}
                            <div className="absolute inset-x-0 -bottom-10 flex items-center justify-center">
                                <img 
                                    src="/profile/hand.png" 
                                    alt="Hand" 
                                    style={{ transitionTimingFunction: 'cubic-bezier(0.5, 0, 1, 1)' }}
                                    className={`w-[80%] origin-bottom group-hover:opacity-100 group-hover:translate-y-[-10%] group-hover:scale-[4] transition-all duration-[600ms] filter group-hover:blur-[3px] drop-shadow-2xl mix-blend-multiply ${photoTouched ? 'opacity-100 translate-y-[-10%] scale-[4] blur-[3px]' : 'opacity-0 scale-[0.4] translate-y-10'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Presentation Card - outer glow */}
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-4px', background: 'linear-gradient(to right, rgba(20,184,166,0.2), rgba(59,130,246,0.2))', borderRadius: '1rem', filter: 'blur(4px)', opacity: 0.3 }}></div>
                {/* inner card */}
                <div style={{ position: 'relative', borderLeft: '6px solid #14b8a6', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', padding: 'clamp(1.25rem, 4vw, 3rem)', borderRadius: '0 1rem 1rem 0', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                    <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                            <span className="text-teal-600 text-lg sm:text-xl">👋</span>
                        </div>
                        <h3 className="font-[family-name:var(--font-handwritten)] text-xl sm:text-2xl text-gray-800">Presentation</h3>
                    </div>

                    <div className="space-y-4 sm:space-y-7 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose">
                        <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:text-teal-600 first-letter:mr-2 sm:first-letter:mr-3 first-letter:float-left">
                            Hello there and welcome to my portfolio! I built it from scratch as a way to show what I can do :)
                        </p>
                        <p>
                            I'm a <span className="text-teal-700 font-semibold">Computer Science student</span> passionate about building things for the web. I love creating interfaces that feel intuitive, look great, and actually solve real problems.
                        </p>
                        <p>
                            I am currently completing my degree at Sacred Heart College Inc. I'm actively looking for an internship where I can contribute, learn fast, and grow alongside a strong team.
                        </p>
                        <p>
                            I'm a self-driven learner — always exploring new tools, keeping up with the latest in tech, and working on side projects to sharpen my skills.
                        </p>
                    </div>

                    <div className="mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                        <div className="flex items-center gap-2 text-gray-600 italic text-sm sm:text-base">
                            <span>Ready to dive into my world?</span>
                        </div>
                        <a
                            href="/resume_banderada.pdf"
                            download="Mike_Phaul_CV.pdf"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.6rem 1.25rem',
                                background: '#14b8a6',
                                color: 'white',
                                borderRadius: '0.75rem',
                                fontWeight: 600,
                                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                                boxShadow: '0 4px 14px rgba(20,184,166,0.35)',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                            }}>
                            Download CV (PDF) 📄
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}