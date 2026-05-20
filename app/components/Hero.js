'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

function DataOverlay({ active }) {
  const nodes = useMemo(() => Array.from({ length: 18 }, () => ({ x: 5+Math.random()*90, y: 8+Math.random()*84, s: 2+Math.random()*3, d: 1.5+Math.random()*2.5, dl: Math.random()*2 })), [])
  const streams = useMemo(() => Array.from({ length: 8 }, () => ({ x: 10+Math.random()*80, d: 1.5+Math.random()*2, dl: Math.random()*3 })), [])
  return (
    <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.6 }}
      style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:4,overflow:'hidden' }}>
      {nodes.map((n,i) => <div key={i} style={{ position:'absolute',left:`${n.x}%`,top:`${n.y}%`,width:n.s,height:n.s,borderRadius:'50%',background:'#4aa8e8',boxShadow:'0 0 8px rgba(74,168,232,.6),0 0 20px rgba(74,168,232,.2)',animation:active?`dataPulse ${n.d}s ease-in-out ${n.dl}s infinite`:'none' }}/>)}
      {streams.map((s,i) => <div key={`s${i}`} style={{ position:'absolute',left:`${s.x}%`,top:0,width:1,height:'100%',overflow:'hidden' }}><div style={{ width:1,height:40,background:'linear-gradient(180deg,transparent,rgba(74,168,232,.4),transparent)',animation:active?`dataStream ${s.d}s linear ${s.dl}s infinite`:'none' }}/></div>)}
      <div style={{ position:'absolute',left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(74,168,232,.25),transparent)',animation:active?'scanLine 3s ease-in-out infinite':'none' }}/>
    </motion.div>
  )
}

function FarmOverlay({ active }) {
  const stems = useMemo(() => Array.from({ length: 40 }, () => ({ x: 2+Math.random()*96, h: 20+Math.random()*50, d: 2+Math.random()*2, dl: Math.random()*2, w: 1+Math.random() })), [])
  const spores = useMemo(() => Array.from({ length: 20 }, () => ({ x: Math.random()*100, y: 30+Math.random()*60, s: 1.5+Math.random()*2.5, d: 3+Math.random()*5, dl: Math.random()*4 })), [])
  return (
    <motion.div animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.6 }}
      style={{ position:'absolute',inset:0,pointerEvents:'none',zIndex:4,overflow:'hidden' }}>
      <svg style={{ position:'absolute',bottom:0,left:0,width:'100%',height:'70%' }}>
        {stems.map((s,i) => <line key={i} x1={`${s.x}%`} y1="100%" x2={`${s.x}%`} y2={`${100-s.h}%`} stroke="rgba(60,190,100,.25)" strokeWidth={s.w} strokeLinecap="round" style={{ transformOrigin:`${s.x}% 100%`,animation:active?`stemSway ${s.d}s ease-in-out ${s.dl}s infinite`:'none' }}/>)}
      </svg>
      {spores.map((p,i) => <div key={i} style={{ position:'absolute',left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,borderRadius:'50%',background:'rgba(180,220,100,.5)',boxShadow:'0 0 6px rgba(180,220,100,.3)',animation:active?`sporeDrift ${p.d}s ease-in-out ${p.dl}s infinite`:'none' }}/>)}
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

  return (
    <div ref={ref} onMouseMove={onMove} style={{ background:'#020204', minHeight:'100vh' }}>
      <style>{`
        @keyframes dataPulse{0%,100%{opacity:.2;transform:scale(1)}50%{opacity:.8;transform:scale(1.8)}}
        @keyframes dataStream{0%{transform:translateY(-40px)}100%{transform:translateY(100vh)}}
        @keyframes scanLine{0%{top:0;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}
        @keyframes stemSway{0%,100%{transform:rotate(0)}25%{transform:rotate(3deg)}75%{transform:rotate(-3deg)}}
        @keyframes sporeDrift{0%,100%{transform:translate(0,0);opacity:.3}25%{transform:translate(12px,-8px);opacity:.6}50%{transform:translate(20px,-4px);opacity:.4}75%{transform:translate(8px,-12px);opacity:.7}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 30px rgba(201,169,78,.2),0 0 60px rgba(201,169,78,.06)}50%{box-shadow:0 0 45px rgba(201,169,78,.3),0 0 90px rgba(201,169,78,.1)}}

        .hero-wrap { display:flex; height:100vh; height:100dvh; position:relative; overflow:hidden; }
        .hero-side { flex:1; position:relative; overflow:hidden; cursor:pointer; transition:flex .8s cubic-bezier(.16,1,.3,1),filter .8s ease; }
        .hero-side:hover { flex:1.15; }
        .hero-bg { position:absolute; inset:-30px; background-size:cover; background-repeat:no-repeat; transition:transform .7s cubic-bezier(.16,1,.3,1); }
        .side-left .hero-bg { background-image:url(/hero.jpg); background-position:left center; }
        .side-right .hero-bg { background-image:url(/hero.jpg); background-position:right center; }
        .hero-side:hover .hero-bg { transform:scale(1.06); }
        .side-content { position:relative; z-index:5; height:100%; display:flex; flex-direction:column; justify-content:center; padding:0 clamp(20px,5%,80px); }
        .side-right .side-content { align-items:flex-end; text-align:right; }

        /* Dim the opposite side on hover */
        .hero-wrap:has(.side-left:hover) .side-right::after,
        .hero-wrap:has(.side-right:hover) .side-left::after {
          opacity: 1;
        }
        .hero-side::after {
          content:''; position:absolute; inset:0; background:rgba(0,0,0,.4);
          opacity:0; transition:opacity .8s ease; pointer-events:none; z-index:3;
        }

        /* Center logo */
        .center-orb { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); z-index:20; pointer-events:none; }
        .center-ring { width:110px; height:110px; border-radius:50%; border:2px solid rgba(201,169,78,.38); display:flex; align-items:center; justify-content:center; background:rgba(4,4,6,.75); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); animation:glowPulse 4s ease-in-out infinite; }
        .center-ring img { width:52px; height:52px; border-radius:50%; object-fit:cover; }

        /* Gold divider */
        .gold-line { position:absolute; left:50%; top:0; bottom:0; width:2px; margin-left:-1px; z-index:15; pointer-events:none; background:linear-gradient(180deg,transparent 5%,rgba(201,169,78,.15) 25%,rgba(201,169,78,.35) 50%,rgba(201,169,78,.15) 75%,transparent 95%); }

        /* Label */
        .lb-label { font-size:11px; font-weight:500; letter-spacing:.22em; color:rgba(238,233,224,.55); margin-bottom:16px; }
        /* Heading */
        .lb-heading { font-family:'Cormorant Garamond',serif; font-size:clamp(36px,5.5vw,72px); font-weight:600; line-height:.96; color:#fff; margin:0 0 16px; letter-spacing:-.01em; }
        /* Subtitle */
        .lb-sub { font-family:'Cormorant Garamond',serif; font-size:clamp(14px,1.5vw,18px); font-weight:400; font-style:italic; color:rgba(238,233,224,.8); margin-bottom:12px; }
        /* Divider bar */
        .lb-bar { width:32px; height:2px; background:rgba(201,169,78,.45); border-radius:1px; margin-bottom:18px; }
        /* Body */
        .lb-body { font-size:clamp(11px,.95vw,13.5px); line-height:1.75; color:rgba(238,233,224,.5); max-width:280px; margin-bottom:28px; }
        .side-right .lb-body { margin-left:auto; }
        /* CTA */
        .lb-cta { display:inline-flex; align-items:center; gap:12px; padding:13px 26px; background:rgba(255,255,255,.05); border:1px solid rgba(238,233,224,.22); border-radius:2px; color:#fff; font-size:10.5px; font-weight:500; letter-spacing:.14em; text-transform:uppercase; cursor:pointer; transition:all .35s ease; font-family:'Outfit',sans-serif; backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); }
        .side-left .lb-cta:hover { background:rgba(45,140,200,.14); border-color:rgba(45,140,200,.45); }
        .side-right .lb-cta:hover { background:rgba(60,184,104,.14); border-color:rgba(60,184,104,.45); }

        /* Bottom vignette */
        .hero-vignette { position:absolute; bottom:0; left:0; right:0; height:100px; background:linear-gradient(transparent,rgba(2,2,4,.7)); z-index:10; pointer-events:none; }

        /* ═══════════════════════════════
           MOBILE — stacks vertically
           ═══════════════════════════════ */
        @media (max-width: 768px) {
          .hero-wrap { flex-direction:column; height:auto; min-height:100dvh; }
          .hero-side { flex:none; min-height:50vh; min-height:50dvh; }
          .hero-side:hover { flex:none; }
          .side-left .hero-bg { background-position:35% 30%; }
          .side-right .hero-bg { background-position:75% 40%; }
          .side-content { padding:clamp(60px,12vh,100px) clamp(20px,6%,40px) clamp(30px,6vh,60px); }
          .side-right .side-content { align-items:flex-start; text-align:left; }
          .side-right .lb-body { margin-left:0; }
          .gold-line { display:none; }
          .center-orb { top:50vh; top:50dvh; }
          .center-ring { width:80px; height:80px; }
          .center-ring img { width:40px; height:40px; }
          .lb-heading { font-size:clamp(28px,8vw,44px); }
          .lb-sub { font-size:clamp(13px,3.5vw,16px); }
          .lb-body { font-size:clamp(11px,3vw,13px); max-width:none; }
          .lb-cta { padding:12px 20px; font-size:9px; }

          /* Nav */
          nav img { width:30px !important; height:30px !important; }
          nav span { font-size:18px !important; }
          nav a { font-size:12px !important; }
        }

        @media (max-width: 480px) {
          .side-content { padding:clamp(50px,10vh,80px) 20px clamp(24px,5vh,40px); }
          .lb-heading { font-size:clamp(24px,7vw,36px); }
          .center-ring { width:68px; height:68px; }
          .center-ring img { width:34px; height:34px; }
          .lb-cta { padding:11px 16px; font-size:8px; letter-spacing:.10em; }
          nav img { width:26px !important; height:26px !important; }
          nav span { font-size:16px !important; }
        }

        @media (max-width: 375px) {
          .lb-heading { font-size:clamp(22px,6.5vw,30px); }
          .lb-cta { padding:10px 14px; font-size:7.5px; }
        }
      `}</style>

      {/* NAV */}
      <motion.nav initial={{ opacity:0,y:-10 }} animate={{ opacity:ok?1:0,y:ok?0:-10 }}
        transition={{ duration:0.5,delay:0.1 }}
        style={{ position:'fixed',top:0,left:0,right:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'clamp(14px,2.5vw,28px) clamp(18px,4.5vw,56px)',
          paddingTop:'max(clamp(14px,2.5vw,28px), env(safe-area-inset-top))',
          background:'rgba(2,2,4,.4)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)' }}>
        <div style={{ display:'flex',alignItems:'center',gap:8 }}>
          <img src="/logo.png" alt="LotusBloom" style={{ width:42,height:42,borderRadius:'50%',objectFit:'cover' }}/>
          <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,2.8vw,30px)',fontWeight:600,fontStyle:'italic',color:'#c9a94e' }}>LotusBloom</span>
        </div>
        <a href="#" style={{ color:'#eee9e0',fontSize:14,fontWeight:400,letterSpacing:'.02em',borderBottom:'2px solid #c9a94e',paddingBottom:4,fontFamily:"'Outfit',sans-serif" }}>About</a>
      </motion.nav>

      {/* SPLIT HERO */}
      <div className="hero-wrap">

        {/* LEFT — DATA OPERATIONS */}
        <div className="hero-side side-left"
          onMouseEnter={() => setHov('left')} onMouseLeave={() => setHov(null)}
          onClick={() => setHov(p => p==='left'?null:'left')}>
          <div className="hero-bg" style={{ transform:`translate(${px*14}px,${py*8}px)` }}/>
          <DataOverlay active={hov==='left'}/>
          <div className="side-content">
            <motion.span className="lb-label" initial={{opacity:0,y:12}} animate={{opacity:ok?1:0,y:ok?0:12}} transition={{delay:.2,duration:.5}}>LOTUSBLOOM</motion.span>
            <motion.h1 className="lb-heading" initial={{opacity:0,y:16}} animate={{opacity:ok?1:0,y:ok?0:16}} transition={{delay:.3,duration:.5}}>DATA<br/>OPERATIONS</motion.h1>
            <motion.p className="lb-sub" initial={{opacity:0,y:12}} animate={{opacity:ok?1:0,y:ok?0:12}} transition={{delay:.38,duration:.5}}>Intelligent Systems. Smarter Decisions.</motion.p>
            <motion.div className="lb-bar" initial={{opacity:0}} animate={{opacity:ok?1:0}} transition={{delay:.42,duration:.5}}/>
            <motion.p className="lb-body" initial={{opacity:0,y:12}} animate={{opacity:ok?1:0,y:ok?0:12}} transition={{delay:.46,duration:.5}}>We transform complex data into actionable intelligence that drives real results.</motion.p>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:ok?1:0,y:ok?0:12}} transition={{delay:.5,duration:.5}}>
              <button className="lb-cta">EXPLORE DATA OPERATIONS <span style={{fontSize:14}}>→</span></button>
            </motion.div>
          </div>
        </div>

        {/* RIGHT — AGRICULTURE */}
        <div className="hero-side side-right"
          onMouseEnter={() => setHov('right')} onMouseLeave={() => setHov(null)}
          onClick={() => setHov(p => p==='right'?null:'right')}>
          <div className="hero-bg" style={{ transform:`translate(${px*-14}px,${py*8}px)` }}/>
          <FarmOverlay active={hov==='right'}/>
          <div className="side-content">
            <motion.span className="lb-label" initial={{opacity:0,y:12}} animate={{opacity:ok?1:0,y:ok?0:12}} transition={{delay:.25,duration:.5}}>LOTUSBLOOM</motion.span>
            <motion.h1 className="lb-heading" initial={{opacity:0,y:16}} animate={{opacity:ok?1:0,y:ok?0:16}} transition={{delay:.35,duration:.5}}>AGRICULTURE<br/>&amp; MICROGREENS</motion.h1>
            <motion.p className="lb-sub" initial={{opacity:0,y:12}} animate={{opacity:ok?1:0,y:ok?0:12}} transition={{delay:.42,duration:.5}}>Sustainable Farming. Healthier Futures.</motion.p>
            <motion.p className="lb-body" initial={{opacity:0,y:12}} animate={{opacity:ok?1:0,y:ok?0:12}} transition={{delay:.46,duration:.5}}>We cultivate premium microgreens with purpose, precision, and sustainability.</motion.p>
            <motion.div initial={{opacity:0,y:12}} animate={{opacity:ok?1:0,y:ok?0:12}} transition={{delay:.5,duration:.5}}>
              <button className="lb-cta">EXPLORE AGRICULTURE <span style={{fontSize:14}}>→</span></button>
            </motion.div>
          </div>
        </div>

        {/* CENTER LOTUS */}
        <div className="center-orb">
          <div className="center-ring"><img src="/logo.png" alt=""/></div>
        </div>

        {/* GOLD LINE */}
        <div className="gold-line"/>

        {/* VIGNETTE */}
        <div className="hero-vignette"/>
      </div>
    </div>
  )
}
