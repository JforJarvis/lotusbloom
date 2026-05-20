'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

function DataOverlay({ active }) {
  const nodes = useMemo(() => Array.from({ length: 18 }, () => ({
    x: 5 + Math.random() * 90, y: 8 + Math.random() * 84,
    s: 2 + Math.random() * 3, d: 1.5 + Math.random() * 2.5, dl: Math.random() * 2,
  })), [])
  const lines = useMemo(() => Array.from({ length: 12 }, () => ({
    x1: Math.random() * 100, y1: Math.random() * 100,
    x2: Math.random() * 100, y2: Math.random() * 100,
    d: 2 + Math.random() * 3, dl: Math.random() * 2,
  })), [])
  const streams = useMemo(() => Array.from({ length: 8 }, () => ({
    x: 10 + Math.random() * 80, d: 1.5 + Math.random() * 2, dl: Math.random() * 3,
  })), [])

  return (
    <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.6 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
      {nodes.map((n, i) => (
        <div key={`n${i}`} style={{ position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, width: n.s, height: n.s,
          borderRadius: '50%', background: '#4aa8e8', boxShadow: '0 0 8px rgba(74,168,232,.6),0 0 20px rgba(74,168,232,.2)',
          animation: active ? `dataPulse ${n.d}s ease-in-out ${n.dl}s infinite` : 'none' }} />
      ))}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {lines.map((l, i) => (
          <line key={`l${i}`} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke="rgba(74,168,232,.15)" strokeWidth=".5"
            style={{ animation: active ? `lineFlash ${l.d}s ease-in-out ${l.dl}s infinite` : 'none' }} />
        ))}
      </svg>
      {streams.map((s, i) => (
        <div key={`s${i}`} style={{ position: 'absolute', left: `${s.x}%`, top: 0, width: 1, height: '100%', overflow: 'hidden' }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(180deg,transparent,rgba(74,168,232,.4),transparent)',
            animation: active ? `dataStream ${s.d}s linear ${s.dl}s infinite` : 'none' }} />
        </div>
      ))}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(74,168,232,.25),transparent)',
        animation: active ? 'scanLine 3s ease-in-out infinite' : 'none' }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 40% 35%,rgba(45,140,200,.08) 0%,transparent 60%)',
        animation: active ? 'ambientPulse 4s ease-in-out infinite' : 'none' }} />
    </motion.div>
  )
}

function FarmOverlay({ active }) {
  const stems = useMemo(() => Array.from({ length: 40 }, () => ({
    x: 2 + Math.random() * 96, h: 20 + Math.random() * 50,
    d: 2 + Math.random() * 2, dl: Math.random() * 2, w: 1 + Math.random(),
  })), [])
  const spores = useMemo(() => Array.from({ length: 20 }, () => ({
    x: Math.random() * 100, y: 30 + Math.random() * 60,
    s: 1.5 + Math.random() * 2.5, d: 3 + Math.random() * 5, dl: Math.random() * 4,
  })), [])
  const rays = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    x: 15 + i * 22, w: 8 + Math.random() * 12, d: 3 + Math.random() * 2, dl: i * 0.5,
  })), [])

  return (
    <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.6 }}
      style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70%' }}>
        {stems.map((s, i) => (
          <line key={`st${i}`} x1={`${s.x}%`} y1="100%" x2={`${s.x}%`} y2={`${100 - s.h}%`}
            stroke="rgba(60,190,100,.25)" strokeWidth={s.w} strokeLinecap="round"
            style={{ transformOrigin: `${s.x}% 100%`, animation: active ? `stemSway ${s.d}s ease-in-out ${s.dl}s infinite` : 'none' }} />
        ))}
      </svg>
      {spores.map((p, i) => (
        <div key={`sp${i}`} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
          borderRadius: '50%', background: 'rgba(180,220,100,.5)', boxShadow: '0 0 6px rgba(180,220,100,.3)',
          animation: active ? `sporeDrift ${p.d}s ease-in-out ${p.dl}s infinite` : 'none' }} />
      ))}
      {rays.map((r, i) => (
        <div key={`r${i}`} style={{ position: 'absolute', top: 0, left: `${r.x}%`, width: `${r.w}%`, height: '65%',
          background: 'linear-gradient(180deg,rgba(60,184,104,.06) 0%,rgba(200,200,80,.03) 40%,transparent 100%)',
          filter: 'blur(12px)', animation: active ? `rayPulse ${r.d}s ease-in-out ${r.dl}s infinite` : 'none' }} />
      ))}
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 55% 60%,rgba(60,184,104,.06) 0%,transparent 55%)',
        animation: active ? 'ambientPulse 5s ease-in-out infinite' : 'none' }} />
    </motion.div>
  )
}

export default function Hero() {
  const [mx, setMx] = useState(0.5)
  const [my, setMy] = useState(0.5)
  const [hov, setHov] = useState(null)
  const [ok, setOk] = useState(false)
  const ref = useRef(null)

  useEffect(() => { requestAnimationFrame(() => setOk(true)) }, [])

  const onMove = useCallback((e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setMx((e.clientX - r.left) / r.width)
    setMy((e.clientY - r.top) / r.height)
  }, [])

  const px = mx - 0.5
  const py = my - 0.5
  const origin = hov === 'left' ? '30% 40%' : hov === 'right' ? '70% 45%' : '50% 50%'
  const scale = hov ? 1.18 : 1

  return (
    <div ref={ref} onMouseMove={onMove}
      style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 500, overflow: 'hidden', background: '#020204' }}>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dataPulse{0%,100%{opacity:.2;transform:scale(1)}50%{opacity:.8;transform:scale(1.8)}}
        @keyframes lineFlash{0%,100%{stroke:rgba(74,168,232,.08)}50%{stroke:rgba(74,168,232,.3)}}
        @keyframes dataStream{0%{transform:translateY(-40px)}100%{transform:translateY(100vh)}}
        @keyframes scanLine{0%{top:0;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}
        @keyframes stemSway{0%,100%{transform:rotate(0deg)}25%{transform:rotate(3deg)}75%{transform:rotate(-3deg)}}
        @keyframes sporeDrift{0%,100%{transform:translate(0,0);opacity:.3}25%{transform:translate(12px,-8px);opacity:.6}50%{transform:translate(20px,-4px);opacity:.4}75%{transform:translate(8px,-12px);opacity:.7}}
        @keyframes rayPulse{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes ambientPulse{0%,100%{opacity:.6}50%{opacity:1}}
        @media(max-width:768px){.lb-bl{left:6%!important}.lb-br{right:6%!important}.lb-cta{padding:10px 18px!important;font-size:9px!important}.lb-nl{width:32px!important;height:32px!important}.lb-nb{font-size:18px!important}}
        @media(max-width:480px){.lb-bl{left:4%!important}.lb-br{right:4%!important}.lb-cta{padding:8px 14px!important;font-size:8px!important;gap:8px!important}.lb-nl{width:28px!important;height:28px!important}.lb-nb{font-size:16px!important}}
      `}</style>

      {/* Background */}
      <motion.div
        animate={{ x: px * 10, y: py * 6, scale }}
        transition={{ type: 'tween', duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', inset: -30, backgroundImage: 'url(/hero.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          transformOrigin: origin, willChange: 'transform' }} />

      {/* Dim overlays */}
      <motion.div animate={{ backgroundColor: hov === 'right' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />
      <motion.div animate={{ backgroundColor: hov === 'left' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.8 }}
        style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />

      {/* Effect overlays */}
      <DataOverlay active={hov === 'left'} />
      <FarmOverlay active={hov === 'right'} />

      {/* Hover zones */}
      <div onMouseEnter={() => setHov('left')} onMouseLeave={() => setHov(null)}
        style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', zIndex: 5, cursor: 'pointer' }} />
      <div onMouseEnter={() => setHov('right')} onMouseLeave={() => setHov(null)}
        style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', zIndex: 5, cursor: 'pointer' }} />

      {/* Nav */}
      <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: ok ? 1 : 0, y: ok ? 0 : -10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'clamp(16px,2.5vw,28px) clamp(22px,4.5vw,56px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img className="lb-nl" src="/logo.png" alt="LotusBloom"
            style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }} />
          <span className="lb-nb" style={{ fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(22px,2.8vw,30px)', fontWeight: 600, fontStyle: 'italic', color: '#c9a94e' }}>LotusBloom</span>
        </div>
        <a href="#" style={{ color: '#eee9e0', fontSize: 14, fontWeight: 400, letterSpacing: '.02em',
          borderBottom: '2px solid #c9a94e', paddingBottom: 4, fontFamily: "'Outfit',sans-serif" }}>About</a>
      </motion.nav>

      {/* Left CTA */}
      <motion.div className="lb-bl" initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: ok ? 1 : 0, y: ok ? 0 : 16, x: px * 4 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ position: 'absolute', zIndex: 8, left: 'clamp(24px,6.5%,96px)', bottom: 'clamp(18%,20%,22%)' }}>
        <button className="lb-cta" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12, padding: '13px 26px',
          background: 'rgba(255,255,255,.05)', border: '1px solid rgba(238,233,224,.22)',
          borderRadius: 2, color: '#fff', fontSize: 10.5, fontWeight: 500, letterSpacing: '.14em',
          textTransform: 'uppercase', cursor: 'pointer', transition: 'all .35s ease',
          fontFamily: "'Outfit',sans-serif", backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(45,140,200,.14)'; e.currentTarget.style.borderColor = 'rgba(45,140,200,.45)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.borderColor = 'rgba(238,233,224,.22)' }}
        >EXPLORE DATA OPERATIONS <span style={{ fontSize: 14 }}>→</span></button>
      </motion.div>

      {/* Right CTA */}
      <motion.div className="lb-br" initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: ok ? 1 : 0, y: ok ? 0 : 16, x: px * -4 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ position: 'absolute', zIndex: 8, right: 'clamp(24px,6.5%,96px)', bottom: 'clamp(18%,20%,22%)' }}>
        <button className="lb-cta" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12, padding: '13px 26px',
          background: 'rgba(255,255,255,.05)', border: '1px solid rgba(238,233,224,.22)',
          borderRadius: 2, color: '#fff', fontSize: 10.5, fontWeight: 500, letterSpacing: '.14em',
          textTransform: 'uppercase', cursor: 'pointer', transition: 'all .35s ease',
          fontFamily: "'Outfit',sans-serif", backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(60,184,104,.14)'; e.currentTarget.style.borderColor = 'rgba(60,184,104,.45)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.borderColor = 'rgba(238,233,224,.22)' }}
        >EXPLORE AGRICULTURE <span style={{ fontSize: 14 }}>→</span></button>
      </motion.div>

      {/* Vignette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
        background: 'linear-gradient(transparent,rgba(2,2,4,.7))', zIndex: 1, pointerEvents: 'none' }} />
    </div>
  )
}
