import { useState, useRef } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'
    const [submittedMessage, setSubmittedMessage] = useState(null);
    const formRef = useRef();

    const [copied, setCopied] = useState(false);
    const myEmail = 'mikephaulbanderadao5@gmail.com';

    // This function mimics your Python send_email_notif function!
    const sendEmailNotif = (receiver, subject, messageBody) => {
        const SERVICE_ID = 'service_4420flg';
        const TEMPLATE_ID = 'template_5jkhgxi';
        const PUBLIC_KEY = 'dQLnNtM4OyF-5Z-im';

        // These keys map to parameters in your EmailJS template
        const templateParams = {
            to_email: receiver,
            subject: subject,
            message: messageBody,
            from_name: name,
            from_email: email,
        };

        return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        // Using a JavaScript template string exactly like your Python f""" """ string!
        const customMessage = `
Dear Mike,

You have received a new message from a portfolio visitor.

Name: ${name}
Email: ${email}
        
Their Message:
"${message}"
        
Thank You!
This is an auto-generated email from your portfolio website.`;

        sendEmailNotif(
            myEmail,
            `New Portfolio Contact from ${name}`,
            customMessage
        )
            .then((result) => {
                console.log(result.text);
                setSubmittedMessage(message);
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
                setTimeout(() => {
                    setStatus(null);
                    setSubmittedMessage(null);
                }, 8000);
            }, (error) => {
                console.log(error.text);
                setStatus('error');
                setTimeout(() => setStatus(null), 8000);
            })
            .finally(() => {
                setSending(false);
            });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(myEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        { name: 'LinkedIn', icon: <FaLinkedin style={{ fontSize: '1.75rem', color: '#eab308' }} />, url: 'https://www.linkedin.com/in/mikephaul', hoverBorder: '#bfdbfe', hoverBg: 'rgba(239,246,255,0.4)' },
        { name: 'GitHub', icon: <FaGithub style={{ fontSize: '1.75rem', color: '#eab308' }} />, url: 'https://github.com/mikephaul0917', hoverBorder: '#d1d5db', hoverBg: 'rgba(249,250,251,0.6)' },
        { name: 'Email', icon: <FaEnvelope style={{ fontSize: '1.75rem', color: '#eab308' }} />, url: `mailto:${myEmail}`, hoverBorder: '#fecaca', hoverBg: 'rgba(254,242,242,0.4)' },
    ];

    const handleSocialEnter = (e, social) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = social.hoverBorder;
        e.currentTarget.style.background = social.hoverBg;
    };

    const handleSocialLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = '#f6f6f3ff';
        e.currentTarget.style.background = 'rgba(255,255,255,0.65)';
    };

    return (
        <div style={{ padding: 'clamp(1rem, 4vw, 2.5rem) clamp(0.75rem, 3vw, 2rem)' }}>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 className="font-[family-name:var(--font-handwritten)]" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#1f2937', marginBottom: '0.5rem' }}>
                    Get in Touch
                </h2>
                <div style={{ height: '4px', width: '6rem', background: '#eab308', margin: '0 auto', borderRadius: '9999px' }}></div>
            </div>

            <div style={{ maxWidth: '56rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                {/* Socials */}
                <div style={{ textAlign: 'center' }}>
                    <h3 className="font-[family-name:var(--font-sketch)]" style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        Connect with me
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(0.5rem, 2vw, 1.25rem)', marginLeft: '0.25rem', marginRight: '0.25rem', marginBottom: '1.5rem' }}>
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={(e) => handleSocialEnter(e, social)}
                                onMouseLeave={handleSocialLeave}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(0.4rem, 1.5vw, 0.75rem)', padding: 'clamp(0.75rem, 2.5vw, 1.5rem)', background: 'rgba(255,255,255,0.65)', border: '1px solid #f3f4f6', borderRadius: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
                            >
                                {social.icon}
                                <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.875rem)', fontWeight: 700, color: '#4e5137ff' }}>{social.name}</span>
                            </a>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div
                            onClick={copyToClipboard}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.borderColor = '#eab308'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = '#f3f4f6'; }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.6rem 1.2rem',
                                background: 'rgba(255,255,255,0.5)',
                                borderRadius: '2rem',
                                border: '1px solid #f3f4f6',
                                cursor: 'pointer',
                                fontSize: 'clamp(0.65rem, 1.8vw, 0.9rem)',
                                color: '#4b5563',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                            }}
                        >
                            <FaEnvelope style={{ color: '#eab308' }} />
                            <span className="hidden sm:inline">{myEmail}</span>
                            <span className="sm:hidden" style={{ fontSize: '0.7rem' }}>{myEmail.substring(0, 18)}...</span>
                            <span style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: copied ? '#10b981' : '#9ca3af',
                                background: copied ? 'rgba(16,185,129,0.1)' : 'rgba(156,163,175,0.1)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '1rem',
                                transition: 'all 0.2s'
                            }}>
                                {copied ? '✓ Copied!' : '📋 Copy'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div style={{ position: 'relative', marginLeft: '0.25rem' }}>
                    <div style={{ position: 'absolute', inset: '-4px', background: 'linear-gradient(to right, rgba(20,184,166,0.15), rgba(59,130,246,0.15))', borderRadius: '1rem', filter: 'blur(4px)', opacity: 0.4 }}></div>
                    <div style={{ position: 'relative', borderLeft: '6px solid #eab308', background: 'rgba(255,255,255,0.88)', padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderRadius: '0 1rem 1rem 0', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', background: 'rgba(249, 251, 204, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ fontSize: '1.2rem' }}>✉️</span>
                            </div>
                            <h3 className="font-[family-name:var(--font-sketch)]" style={{ fontSize: '1.25rem', color: '#1f2937' }}>Or send me a message</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label htmlFor="name" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onFocus={(e) => { e.target.style.borderColor = '#eab308'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#ebebe5ff'; }}
                                    style={{ width: '100%', padding: 'clamp(0.6rem, 2vw, 1rem) clamp(0.75rem, 2vw, 1.25rem)', background: 'rgba(249,250,251,0.6)', border: '1px solid #e5e7eb', borderRadius: '0.75rem', color: '#374151', fontSize: 'clamp(0.85rem, 2vw, 1rem)', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                    Your Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="address@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={(e) => { e.target.style.borderColor = '#eab308'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#ebebe5ff'; }}
                                    style={{ width: '100%', padding: 'clamp(0.6rem, 2vw, 1rem) clamp(0.75rem, 2vw, 1.25rem)', background: 'rgba(249,250,251,0.6)', border: '1px solid #e5e7eb', borderRadius: '0.75rem', color: '#374151', fontSize: 'clamp(0.85rem, 2vw, 1rem)', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    placeholder="How can I help you? :)"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onFocus={(e) => { e.target.style.borderColor = '#eab308'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#ebebe5ff'; }}
                                    style={{ width: '100%', padding: 'clamp(0.6rem, 2vw, 1rem) clamp(0.75rem, 2vw, 1.25rem)', background: 'rgba(249,250,251,0.6)', border: '1px solid #e5e7eb', borderRadius: '0.75rem', color: '#374151', fontSize: 'clamp(0.85rem, 2vw, 1rem)', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                                />
                            </div>
                            {status === 'success' && (
                                <div style={{ padding: '1rem', background: '#d1fae5', color: '#065f46', borderRadius: '0.75rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                    <p style={{ fontWeight: 700, margin: '0 0 0.75rem 0' }}>Message sent successfully! ✨</p>
                                    <div style={{ background: 'rgba(255,255,255,0.6)', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'left', fontStyle: 'italic', color: '#064e3b', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                                        "{submittedMessage}"
                                    </div>
                                    <p style={{ fontSize: '0.75rem', marginTop: '0.75rem', opacity: 0.8 }}>I'll get back to you as soon as possible.</p>
                                </div>
                            )}
                            {status === 'error' && (
                                <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.75rem', fontSize: '0.9rem', textAlign: 'center' }}>
                                    Failed to send. Please check your EmailJS keys or try again.
                                </div>
                            )}
                            <button
                                onClick={handleSubmit}
                                disabled={sending}
                                onMouseEnter={(e) => { if (!sending) { e.target.style.background = '#eab308'; e.target.style.transform = 'translateY(-2px)'; } }}
                                onMouseLeave={(e) => { if (!sending) { e.target.style.background = '#eab308'; e.target.style.transform = 'translateY(0)'; } }}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: sending ? '#d1d5db' : '#eab308',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    boxShadow: sending ? 'none' : '0 4px 14px rgba(20,184,166,0.35)',
                                    cursor: sending ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.2s, transform 0.2s'
                                }}
                            >
                                {sending ? 'Sending...' : 'Send Message 🚀'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}