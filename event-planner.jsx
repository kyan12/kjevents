import { useState, useEffect, useRef } from "react";

// ─── COLOR TOKENS ────────────────────────────────────────────────
const W = {
  bg: '#E8E0D4', bgDark: '#DDD5C8', burgundy: '#6B3333',
  burgundyLt: '#8C4A4A', ink: '#2E2A27', ash: '#7A6E65',
  border: '#C4B8AC', cream: '#F2EDE6',
};
const E = {
  bg: '#363830', bgMid: '#3E4038', gold: '#B89040',
  goldLt: '#CDA84C', banner: '#8B6B3A', text: '#E8E0D4',
  muted: '#A89E90', border: '#4E5048',
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
      transition: 'opacity 0.45s ease',
    }} />
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
    : (scrolled ? 'rgba(54,56,48,0.94)' : 'rgba(54,56,48,0)');
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
    <section style={{ minHeight: '100vh', background: W.bg, display: 'flex', alignItems: 'stretch', overflow: 'hidden', paddingTop: '72px' }}>
      <div style={{ flex: '0 0 56%', position: 'relative', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-16px)', transition: 'opacity 1.3s ease 0.15s, transform 1.3s ease 0.15s' }}>
        <img src="https://picsum.photos/seed/whero1/800/1100" alt="Wedding" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 80%, rgba(232,224,212,0.6) 100%)' }} />
      </div>
      <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 60px 80px 52px' }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, marginBottom: '56px', opacity: on ? 1 : 0, transition: 'opacity 1.1s ease 0.5s' }}>
          MAISON ÉLISE · WEDDING PLANNING
        </p>
        <blockquote style={{ fontFamily: F.cormorant, fontSize: 'clamp(26px, 3.2vw, 46px)', fontWeight: 300, lineHeight: 1.38, color: W.ink, margin: '0 0 36px', fontStyle: 'italic', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(20px)', transition: 'opacity 1.1s ease 0.7s, transform 1.1s ease 0.7s' }}>
          "The most beautiful days begin with the quietest planning."
        </blockquote>
        <p style={{ fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.4em', color: W.burgundy, opacity: on ? 0.85 : 0, transition: 'opacity 1.1s ease 1.1s' }}>
          — MAISON ÉLISE
        </p>
        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px', opacity: on ? 1 : 0, transition: 'opacity 1.2s ease 1.4s' }}>
          <div style={{ width: '1px', height: '52px', background: W.burgundy, opacity: 0.35 }} />
          <p style={{ fontFamily: F.jost, fontSize: '8px', letterSpacing: '0.45em', color: W.ash }}>SCROLL</p>
        </div>
      </div>
    </section>
  );
}

function WeddingPhilosophy() {
  const [ref, v] = useReveal();
  return (
    <section ref={ref} style={{ background: W.bg, padding: '120px 80px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
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
        <div style={{ position: 'relative', height: '580px', ...rv(v, 150) }}>
          <img src="https://picsum.photos/seed/wphil1/480/680" alt="" style={{ position: 'absolute', top: 0, right: 0, width: '73%', height: '83%', objectFit: 'cover', transform: 'rotate(2deg)', display: 'block' }} />
          <img src="https://picsum.photos/seed/wphil2/380/540" alt="" style={{ position: 'absolute', bottom: 0, left: 0, width: '58%', height: '68%', objectFit: 'cover', transform: 'rotate(-1.5deg)', border: `8px solid ${W.cream}`, display: 'block' }} />
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
  return (
    <section ref={ref} style={{ background: W.bgDark, padding: '120px 80px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, textAlign: 'center', marginBottom: '16px', ...rv(v) }}>WHAT WE OFFER</p>
        <h2 style={{ fontFamily: F.cormorant, fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, color: W.ink, textAlign: 'center', letterSpacing: '0.12em', marginBottom: '72px', ...rv(v, 100) }}>SERVICES</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
          {wServices.map((s, i) => (
            <div key={i}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background: hov === i ? W.cream : W.bg, padding: '48px 36px 40px', borderTop: `2px solid ${hov === i ? W.burgundy : W.border}`, transition: 'all 0.35s ease', position: 'relative', ...rv(v, i * 130) }}>
              <span style={{ position: 'absolute', top: '20px', right: '24px', fontFamily: F.cormorant, fontSize: '80px', fontWeight: 300, color: W.border, lineHeight: 1, opacity: 0.35, userSelect: 'none' }}>0{i + 1}</span>
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
              <p style={{ fontFamily: F.cormorant, fontSize: '17px', color: W.burgundy, marginTop: '24px', opacity: hov === i ? 1 : 0, transition: 'opacity 0.35s ease', fontStyle: 'italic' }}>{s.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeddingAvailability() {
  const [ref, v] = useReveal();
  return (
    <section ref={ref} style={{ background: W.bg, padding: '80px 80px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ borderLeft: `2px solid ${W.burgundy}`, paddingLeft: '36px', flex: '1 1 400px', ...rv(v) }}>
          <h3 style={{ fontFamily: F.cormorant, fontSize: '12px', fontWeight: 400, letterSpacing: '0.4em', color: W.burgundy, marginBottom: '28px', textTransform: 'uppercase' }}>AVAILABILITY</h3>
          <p style={{ fontFamily: F.jost, fontSize: '14px', lineHeight: 1.95, color: W.ink, marginBottom: '10px' }}>
            <strong style={{ fontWeight: 500 }}>2026: </strong>Currently accepting Wedding Day Management Inquiries, with limited Partial Planning engagements.
          </p>
          <p style={{ fontFamily: F.jost, fontSize: '14px', lineHeight: 1.95, color: W.ink }}>
            <strong style={{ fontWeight: 500 }}>2027: </strong>Full Planning inquiries are now open.
          </p>
        </div>
        <div style={{ paddingTop: '48px', ...rv(v, 200) }}>
          <a href="#" style={{ fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.25em', color: W.burgundy, textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: 400, whiteSpace: 'nowrap' }}>INQUIRE ABOUT YOUR DATE</a>
        </div>
      </div>
    </section>
  );
}

function WeddingPortfolio() {
  const [ref, v] = useReveal();
  const seeds = [['wg1', 500, 660], ['wg2', 500, 420], ['wg3', 500, 520], ['wg4', 500, 420], ['wg5', 500, 620], ['wg6', 500, 480]];
  return (
    <section ref={ref} style={{ background: W.bgDark, padding: '120px 80px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, textAlign: 'center', marginBottom: '16px', ...rv(v) }}>OUR WORK</p>
        <h2 style={{ fontFamily: F.cormorant, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 300, color: W.ink, textAlign: 'center', lineHeight: 1.2, marginBottom: '12px', ...rv(v, 100) }}>
          Moments We've Had the<br />Honor of Holding
        </h2>
        <p style={{ fontFamily: F.jost, fontSize: '12px', letterSpacing: '0.15em', color: W.burgundy, textAlign: 'center', marginBottom: '64px', ...rv(v, 150) }}>
          View Full Portfolio →
        </p>
        <div style={{ columns: 3, columnGap: '8px', ...rv(v, 200) }}>
          {seeds.map(([seed, w, h], i) => (
            <div key={i} style={{ marginBottom: '8px', breakInside: 'avoid', overflow: 'hidden' }}>
              <img src={`https://picsum.photos/seed/${seed}/${w}/${h}`} alt="" style={{ width: '100%', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const wProcess = [
  { n: '01', title: 'Consultation', desc: 'Two hours. Just conversation. We learn how you love — and what your day should feel like.' },
  { n: '02', title: 'Vision & Design', desc: 'Mood boards, palette, venue shortlist. Everything aligned to your story, your people, your style.' },
  { n: '03', title: 'Vendor Curation', desc: 'We only recommend vendors we trust absolutely. Every photographer, florist, and caterer is vetted.' },
  { n: '04', title: 'Planning & Logistics', desc: 'Every timeline, contract, and contingency — organized, confirmed, and communicated.' },
  { n: '05', title: 'Your Wedding Day', desc: 'Our team is everywhere. You are present only for the joy.' },
];

function WeddingProcess() {
  const [ref, v] = useReveal();
  return (
    <section ref={ref} style={{ background: W.bg, padding: '120px 80px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, marginBottom: '20px', ...rv(v) }}>HOW WE WORK</p>
        <h2 style={{ fontFamily: F.cormorant, fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 300, color: W.ink, marginBottom: '72px', ...rv(v, 100) }}>The Process</h2>
        <div style={{ position: 'relative', paddingLeft: '28px', borderLeft: `1px solid ${W.border}` }}>
          {wProcess.map((step, i) => (
            <div key={i} style={{ marginBottom: i < wProcess.length - 1 ? '48px' : 0, position: 'relative', ...rv(v, i * 110) }}>
              <div style={{ position: 'absolute', left: '-36px', top: '4px', width: '16px', height: '16px', borderRadius: '50%', border: `1px solid ${W.burgundy}`, background: W.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: W.burgundy }} />
              </div>
              <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.4em', color: W.burgundy, marginBottom: '8px' }}>{step.n}</p>
              <p style={{ fontFamily: F.cormorant, fontSize: '24px', fontWeight: 400, color: W.ink, marginBottom: '10px', letterSpacing: '0.02em' }}>{step.title}</p>
              <p style={{ fontFamily: F.jost, fontWeight: 300, fontSize: '14px', lineHeight: 1.85, color: W.ash }}>{step.desc}</p>
            </div>
          ))}
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
  const t = wTestimonials[idx];
  return (
    <section ref={ref} style={{ background: W.bgDark, padding: '120px 80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', ...rv(v) }}>
        <p style={{ fontFamily: F.jost, fontSize: '9px', letterSpacing: '0.5em', color: W.ash, marginBottom: '56px' }}>KIND WORDS</p>
        <div style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.35s ease' }}>
          <p style={{ fontFamily: F.cormorant, fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, color: W.ink, marginBottom: '48px' }}>❝ {t.quote} ❞</p>
          <p style={{ fontFamily: F.jost, fontSize: '10px', letterSpacing: '0.3em', color: W.burgundy, marginBottom: '8px' }}>{t.name}</p>
          <p style={{ fontFamily: F.jost, fontSize: '12px', fontWeight: 300, color: W.ash }}>{t.detail}</p>
        </div>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '52px' }}>
          {wTestimonials.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 2px' }}>
              <div style={{ width: i === idx ? '28px' : '7px', height: '2px', background: i === idx ? W.burgundy : W.border, transition: 'all 0.4s ease' }} />
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
  const words = ['WE', 'PRODUCE', 'EVENTS THAT', 'PEOPLE', 'TALK ABOUT.'];
  return (
    <section style={{ minHeight: '100vh', background: E.bg, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '72px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://picsum.photos/seed/ehero99/1400/900)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
      <div style={{ position: 'relative', padding: '80px', maxWidth: '1100px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '60px', opacity: on ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
          <div style={{ width: '36px', height: '1px', background: E.gold }} />
          <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.55em', color: E.gold }}>CORPORATE · GALAS · LAUNCHES · SUMMITS</p>
          <div style={{ flex: 1, height: '1px', background: E.gold, opacity: 0.25 }} />
        </div>
        <h1 style={{ fontFamily: F.bebas, fontSize: 'clamp(64px, 11vw, 148px)', color: E.text, lineHeight: 0.86, letterSpacing: '0.02em', margin: 0 }}>
          {words.map((w, i) => (
            <span key={i} style={{ display: 'block', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(64px)', transition: `opacity 0.7s ease ${0.5 + i * 0.09}s, transform 0.7s ease ${0.5 + i * 0.09}s` }}>
              {w}
            </span>
          ))}
        </h1>
        <div style={{ marginTop: '80px', display: 'flex', gap: '14px', alignItems: 'flex-end', opacity: on ? 1 : 0, transition: 'opacity 1s ease 1.5s' }}>
          <div style={{ width: '1px', height: '52px', background: E.gold, opacity: 0.45 }} />
          <p style={{ fontFamily: F.dm, fontSize: '8px', letterSpacing: '0.45em', color: E.muted }}>OUR WORK ↓</p>
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
  const [hov, setHov] = useState(null);
  return (
    <section ref={ref} style={{ background: E.bgMid, padding: '120px 80px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.5em', color: E.gold, marginBottom: '16px', ...rv(v) }}>WHAT WE DO</p>
        <h2 style={{ fontFamily: F.bebas, fontSize: 'clamp(38px, 5.5vw, 72px)', color: E.text, letterSpacing: '0.05em', marginBottom: '72px', ...rv(v, 100) }}>CAPABILITIES</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {caps.map((c, i) => (
            <div key={i}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background: hov === i ? '#444840' : E.bg, padding: '36px 30px 32px', border: `1px solid ${hov === i ? E.gold : E.border}`, transition: 'all 0.3s ease', position: 'relative', ...rv(v, i * 90) }}>
              <p style={{ fontFamily: F.bebas, fontSize: '48px', color: E.gold, opacity: hov === i ? 0.65 : 0.22, lineHeight: 1, marginBottom: '4px', transition: 'opacity 0.3s ease' }}>{c.n}</p>
              <div style={{ width: '100%', height: '1px', background: E.gold, opacity: 0.28, marginBottom: '18px' }} />
              <p style={{ fontFamily: F.dm, fontSize: '14px', fontWeight: 500, color: E.text, marginBottom: '10px', lineHeight: 1.3 }}>{c.title}</p>
              <p style={{ fontFamily: F.dm, fontSize: '12px', color: E.muted, lineHeight: 1.75, marginBottom: '18px' }}>{c.desc}</p>
              {c.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '10px', padding: '5px 0' }}>
                  <span style={{ color: E.gold, flexShrink: 0, fontFamily: F.dm, fontSize: '13px' }}>—</span>
                  <p style={{ fontFamily: F.dm, fontSize: '11px', color: E.muted, lineHeight: 1.7, margin: 0 }}>{item}</p>
                </div>
              ))}
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
    <section ref={ref} style={{ background: E.bg, padding: '120px 80px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.5em', color: E.gold, marginBottom: '16px', ...rv(v) }}>OUR WORK</p>
        <h2 style={{ fontFamily: F.bebas, fontSize: 'clamp(38px, 5.5vw, 72px)', color: E.text, letterSpacing: '0.05em', marginBottom: '72px', ...rv(v, 100) }}>SELECTED PROJECTS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
          {ePortfolio.map((p, i) => (
            <div key={i}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background: hov === i ? E.bgMid : E.bg, border: `1px solid ${hov === i ? E.gold : E.border}`, overflow: 'hidden', transform: hov === i ? 'translateY(-5px)' : 'none', transition: 'all 0.35s ease', boxShadow: hov === i ? '0 12px 40px rgba(0,0,0,0.3)' : 'none', ...rv(v, i * 120) }}>
              <div style={{ height: '210px', overflow: 'hidden' }}>
                <img src={`https://picsum.photos/seed/${p.seed}/700/400`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov === i ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.7s ease' }} />
              </div>
              <div style={{ borderTop: `2px solid ${E.gold}`, padding: '30px' }}>
                <p style={{ fontFamily: F.bebas, fontSize: '19px', letterSpacing: '0.06em', color: E.text, marginBottom: '6px' }}>{p.org}</p>
                <p style={{ fontFamily: F.dm, fontSize: '10px', letterSpacing: '0.15em', color: E.gold, marginBottom: '12px' }}>{p.city}</p>
                <p style={{ fontFamily: F.dm, fontSize: '11px', color: E.muted, marginBottom: '18px' }}>{p.stats}</p>
                <p style={{ fontFamily: F.dm, fontSize: '13px', color: E.text, fontStyle: 'italic', lineHeight: 1.65, marginBottom: '8px' }}>{p.quote}</p>
                <p style={{ fontFamily: F.dm, fontSize: '10px', color: E.gold, letterSpacing: '0.05em' }}>{p.attr}</p>
              </div>
            </div>
          ))}
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
    <section ref={ref} style={{ background: E.bgMid, padding: '96px 80px' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        <p style={{ fontFamily: F.dm, fontSize: '9px', letterSpacing: '0.5em', color: E.gold, marginBottom: '56px', ...rv(v) }}>HOW WE WORK</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20px', left: '8%', right: '8%', height: '1px', background: E.gold, opacity: 0.18 }} />
          {eProcess.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 8px', ...rv(v, i * 75) }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: E.gold, margin: '0 auto 20px', position: 'relative', zIndex: 1, boxShadow: `0 0 0 4px ${E.bgMid}` }} />
              <p style={{ fontFamily: F.bebas, fontSize: '15px', color: E.text, letterSpacing: '0.08em', marginBottom: '8px' }}>{s.title}</p>
              <p style={{ fontFamily: F.dm, fontSize: '10px', color: E.muted, lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
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
    s.textContent = '* { margin: 0; padding: 0; box-sizing: border-box; } body { overflow-x: hidden; } ::placeholder { opacity: 0.45; } input, textarea, select { color-scheme: dark; }';
    document.head.appendChild(s);
  }, []);

  const [mode, setMode] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [overlayColor, setOverlayColor] = useState('#2E2A27');

  const enter = (m) => {
    setOverlayColor(m === 'wedding' ? W.burgundy : E.bg);
    setTransitioning(true);
    setTimeout(() => { setMode(m); window.scrollTo(0, 0); }, 430);
    setTimeout(() => setTransitioning(false), 880);
  };

  return (
    <div style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Overlay active={transitioning} color={overlayColor} />

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
