'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

/* ═══ ANIMATED OVERLAYS ═══ */
function DataOverlay({ active }) {
  const nodes = useMemo(() => Array.from({ length: 18 }, () => ({
    x: 5 + Math.random() * 90, y: 8 + Math.random() * 84,
    s: 2 + Math.random() * 3, d: 1.5 + Math.random() * 2.5, dl: Math.random() * 2,
  })), [])
  const streams = useMemo(() => Array.from({ length: 8 }, () => ({
    x: 10 + Math.random() * 80, d: 1.5 + Math.random() * 2, dl: Math.random() * 3,
  })), [])
  return (
    <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.6 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      {nodes.map((n, i) => (
        <div key={`dn${i}`} style={{ position: 'absolute', left: `${n.x}%`, top: `${n.y}%`,
          width: n.s, height: n.s, borderRadius: '50%', background: '#4aa8e8',
          boxShadow: '0 0 8px rgba(74,168,232,.6), 0 0 20px rgba(74,168,232,.2)',
          animation: active ? `dataPulse ${n.d}s ease-in-out ${n.dl}s infinite` : 'none' }} />
      ))}
      {streams.map((s, i) => (
        <div key={`ds${i}`} style={{ position: 'absolute', left: `${s.x}%`, top: 0, width: 1, height: '100%', overflow: 'hidden' }}>
          <div style={{ width: 1, height: 40,
            background: 'linear-gradient(180deg, transparent, rgba(74,168,232,.4), transparent)',
            animation: active ? `dataStream ${s.d}s linear ${s.dl}s infinite` : 'none' }} />
        </div>
      ))}
      <div style={{ position: 'absolute', left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(74,168,232,.25), transparent)',
        animation: active ? 'scanLine 3s ease-in-out infinite' : 'none' }} />
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
  return (
    <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.6 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70%' }}>
        {stems.map((s, i) => (
          <line key={`fs${i}`} x1={`${s.x}%`} y1="100%" x2={`${s.x}%`} y2={`${100 - s.h}%`}
            stroke="rgba(60,190,100,.25)" strokeWidth={s.w} strokeLinecap="round"
            style={{ transformOrigin: `${s.x}% 100%`,
              animation: active ? `stemSway ${s.d}s ease-in-out ${s.dl}s infinite` : 'none' }} />
        ))}
      </svg>
      {spores.map((p, i) => (
        <div key={`fp${i}`} style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.s, height: p.s, borderRadius: '50%',
          background: 'rgba(180,220,100,.5)', boxShadow: '0 0 6px rgba(180,220,100,.3)',
          animation: active ? `sporeDrift ${p.d}s ease-in-out ${p.dl}s infinite` : 'none' }} />
      ))}
    </motion.div>
  )
}

/* ═══ INDIVIDUAL PANEL COMPONENT ═══ */
function Panel({ side, active, onActivate, onDeactivate, parallaxX, parallaxY, ready }) {
  const isLeft = side === 'left'

  return (
    <section
      className={`panel panel-${side}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onClick={() => onActivate('toggle')}
    >
      {/* Background — shows this panel's half of hero.jpg */}
      <div className="panel-bg" style={{
        transform: `translate(${isLeft ? parallaxX * 14 : parallaxX * -14}px, ${parallaxY * 8}px) scale(${active ? 1.06 : 1})`,
      }} />

      {/* Gradient overlay — hides baked-in text, preserves atmosphere */}
      <div className="panel-gradient" />

      {/* Dim overlay when OTHER side is hovered */}
      <motion.div
        className="panel-dim"
        animate={{ opacity: active === false ? 0.4 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Animated effects */}
      {isLeft ? <DataOverlay active={active === true} /> : <FarmOverlay active={active === true} />}

      {/* Content */}
      <div className="panel-content">
        <motion.span className="label"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
          transition={{ delay: isLeft ? 0.2 : 0.25, duration: 0.5 }}>
          LOTUSBLOOM
        </motion.span>

        <motion.h1 className="heading"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ delay: isLeft ? 0.3 : 0.35, duration: 0.5 }}>
          {isLeft ? <>DATA<br/>OPERATIONS</> : <>AGRICULTURE<br/>&amp; MICROGREENS</>}
        </motion.h1>

        <motion.p className="subtitle"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
          transition={{ delay: 0.4, duration: 0.5 }}>
          {isLeft ? 'Intelligent Systems. Smarter Decisions.' : 'Sustainable Farming. Healthier Futures.'}
        </motion.p>

        {isLeft && (
          <motion.div className="gold-bar"
            initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.44, duration: 0.5 }} />
        )}

        <motion.p className="body"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
          transition={{ delay: 0.48, duration: 0.5 }}>
          {isLeft
            ? 'We transform complex data into actionable intelligence that drives real results.'
            : 'We cultivate premium microgreens with purpose, precision, and sustainability.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
          transition={{ delay: 0.52, duration: 0.5 }}>
          <button className="cta">
            {isLeft ? 'EXPLORE DATA OPERATIONS' : 'EXPLORE AGRICULTURE'}
            <span className="arrow">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══ MAIN HERO ═══ */
export default function Hero() {
  const [mx, setMx] = useState(0.5)
  const [my, setMy] = useState(0.5)
  const [hov, setHov] = useState(null)
  const [ready, setReady] = useState(false)
  const ref = useRef(null)

  useEffect(() => { requestAnimationFrame(() => setReady(true)) }, [])

  const onMove = useCallback((e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setMx((e.clientX - r.left) / r.width)
    setMy((e.clientY - r.top) / r.height)
  }, [])

  const px = mx - 0.5
  const py = my - 0.5

  // Determine active state: true = this side hovered, false = other side hovered, null = neither
  const leftActive = hov === 'left' ? true : hov === 'right' ? false : null
  const rightActive = hov === 'right' ? true : hov === 'left' ? false : null

  return (
    <div ref={ref} onMouseMove={onMove} className="hero-root">

      {/* ═══ ALL STYLES ═══ */}
      <style>{`
        /* Keyframes */
        @keyframes dataPulse { 0%,100% { opacity:.2; transform:scale(1); } 50% { opacity:.8; transform:scale(1.8); } }
        @keyframes dataStream { 0% { transform:translateY(-40px); } 100% { transform:translateY(100vh); } }
        @keyframes scanLine { 0% { top:0; opacity:0; } 10% { opacity:1; } 90% { opacity:1; } 100% { top:100%; opacity:0; } }
        @keyframes stemSway { 0%,100% { transform:rotate(0); } 25% { transform:rotate(3deg); } 75% { transform:rotate(-3deg); } }
        @keyframes sporeDrift { 0%,100% { transform:translate(0,0); opacity:.3; } 25% { transform:translate(12px,-8px); opacity:.6; } 50% { transform:translate(20px,-4px); opacity:.4; } 75% { transform:translate(8px,-12px); opacity:.7; } }
        @keyframes glowPulse { 0%,100% { box-shadow:0 0 30px rgba(201,169,78,.2), 0 0 60px rgba(201,169,78,.06); } 50% { box-shadow:0 0 45px rgba(201,169,78,.3), 0 0 90px rgba(201,169,78,.1); } }
        @keyframes shimmer { 0% { transform:translateY(100%); opacity:0; } 50% { opacity:.35; } 100% { transform:translateY(-100%); opacity:0; } }

        /* ═══ ROOT ═══ */
        .hero-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          background: #020204;
          overflow: hidden;
        }

        /* ═══ LAYOUT: flex row on desktop ═══ */
        .hero-grid {
          display: flex;
          flex-direction: row;
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
        }

        /* ═══ PANEL — each side ═══ */
        .panel {
          position: relative;
          flex: 1;
          overflow: hidden;
          cursor: pointer;
          transition: flex 0.8s cubic-bezier(.16,1,.3,1);
        }
        .panel:hover { flex: 1.15; }

        /* Panel background — independent per side */
        .panel-bg {
          position: absolute;
          inset: -30px;
          background-image: url(/hero.jpg);
          background-size: 200% 100%;
          background-repeat: no-repeat;
          transition: transform 0.7s cubic-bezier(.16,1,.3,1);
        }
        .panel-left .panel-bg { background-position: left center; }
        .panel-right .panel-bg { background-position: right center; }

        /* Gradient overlay — preserves visual atmosphere, darkens text zone */
        .panel-gradient {
          position: absolute;
          inset: 0;
          z-index: 2;
        }
        .panel-left .panel-gradient {
          background: linear-gradient(
            180deg,
            rgba(2,2,4,.12) 0%,
            rgba(2,2,4,.30) 15%,
            rgba(2,2,4,.70) 28%,
            rgba(2,2,4,.94) 40%,
            rgba(2,2,4,.98) 50%,
            rgba(2,2,4,1) 60%,
            rgba(2,2,4,1) 100%
          );
        }
        .panel-right .panel-gradient {
          background: linear-gradient(
            180deg,
            rgba(2,2,4,.08) 0%,
            rgba(2,2,4,.25) 15%,
            rgba(2,2,4,.65) 28%,
            rgba(2,2,4,.94) 40%,
            rgba(2,2,4,.98) 50%,
            rgba(2,2,4,1) 60%,
            rgba(2,2,4,1) 100%
          );
        }

        /* Dim overlay */
        .panel-dim {
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 4;
          pointer-events: none;
        }

        /* ═══ CONTENT ═══ */
        .panel-content {
          position: relative;
          z-index: 5;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(24px, 5%, 80px);
          padding-bottom: clamp(40px, 8%, 100px);
        }
        .panel-right .panel-content {
          align-items: flex-end;
          text-align: right;
        }

        .label {
          display: block;
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 500;
          letter-spacing: 0.22em;
          color: rgba(238,233,224,.55);
          margin-bottom: clamp(10px, 1.5vh, 18px);
        }

        .heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 5vw, 72px);
          font-weight: 600;
          line-height: 0.96;
          color: #fff;
          margin: 0 0 clamp(10px, 1.5vh, 18px);
          letter-spacing: -0.01em;
        }

        .subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(13px, 1.4vw, 18px);
          font-weight: 400;
          font-style: italic;
          color: rgba(238,233,224,.80);
          margin-bottom: clamp(8px, 1vh, 14px);
        }

        .gold-bar {
          width: 32px;
          height: 2px;
          background: rgba(201,169,78,.45);
          border-radius: 1px;
          margin-bottom: clamp(12px, 1.5vh, 20px);
        }

        .body {
          font-size: clamp(11px, 0.95vw, 13.5px);
          line-height: 1.75;
          color: rgba(238,233,224,.50);
          max-width: 300px;
          margin-bottom: clamp(18px, 2.5vh, 30px);
        }
        .panel-right .body { margin-left: auto; }

        .cta {
          display: inline-flex;
          align-items: center;
          gap: clamp(8px, 1vw, 12px);
          padding: clamp(10px, 1.2vw, 14px) clamp(16px, 2vw, 28px);
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(238,233,224,.22);
          border-radius: 2px;
          color: #fff;
          font-size: clamp(8px, 0.9vw, 11px);
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.35s ease;
          font-family: 'Outfit', sans-serif;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .panel-left .cta:hover { background: rgba(45,140,200,.14); border-color: rgba(45,140,200,.45); }
        .panel-right .cta:hover { background: rgba(60,184,104,.14); border-color: rgba(60,184,104,.45); }
        .arrow { font-size: clamp(11px, 1.2vw, 15px); }

        /* ═══ CENTER LOTUS ═══ */
        .center-lotus {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          pointer-events: none;
        }
        .lotus-ring {
          width: clamp(80px, 8vw, 110px);
          height: clamp(80px, 8vw, 110px);
          border-radius: 50%;
          border: 2px solid rgba(201,169,78,.38);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(4,4,6,.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          animation: glowPulse 4s ease-in-out infinite;
        }
        .lotus-ring img {
          width: clamp(38px, 4vw, 54px);
          height: clamp(38px, 4vw, 54px);
          border-radius: 50%;
          object-fit: cover;
        }

        /* ═══ GOLD LINE ═══ */
        .gold-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          margin-left: -1px;
          z-index: 15;
          pointer-events: none;
          background: linear-gradient(180deg,
            transparent 5%,
            rgba(201,169,78,.15) 25%,
            rgba(201,169,78,.35) 50%,
            rgba(201,169,78,.15) 75%,
            transparent 95%
          );
        }
        .gold-line-shimmer {
          position: absolute;
          width: 100%;
          height: 45px;
          background: linear-gradient(180deg, transparent, rgba(201,169,78,.45), transparent);
          animation: shimmer 5.5s ease-in-out infinite;
        }

        /* ═══ NAV ═══ */
        .site-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(12px, 2.5vw, 28px) clamp(16px, 4.5vw, 56px);
          padding-top: max(clamp(12px, 2.5vw, 28px), env(safe-area-inset-top));
        }
        .nav-left { display: flex; align-items: center; gap: clamp(6px, 1vw, 10px); }
        .nav-logo { width: clamp(28px, 4vw, 42px); height: clamp(28px, 4vw, 42px); border-radius: 50%; object-fit: cover; }
        .nav-brand { font-family: 'Cormorant Garamond', serif; font-size: clamp(18px, 2.5vw, 30px); font-weight: 600; font-style: italic; color: #c9a94e; }
        .nav-link { color: #eee9e0; font-size: clamp(12px, 1.2vw, 14px); font-weight: 400; letter-spacing: .02em; border-bottom: 2px solid #c9a94e; padding-bottom: 4px; font-family: 'Outfit', sans-serif; }

        /* ═══ MOBILE — 768px ═══ */
        @media (max-width: 768px) {
          .hero-grid { flex-direction: column; }
          .panel { flex: none; min-height: 50vh; min-height: 50dvh; }
          .panel:hover { flex: none; }

          .panel-left .panel-bg { background-position: 25% center; }
          .panel-right .panel-bg { background-position: 75% center; }

          .panel-content { padding: clamp(60px, 12vh, 100px) clamp(20px, 6%, 40px) clamp(28px, 5vh, 50px); }
          .panel-right .panel-content { align-items: flex-start; text-align: left; }
          .panel-right .body { margin-left: 0; }

          .heading { font-size: clamp(26px, 8vw, 42px); }
          .subtitle { font-size: clamp(13px, 3.5vw, 16px); }
          .body { font-size: clamp(11.5px, 3vw, 13px); max-width: none; }
          .cta { padding: 12px 20px; font-size: 9px; }

          .gold-line { display: none; }
          .center-lotus { top: 50vh; top: 50dvh; }
          .lotus-ring { width: 72px; height: 72px; }
          .lotus-ring img { width: 36px; height: 36px; }
        }

        /* ═══ SMALL PHONES — 480px ═══ */
        @media (max-width: 480px) {
          .panel { min-height: 50dvh; }
          .panel-content { padding: clamp(50px, 10vh, 80px) 20px clamp(24px, 4vh, 36px); }
          .heading { font-size: clamp(24px, 7.5vw, 36px); }
          .cta { padding: 11px 16px; font-size: 8px; letter-spacing: .10em; }
          .lotus-ring { width: 64px; height: 64px; }
          .lotus-ring img { width: 32px; height: 32px; }
        }

        /* ═══ TINY — 375px (iPhone SE) ═══ */
        @media (max-width: 375px) {
          .heading { font-size: clamp(22px, 7vw, 30px); }
          .cta { padding: 10px 14px; font-size: 7.5px; }
        }
      `}</style>

      {/* NAV */}
      <motion.nav className="site-nav"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -10 }}
        transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="nav-left">
          <img className="nav-logo" src="/logo.png" alt="LotusBloom" />
          <span className="nav-brand">LotusBloom</span>
        </div>
        <a className="nav-link" href="#">About</a>
      </motion.nav>

      {/* HERO GRID */}
      <div className="hero-grid">

        {/* LEFT PANEL */}
        <Panel
          side="left"
          active={leftActive}
          onActivate={() => setHov('left')}
          onDeactivate={() => setHov(null)}
          parallaxX={px} parallaxY={py}
          ready={ready}
        />

        {/* RIGHT PANEL */}
        <Panel
          side="right"
          active={rightActive}
          onActivate={() => setHov('right')}
          onDeactivate={() => setHov(null)}
          parallaxX={px} parallaxY={py}
          ready={ready}
        />

        {/* CENTER LOTUS */}
        <motion.div className="center-lotus"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.85, y: py * -8 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="lotus-ring">
            <img src="/logo.png" alt="" />
          </div>
        </motion.div>

        {/* GOLD LINE */}
        <div className="gold-line">
          <div className="gold-line-shimmer" />
        </div>

      </div>
    </div>
  )
}
