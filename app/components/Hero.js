'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

/* ═══ DATA SIDE EFFECTS ═══ */
function DataOverlay({ active }) {
  const nodes = useMemo(() => Array.from({ length: 22 }, () => ({
    x: 5+Math.random()*90, y: 5+Math.random()*90,
    s: 2+Math.random()*3, d: 1.5+Math.random()*2.5, dl: Math.random()*2,
  })), [])
  const streams = useMemo(() => Array.from({ length: 10 }, () => ({
    x: 8+Math.random()*84, d: 1.5+Math.random()*2, dl: Math.random()*3,
  })), [])
  const lines = useMemo(() => Array.from({ length: 8 }, () => ({
    x1: Math.random()*100, y1: Math.random()*100,
    x2: Math.random()*100, y2: Math.random()*100,
    d: 2+Math.random()*3, dl: Math.random()*2,
  })), [])
  return (
    <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.6 }}
      style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:3,overflow:'hidden' }}>
      {nodes.map((n,i) => <div key={`dn${i}`} style={{ position:'absolute',left:`${n.x}%`,top:`${n.y}%`,width:n.s,height:n.s,borderRadius:'50%',background:'#4aa8e8',boxShadow:'0 0 8px rgba(74,168,232,.6),0 0 20px rgba(74,168,232,.2)',animation:active?`dataPulse ${n.d}s ease-in-out ${n.dl}s infinite`:'none' }}/>)}
      <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%' }}>
        {lines.map((l,i) => <line key={`dl${i}`} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`} stroke="rgba(74,168,232,.12)" strokeWidth=".5" style={{ animation:active?`lineFlash ${l.d}s ease-in-out ${l.dl}s infinite`:'none' }}/>)}
      </svg>
      {streams.map((s,i) => <div key={`ds${i}`} style={{ position:'absolute',left:`${s.x}%`,top:0,width:1,height:'100%',overflow:'hidden' }}><div style={{ width:1,height:40,background:'linear-gradient(180deg,transparent,rgba(74,168,232,.4),transparent)',animation:active?`dataStream ${s.d}s linear ${s.dl}s infinite`:'none' }}/></div>)}
      <div style={{ position:'absolute',left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(74,168,232,.25),transparent)',animation:active?'scanLine 3s ease-in-out infinite':'none' }}/>
    </motion.div>
  )
}

/* ═══ FARM SIDE EFFECTS ═══ */
function FarmOverlay({ active }) {
  const stems = useMemo(() => Array.from({ length: 45 }, () => ({
    x: 2+Math.random()*96, h: 15+Math.random()*55,
    d: 2+Math.random()*2, dl: Math.random()*2, w: .8+Math.random()*1.2,
  })), [])
  const spores = useMemo(() => Array.from({ length: 24 }, () => ({
    x: Math.random()*100, y: 20+Math.random()*70,
    s: 1.5+Math.random()*2.5, d: 3+Math.random()*5, dl: Math.random()*4,
  })), [])
  return (
    <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.6 }}
      style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:3,overflow:'hidden' }}>
      <svg style={{ position:'absolute',bottom:0,left:0,width:'100%',height:'75%' }}>
        {stems.map((s,i) => <line key={`fs${i}`} x1={`${s.x}%`} y1="100%" x2={`${s.x}%`} y2={`${100-s.h}%`} stroke="rgba(60,190,100,.2)" strokeWidth={s.w} strokeLinecap="round" style={{ transformOrigin:`${s.x}% 100%`,animation:active?`stemSway ${s.d}s ease-in-out ${s.dl}s infinite`:'none' }}/>)}
      </svg>
      {spores.map((p,i) => <div key={`fp${i}`} style={{ position:'absolute',left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,borderRadius:'50%',background:'rgba(180,220,100,.45)',boxShadow:'0 0 6px rgba(180,220,100,.3)',animation:active?`sporeDrift ${p.d}s ease-in-out ${p.dl}s infinite`:'none' }}/>)}
    </motion.div>
  )
}

/* ═══ AMBIENT BACKGROUND (always visible, per-panel) ═══ */
function DataAmbient() {
  const dots = useMemo(() => Array.from({ length: 40 }, () => ({
    x: Math.random()*100, y: Math.random()*100,
    s: 1+Math.random()*2, o: .08+Math.random()*.15,
    d: 3+Math.random()*4, dl: Math.random()*3,
  })), [])
  return (
    <div style={{ position:'absolute',inset:0,zIndex:1,overflow:'hidden',pointerEvents:'none' }}>
      {dots.map((d,i) => <div key={`ab${i}`} style={{ position:'absolute',left:`${d.x}%`,top:`${d.y}%`,width:d.s,height:d.s,borderRadius:'50%',background:'#4aa8e8',opacity:d.o,boxShadow:`0 0 ${d.s*3}px rgba(74,168,232,.3)`,animation:`dataPulse ${d.d}s ease-in-out ${d.dl}s infinite` }}/>)}
    </div>
  )
}

function FarmAmbient() {
  const dots = useMemo(() => Array.from({ length: 30 }, () => ({
    x: Math.random()*100, y: Math.random()*100,
    s: 1+Math.random()*2.5, o: .06+Math.random()*.12,
    d: 4+Math.random()*5, dl: Math.random()*4,
  })), [])
  return (
    <div style={{ position:'absolute',inset:0,zIndex:1,overflow:'hidden',pointerEvents:'none' }}>
      {dots.map((d,i) => <div key={`fa${i}`} style={{ position:'absolute',left:`${d.x}%`,top:`${d.y}%`,width:d.s,height:d.s,borderRadius:'50%',background:'#4ade80',opacity:d.o,boxShadow:`0 0 ${d.s*3}px rgba(74,222,128,.2)`,animation:`sporeDrift ${d.d}s ease-in-out ${d.dl}s infinite` }}/>)}
    </div>
  )
}

/* ═══ PANEL ═══ */
function Panel({ side, active, onActivate, onDeactivate, parallaxX, parallaxY, ready }) {
  const isLeft = side === 'left'
  return (
    <section className={`panel panel-${side}`}
      onMouseEnter={onActivate} onMouseLeave={onDeactivate}
      onClick={() => onActivate('toggle')}>

      {/* CSS atmospheric background */}
      <div className="panel-atmosphere" style={{
        transform: `translate(${isLeft ? parallaxX*12 : parallaxX*-12}px, ${parallaxY*6}px) scale(${active === true ? 1.06 : 1})`,
      }} />

      {/* Always-on ambient particles */}
      {isLeft ? <DataAmbient /> : <FarmAmbient />}

      {/* Hover-triggered effects */}
      {isLeft ? <DataOverlay active={active === true} /> : <FarmOverlay active={active === true} />}

      {/* Dim when other side hovered */}
      <motion.div className="panel-dim"
        animate={{ opacity: active === false ? 0.4 : 0 }}
        transition={{ duration: 0.8 }} />

      {/* Content */}
      <div className="panel-content">
        <motion.span className="label"
          initial={{ opacity:0,y:12 }} animate={{ opacity:ready?1:0,y:ready?0:12 }}
          transition={{ delay:isLeft?.2:.25,duration:.5 }}>LOTUSBLOOM</motion.span>

        <motion.h1 className="heading"
          initial={{ opacity:0,y:16 }} animate={{ opacity:ready?1:0,y:ready?0:16 }}
          transition={{ delay:isLeft?.3:.35,duration:.5 }}>
          {isLeft ? <>DATA<br/>OPERATIONS</> : <>AGRICULTURE<br/>&amp; MICROGREENS</>}
        </motion.h1>

        <motion.p className="subtitle"
          initial={{ opacity:0,y:12 }} animate={{ opacity:ready?1:0,y:ready?0:12 }}
          transition={{ delay:.4,duration:.5 }}>
          {isLeft ? 'Intelligent Systems. Smarter Decisions.' : 'Sustainable Farming. Healthier Futures.'}
        </motion.p>

        {isLeft && <motion.div className="gold-bar" initial={{ opacity:0 }} animate={{ opacity:ready?1:0 }} transition={{ delay:.44,duration:.5 }} />}

        <motion.p className="body"
          initial={{ opacity:0,y:12 }} animate={{ opacity:ready?1:0,y:ready?0:12 }}
          transition={{ delay:.48,duration:.5 }}>
          {isLeft
            ? 'We transform complex data into actionable intelligence that drives real results.'
            : 'We cultivate premium microgreens with purpose, precision, and sustainability.'}
        </motion.p>

        <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:ready?1:0,y:ready?0:12 }} transition={{ delay:.52,duration:.5 }}>
          <button className="cta">
            {isLeft ? 'EXPLORE DATA OPERATIONS' : 'EXPLORE AGRICULTURE'}
            <span className="arrow">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══ MAIN ═══ */
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

  const px = mx - 0.5, py = my - 0.5
  const leftActive = hov === 'left' ? true : hov === 'right' ? false : null
  const rightActive = hov === 'right' ? true : hov === 'left' ? false : null

  return (
    <div ref={ref} onMouseMove={onMove} className="hero-root">
      <style>{`
        @keyframes dataPulse{0%,100%{opacity:.2;transform:scale(1)}50%{opacity:.8;transform:scale(1.8)}}
        @keyframes lineFlash{0%,100%{stroke:rgba(74,168,232,.06)}50%{stroke:rgba(74,168,232,.25)}}
        @keyframes dataStream{0%{transform:translateY(-40px)}100%{transform:translateY(100vh)}}
        @keyframes scanLine{0%{top:0;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}
        @keyframes stemSway{0%,100%{transform:rotate(0)}25%{transform:rotate(3deg)}75%{transform:rotate(-3deg)}}
        @keyframes sporeDrift{0%,100%{transform:translate(0,0);opacity:.3}25%{transform:translate(12px,-8px);opacity:.6}50%{transform:translate(20px,-4px);opacity:.4}75%{transform:translate(8px,-12px);opacity:.7}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 30px rgba(201,169,78,.2),0 0 60px rgba(201,169,78,.06)}50%{box-shadow:0 0 45px rgba(201,169,78,.3),0 0 90px rgba(201,169,78,.1)}}
        @keyframes shimmer{0%{transform:translateY(100%);opacity:0}50%{opacity:.35}100%{transform:translateY(-100%);opacity:0}}

        .hero-root { position:relative; width:100%; min-height:100vh; min-height:100dvh; background:#020204; overflow:hidden; }
        .hero-grid { display:flex; min-height:100vh; min-height:100dvh; position:relative; }

        /* ═══ PANELS ═══ */
        .panel { position:relative; flex:1; overflow:hidden; cursor:pointer; transition:flex .8s cubic-bezier(.16,1,.3,1); }
        .panel:hover { flex:1.15; }

        /* Atmospheric CSS backgrounds — no image, pure CSS */
        .panel-atmosphere {
          position:absolute; inset:-30px;
          transition: transform .7s cubic-bezier(.16,1,.3,1);
        }
        .panel-left .panel-atmosphere {
          background:
            radial-gradient(ellipse at 70% 20%, rgba(45,140,200,.12) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 60%, rgba(45,140,200,.08) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, rgba(45,140,200,.05) 0%, transparent 35%),
            radial-gradient(ellipse at 20% 30%, rgba(30,100,180,.06) 0%, transparent 30%),
            linear-gradient(155deg, #040810 0%, #06101e 30%, #081828 50%, #060e1a 75%, #040810 100%);
        }
        .panel-right .panel-atmosphere {
          background:
            radial-gradient(ellipse at 40% 25%, rgba(60,184,104,.10) 0%, transparent 45%),
            radial-gradient(ellipse at 70% 65%, rgba(60,184,104,.07) 0%, transparent 40%),
            radial-gradient(ellipse at 25% 80%, rgba(80,200,120,.05) 0%, transparent 35%),
            radial-gradient(ellipse at 60% 15%, rgba(201,169,78,.04) 0%, transparent 25%),
            linear-gradient(155deg, #040a06 0%, #061a0e 30%, #0a2414 50%, #06140a 75%, #040a06 100%);
        }

        .panel-dim { position:absolute; inset:0; background:#000; z-index:4; pointer-events:none; }

        /* ═══ CONTENT ═══ */
        .panel-content { position:relative; z-index:5; height:100%; display:flex; flex-direction:column; justify-content:center; padding:clamp(24px,5%,80px); }
        .panel-right .panel-content { align-items:flex-end; text-align:right; }

        .label { display:block; font-size:clamp(10px,1vw,12px); font-weight:500; letter-spacing:.22em; color:rgba(238,233,224,.5); margin-bottom:clamp(10px,1.5vh,18px); }
        .heading { font-family:'Cormorant Garamond',serif; font-size:clamp(28px,5vw,72px); font-weight:600; line-height:.96; color:#fff; margin:0 0 clamp(10px,1.5vh,18px); letter-spacing:-.01em; }
        .subtitle { font-family:'Cormorant Garamond',serif; font-size:clamp(13px,1.4vw,18px); font-weight:400; font-style:italic; color:rgba(238,233,224,.75); margin-bottom:clamp(8px,1vh,14px); }
        .gold-bar { width:32px; height:2px; background:rgba(201,169,78,.45); border-radius:1px; margin-bottom:clamp(12px,1.5vh,20px); }
        .body { font-size:clamp(11px,.95vw,13.5px); line-height:1.75; color:rgba(238,233,224,.45); max-width:300px; margin-bottom:clamp(18px,2.5vh,30px); }
        .panel-right .body { margin-left:auto; }

        .cta { display:inline-flex; align-items:center; gap:clamp(8px,1vw,12px); padding:clamp(10px,1.2vw,14px) clamp(16px,2vw,28px); background:rgba(255,255,255,.04); border:1px solid rgba(238,233,224,.18); border-radius:2px; color:#fff; font-size:clamp(8px,.9vw,11px); font-weight:500; letter-spacing:.14em; text-transform:uppercase; cursor:pointer; transition:all .35s ease; font-family:'Outfit',sans-serif; backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); }
        .panel-left .cta:hover { background:rgba(45,140,200,.12); border-color:rgba(45,140,200,.4); }
        .panel-right .cta:hover { background:rgba(60,184,104,.12); border-color:rgba(60,184,104,.4); }
        .arrow { font-size:clamp(11px,1.2vw,15px); }

        /* ═══ CENTER LOTUS ═══ */
        .center-lotus { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:20; pointer-events:none; }
        .lotus-ring { width:clamp(80px,8vw,110px); height:clamp(80px,8vw,110px); border-radius:50%; border:2px solid rgba(201,169,78,.35); display:flex; align-items:center; justify-content:center; background:rgba(4,4,6,.8); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); animation:glowPulse 4s ease-in-out infinite; }
        .lotus-ring img { width:clamp(38px,4vw,54px); height:clamp(38px,4vw,54px); border-radius:50%; object-fit:cover; }

        /* ═══ GOLD LINE ═══ */
        .gold-line { position:absolute; left:50%; top:0; bottom:0; width:2px; margin-left:-1px; z-index:15; pointer-events:none; background:linear-gradient(180deg,transparent 5%,rgba(201,169,78,.12) 25%,rgba(201,169,78,.30) 50%,rgba(201,169,78,.12) 75%,transparent 95%); }
        .gold-line-shimmer { position:absolute; width:100%; height:45px; background:linear-gradient(180deg,transparent,rgba(201,169,78,.4),transparent); animation:shimmer 5.5s ease-in-out infinite; }

        /* ═══ NAV ═══ */
        .site-nav { position:fixed; top:0; left:0; right:0; z-index:50; display:flex; align-items:center; justify-content:space-between; padding:clamp(12px,2.5vw,28px) clamp(16px,4.5vw,56px); padding-top:max(clamp(12px,2.5vw,28px),env(safe-area-inset-top)); }
        .nav-left { display:flex; align-items:center; gap:clamp(6px,1vw,10px); }
        .nav-logo { width:clamp(28px,4vw,42px); height:clamp(28px,4vw,42px); border-radius:50%; object-fit:cover; }
        .nav-brand { font-family:'Cormorant Garamond',serif; font-size:clamp(18px,2.5vw,30px); font-weight:600; font-style:italic; color:#c9a94e; }
        .nav-link { color:#eee9e0; font-size:clamp(12px,1.2vw,14px); font-weight:400; letter-spacing:.02em; border-bottom:2px solid #c9a94e; padding-bottom:4px; font-family:'Outfit',sans-serif; }

        /* ═══ MOBILE ═══ */
        @media (max-width:768px) {
          .hero-grid { flex-direction:column; }
          .panel { flex:none; min-height:50vh; min-height:50dvh; }
          .panel:hover { flex:none; }
          .panel-content { padding:clamp(60px,12vh,100px) clamp(20px,6%,40px) clamp(28px,5vh,50px); }
          .panel-right .panel-content { align-items:flex-start; text-align:left; }
          .panel-right .body { margin-left:0; }
          .heading { font-size:clamp(26px,8vw,42px); }
          .subtitle { font-size:clamp(13px,3.5vw,16px); }
          .body { font-size:clamp(11.5px,3vw,13px); max-width:none; }
          .cta { padding:12px 20px; font-size:9px; }
          .gold-line { display:none; }
          .center-lotus { top:50vh; top:50dvh; }
          .lotus-ring { width:72px; height:72px; }
          .lotus-ring img { width:36px; height:36px; }
        }
        @media (max-width:480px) {
          .panel-content { padding:clamp(50px,10vh,80px) 20px clamp(24px,4vh,36px); }
          .heading { font-size:clamp(24px,7.5vw,36px); }
          .cta { padding:11px 16px; font-size:8px; letter-spacing:.10em; }
          .lotus-ring { width:64px; height:64px; }
          .lotus-ring img { width:32px; height:32px; }
        }
        @media (max-width:375px) {
          .heading { font-size:clamp(22px,7vw,30px); }
          .cta { padding:10px 14px; font-size:7.5px; }
        }
      `}</style>

      {/* NAV */}
      <motion.nav className="site-nav" initial={{opacity:0,y:-10}} animate={{opacity:ready?1:0,y:ready?0:-10}} transition={{duration:.5,delay:.1}}>
        <div className="nav-left">
          <img className="nav-logo" src="/logo.png" alt="LotusBloom"/>
          <span className="nav-brand">LotusBloom</span>
        </div>
        <a className="nav-link" href="#">About</a>
      </motion.nav>

      {/* GRID */}
      <div className="hero-grid">
        <Panel side="left" active={leftActive} onActivate={()=>setHov('left')} onDeactivate={()=>setHov(null)} parallaxX={px} parallaxY={py} ready={ready}/>
        <Panel side="right" active={rightActive} onActivate={()=>setHov('right')} onDeactivate={()=>setHov(null)} parallaxX={px} parallaxY={py} ready={ready}/>

        <motion.div className="center-lotus" initial={{opacity:0,scale:.85}} animate={{opacity:ready?1:0,scale:ready?1:.85,y:py*-8}} transition={{duration:.6,delay:.2}}>
          <div className="lotus-ring"><img src="/logo.png" alt=""/></div>
        </motion.div>

        <div className="gold-line"><div className="gold-line-shimmer"/></div>
      </div>
    </div>
  )
}
