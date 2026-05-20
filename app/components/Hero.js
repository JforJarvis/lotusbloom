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

        /* ═══ DESKTOP: side-by-side, full viewport ═══ */
        .hero-wrap { display:flex; height:100vh; height:100dvh; position:relative; overflow:hidden; }
        .hero-side { flex:1; position:relative; overflow:hidden; cursor:pointer; transition:flex .8s cubic-bezier(.16,1,.3,1),filter .8s ease; }
        .hero-side:hover { flex:1.15; }
        .hero-bg { position:absolute; inset:-30px; background-image:url(/hero.jpg); background-size:cover; background-repeat:no-repeat; transition:transform .7s cubic-bezier(.16,1,.3,1); }
        .side-left .hero-bg { background-position:left center; }
        .side-right .hero-bg { background-position:right center; }
        .hero-side:hover .hero-bg { transform:scale(1.06); }

        /* Dim opposite side */
        .hero-wrap:has(.side-left:hover) .side-right::after,
        .hero-wrap:has(.side-right:hover) .side-left::after { opacity:1; }
        .hero-side::after { content:''; position:absolute; inset:0; background:rgba(0,0,0,.4); opacity:0; transition:opacity .8s ease; pointer-events:none; z-index:3; }

        /* CTA buttons positioned over the image */
        .cta-left { position:absolute; z-index:8; left:clamp(24px,6.5%,96px); bottom:clamp(18%,20%,22%); }
        .cta-right { position:absolute; z-index:8; right:clamp(24px,6.5%,96px); bottom:clamp(18%,20%,22%); }
        .lb-cta { display:inline-flex; align-items:center; gap:12px; padding:13px 26px; background:rgba(255,255,255,.05); border:1px solid rgba(238,233,224,.22); border-radius:2px; color:#fff; font-size:10.5px; font-weight:500; letter-spacing:.14em; text-transform:uppercase; cursor:pointer; transition:all .35s ease; font-family:'Outfit',sans-serif; backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); }
        .side-left .lb-cta:hover { background:rgba(45,140,200,.14); border-color:rgba(45,140,200,.45); }
        .side-right .lb-cta:hover { background:rgba(60,184,104,.14); border-color:rgba(60,184,104,.45); }

        .hero-vignette { position:absolute; bottom:0; left:0; right:0; height:100px; background:linear-gradient(transparent,rgba(2,2,4,.7)); z-index:10; pointer-events:none; }

        /* ═══ MOBILE: stack vertically ═══ */
        @media (max-width: 768px) {
          .hero-wrap { flex-direction:column; height:auto; min-height:100dvh; }
          .hero-side { flex:none; height:50vh; height:50dvh; min-height:300px; }
          .hero-side:hover { flex:none; }
          .side-left .hero-bg { background-position:20% center; background-size:200% auto; }
          .side-right .hero-bg { background-position:80% center; background-size:200% auto; }
          .cta-left { left:5%; bottom:10%; }
          .cta-right { right:5%; bottom:10%; }
          .lb-cta { padding:10px 16px; font-size:8px; letter-spacing:.10em; gap:8px; backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); background:rgba(0,0,0,.35); }
          nav img { width:30px !important; height:30px !important; }
          nav span { font-size:18px !important; }
          nav a { font-size:12px !important; }
        }
        @media (max-width: 480px) {
          .side-left .hero-bg { background-position:25% center; }
          .side-right .hero-bg { background-position:75% center; }
          .lb-cta { padding:9px 14px; font-size:7px; }
          nav img { width:26px !important; height:26px !important; }
          nav span { font-size:16px !important; }
        }
        @media (max-width: 375px) {
          .lb-cta { padding:8px 12px; font-size:6.5px; }
        }
      `}</style>

      {/* NAV */}
      <motion.nav initial={{opacity:0,y:-10}} animate={{opacity:ok?1:0,y:ok?0:-10}} transition={{duration:.5,delay:.1}}
        style={{ position:'fixed',top:0,left:0,right:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'clamp(14px,2.5vw,28px) clamp(18px,4.5vw,56px)',
          paddingTop:'max(clamp(14px,2.5vw,28px), env(safe-area-inset-top))',
          background:'rgba(2,2,4,.4)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)' }}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <img src="/logo.png" alt="LotusBloom" style={{width:42,height:42,borderRadius:'50%',objectFit:'cover'}}/>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(22px,2.8vw,30px)',fontWeight:600,fontStyle:'italic',color:'#c9a94e'}}>LotusBloom</span>
        </div>
        <a href="#" style={{color:'#eee9e0',fontSize:14,fontWeight:400,letterSpacing:'.02em',borderBottom:'2px solid #c9a94e',paddingBottom:4,fontFamily:"'Outfit',sans-serif"}}>About</a>
      </motion.nav>

      {/* HERO */}
      <div className="hero-wrap">
        {/* LEFT */}
        <div className="hero-side side-left"
          onMouseEnter={()=>setHov('left')} onMouseLeave={()=>setHov(null)}
          onClick={()=>setHov(p=>p==='left'?null:'left')}>
          <div className="hero-bg" style={{transform:`translate(${px*14}px,${py*8}px)`}}/>
          <DataOverlay active={hov==='left'}/>
          <div className="cta-left">
            <button className="lb-cta">EXPLORE DATA OPERATIONS <span style={{fontSize:14}}>→</span></button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-side side-right"
          onMouseEnter={()=>setHov('right')} onMouseLeave={()=>setHov(null)}
          onClick={()=>setHov(p=>p==='right'?null:'right')}>
          <div className="hero-bg" style={{transform:`translate(${px*-14}px,${py*8}px)`}}/>
          <FarmOverlay active={hov==='right'}/>
          <div className="cta-right">
            <button className="lb-cta">EXPLORE AGRICULTURE <span style={{fontSize:14}}>→</span></button>
          </div>
        </div>

        <div className="hero-vignette"/>
      </div>
    </div>
  )
}
