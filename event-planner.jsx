import { useState, useEffect, useRef } from "react";

// ─── COLOR TOKENS ────────────────────────────────────────────────
const W = {
  bg: '#E8E0D4', bgDark: '#DDD5C8', burgundy: '#6B3333',
  burgundyLt: '#8C4A4A', ink: '#2E2A27', ash: '#7A6E65',
  border: '#C4B8AC', cream: '#F2EDE6',
};
const E = {
  bg: '#FAFAFA', bgMid: '#F5F5F5', gold: '#CDA84C',
  goldLt: '#E2C275', banner: '#8B6B3A', text: '#1A1A1A',
  muted: '#737373', border: '#E5E5E5',
};
const F = {
  cormorant: "'Cormorant Garamond', Georgia, serif",
  jost: "'Jost', system-ui, sans-serif",
  bebas: "'Bebas Neue', Impact, sans-serif",
  dm: "'DM Sans', system-ui, sans-serif",
};

// ─── HOOKS ──────────────────────────────────────────────────────
function useReveal(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}
const rv = (v, d = 0) => ({
  opacity: v ? 1 : 0,
  transform: v ? 'translateY(0)' : 'translateY(32px)',
  transition: `opacity 0.9s ease ${d}ms, transform 0.9s ease ${d}ms`,
});

// ─── TRANSITION OVERLAY ─────────────────────────────────────────
function Overlay({ active, color }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: color,
      opacity: active ? 1 : 0, pointerEvents: active ? 'all' : 'none',
      transition: 'opacity 0.85s cubic-bezier(0.65, 0, 0.35, 1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: '100vw', height: '1px', background: 'rgba(255,255,255,0.2)',
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.85s cubic-bezier(0.65, 0, 0.35, 1)'
      }} />
    </div>
  );
}

// ─── EFFECTS ───────────────────────────────────────────────────
function FallingPetals({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
      {[...Array(15)].map((_, i) => (
        <div key={i} className="petal" style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${12 + Math.random() * 15}s`,
          animationDelay: `${Math.random() * 10}s`
        }}>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" opacity={0.15 + Math.random() * 0.2}>
            <path d="M7 0C7 0 14 4 14 8C14 12 7 16 7 16C7 16 0 12 0 8C0 4 7 0 7 0Z" fill={W.burgundy} />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ─── NAV ────────────────────────────────────────────────────────
function Nav({ mode, onSwitch }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const isW = mode === 'wedding';
  const bg = isW
    ? (scrolled ? 'rgba(232,224,212,0.94)' : 'rgba(232,224,212,0)')
    : (scrolled ? 'rgba(250,250,250,0.94)' : 'rgba(250,250,250,0)');
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px', height: '72px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', background: bg,
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? `1px solid ${isW ? W.border : E.border}` : '1px solid transparent',
      transition: 'all 0.5s ease',
    }}>
      <div style={{ fontFamily: isW ? F.cormorant : F.bebas, fontSize: isW ? '18px' : '20px', fontWeight: isW ? 300 : 400, color: isW ? W.burgundy : E.gold, letterSpacing: '0.2em' }}>
        MAISON ÉLISE
      </div>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {['SERVICES', 'PORTFOLIO', 'PROCESS'].map(l => (
          <a key={l} href="#" style={{ fontFamily: isW ? F.jost : F.dm, fontSize: '10px', letterSpacing: '0.25em', color: isW ? W.ink : E.text, textDecoration: 'none', opacity: 0.65, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.target.style.opacity = '1'} onMouseLeave={e => e.target.style.opacity = '0.65'}>{l}</a>
        ))}

        {/* Mode switcher — subtle divider + ghost pill */}
        <div style={{ width: '1px', height: '18px', background: isW ? W.border : E.border, opacity: 0.5 }} />
        <button onClick={onSwitch} style={{
          fontFamily: isW ? F.jost : F.dm, fontSize: '9px', letterSpacing: '0.22em',
          color: isW ? W.ash : E.muted, background: 'transparent',
          border: `1px solid ${isW ? W.border : E.border}`, padding: '6px 14px',
          cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '2px',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = isW ? W.burgundy : E.gold; e.currentTarget.style.color = isW ? W.burgundy : E.gold; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = isW ? W.border : E.border; e.currentTarget.style.color = isW ? W.ash : E.muted; }}>
          {isW ? 'EVENTS ⇄' : '⇄ WEDDINGS'}
        </button>

        {/* Primary CTA */}
        <button style={{
          fontFamily: isW ? F.jost : F.dm, fontSize: '10px', letterSpacing: '0.22em',
          color: isW ? W.cream : E.bg, background: isW ? W.burgundy : E.gold,
          border: 'none', padding: '10px 22px', cursor: 'pointer', fontWeight: 500,
          transition: 'background 0.3s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.background = isW ? W.burgundyLt : E.goldLt}
          onMouseLeave={e => e.currentTarget.style.background = isW ? W.burgundy : E.gold}>
          {isW ? 'INQUIRE →' : 'START A PROJECT →'}
        </button>
      </div>
    </nav>
  );
}

// ─── LANDING GATEWAY ────────────────────────────────────────────
function Landing({ onEnter }) {
  const [hov, setHov] = useState(null);
  const panel = (side) => ({
    flex: hov === side ? '0 0 65%' : hov && hov !== side ? '0 0 35%' : '0 0 50%',
    transition: 'flex 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    overflow: 'hidden', position: 'relative', cursor: 'pointer', height: '100vh',
  });
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* WEDDING PANEL */}
      <div style={panel('wedding')} onMouseEnter={() => setHov('wedding')} onMouseLeave={() => setHov(null)} onClick={() => onEnter('wedding')}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://picsum.photos/seed/wedlanding/900/1200)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hov === 'wedding' ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.9s ease',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: hov === 'wedding' ? 'linear-gradient(160deg, rgba(232,224,212,0.78) 0%, rgba(107,51,51,0.28) 100%)' : 'linear-gradient(160deg, rgba(232,224,212,0.88) 0%, rgba(107,51,51,0.38) 100%)', transition: 'background 0.6s ease' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '64px 48px' }}>
          <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.55em', color: W.ash, marginBottom: '40px' }}>EST. 2018</p>
          <h1 style={{ fontFamily: F.cormorant, fontSize: 'clamp(56px, 8vw, 100px)', fontWeight: 300, color: W.ink, letterSpacing: '0.22em', lineHeight: 0.88, textAlign: 'center', margin: 0 }}>WEDDINGS</h1>
          <div style={{ width: '28px', height: '1px', background: W.burgundy, margin: '24px auto' }} />
          <p style={{ fontFamily: F.jost, fontSize: '13px', fontWeight: 300, color: W.ink, textAlign: 'center', maxWidth: '210px', lineHeight: 1.85, opacity: 0.8 }}>Celebrating love<br />with intention</p>
          <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.4em', color: W.burgundy, marginTop: '56px', opacity: hov === 'wedding' ? 1 : 0, transition: 'opacity 0.5s ease 0.1s', textTransform: 'uppercase' }}>ENTER →</p>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ width: '1px', background: 'rgba(196,184,172,0.3)', flexShrink: 0, zIndex: 10, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '26px', height: '26px', border: '1px solid rgba(196,184,172,0.45)', borderRadius: '50%', background: 'rgba(230,220,210,0.15)', backdropFilter: 'blur(6px)' }} />
      </div>

      {/* EVENTS PANEL */}
      <div style={panel('events')} onMouseEnter={() => setHov('events')} onMouseLeave={() => setHov(null)} onClick={() => onEnter('events')}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://picsum.photos/seed/evlanding/900/1200)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hov === 'events' ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.9s ease',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: hov === 'events' ? 'rgba(54,56,48,0.72)' : 'rgba(54,56,48,0.88)', transition: 'background 0.6s ease' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 48px' }}>
          <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.55em', color: E.gold, marginBottom: '40px' }}>EST. 2018</p>
          <h1 style={{ fontFamily: F.bebas, fontSize: 'clamp(56px, 8vw, 100px)', color: E.text, letterSpacing: '0.15em', lineHeight: 0.88, textAlign: 'center', margin: 0 }}>EVENTS</h1>
          <div style={{ width: '28px', height: '1px', background: E.gold, margin: '24px auto' }} />
          <p style={{ fontFamily: F.dm, fontSize: '13px', color: E.muted, textAlign: 'center', maxWidth: '210px', lineHeight: 1.85 }}>Commanding rooms<br />with precision</p>
          <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.4em', color: E.gold, marginTop: '56px', opacity: hov === 'events' ? 1 : 0, transition: 'opacity 0.5s ease 0.1s', textTransform: 'uppercase' }}>ENTER →</p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// WEDDING SECTIONS
// ════════════════════════════════════════════════════════════════

function WeddingHero() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 80); return () => clearTimeout(t); }, []);
  return (
    <section style={{ minHeight: '100vh', background: W.bg, display: 'flex', alignItems: 'stretch', overflow: 'hidden', paddingTop: '72px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 50%', minWidth: '320px', position: 'relative', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-16px)', transition: 'opacity 1.3s ease 0.15s, transform 1.3s ease 0.15s' }}>
        <img src="https://picsum.photos/seed/whero1/800/1100" alt="Wedding" style={{ width: '100%', height: '100%', minHeight: '50vh', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 80%, rgba(232,224,212,0.6) 100%)' }} />
      </div>
      <div style={{ flex: '1 1 50%', minWidth: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8vw 6vw' }} className="hero-title">
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, marginBottom: '56px', opacity: on ? 1 : 0, transition: 'opacity 1.1s ease 0.5s' }}>
          MAISON ÉLISE · WEDDING PLANNING
        </p>
        <blockquote style={{ fontFamily: F.cormorant, fontSize: 'clamp(26px, 3.2vw, 46px)', fontWeight: 300, lineHeight: 1.38, color: W.ink, margin: '0 0 36px', fontStyle: 'italic', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(20px)', transition: 'opacity 1.1s ease 0.7s, transform 1.1s ease 0.7s' }}>
          "The most beautiful days begin with the quietest planning."
        </blockquote>
        <p style={{ fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.4em', color: W.burgundy, opacity: on ? 0.85 : 0, transition: 'opacity 1.1s ease 1.1s' }}>
          — MAISON ÉLISE
        </p>
      </div>
    </section>
  );
}

function WeddingPhilosophy() {
  const [ref, v] = useReveal();
  return (
    <section ref={ref} style={{ background: W.bg, padding: '12vw 8vw' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, marginBottom: '28px', ...rv(v) }}>ABOUT US</p>
          <h2 style={{ fontFamily: F.cormorant, fontSize: 'clamp(30px, 3.2vw, 48px)', fontWeight: 300, color: W.ink, lineHeight: 1.25, marginBottom: '36px', ...rv(v, 100) }}>
            We believe every marriage deserves a day that feels like you.
          </h2>
          <div style={{ borderLeft: `2px solid ${W.burgundy}`, paddingLeft: '28px', marginBottom: '28px', ...rv(v, 200) }}>
            <p style={{ fontFamily: F.jost, fontWeight: 300, fontSize: '15px', lineHeight: 1.95, color: W.ash }}>
              We are not a wedding factory. We take on fewer than eighteen couples per year — by design. Our process is slow, our attention is total, and the results are unlike anyone else's celebration.
            </p>
          </div>
          <p style={{ fontFamily: F.jost, fontWeight: 300, fontSize: '15px', lineHeight: 1.95, color: W.ash, marginBottom: '40px', ...rv(v, 300) }}>
            Founded in New York, we've spent seven years working with families across the country and abroad, building weddings that are rooted in meaning and executed with flawless precision.
          </p>
          <p style={{ fontFamily: F.cormorant, fontStyle: 'italic', fontSize: '24px', fontWeight: 300, color: W.burgundy, ...rv(v, 400) }}>Élise Marchetti</p>
          <p style={{ fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.25em', color: W.ash, marginTop: '4px', ...rv(v, 450) }}>FOUNDER & LEAD PLANNER</p>
        </div>
        <div style={{ position: 'relative', height: '600px', width: '100%', maxWidth: '500px', justifySelf: 'center', ...rv(v, 150) }}>
          <img src="https://picsum.photos/seed/wphil1/500/600" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          {/* SVG 3D Gown Fabric Overlay */}
          <svg style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', pointerEvents: 'none', zIndex: 2 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="fabric-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="5" floodColor="#4E5048" floodOpacity="0.3" />
              </filter>
            </defs>
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" />

            {/* Layer 1: Gentle wave crossing the top left */}
            <path d="M -10,-10 C 30,-5 40,20 20,40 C 0,60 -10,30 -10,-10 Z" fill={W.bg} filter="url(#fabric-shadow)" />

            {/* Layer 2: Deep fold wrapping the right side */}
            <path d="M 110,-10 C 70,10 80,50 90,80 C 100,110 110,90 110,-10 Z" fill={W.bg} filter="url(#fabric-shadow)" />
            <path d="M 110,-10 C 60,30 75,70 100,90 C 110,98 110,50 110,-10 Z" fill={W.cream} filter="url(#fabric-shadow)" opacity="0.9" />

            {/* Layer 3: Sweeping hem over the bottom left */}
            <path d="M -10,110 C 20,70 50,85 70,110 Z" fill={W.bg} filter="url(#fabric-shadow)" />
            <path d="M -10,110 C 10,80 40,95 65,110 Z" fill={W.bgDark} filter="url(#fabric-shadow)" opacity="0.7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

const wServices = [
  {
    en: 'Wedding Day Management', zh: '婚礼当日协调', price: 'From $800',
    desc: 'Designed for couples who have completed their planning and seek professional coordination to ensure the wedding day unfolds seamlessly.',
    items: ['Venue walkthrough & layout confirmation', 'Vendor coordination & timeline creation', 'Ceremony & reception management', 'Emergency kit & backup planning'],
  },
  {
    en: 'Partial Planning', zh: '部分策划服务', price: 'Inquiry',
    desc: 'Ideal for couples who have begun planning and seek professional guidance to refine logistics, coordinate vendors, and ensure a cohesive celebration.',
    items: ['Vendor recommendations and booking', 'Design & styling consultation', 'Budget management assistance', 'Monthly planning sessions'],
  },
  {
    en: 'Full Planning', zh: '全程婚礼策划', price: 'Inquiry',
    desc: 'Designed for couples seeking a fully guided planning experience, from initial concept to the final moment of celebration.',
    items: ['Comprehensive planning & design', 'Curated vendor sourcing and booking', 'Custom mood board creation', 'Full event production management'],
  },
];

function WeddingServices() {
  const [ref, v] = useReveal();
  const [hov, setHov] = useState(null);

  useEffect(() => {
    // Inject custom scrollbar style for mobile horizontal snapping container
    if (document.getElementById('services-snap-style')) return;
    const s = document.createElement('style');
    s.id = 'services-snap-style';
    s.textContent = `
      .w-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
      @media (max-width: 900px) {
        .w-services-grid { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 16px; padding-bottom: 24px; }
        .w-services-grid::-webkit-scrollbar { display: none; }
        .w-services-card { min-width: 85vw; scroll-snap-align: center; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section ref={ref} style={{ background: W.bgDark, padding: '12vw 8vw' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, textAlign: 'center', marginBottom: '16px', ...rv(v) }}>WHAT WE OFFER</p>
        <h2 style={{ fontFamily: F.cormorant, fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, color: W.ink, textAlign: 'center', letterSpacing: '0.12em', marginBottom: '72px', ...rv(v, 100) }}>SERVICES</h2>
        <div className="w-services-grid">
          {wServices.map((s, i) => (
            <div key={i} className="w-services-card"
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{
                background: W.cream, padding: '48px 36px 40px', position: 'relative',
                borderRadius: '8px',
                border: `1px solid ${hov === i ? W.burgundyLt : 'transparent'}`,
                transform: hov === i ? 'translateY(-12px)' : 'translateY(0)',
                boxShadow: hov === i ? '0 32px 64px rgba(46,42,39,0.15)' : '0 12px 32px rgba(46,42,39,0.05)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                ...rv(v, i * 130)
              }}>
              <span style={{ position: 'absolute', top: '20px', right: '24px', fontFamily: F.cormorant, fontSize: '80px', fontWeight: 300, color: hov === i ? W.burgundy : W.border, lineHeight: 1, opacity: hov === i ? 0.15 : 0.25, userSelect: 'none', transition: 'all 0.6s ease' }}>0{i + 1}</span>
              <p style={{ fontFamily: F.cormorant, fontSize: '22px', fontWeight: 400, color: W.burgundy, letterSpacing: '0.02em', marginBottom: '4px', lineHeight: 1.15 }}>{s.en}</p>
              <p style={{ fontFamily: F.jost, fontSize: '11px', color: W.ash, marginBottom: '24px', letterSpacing: '0.03em' }}>{s.zh}</p>
              <p style={{ fontFamily: F.jost, fontWeight: 300, fontSize: '14px', lineHeight: 1.85, color: W.ash, marginBottom: '28px' }}>{s.desc}</p>
              <div style={{ borderTop: `1px solid ${W.border}`, paddingTop: '20px' }}>
                {s.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', gap: '12px', padding: '7px 0', borderBottom: `1px solid ${W.border}` }}>
                    <span style={{ color: W.burgundy, flexShrink: 0, fontFamily: F.cormorant, fontSize: '16px' }}>—</span>
                    <p style={{ fontFamily: F.jost, fontSize: '13px', fontWeight: 300, color: W.ink, lineHeight: 1.6, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: F.cormorant, fontSize: '17px', color: W.burgundy, marginTop: '24px', fontStyle: 'italic' }}>{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeddingAvailability() {
  const [ref, v] = useReveal();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden', padding: '12vw 8vw', background: W.bg }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://picsum.photos/seed/wavail/1200/600)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, transform: `translateY(${(scrollY - 1500) * 0.2}px)` }} />
      <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', zIndex: 1 }}>
        <div style={{ borderLeft: `2px solid ${W.burgundy}`, paddingLeft: '36px', flex: '1 1 400px', ...rv(v) }}>
          <h3 style={{ fontFamily: F.cormorant, fontSize: '12px', fontWeight: 400, letterSpacing: '0.4em', color: W.burgundy, marginBottom: '28px', textTransform: 'uppercase' }}>AVAILABILITY</h3>
          <p style={{ fontFamily: F.jost, fontSize: '14px', lineHeight: 1.95, color: W.ink, marginBottom: '10px' }}>
            <strong style={{ fontFamily: F.cormorant, fontSize: '28px', fontWeight: 600, color: W.burgundy, textShadow: '0 4px 12px rgba(107,51,51,0.2)', marginRight: '8px', verticalAlign: 'middle' }}>2026: </strong>
            Currently accepting Wedding Day Management Inquiries, with limited Partial Planning engagements.
          </p>
          <p style={{ fontFamily: F.jost, fontSize: '14px', lineHeight: 1.95, color: W.ink }}>
            <strong style={{ fontWeight: 500 }}>2027: </strong>Full Planning inquiries are now open.
          </p>
        </div>
        <div style={{ paddingTop: '48px', ...rv(v, 200) }}>
          <a href="#" style={{ fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.25em', color: W.burgundy, textDecoration: 'none', borderBottom: `1px solid ${W.burgundy}`, paddingBottom: '4px', fontWeight: 400, whiteSpace: 'nowrap', transition: 'all 0.3s ease' }}
            onMouseEnter={e => e.target.style.opacity = 0.6} onMouseLeave={e => e.target.style.opacity = 1}>
            INQUIRE ABOUT YOUR DATE
          </a>
        </div>
      </div>
    </section>
  );
}

function MasterGallery({ active, onClose }) {
  if (!active) return null;
  const images = Array.from({ length: 24 }).map((_, i) => `https://picsum.photos/seed/mg${i}/600/800`);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: W.bgDark, overflowY: 'auto', padding: '120px 5vw' }}>
      <button onClick={onClose} style={{ position: 'fixed', top: '40px', right: '5vw', background: 'none', border: 'none', fontFamily: F.jost, fontSize: '14px', letterSpacing: '0.2em', color: W.burgundy, cursor: 'pointer', zIndex: 10001 }}>CLOSE ✕</button>
      <div style={{ columns: '1', '@media (minWidth: 768px)': { columns: '3' }, columnGap: '16px' }}>
        {images.map((img, i) => (
          <img key={i} src={img} alt="" style={{ width: '100%', marginBottom: '16px', borderRadius: '4px', display: 'block' }} />
        ))}
      </div>
    </div>
  );
}

function WeddingPortfolio() {
  const [ref, v] = useReveal();
  const [isMobile, setIsMobile] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const seeds = [['wg1', 500, 660], ['wg2', 500, 420], ['wg3', 500, 520], ['wg4', 500, 420], ['wg5', 500, 620], ['wg6', 500, 480], ['wg7', 500, 500], ['wg8', 500, 600], ['wg9', 500, 400]];

  // Apple Watch style momentum panning variables
  const panRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ isDown: false, startX: 0, startY: 0, curX: 0, curY: 0, vx: 0, vy: 0, lastTime: 0 });

  const startDrag = (e) => {
    if (!isMobile) return;
    const t = e.touches ? e.touches[0] : e;
    dragRef.current = { isDown: true, startX: t.clientX - pan.x, startY: t.clientY - pan.y, curX: t.clientX, curY: t.clientY, vx: 0, vy: 0, lastTime: Date.now() };
  };
  const moveDrag = (e) => {
    if (!dragRef.current.isDown || !isMobile) return;
    const t = e.touches ? e.touches[0] : e;
    const now = Date.now(); const dt = now - dragRef.current.lastTime || 1;
    const nx = t.clientX - dragRef.current.startX;
    const ny = t.clientY - dragRef.current.startY;
    dragRef.current.vx = (t.clientX - dragRef.current.curX) / dt;
    dragRef.current.vy = (t.clientY - dragRef.current.curY) / dt;
    dragRef.current.curX = t.clientX; dragRef.current.curY = t.clientY;
    dragRef.current.lastTime = now;
    // clamping
    setPan({ x: Math.max(-800, Math.min(800, nx)), y: Math.max(-800, Math.min(800, ny)) });
  };
  const endDrag = () => {
    if (!isMobile) return;
    dragRef.current.isDown = false;
    // momentum
    let ox = pan.x, oy = pan.y, vx = dragRef.current.vx * 15, vy = dragRef.current.vy * 15;
    const step = () => {
      vx *= 0.92; vy *= 0.92;
      ox += vx; oy += vy;
      ox = Math.max(-800, Math.min(800, ox)); oy = Math.max(-800, Math.min(800, oy));
      setPan({ x: ox, y: oy });
      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) requestAnimationFrame(step);
    };
    if (Math.abs(vx) > 1 || Math.abs(vy) > 1) requestAnimationFrame(step);
  };

  return (
    <section ref={ref} style={{ background: W.bgDark, padding: '12vw 0', overflow: 'hidden' }}>
      <MasterGallery active={galleryOpen} onClose={() => setGalleryOpen(false)} />
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 8vw', textAlign: 'center' }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, marginBottom: '16px', ...rv(v) }}>OUR WORK</p>
        <h2 style={{ fontFamily: F.cormorant, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 300, color: W.ink, lineHeight: 1.2, marginBottom: '24px', ...rv(v, 100) }}>
          Moments We've Had the<br />Honor of Holding
        </h2>
        <button onClick={() => setGalleryOpen(true)} style={{ fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.15em', color: W.burgundy, background: 'none', border: `1px solid ${W.burgundy}`, padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', marginBottom: '64px', transition: 'all 0.3s ease', ...rv(v, 150) }}
          onMouseEnter={e => { e.target.style.background = W.burgundy; e.target.style.color = W.cream; }}
          onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = W.burgundy; }}>
          SEE ALL WORK →
        </button>
      </div>

      {!isMobile ? (
        <div style={{ columns: 3, columnGap: '8px', maxWidth: '1160px', margin: '0 auto', padding: '0 8vw', ...rv(v, 200) }}>
          {seeds.map(([seed, w, h], i) => (
            <div key={i} style={{ marginBottom: '8px', breakInside: 'avoid', overflow: 'hidden', borderRadius: '4px' }}>
              <img src={`https://picsum.photos/seed/${seed}/${w}/${h}`} alt="" style={{ width: '100%', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={panRef}
          onTouchStart={startDrag} onTouchMove={moveDrag} onTouchEnd={endDrag}
          style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden', touchAction: 'none' }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px))` }}>
            {/* 3x3 Grid centered */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 200px)', gridTemplateRows: 'repeat(3, 200px)', gap: '12px' }}>
              {seeds.map(([seed], i) => {
                // Approximate distancing calc for visual scale
                const col = i % 3; const row = Math.floor(i / 3);
                const cx = (col - 1) * 212 + pan.x;
                const cy = (row - 1) * 212 + pan.y;
                const dist = Math.sqrt(cx * cx + cy * cy);
                const scale = Math.max(0.4, 1.2 - (dist / 400));
                const opacity = Math.max(0.2, 1 - (dist / 600));

                return (
                  <div key={i} style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', transform: `scale(${scale})`, opacity: opacity, transition: dragRef.current?.isDown ? 'none' : 'transform 0.1s linear, opacity 0.1s linear', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    <img src={`https://picsum.photos/seed/${seed}/400/400`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const wProcessFull = [
  { n: '01', title: 'Consultation', desc: 'The lady of the couple has a delicate flower in her hair.', svgState: 0 },
  { n: '02', title: 'Vision & Design', desc: 'That flower morphs onto a presentation board.', svgState: 1 },
  { n: '03', title: 'Vendor Curation', desc: 'The flower is placed alongside fabric swatches and vendor samples.', svgState: 2 },
  { n: '04', title: 'Planning & Logistics', desc: 'The flower sits in a vase by a window. A textured animation of the sun and moon cycling rapidly illustrates time passing.', svgState: 3 },
  { n: '05', title: 'Your Wedding Day', desc: 'The flower turns into a full bouquet that gets thrown to the right, looped infinitely.', svgState: 4 },
];

function FlowerSVGPath({ state }) {
  // Cinematic SVGs for each state based on the story.
  return (
    <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%', maxWidth: '400px', margin: '0 auto', display: 'block', overflow: 'visible' }}>
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <clipPath id="windowClip">
          <rect x="150" y="50" width="100" height="150" rx="4" />
        </clipPath>
      </defs>

      {/* STATE 0: Consultation (Flower in Hair) */}
      <g style={{ opacity: state === 0 ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <path d="M 200,200 C 180,180 170,220 200,240 C 230,220 220,180 200,200 Z" fill={W.burgundy} filter="url(#glow)" />
        <path d="M 180,210 C 140,240 260,240 220,210 Z" fill="none" stroke={W.border} strokeWidth="1" opacity="0.4" />
        <circle cx="200" cy="210" r="4" fill={W.cream} />
      </g>

      {/* STATE 1: Vision (Presentation Board) */}
      <g style={{ opacity: state === 1 ? 1 : 0, transition: 'opacity 0.6s ease', transform: state === 1 ? 'scale(1)' : 'scale(0.9)', transformOrigin: 'center' }}>
        <rect x="100" y="100" width="200" height="200" fill={W.bgDark} stroke={W.border} />
        <line x1="120" y1="140" x2="160" y2="140" stroke={W.ash} />
        <line x1="120" y1="160" x2="280" y2="160" stroke={W.ash} />
        <path d="M 230,200 C 210,180 200,220 230,240 C 260,220 250,180 230,200 Z" fill={W.burgundy} filter="url(#glow)" />
      </g>

      {/* STATE 2: Curation (Fabric Swatches) */}
      <g style={{ opacity: state === 2 ? 1 : 0, transition: 'opacity 0.6s ease', transformOrigin: 'center' }}>
        <rect x="120" y="180" width="60" height="100" fill={W.cream} stroke={W.border} />
        <rect x="150" y="160" width="60" height="100" fill={W.ash} opacity="0.3" transform="rotate(15 150 160)" />
        <path d="M 220,190 C 200,170 190,210 220,230 C 250,210 240,170 220,190 Z" fill={W.burgundy} filter="url(#glow)" />
        <path d="M 100,220 Q 200,300 300,220" fill="none" stroke={W.burgundyLt} strokeWidth="2" strokeDasharray="4 4" />
      </g>

      {/* STATE 3: Planning (Vase by Window & Timelapse) */}
      <g style={{ opacity: state === 3 ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <rect x="150" y="50" width="100" height="150" fill={W.bgDark} stroke={W.border} rx="4" />
        <g clipPath="url(#windowClip)">
          <circle cx="200" cy="125" r="30" fill={W.cream} opacity="0.8">
            <animateTransform attributeName="transform" type="translate" values="-100,0; 100,0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="125" r="24" fill={W.ash} opacity="0.4">
            <animateTransform attributeName="transform" type="translate" values="100,0; -100,0" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>
        </g>
        <path d="M 180,300 Q 200,240 220,300 Z" fill={W.cream} stroke={W.border} />
        <path d="M 200,300 L 200,220" fill="none" stroke={W.ash} strokeWidth="2" />
        <path d="M 200,200 C 180,180 170,220 200,240 C 230,220 220,180 200,200 Z" fill={W.burgundy} filter="url(#glow)" />
      </g>

      {/* STATE 4: Wedding Day (Looping Toss) */}
      <g style={{ opacity: state === 4 ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <g>
          {/* Toss Animation */}
          <animateTransform attributeName="transform" type="translate" values="0,80; 160,-120; 320,100" keyTimes="0; 0.5; 1" dur="2.5s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" values="0 100 200; 360 100 200" dur="2.5s" repeatCount="indefinite" additive="sum" />
          <path d="M 100,200 C 80,180 70,220 100,240 C 130,220 120,180 100,200 Z" fill={W.burgundy} filter="url(#glow)" />
          <path d="M 110,210 C 90,190 80,230 110,250 C 140,230 130,190 110,210 Z" fill={W.cream} opacity="0.8" />
          <path d="M 90,190 C 70,170 60,210 90,230 C 120,210 110,170 90,190 Z" fill={W.burgundyLt} />
          <path d="M 100,240 L 90,280 M 110,235 L 120,270" stroke={W.ash} strokeWidth="2" fill="none" />
          <path d="M 100,250 Q 120,300 80,320" fill="none" stroke={W.cream} strokeWidth="3" />
        </g>
      </g>

    </svg>
  );
}

function WeddingProcess() {
  const [ref, v] = useReveal();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={ref} style={{ background: W.bg, padding: '12vw 8vw' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '64px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, marginBottom: '20px', ...rv(v) }}>HOW WE WORK</p>
          <h2 style={{ fontFamily: F.cormorant, fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 300, color: W.ink, ...rv(v, 100) }}>The Evolution of a Celebration</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>

          {/* Sticky Interactive Visualization */}
          <div style={{ position: 'sticky', top: '25vh', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', ...rv(v, 200) }}>
            <FlowerSVGPath state={activeStep} />
          </div>

          {/* Stepper Content */}
          <div style={{ position: 'relative', paddingLeft: '40px', borderLeft: `1px solid ${W.border}`, ...rv(v, 300) }}>
            {wProcessFull.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  marginBottom: i < wProcessFull.length - 1 ? '56px' : 0,
                  position: 'relative',
                  cursor: 'pointer',
                  opacity: activeStep === i ? 1 : 0.45,
                  transform: activeStep === i ? 'translateX(12px)' : 'none',
                  transition: 'all 0.4s ease'
                }}>
                <div style={{ position: 'absolute', left: '-49px', top: '4px', width: '18px', height: '18px', borderRadius: '50%', border: `1px solid ${activeStep === i ? W.burgundy : W.border}`, background: W.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.4s ease' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeStep === i ? W.burgundy : 'transparent', transition: 'background 0.4s ease' }} />
                </div>
                <p style={{ fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.4em', color: W.burgundy, marginBottom: '10px' }}>{step.n}</p>
                <p style={{ fontFamily: F.cormorant, fontSize: '28px', fontWeight: 400, color: W.ink, marginBottom: '12px', letterSpacing: '0.02em' }}>{step.title}</p>
                <div style={{ overflow: 'hidden', height: activeStep === i ? 'auto' : '0px', transition: 'height 0.4s ease' }}>
                  <p style={{ fontFamily: F.jost, fontWeight: 300, fontSize: '15px', lineHeight: 1.85, color: W.ash, paddingBottom: activeStep === i ? '8px' : '0' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const wTestimonials = [
  { quote: "Working with Maison Élise was the best decision we made after saying yes to each other. They saw our wedding before we could — and then made it real.", name: "AMELIA & JAMES THORNTON", detail: "Hudson Valley, October 2023" },
  { quote: "Every single thing we asked for appeared. Every worry we carried disappeared. On our wedding day, all we had to do was love each other.", name: "SOPHIA & DANIEL KIM", detail: "Amalfi Coast, June 2024" },
  { quote: "Élise doesn't just plan weddings. She understands what you're actually trying to say. Ours felt more like us than we could have imagined.", name: "CLAIRE & MARCUS WEBB", detail: "The Catskills, September 2023" },
];

function WeddingTestimonials() {
  const [ref, v] = useReveal();
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const go = (i) => { setFade(false); setTimeout(() => { setIdx(i); setFade(true); }, 350); };
  useEffect(() => { const t = setInterval(() => go((idx + 1) % wTestimonials.length), 8000); return () => clearInterval(t); }, [idx]);

  // Custom Chinese Stamp Logic (generate pseudo stamp from initials)
  const getInitials = (name) => {
    const parts = name.split(' & ');
    if (parts.length > 1) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const t = wTestimonials[idx];
  return (
    <section ref={ref} style={{ background: W.bgDark, padding: '12vw 8vw' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', ...rv(v) }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, marginBottom: '72px' }}>KIND WORDS</p>
        <div style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease', position: 'relative' }}>

          {/* Chinese Culture Red Name Stamp Motif */}
          <div style={{
            position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
            width: '44px', height: '44px', border: `2px solid ${W.burgundy}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: W.burgundy, fontFamily: F.cormorant, fontSize: '18px', letterSpacing: '2px', paddingLeft: '2px',
            opacity: 0.15, zIndex: 0
          }}>
            {getInitials(t.name)}
          </div>

          <p style={{ position: 'relative', zIndex: 1, fontFamily: F.cormorant, fontSize: 'clamp(22px, 3.2vw, 38px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, color: W.ink, marginBottom: '56px' }}>
            {t.quote}
          </p>

          <p style={{ position: 'relative', zIndex: 1, fontFamily: F.jost, fontSize: '11px', letterSpacing: '0.3em', color: W.burgundy, marginBottom: '10px', textTransform: 'uppercase' }}>{t.name}</p>
          <p style={{ position: 'relative', zIndex: 1, fontFamily: F.jost, fontSize: '13px', fontWeight: 300, color: W.ash }}>{t.detail}</p>
        </div>

        {/* Carousel Indicators */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '64px' }}>
          {wTestimonials.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 2px' }}>
              <div style={{ width: i === idx ? '32px' : '8px', height: '2px', background: i === idx ? W.burgundy : W.border, transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeddingContact() {
  const [ref, v] = useReveal();
  const [hovBtn, setHovBtn] = useState(false);
  const fieldStyle = { width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${W.border}`, color: W.cream, fontFamily: F.jost, fontSize: '13px', fontWeight: 300, padding: '14px 0', outline: 'none', boxSizing: 'border-box', letterSpacing: '0.04em' };
  return (
    <section ref={ref} style={{ background: W.ink, padding: '120px 80px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.border, marginBottom: '28px', ...rv(v) }}>GET IN TOUCH</p>
        <h2 style={{ fontFamily: F.cormorant, fontSize: 'clamp(28px, 3.2vw, 46px)', fontWeight: 300, fontStyle: 'italic', color: W.cream, marginBottom: '64px', lineHeight: 1.25, ...rv(v, 100) }}>
          "Every great wedding begins with a single conversation."
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 36px', ...rv(v, 200) }}>
          <input placeholder="FIRST NAME" style={fieldStyle} />
          <input placeholder="LAST NAME" style={fieldStyle} />
          <input placeholder="EMAIL ADDRESS" style={{ ...fieldStyle, gridColumn: '1 / -1' }} />
          <input placeholder="WEDDING DATE — approximate is fine" style={{ ...fieldStyle, gridColumn: '1 / -1' }} />
          <textarea placeholder="TELL US ABOUT YOUR VISION" rows={4} style={{ ...fieldStyle, gridColumn: '1 / -1', resize: 'none' }} />
        </div>
        <button
          onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
          style={{ marginTop: '40px', width: '100%', padding: '18px', background: hovBtn ? W.burgundy : 'transparent', border: `1px solid ${W.border}`, color: W.cream, fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.3em', cursor: 'pointer', transition: 'all 0.3s ease', ...rv(v, 300) }}>
          BEGIN YOUR STORY →
        </button>
        <p style={{ fontFamily: F.jost, fontWeight: 300, fontSize: '12px', fontStyle: 'italic', color: W.ash, textAlign: 'center', marginTop: '18px', ...rv(v, 380) }}>We respond to every inquiry within 48 hours.</p>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// EVENTS SECTIONS
// ════════════════════════════════════════════════════════════════

function EventsHero() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 80); return () => clearTimeout(t); }, []);
  // Staggered word/letter reveal setup
  const text1 = "WE PRODUCE";
  const text2 = "EVENTS THAT";
  const text3 = "PEOPLE TALK ABOUT.";

  const LetterReveal = ({ text, delayOffset = 0 }) => (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      {text.split('').map((char, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity: on ? 1 : 0,
          transform: on ? 'translateY(0)' : 'translateY(100%)',
          transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delayOffset + (i * 0.03)}s, opacity 0.8s ease ${delayOffset + (i * 0.03)}s`,
          whiteSpace: char === ' ' ? 'pre' : 'normal'
        }}>
          {char}
        </span>
      ))}
    </span>
  );

  return (
    <section style={{ minHeight: '100vh', background: E.bg, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '72px' }}>
      {/* High-end architectural light-mode background image */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://picsum.photos/seed/evlight8/1600/1000)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, filter: 'grayscale(100%) contrast(120%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(250,250,250,0.9), rgba(250,250,250,0.4))' }} />

      <div style={{ position: 'relative', padding: '8vw', maxWidth: '1400px', width: '100%' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '60px', opacity: on ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
          <div style={{ width: '36px', height: '1px', background: E.goldLt }} />
          <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.45em', color: E.gold, fontWeight: 500 }}>CORPORATE · GALAS · LAUNCHES · SUMMITS</p>
        </div>

        <h1 style={{ fontFamily: F.bebas, fontSize: 'clamp(64px, 11vw, 160px)', color: E.text, lineHeight: 0.85, letterSpacing: '0.01em', margin: 0 }}>
          <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
            <LetterReveal text={text1} delayOffset={0.4} />
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '10px' }}>
            <LetterReveal text={text2} delayOffset={0.7} />
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '10px', color: E.gold }}>
            <LetterReveal text={text3} delayOffset={1.0} />
          </div>
        </h1>

        <div style={{ marginTop: '12vh', display: 'flex', gap: '14px', alignItems: 'flex-start', opacity: on ? 1 : 0, transition: 'opacity 1s ease 1.8s' }}>
          <div style={{ width: '1px', height: '64px', background: E.gold, opacity: 0.3 }} />
          <p style={{ fontFamily: F.dm, fontSize: '8px', letterSpacing: '0.45em', color: E.muted, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>SCROLL</p>
        </div>
      </div>
    </section>
  );
}

const caps = [
  { n: '01', title: 'Special & Private Events', desc: 'Refined gatherings produced with careful attention to atmosphere, entertainment, and guest experience.', items: ['Birthday celebrations', 'Corporate celebrations', 'Private receptions & milestone events', 'Curated entertainment programming'] },
  { n: '02', title: 'Cultural, Music Festival & Stage Productions', desc: 'Live performance production and cultural programming developed in collaboration with artists, agents, and production teams.', items: ['Festival production planning & curation', 'Stage management & coordination', 'Artist booking and talent relations', 'Live performance scheduling'] },
  { n: '03', title: 'Corporate Conferences', desc: 'Multi-day strategic events from 50 to 5,000 attendees. AV, logistics, speaker management.', items: ['Full AV production management', 'Speaker & agenda coordination', 'Multi-day logistics planning', 'Breakout & session management'] },
  { n: '04', title: 'Product Launches', desc: 'The moment your brand makes its next statement. Experiential activations that are unforgettable.', items: ['Brand activation strategy', 'Experiential venue design', 'Press & media coordination', 'Launch moment production'] },
  { n: '05', title: 'Annual Galas & Fundraisers', desc: 'Black-tie excellence. Table design to paddle raise, managed with precision and care.', items: ['Gala design & full theming', 'Auction & fundraiser management', 'Table curation & seating', 'Entertainment & flow management'] },
  { n: '06', title: 'Executive Retreats', desc: 'Intimate, high-stakes off-site gatherings that sharpen teams and honor relationships.', items: ['Venue sourcing & negotiation', 'Program & agenda design', 'Travel & accommodation logistics', 'Facilitation support'] },
];

function EventsCapabilities() {
  const [ref, v] = useReveal();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, index });
  };

  return (
    <section ref={ref} style={{ background: E.bgMid, padding: '12vw 8vw' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.5em', color: E.gold, marginBottom: '24px', ...rv(v) }}>WHAT WE DO</p>
            <h2 style={{ fontFamily: F.bebas, fontSize: 'clamp(48px, 6vw, 84px)', color: '#111', letterSpacing: '0.02em', lineHeight: 0.9, ...rv(v, 100) }}>CAPABILITIES</h2>
          </div>
          <p style={{ fontFamily: F.dm, fontSize: '15px', color: E.muted, maxWidth: '400px', lineHeight: 1.8, ...rv(v, 200) }}>
            We engineer environments. From private enclaves to large-scale productions, our methodology ensures flawless execution and striking aesthetics.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1px', background: 'rgba(0,0,0,0.06)' }}>
          {caps.map((c, i) => (
            <div key={i}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => setMousePos({ ...mousePos, index: -1 })}
              style={{
                background: E.bg, padding: '48px 40px', position: 'relative', overflow: 'hidden', ...rv(v, i * 80)
              }}>

              {/* Radial Cursor Spotlight */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
                background: `radial-gradient(circle 350px at ${mousePos.index === i ? mousePos.x : -500}px ${mousePos.index === i ? mousePos.y : -500}px, rgba(205,168,76,0.04), transparent 80%)`,
                transition: mousePos.index === i ? 'none' : 'background 0.3s ease',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: F.bebas, fontSize: '64px', color: E.gold, opacity: mousePos.index === i ? 0.8 : 0.3, lineHeight: 1, marginBottom: '24px', transition: 'opacity 0.4s ease' }}>{c.n}</p>
                <div style={{ width: mousePos.index === i ? '40px' : '20px', height: '1px', background: E.gold, marginBottom: '32px', transition: 'width 0.4s ease' }} />
                <p style={{ fontFamily: F.dm, fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '16px', lineHeight: 1.3 }}>{c.title}</p>
                <p style={{ fontFamily: F.dm, fontSize: '14px', color: E.muted, lineHeight: 1.8, marginBottom: '32px' }}>{c.desc}</p>
                <div style={{ opacity: mousePos.index === i ? 1 : 0.6, transition: 'opacity 0.4s ease' }}>
                  {c.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: '12px', padding: '6px 0' }}>
                      <span style={{ color: E.goldLt, flexShrink: 0, fontFamily: F.dm, fontSize: '14px' }}>—</span>
                      <p style={{ fontFamily: F.dm, fontSize: '13px', color: E.muted, lineHeight: 1.7, margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerBanner() {
  return (
    <div style={{ background: E.banner, padding: '56px 80px', textAlign: 'center' }}>
      <p style={{ fontFamily: F.dm, fontSize: '16px', color: E.text, lineHeight: 1.8, fontWeight: 300, maxWidth: '600px', margin: '0 auto' }}>
        Artist relations and booking are developed through{' '}
        <a href="#" style={{ color: E.goldLt, textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: 500 }}>Jia Creative</a>.
      </p>
    </div>
  );
}

const ePortfolio = [
  { org: 'Goldman Sachs Annual Summit', city: 'New York City · 2024', stats: '500 Attendees · 3-Day Event · Rooftop Gala', quote: '"The most organized event we have ever hosted."', attr: '— Chief of Staff, GS', seed: 'ep1' },
  { org: 'Lincoln Center Spring Gala', city: 'New York City · 2023', stats: '800 Guests · Black-Tie · Fundraiser', quote: '"Flawless from first course to final bow."', attr: '— Executive Director', seed: 'ep2' },
  { org: 'Estée Lauder Brand Activation', city: 'Paris, France · 2024', stats: 'Multi-City · 3 Markets · Press Event', quote: '"They translated our brand into an experience."', attr: '— Global VP Marketing', seed: 'ep3' },
  { org: 'Tech Leadership Retreat', city: 'Napa Valley · 2023', stats: '60 Executives · 4-Day Program', quote: '"Not one missed detail. Exactly what we needed."', attr: '— Chief People Officer', seed: 'ep4' },
];

function EventsPortfolio() {
  const [ref, v] = useReveal();
  const [hov, setHov] = useState(null);
  return (
    <section ref={ref} style={{ background: E.bg, padding: '12vw 8vw' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.5em', color: E.gold, marginBottom: '16px', textAlign: 'center', ...rv(v) }}>OUR WORK</p>
        <h2 style={{ fontFamily: F.bebas, fontSize: 'clamp(44px, 6.5vw, 96px)', color: '#111', letterSpacing: '0.02em', marginBottom: '80px', textAlign: 'center', ...rv(v, 100) }}>SELECTED PROJECTS</h2>

        {/* Asymmetrical Masonry/Editorial Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2vw' }}>
          {ePortfolio.map((p, i) => {
            // Compute asymmetrical grid placements
            const isLarge = i % 3 === 0;
            const gc = isLarge ? 'span 7' : 'span 5';
            const hr = isLarge ? '750px' : '550px';
            const mt = (i % 2 !== 0 && !isLarge) ? '80px' : '0px';

            return (
              <div key={i}
                onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                style={{
                  gridColumn: gc, height: hr, marginTop: mt,
                  position: 'relative', overflow: 'hidden', cursor: 'pointer', ...rv(v, i * 150)
                }}>

                {/* Image scales up slightly on hover */}
                <img src={`https://picsum.photos/seed/${p.seed}/1000/1200`} alt="" style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  transform: hov === i ? 'scale(1.06)' : 'scale(1)', transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }} />

                {/* Cinematic Glassmorphism Reveal Panel */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '40px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
                  borderTop: '1px solid rgba(255,255,255,0.4)',
                  transform: hov === i ? 'translateY(0)' : 'translateY(100%)',
                  opacity: hov === i ? 1 : 0,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  <p style={{ fontFamily: F.bebas, fontSize: '28px', letterSpacing: '0.04em', color: '#111', marginBottom: '8px' }}>{p.org}</p>
                  <p style={{ fontFamily: F.dm, fontSize: '11px', letterSpacing: '0.2em', color: E.gold, marginBottom: '20px' }}>{p.city}</p>
                  <div style={{ width: '40px', height: '1px', background: E.gold, marginBottom: '20px', opacity: 0.3 }} />
                  <p style={{ fontFamily: F.dm, fontSize: '13px', color: E.muted, marginBottom: '24px', letterSpacing: '0.05em' }}>{p.stats}</p>
                  <p style={{ fontFamily: F.dm, fontSize: '15px', color: '#111', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '12px' }}>{p.quote}</p>
                  <p style={{ fontFamily: F.dm, fontSize: '11px', color: E.goldLt, letterSpacing: '0.05em' }}>{p.attr}</p>
                </div>

                {/* Always visible label acting as anchor before hover */}
                <div style={{
                  position: 'absolute', bottom: '32px', left: '32px',
                  background: 'rgba(255,255,255,0.95)', padding: '12px 24px', borderRadius: '2px',
                  opacity: hov === i ? 0 : 1, transition: 'opacity 0.4s ease', pointerEvents: 'none'
                }}>
                  <p style={{ fontFamily: F.bebas, fontSize: '18px', color: '#111', margin: 0 }}>{p.org}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const eProcess = [
  { n: '01', title: 'DISCOVER', desc: 'Brief intake & alignment' },
  { n: '02', title: 'STRATEGY', desc: 'Venue & budget planning' },
  { n: '03', title: 'DESIGN', desc: 'Creative concept & theme' },
  { n: '04', title: 'PRODUCTION', desc: 'Vendor & logistics mgmt' },
  { n: '05', title: 'EXECUTION', desc: 'On-site command & control' },
  { n: '06', title: 'DEBRIEF', desc: 'Post-event reporting' },
];

function EventsProcess() {
  const [ref, v] = useReveal();

  return (
    <section ref={ref} style={{ background: E.bgMid, padding: '12vw 8vw', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '12vh' }}>
          <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.5em', color: E.gold, marginBottom: '20px', ...rv(v) }}>HOW WE WORK</p>
          <h2 style={{ fontFamily: F.bebas, fontSize: 'clamp(48px, 6vw, 84px)', color: '#111', letterSpacing: '0.02em', lineHeight: 0.9, ...rv(v, 100) }}>THE NARRATIVE</h2>
        </div>

        <div style={{ position: 'relative', paddingBottom: '10vh' }}>
          {eProcess.map((step, i) => {
            // Calculate dynamic sticky 3D offset based on scroll position
            // This is a simplified estimation for the sticky-scroll 3D stacking effect
            const topOffset = 180 + (i * 40);
            return (
              <div key={i} style={{
                position: 'sticky',
                top: `${topOffset}px`,
                marginBottom: '100px',
                background: E.bg,
                border: `1px solid ${E.border}`,
                boxShadow: '0 -20px 60px rgba(0,0,0,0.04)',
                padding: '60px 80px',
                display: 'flex', gap: '60px', alignItems: 'center',
                transformOrigin: 'top center',
                // A true parallax scaling based on element top vs scrollY would be complex here, 
                // so we rely on sticky positioning and native browser stacking combined with a subtle scale down for lower layers.
                transform: `scale(${1 - (eProcess.length - 1 - i) * 0.02})`,
                zIndex: i,
                ...rv(v, i * 150)
              }}>
                <div style={{ width: '120px', flexShrink: 0 }}>
                  <p style={{ fontFamily: F.bebas, fontSize: '80px', color: E.goldLt, lineHeight: 0.8, margin: 0 }}>{step.n}</p>
                </div>
                <div style={{ width: '1px', height: '100px', background: E.gold, opacity: 0.2 }} />
                <div>
                  <p style={{ fontFamily: F.bebas, fontSize: '32px', color: '#111', letterSpacing: '0.04em', marginBottom: '16px' }}>{step.title}</p>
                  <p style={{ fontFamily: F.dm, fontSize: '15px', color: E.muted, lineHeight: 1.8 }}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EventsContact() {
  const [ref, v] = useReveal();
  const [budget, setBudget] = useState('');
  const [hovBtn, setHovBtn] = useState(false);
  const fstyle = (gc) => ({
    gridColumn: gc || 'auto', width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${E.border}`, color: E.text, fontFamily: F.dm, fontSize: '13px',
    padding: '13px 0', outline: 'none', boxSizing: 'border-box', letterSpacing: '0.04em',
  });
  const focus = e => { e.target.style.borderBottomColor = E.gold; };
  const blur = e => { e.target.style.borderBottomColor = E.border; };
  return (
    <section ref={ref} style={{ background: E.bg, padding: '120px 80px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.5em', color: E.gold, marginBottom: '28px', ...rv(v) }}>START A PROJECT</p>
        <h2 style={{ fontFamily: F.bebas, fontSize: 'clamp(36px, 5.5vw, 68px)', color: E.text, letterSpacing: '0.04em', marginBottom: '18px', lineHeight: 0.95, ...rv(v, 100) }}>LET'S BUILD SOMETHING REMARKABLE.</h2>
        <p style={{ fontFamily: F.dm, fontSize: '14px', color: E.muted, lineHeight: 1.85, marginBottom: '60px', ...rv(v, 160) }}>Submit your brief. We acknowledge all inquiries within 24 hours. Complex RFPs receive a formal response within 72 hours.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 32px', ...rv(v, 220) }}>
          <input placeholder="ORGANIZATION NAME" style={fstyle('1 / -1')} onFocus={focus} onBlur={blur} />
          <input placeholder="YOUR NAME" style={fstyle()} onFocus={focus} onBlur={blur} />
          <input placeholder="YOUR TITLE" style={fstyle()} onFocus={focus} onBlur={blur} />
          <input placeholder="EMAIL ADDRESS" style={fstyle()} onFocus={focus} onBlur={blur} />
          <input placeholder="PHONE NUMBER" style={fstyle()} onFocus={focus} onBlur={blur} />
          <select value={budget} onChange={e => setBudget(e.target.value)}
            style={{ ...fstyle('1 / -1'), cursor: 'pointer', appearance: 'none', color: budget ? E.text : E.muted }}>
            <option value="" style={{ background: E.bg }}>ESTIMATED BUDGET RANGE</option>
            {['Under $25K', '$25K – $75K', '$75K – $150K', '$150K – $500K', '$500K+'].map(o => <option key={o} value={o} style={{ background: E.bg }}>{o}</option>)}
          </select>
          <textarea placeholder="PROJECT BRIEF — tell us about your event, vision, and timeline" rows={5}
            style={{ ...fstyle('1 / -1'), resize: 'none' }} onFocus={focus} onBlur={blur} />
        </div>
        <button
          onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
          style={{ marginTop: '44px', width: '100%', padding: '18px', background: hovBtn ? E.goldLt : E.gold, border: 'none', color: E.bg, fontFamily: F.dm, fontWeight: 600, fontSize: '10px', letterSpacing: '0.3em', cursor: 'pointer', transition: 'background 0.3s ease', ...rv(v, 320) }}>
          SUBMIT YOUR BRIEF →
        </button>
      </div>
    </section>
  );
}

// ─── SHARED FOOTER ──────────────────────────────────────────────
function Footer({ mode }) {
  const isW = mode === 'wedding';
  return (
    <footer style={{ background: isW ? W.bgDark : E.bgMid, borderTop: `1px solid ${isW ? W.border : E.border}`, padding: '64px 80px 48px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: isW ? F.cormorant : F.bebas, fontSize: isW ? '22px' : '26px', fontWeight: isW ? 300 : 400, color: isW ? W.burgundy : E.gold, letterSpacing: '0.18em', marginBottom: '6px' }}>MAISON ÉLISE</p>
          <p style={{ fontFamily: isW ? F.jost : F.dm, fontSize: '12px', fontWeight: 300, color: isW ? W.ash : E.muted, marginBottom: '28px' }}>Wedding & Event Planning · New York · Est. 2018</p>
          <p style={{ fontFamily: isW ? F.jost : F.dm, fontSize: '13px', color: isW ? W.ash : E.muted, lineHeight: 2.1, fontWeight: 300 }}>
            New York, New York<br />hello@maisonelise.com<br />+1 (212) 555-0180
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'flex-end', marginBottom: '28px' }}>
            {['Instagram', 'Pinterest', 'LinkedIn'].map(s => (
              <a key={s} href="#" style={{ fontFamily: isW ? F.jost : F.dm, fontSize: '10px', letterSpacing: '0.15em', color: isW ? W.burgundy : E.gold, textDecoration: 'none', opacity: 0.85 }}>{s}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '28px', justifyContent: 'flex-end', marginBottom: '36px' }}>
            {['Weddings', 'Events', 'About', 'Contact'].map(l => (
              <a key={l} href="#" style={{ fontFamily: isW ? F.jost : F.dm, fontSize: '12px', color: isW ? W.ash : E.muted, textDecoration: 'none', fontWeight: 300 }}>{l}</a>
            ))}
          </div>
          <p style={{ fontFamily: isW ? F.jost : F.dm, fontSize: '10px', color: isW ? W.ash : E.muted, opacity: 0.55 }}>© 2024 Maison Élise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    if (document.getElementById('me-fonts')) return;
    const l = document.createElement('link');
    l.id = 'me-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap';
    document.head.appendChild(l);
    const s = document.createElement('style');
    s.textContent = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { overflow-x: hidden; }
      ::placeholder { opacity: 0.45; }
      input, textarea, select { color-scheme: dark; }
      @keyframes floatDown {
        0% { transform: translateY(-5vh) translateX(0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(105vh) translateX(20px) rotate(360deg); opacity: 0; }
      }
      .petal { position: absolute; top: -20px; animation: floatDown linear infinite; }
      @media (max-width: 768px) {
        .hero-title { text-align: right !important; padding-left: 20px; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const [mode, setMode] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [overlayColor, setOverlayColor] = useState('#2E2A27');

  const enter = (m) => {
    setOverlayColor(m === 'wedding' ? W.burgundy : E.bg);
    setTransitioning(true);
    setTimeout(() => { setMode(m); window.scrollTo(0, 0); }, 850);
    setTimeout(() => setTransitioning(false), 1700);
  };

  return (
    <div style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Overlay active={transitioning} color={overlayColor} />
      <FallingPetals active={mode === 'wedding' && !transitioning} />

      {mode === null && <Landing onEnter={enter} />}

      {mode !== null && (
        <>
          <Nav mode={mode} onSwitch={() => enter(mode === 'wedding' ? 'events' : 'wedding')} />

          {mode === 'wedding' && (
            <>
              <WeddingHero />
              <WeddingPhilosophy />
              <WeddingServices />
              <WeddingAvailability />
              <WeddingPortfolio />
              <WeddingProcess />
              <WeddingTestimonials />
              <WeddingContact />
            </>
          )}

          {mode === 'events' && (
            <>
              <EventsHero />
              <EventsCapabilities />
              <PartnerBanner />
              <EventsPortfolio />
              <EventsProcess />
              <EventsContact />
            </>
          )}

          <Footer mode={mode} />
        </>
      )}
    </div>
  );
}
