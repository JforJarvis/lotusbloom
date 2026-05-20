'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

/* ════════════════════════════════════════════
   PARTICLE SYSTEMS
   ════════════════════════════════════════════ */
function DataParticles({ active }) {
  const nodes = useMemo(() => Array.from({ length: 25 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    s: 1.5 + Math.random() * 3, d: 1.5 + Math.random() * 3, dl: Math.random() * 2,
    o: 0.15 + Math.random() * 0.25,
  })), [])
  const conns = useMemo(() => Array.from({ length: 10 }, () => ({
    x1: Math.random() * 100, y1: Math.random() * 100,
    x2: Math.random() * 100, y2: Math.random() * 100,
    d: 2 + Math.random() * 4, dl: Math.random() * 2,
  })), [])
  const streams = useMemo(() => Array.from({ length: 8 }, () => ({
    x: 8 + Math.random() * 84, d: 1.5 + Math.random() * 2.5, dl: Math.random() * 3,
  })), [])
  return (
    <div className="particles">
      {/* Always-on ambient dots */}
      {nodes.map((n, i) => (
        <div key={`an${i}`} className="dot" style={{
          left: `${n.x}%`, top: `${n.y}%`, width: n.s, height: n.s,
          background: 'var(--cyan-bright)', opacity: n.o,
          boxShadow: `0 0 ${n.s * 2}px var(--cyan)`,
          animation: `pulse ${n.d}s ease-in-out ${n.dl}s infinite`,
        }} />
      ))}
      {/* Hover-only effects */}
      <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.5 }} className="particles">
        <svg className="conn-svg">
          {conns.map((c, i) => (
            <line key={`cl${i}`} x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`}
              stroke="rgba(74,168,232,.12)" strokeWidth="0.5"
              style={{ animation: active ? `lineGlow ${c.d}s ease-in-out ${c.dl}s infinite` : 'none' }} />
          ))}
        </svg>
        {streams.map((s, i) => (
          <div key={`st${i}`} className="stream" style={{ left: `${s.x}%` }}>
            <div className="stream-bar" style={{
              animation: active ? `streamFall ${s.d}s linear ${s.dl}s infinite` : 'none',
            }} />
          </div>
        ))}
        <div className="scan" style={{ animation: active ? 'scanMove 3.5s ease-in-out infinite' : 'none' }} />
      </motion.div>
    </div>
  )
}

function FarmParticles({ active }) {
  const stems = useMemo(() => Array.from({ length: 50 }, () => ({
    x: Math.random() * 100, h: 12 + Math.random() * 55,
    d: 2 + Math.random() * 2.5, dl: Math.random() * 2, w: 0.6 + Math.random() * 1.2,
  })), [])
  const spores = useMemo(() => Array.from({ length: 28 }, () => ({
    x: Math.random() * 100, y: 15 + Math.random() * 75,
    s: 1 + Math.random() * 2.5, d: 3 + Math.random() * 6, dl: Math.random() * 4,
    o: 0.1 + Math.random() * 0.2,
  })), [])
  return (
    <div className="particles">
      {/* Always-on floating spores */}
      {spores.map((p, i) => (
        <div key={`sp${i}`} className="dot" style={{
          left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s,
          background: 'var(--green-bright)', opacity: p.o,
          boxShadow: `0 0 ${p.s * 2}px rgba(74,222,128,.3)`,
          animation: `sporeFloat ${p.d}s ease-in-out ${p.dl}s infinite`,
        }} />
      ))}
      {/* Hover-only swaying stems */}
      <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <svg className="conn-svg" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80%' }}>
          {stems.map((s, i) => (
            <line key={`sm${i}`} x1={`${s.x}%`} y1="100%" x2={`${s.x}%`} y2={`${100 - s.h}%`}
              stroke="rgba(60,190,100,.18)" strokeWidth={s.w} strokeLinecap="round"
              style={{ transformOrigin: `${s.x}% 100%`,
                animation: active ? `sway ${s.d}s ease-in-out ${s.dl}s infinite` : 'none' }} />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}

/* ════════════════════════════════════════════
   PANEL COMPONENT
   ════════════════════════════════════════════ */
function Panel({ side, hoverState, onEnter, onLeave, onTap, px, py, ready }) {
  const isLeft = side === 'left'
  const isActive = hoverState === true
  const isDimmed = hoverState === false

  return (
    <section className={`panel panel--${side}`}
      onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onTap}>

      {/* Atmospheric background */}
      <div className="panel__bg" style={{
        transform: `translate(${isLeft ? px * 12 : px * -12}px, ${py * 6}px) scale(${isActive ? 1.06 : 1})`,
      }} />

      {/* Particle layer */}
      {isLeft ? <DataParticles active={isActive} /> : <FarmParticles active={isActive} />}

      {/* Dim overlay */}
      <motion.div className="panel__dim"
        animate={{ opacity: isDimmed ? 0.45 : 0 }}
        transition={{ duration: 0.7 }} />

      {/* Content */}
      <div className="panel__content">
        <motion.span className="eyebrow"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          transition={{ delay: isLeft ? 0.2 : 0.25, duration: 0.5 }}>
          LOTUSBLOOM
        </motion.span>

        <motion.h1 className="title"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 14 }}
          transition={{ delay: isLeft ? 0.3 : 0.35, duration: 0.5 }}>
          {isLeft ? <>DATA<br />OPERATIONS</> : <>AGRICULTURE<br />&amp; MICROGREENS</>}
        </motion.h1>

        <motion.p className="sub"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          transition={{ delay: 0.4, duration: 0.5 }}>
          {isLeft ? 'Intelligent Systems. Smarter Decisions.' : 'Sustainable Farming. Healthier Futures.'}
        </motion.p>

        {isLeft && (
          <motion.div className="bar"
            initial={{ scaleX: 0 }} animate={{ scaleX: ready ? 1 : 0 }}
            transition={{ delay: 0.45, duration: 0.4 }} />
        )}

        <motion.p className="desc"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          transition={{ delay: 0.5, duration: 0.5 }}>
          {isLeft
            ? 'We transform complex data into actionable intelligence that drives real results.'
            : 'We cultivate premium microgreens with purpose, precision, and sustainability.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10 }}
          transition={{ delay: 0.55, duration: 0.5 }}>
          <button className="btn">
            {isLeft ? 'EXPLORE DATA OPERATIONS' : 'EXPLORE AGRICULTURE'}
            <span className="btn__arrow">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════ */
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
  const L = hov === 'left' ? true : hov === 'right' ? false : null
  const R = hov === 'right' ? true : hov === 'left' ? false : null

  return (
    <div ref={ref} onMouseMove={onMove} className="hero">
      <style>{`
        /* ══════════ KEYFRAMES ══════════ */
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.15} 50%{transform:scale(1.6);opacity:.5} }
        @keyframes lineGlow { 0%,100%{stroke:rgba(74,168,232,.05)} 50%{stroke:rgba(74,168,232,.22)} }
        @keyframes streamFall { 0%{transform:translateY(-50px)} 100%{transform:translateY(100vh)} }
        @keyframes scanMove { 0%{top:0;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0} }
        @keyframes sway { 0%,100%{transform:rotate(0)} 25%{transform:rotate(3deg)} 75%{transform:rotate(-3deg)} }
        @keyframes sporeFloat { 0%,100%{transform:translate(0,0);opacity:.15} 33%{transform:translate(10px,-14px);opacity:.4} 66%{transform:translate(-6px,-8px);opacity:.2} }
        @keyframes glowRing { 0%,100%{box-shadow:0 0 30px var(--gold-glow),0 0 60px rgba(201,169,78,.06)} 50%{box-shadow:0 0 50px var(--gold-glow),0 0 100px rgba(201,169,78,.12)} }
        @keyframes shimmer { 0%{transform:translateY(100%);opacity:0} 50%{opacity:.4} 100%{transform:translateY(-100%);opacity:0} }

        /* ══════════ HERO ROOT ══════════ */
        .hero { position:relative; width:100%; background:var(--bg); overflow:hidden; }

        /* ══════════ GRID — flex row desktop ══════════ */
        .hero__grid {
          display:flex;
          min-height:100vh; min-height:100dvh;
          position:relative;
        }

        /* ══════════ PANEL ══════════ */
        .panel {
          position:relative; flex:1; overflow:hidden; cursor:pointer;
          transition:flex .8s cubic-bezier(.16,1,.3,1);
        }
        .panel:hover { flex:1.15; }

        /* ── Atmospheric backgrounds ── */
        .panel__bg {
          position:absolute; inset:-30px;
          transition:transform .7s cubic-bezier(.16,1,.3,1);
        }
        .panel--left .panel__bg {
          background:
            radial-gradient(ellipse at 75% 15%, rgba(45,140,200,.14) 0%, transparent 50%),
            radial-gradient(ellipse at 25% 45%, rgba(45,140,200,.10) 0%, transparent 45%),
            radial-gradient(ellipse at 60% 70%, rgba(45,140,200,.06) 0%, transparent 40%),
            radial-gradient(ellipse at 85% 50%, rgba(30,80,160,.08) 0%, transparent 35%),
            radial-gradient(ellipse at 40% 20%, rgba(60,180,220,.05) 0%, transparent 30%),
            radial-gradient(ellipse at 15% 80%, rgba(20,60,140,.06) 0%, transparent 35%),
            linear-gradient(155deg, #030810 0%, #061428 20%, #0a1e38 40%, #081a2e 60%, #050e1c 80%, #030810 100%);
        }
        .panel--right .panel__bg {
          background:
            radial-gradient(ellipse at 35% 20%, rgba(60,184,104,.12) 0%, transparent 45%),
            radial-gradient(ellipse at 75% 55%, rgba(60,184,104,.08) 0%, transparent 40%),
            radial-gradient(ellipse at 45% 80%, rgba(80,200,120,.05) 0%, transparent 35%),
            radial-gradient(ellipse at 20% 50%, rgba(40,160,80,.06) 0%, transparent 30%),
            radial-gradient(ellipse at 65% 15%, rgba(201,169,78,.04) 0%, transparent 25%),
            radial-gradient(ellipse at 80% 85%, rgba(60,184,104,.07) 0%, transparent 40%),
            linear-gradient(155deg, #030a06 0%, #062010 20%, #0c2e18 40%, #082414 60%, #051208 80%, #030a06 100%);
        }

        /* ── Dim overlay ── */
        .panel__dim { position:absolute; inset:0; background:#000; pointer-events:none; z-index:6; }

        /* ── Particles container ── */
        .particles { position:absolute; inset:0; pointer-events:none; z-index:3; overflow:hidden; }
        .dot { position:absolute; border-radius:50%; }
        .conn-svg { position:absolute; inset:0; width:100%; height:100%; }
        .stream { position:absolute; top:0; width:1px; height:100%; overflow:hidden; }
        .stream-bar { width:1px; height:40px; background:linear-gradient(180deg,transparent,rgba(74,168,232,.35),transparent); }
        .scan { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(74,168,232,.20),transparent); }

        /* ══════════ CONTENT ══════════ */
        .panel__content {
          position:relative; z-index:8;
          height:100%; display:flex; flex-direction:column; justify-content:center;
          padding:clamp(24px,5%,80px);
        }
        .panel--right .panel__content { align-items:flex-end; text-align:right; }

        .eyebrow { display:block; font-size:clamp(10px,1vw,12px); font-weight:500; letter-spacing:.22em; color:var(--text-dim); margin-bottom:clamp(10px,1.5vh,18px); }
        .title { font-family:'Cormorant Garamond',serif; font-size:clamp(30px,5.2vw,72px); font-weight:600; line-height:.96; color:#fff; margin:0 0 clamp(10px,1.5vh,18px); letter-spacing:-.01em; }
        .sub { font-family:'Cormorant Garamond',serif; font-size:clamp(13px,1.4vw,18px); font-weight:400; font-style:italic; color:rgba(238,233,224,.75); margin-bottom:clamp(8px,1vh,14px); }
        .bar { width:32px; height:2px; background:rgba(201,169,78,.45); border-radius:1px; margin-bottom:clamp(12px,1.5vh,20px); transform-origin:left; }
        .desc { font-size:clamp(11px,.95vw,13.5px); line-height:1.75; color:var(--text-muted); max-width:300px; margin-bottom:clamp(18px,2.5vh,30px); }
        .panel--right .desc { margin-left:auto; }

        .btn {
          display:inline-flex; align-items:center; gap:clamp(8px,1vw,12px);
          padding:clamp(10px,1.2vw,14px) clamp(16px,2vw,28px);
          background:rgba(255,255,255,.04); border:1px solid rgba(238,233,224,.18);
          border-radius:2px; color:#fff; font-size:clamp(8px,.9vw,11px); font-weight:500;
          letter-spacing:.14em; text-transform:uppercase;
          transition:all .35s ease; font-family:'Outfit',sans-serif;
          backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
        }
        .panel--left .btn:hover { background:rgba(45,140,200,.12); border-color:rgba(45,140,200,.4); }
        .panel--right .btn:hover { background:rgba(60,184,104,.12); border-color:rgba(60,184,104,.4); }
        .btn__arrow { font-size:clamp(11px,1.2vw,15px); transition:transform .3s ease; }
        .btn:hover .btn__arrow { transform:translateX(3px); }

        /* ══════════ CENTER LOTUS ══════════ */
        .lotus { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:20; pointer-events:none; }
        .lotus__ring {
          width:clamp(80px,8vw,112px); height:clamp(80px,8vw,112px);
          border-radius:50%; border:2px solid rgba(201,169,78,.35);
          display:flex; align-items:center; justify-content:center;
          background:rgba(4,4,6,.78);
          backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
          animation:glowRing 4s ease-in-out infinite;
          position:relative;
        }
        .lotus__ring::before {
          content:''; position:absolute; inset:6px; border-radius:50%;
          border:1px solid rgba(201,169,78,.18);
        }
        .lotus__img { width:clamp(38px,4vw,54px); height:clamp(38px,4vw,54px); border-radius:50%; object-fit:cover; }

        /* ══════════ GOLD DIVIDER ══════════ */
        .divider {
          position:absolute; left:50%; top:0; bottom:0; width:2px; margin-left:-1px; z-index:15; pointer-events:none;
          background:linear-gradient(180deg, transparent 5%, rgba(201,169,78,.12) 25%, rgba(201,169,78,.30) 50%, rgba(201,169,78,.12) 75%, transparent 95%);
        }
        .divider__shimmer {
          position:absolute; width:100%; height:50px;
          background:linear-gradient(180deg, transparent, rgba(201,169,78,.40), transparent);
          animation:shimmer 5s ease-in-out infinite;
        }

        /* ══════════ NAV ══════════ */
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:50;
          display:flex; align-items:center; justify-content:space-between;
          padding:clamp(12px,2.5vw,24px) clamp(16px,4.5vw,56px);
          padding-top:max(clamp(12px,2.5vw,24px), env(safe-area-inset-top));
        }
        .nav__left { display:flex; align-items:center; gap:clamp(6px,1vw,10px); }
        .nav__logo { width:clamp(28px,3.5vw,42px); height:clamp(28px,3.5vw,42px); border-radius:50%; object-fit:cover; }
        .nav__brand { font-family:'Cormorant Garamond',serif; font-size:clamp(18px,2.5vw,28px); font-weight:600; font-style:italic; color:var(--gold); }
        .nav__link { color:var(--text); font-size:clamp(12px,1.1vw,14px); font-weight:400; letter-spacing:.02em; border-bottom:2px solid var(--gold); padding-bottom:4px; }

        /* ══════════ MOBILE ══════════ */
        @media (max-width:768px) {
          .hero__grid { flex-direction:column; }
          .panel { flex:none !important; min-height:50vh; min-height:50dvh; }
          .panel__content { padding:clamp(56px,10vh,90px) clamp(20px,6%,36px) clamp(28px,5vh,44px); justify-content:flex-end; }
          .panel--right .panel__content { align-items:flex-start; text-align:left; }
          .panel--right .desc { margin-left:0; }
          .title { font-size:clamp(28px,9vw,44px); }
          .sub { font-size:clamp(13px,3.5vw,16px); }
          .desc { font-size:clamp(12px,3vw,14px); max-width:none; }
          .btn { padding:12px 22px; font-size:9px; width:auto; }
          .divider { display:none; }
          .lotus { top:50vh; top:50dvh; }
          .lotus__ring { width:72px; height:72px; }
          .lotus__img { width:36px; height:36px; }
        }

        @media (max-width:480px) {
          .panel__content { padding:clamp(48px,8vh,70px) 18px clamp(22px,4vh,36px); }
          .title { font-size:clamp(24px,8vw,36px); }
          .btn { padding:11px 18px; font-size:8px; letter-spacing:.10em; }
          .lotus__ring { width:62px; height:62px; }
          .lotus__img { width:30px; height:30px; }
        }

        @media (max-width:375px) {
          .title { font-size:clamp(22px,7.5vw,30px); }
          .btn { padding:10px 15px; font-size:7.5px; }
        }
      `}</style>

      {/* Navigation */}
      <motion.nav className="nav"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -10 }}
        transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="nav__left">
          <img className="nav__logo" src="/logo.png" alt="LotusBloom" />
          <span className="nav__brand">LotusBloom</span>
        </div>
        <a className="nav__link" href="#">About</a>
      </motion.nav>

      {/* Hero Grid */}
      <div className="hero__grid">
        <Panel side="left" hoverState={L} ready={ready} px={px} py={py}
          onEnter={() => setHov('left')} onLeave={() => setHov(null)}
          onTap={() => setHov(h => h === 'left' ? null : 'left')} />

        <Panel side="right" hoverState={R} ready={ready} px={px} py={py}
          onEnter={() => setHov('right')} onLeave={() => setHov(null)}
          onTap={() => setHov(h => h === 'right' ? null : 'right')} />

        {/* Center Lotus */}
        <motion.div className="lotus"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.85, y: py * -8 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="lotus__ring">
            <img className="lotus__img" src="/logo.png" alt="" />
          </div>
        </motion.div>

        {/* Gold Divider */}
        <div className="divider"><div className="divider__shimmer" /></div>
      </div>
    </div>
  )
}
