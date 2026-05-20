'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

/* ═══ PARTICLES ═══ */
function DataFX({ active }) {
  const nodes = useMemo(()=>Array.from({length:30},()=>({x:Math.random()*100,y:Math.random()*100,s:1.5+Math.random()*3,d:1.5+Math.random()*3,dl:Math.random()*2,o:.1+Math.random()*.2})),[])
  const conns = useMemo(()=>Array.from({length:14},()=>({x1:Math.random()*100,y1:Math.random()*100,x2:Math.random()*100,y2:Math.random()*100,d:2+Math.random()*4,dl:Math.random()*2})),[])
  const streams = useMemo(()=>Array.from({length:10},()=>({x:5+Math.random()*90,d:1.2+Math.random()*2.5,dl:Math.random()*3})),[])
  return (
    <div className="fx">
      {nodes.map((n,i)=><div key={`dn${i}`} className="dot" style={{left:`${n.x}%`,top:`${n.y}%`,width:n.s,height:n.s,background:'var(--cyan-bright)',opacity:n.o,boxShadow:`0 0 ${n.s*3}px var(--cyan),0 0 ${n.s*8}px rgba(74,168,232,.12)`,animation:`pulse ${n.d}s ease-in-out ${n.dl}s infinite`}}/>)}
      <motion.div animate={{opacity:active?1:0}} transition={{duration:.5}} className="fx">
        <svg className="fx-svg">{conns.map((c,i)=><line key={`cl${i}`} x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} stroke="rgba(74,168,232,.1)" strokeWidth=".5" style={{animation:active?`lineGlow ${c.d}s ease-in-out ${c.dl}s infinite`:'none'}}/>)}</svg>
        {streams.map((s,i)=><div key={`ds${i}`} className="stream" style={{left:`${s.x}%`}}><div className="stream-bar" style={{animation:active?`streamFall ${s.d}s linear ${s.dl}s infinite`:'none'}}/></div>)}
        <div className="scan" style={{animation:active?'scanMove 3.5s ease-in-out infinite':'none'}}/>
      </motion.div>
    </div>
  )
}
function FarmFX({ active }) {
  const spores = useMemo(()=>Array.from({length:30},()=>({x:Math.random()*100,y:10+Math.random()*80,s:1+Math.random()*3,d:3+Math.random()*6,dl:Math.random()*4,o:.07+Math.random()*.16})),[])
  const stems = useMemo(()=>Array.from({length:55},()=>({x:Math.random()*100,h:10+Math.random()*60,d:2+Math.random()*2.5,dl:Math.random()*2,w:.5+Math.random()*1.2})),[])
  return (
    <div className="fx">
      {spores.map((p,i)=><div key={`sp${i}`} className="dot" style={{left:`${p.x}%`,top:`${p.y}%`,width:p.s,height:p.s,background:'var(--green-bright)',opacity:p.o,boxShadow:`0 0 ${p.s*3}px rgba(74,222,128,.2)`,animation:`sporeFloat ${p.d}s ease-in-out ${p.dl}s infinite`}}/>)}
      <motion.div animate={{opacity:active?1:0}} transition={{duration:.5}}>
        <svg className="fx-svg" style={{position:'absolute',bottom:0,left:0,width:'100%',height:'80%'}}>
          {stems.map((s,i)=><line key={`sm${i}`} x1={`${s.x}%`} y1="100%" x2={`${s.x}%`} y2={`${100-s.h}%`} stroke="rgba(60,190,100,.14)" strokeWidth={s.w} strokeLinecap="round" style={{transformOrigin:`${s.x}% 100%`,animation:active?`sway ${s.d}s ease-in-out ${s.dl}s infinite`:'none'}}/>)}
        </svg>
      </motion.div>
    </div>
  )
}

/* ═══ PANEL ═══ */
function Panel({ side, hover, onEnter, onLeave, onTap, px, py, ready }) {
  const L = side==='left', on = hover===true, dim = hover===false
  return (
    <section className={`panel panel--${side}`} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onTap}>
      {/* Cinematic photo background — TEXT FREE */}
      <div className="panel__photo" style={{transform:`translate(${L?px*14:px*-14}px,${py*8}px) scale(${on?1.06:1})`}}/>
      {/* Subtle vignette for depth */}
      <div className="panel__vignette"/>
      {/* Particles */}
      {L ? <DataFX active={on}/> : <FarmFX active={on}/>}
      {/* Dim */}
      <motion.div className="panel__dim" animate={{opacity:dim?.42:0}} transition={{duration:.7}}/>
      {/* HTML Content */}
      <div className="panel__content">
        <motion.span className="eyebrow" initial={{opacity:0,y:10}} animate={{opacity:ready?1:0,y:ready?0:10}} transition={{delay:L?.2:.25,duration:.5}}>LOTUSBLOOM</motion.span>
        <motion.h1 className="title" initial={{opacity:0,y:14}} animate={{opacity:ready?1:0,y:ready?0:14}} transition={{delay:L?.3:.35,duration:.5}}>
          {L?<>DATA<br/>OPERATIONS</>:<>AGRICULTURE<br/>&amp; MICROGREENS</>}
        </motion.h1>
        <motion.p className="sub" initial={{opacity:0,y:10}} animate={{opacity:ready?1:0,y:ready?0:10}} transition={{delay:.4,duration:.5}}>
          {L?'Intelligent Systems. Smarter Decisions.':'Sustainable Farming. Healthier Futures.'}
        </motion.p>
        {L && <motion.div className="bar" initial={{scaleX:0}} animate={{scaleX:ready?1:0}} transition={{delay:.44,duration:.4}}/>}
        <motion.p className="desc" initial={{opacity:0,y:10}} animate={{opacity:ready?1:0,y:ready?0:10}} transition={{delay:.48,duration:.5}}>
          {L?'We transform complex data into actionable intelligence that drives real results.':'We cultivate premium microgreens with purpose, precision, and sustainability.'}
        </motion.p>
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:ready?1:0,y:ready?0:10}} transition={{delay:.52,duration:.5}}>
          <button className="btn">{L?'EXPLORE DATA OPERATIONS':'EXPLORE AGRICULTURE'}<span className="btn__arrow">→</span></button>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══ HERO ═══ */
export default function Hero() {
  const [mx,setMx]=useState(.5)
  const [my,setMy]=useState(.5)
  const [hov,setHov]=useState(null)
  const [ready,setReady]=useState(false)
  const ref=useRef(null)
  useEffect(()=>{requestAnimationFrame(()=>setReady(true))},[])
  const onMove=useCallback((e)=>{if(!ref.current)return;const r=ref.current.getBoundingClientRect();setMx((e.clientX-r.left)/r.width);setMy((e.clientY-r.top)/r.height)},[])
  const px=mx-.5,py=my-.5
  const L=hov==='left'?true:hov==='right'?false:null
  const R=hov==='right'?true:hov==='left'?false:null

  return (
    <div ref={ref} onMouseMove={onMove} className="hero">
      <style>{`
        @keyframes pulse{0%,100%{transform:scale(1);opacity:.1}50%{transform:scale(1.6);opacity:.4}}
        @keyframes lineGlow{0%,100%{stroke:rgba(74,168,232,.04)}50%{stroke:rgba(74,168,232,.18)}}
        @keyframes streamFall{0%{transform:translateY(-50px)}100%{transform:translateY(100vh)}}
        @keyframes scanMove{0%{top:0;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}
        @keyframes sway{0%,100%{transform:rotate(0)}25%{transform:rotate(3deg)}75%{transform:rotate(-3deg)}}
        @keyframes sporeFloat{0%,100%{transform:translate(0,0);opacity:.08}33%{transform:translate(12px,-16px);opacity:.3}66%{transform:translate(-8px,-10px);opacity:.15}}
        @keyframes glowRing{0%,100%{box-shadow:0 0 30px var(--gold-glow),0 0 60px rgba(201,169,78,.08)}50%{box-shadow:0 0 55px var(--gold-glow),0 0 110px rgba(201,169,78,.14)}}
        @keyframes shimmer{0%{transform:translateY(100%);opacity:0}50%{opacity:.45}100%{transform:translateY(-100%);opacity:0}}
        @keyframes breathe{0%,100%{opacity:.6}50%{opacity:1}}

        .hero{position:relative;width:100%;background:var(--bg);overflow:hidden}
        .hero__grid{display:flex;min-height:100vh;min-height:100dvh;position:relative}

        .panel{position:relative;flex:1;overflow:hidden;cursor:pointer;transition:flex .8s cubic-bezier(.16,1,.3,1)}
        .panel:hover{flex:1.15}

        /* ═══ PHOTOGRAPHIC BACKGROUNDS — text-free images ═══ */
        .panel__photo{position:absolute;inset:-30px;background-size:cover;background-repeat:no-repeat;background-position:center;transition:transform .7s cubic-bezier(.16,1,.3,1);z-index:1}
        .panel--left .panel__photo{background-image:url(/bg-left.jpg)}
        .panel--right .panel__photo{background-image:url(/bg-right.jpg)}

        .panel__vignette{position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,.4) 100%)}
        .panel__dim{position:absolute;inset:0;background:#000;pointer-events:none;z-index:6}
        .fx{position:absolute;inset:0;pointer-events:none;z-index:3;overflow:hidden}
        .dot{position:absolute;border-radius:50%}
        .fx-svg{position:absolute;inset:0;width:100%;height:100%}
        .stream{position:absolute;top:0;width:1px;height:100%;overflow:hidden}
        .stream-bar{width:1px;height:45px;background:linear-gradient(180deg,transparent,rgba(74,168,232,.3),transparent)}
        .scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(74,168,232,.18),transparent)}

        .panel__content{position:relative;z-index:8;height:100%;display:flex;flex-direction:column;justify-content:center;padding:clamp(24px,5%,80px)}
        .panel--right .panel__content{align-items:flex-end;text-align:right}
        .eyebrow{display:block;font-size:clamp(10px,1vw,12px);font-weight:500;letter-spacing:.22em;color:rgba(238,233,224,.5);margin-bottom:clamp(10px,1.5vh,18px)}
        .title{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,5.2vw,72px);font-weight:600;line-height:.96;color:#fff;margin:0 0 clamp(10px,1.5vh,18px);letter-spacing:-.01em;text-shadow:0 2px 20px rgba(0,0,0,.5)}
        .sub{font-family:'Cormorant Garamond',serif;font-size:clamp(13px,1.4vw,18px);font-weight:400;font-style:italic;color:rgba(238,233,224,.75);margin-bottom:clamp(8px,1vh,14px);text-shadow:0 1px 10px rgba(0,0,0,.4)}
        .bar{width:32px;height:2px;background:rgba(201,169,78,.5);border-radius:1px;margin-bottom:clamp(12px,1.5vh,20px);transform-origin:left}
        .desc{font-size:clamp(11px,.95vw,13.5px);line-height:1.75;color:rgba(238,233,224,.45);max-width:300px;margin-bottom:clamp(18px,2.5vh,30px);text-shadow:0 1px 8px rgba(0,0,0,.3)}
        .panel--right .desc{margin-left:auto}
        .btn{display:inline-flex;align-items:center;gap:clamp(8px,1vw,12px);padding:clamp(10px,1.2vw,14px) clamp(16px,2vw,28px);background:rgba(255,255,255,.04);border:1px solid rgba(238,233,224,.2);border-radius:2px;color:#fff;font-size:clamp(8px,.9vw,11px);font-weight:500;letter-spacing:.14em;text-transform:uppercase;transition:all .35s ease;font-family:'Outfit',sans-serif;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
        .panel--left .btn:hover{background:rgba(45,140,200,.12);border-color:rgba(45,140,200,.4)}
        .panel--right .btn:hover{background:rgba(60,184,104,.12);border-color:rgba(60,184,104,.4)}
        .btn__arrow{font-size:clamp(11px,1.2vw,15px);transition:transform .3s ease}
        .btn:hover .btn__arrow{transform:translateX(3px)}

        .lotus{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:20;pointer-events:none;display:flex;align-items:center;justify-content:center}
        .lotus__outer{position:relative;width:clamp(100px,10vw,130px);height:clamp(100px,10vw,130px);border-radius:50%;display:flex;align-items:center;justify-content:center}
        .lotus__ring-3{position:absolute;inset:-18px;border-radius:50%;border:1px solid rgba(201,169,78,.06);animation:breathe 5s ease-in-out 1s infinite}
        .lotus__ring-2{position:absolute;inset:-8px;border-radius:50%;border:1px solid rgba(201,169,78,.12);animation:breathe 4s ease-in-out .5s infinite}
        .lotus__ring-1{width:100%;height:100%;border-radius:50%;border:2px solid rgba(201,169,78,.40);display:flex;align-items:center;justify-content:center;background:rgba(4,4,6,.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 0 30px var(--gold-glow),0 0 60px rgba(201,169,78,.08);animation:glowRing 4s ease-in-out infinite;position:relative}
        .lotus__ring-inner{position:absolute;inset:7px;border-radius:50%;border:1px solid rgba(201,169,78,.20)}
        .lotus__glow{position:absolute;inset:-30px;border-radius:50%;background:radial-gradient(circle,rgba(201,169,78,.10) 0%,rgba(201,169,78,.03) 50%,transparent 70%);filter:blur(6px);animation:breathe 3s ease-in-out infinite}
        .lotus__img{width:clamp(48px,5vw,64px);height:clamp(48px,5vw,64px);border-radius:50%;object-fit:cover;filter:drop-shadow(0 0 8px var(--gold-glow));position:relative;z-index:1}

        .divider{position:absolute;left:50%;top:0;bottom:0;width:3px;margin-left:-1.5px;z-index:15;pointer-events:none;background:linear-gradient(180deg,transparent 2%,rgba(201,169,78,.15) 15%,rgba(201,169,78,.45) 45%,rgba(201,169,78,.55) 50%,rgba(201,169,78,.45) 55%,rgba(201,169,78,.15) 85%,transparent 98%);box-shadow:0 0 8px rgba(201,169,78,.15),0 0 20px rgba(201,169,78,.06)}
        .divider__shimmer{position:absolute;width:100%;height:60px;background:linear-gradient(180deg,transparent,rgba(201,169,78,.6),transparent);animation:shimmer 5s ease-in-out infinite}
        .divider__bloom{position:absolute;left:-20px;width:43px;top:0;bottom:0;background:linear-gradient(180deg,transparent 20%,rgba(201,169,78,.06) 45%,rgba(201,169,78,.08) 50%,rgba(201,169,78,.06) 55%,transparent 80%);filter:blur(10px)}
        .divider__glow{position:absolute;left:-6px;width:15px;top:0;bottom:0;background:linear-gradient(180deg,transparent 30%,rgba(201,169,78,.04) 50%,transparent 70%);filter:blur(4px)}

        .nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:clamp(12px,2.5vw,24px) clamp(16px,4.5vw,56px);padding-top:max(clamp(12px,2.5vw,24px),env(safe-area-inset-top))}
        .nav__left{display:flex;align-items:center;gap:clamp(8px,1.2vw,12px)}
        .nav__logo{width:clamp(34px,4vw,50px);height:clamp(34px,4vw,50px);border-radius:50%;object-fit:cover;filter:drop-shadow(0 0 6px var(--gold-glow))}
        .nav__brand{font-family:'Cormorant Garamond',serif;font-size:clamp(20px,2.8vw,32px);font-weight:600;font-style:italic;color:var(--gold);text-shadow:0 0 20px rgba(201,169,78,.15)}
        .nav__links{display:flex;gap:clamp(16px,2.5vw,36px);align-items:center}
        .nav__link{color:var(--text);font-size:clamp(11px,1vw,14px);font-weight:400;letter-spacing:.02em;font-family:'Outfit',sans-serif;transition:color .3s ease}
        .nav__link:hover{color:var(--gold)}
        .nav__link--active{color:var(--gold);border-bottom:2px solid var(--gold);padding-bottom:3px}

        @media(max-width:768px){
          .hero__grid{flex-direction:column}
          .panel{flex:none!important;min-height:50vh;min-height:50dvh}
          .panel__content{padding:clamp(56px,10vh,90px) clamp(20px,6%,36px) clamp(28px,5vh,44px);justify-content:flex-end}
          .panel--right .panel__content{align-items:flex-start;text-align:left}
          .panel--right .desc{margin-left:0}
          .title{font-size:clamp(28px,9vw,44px)}
          .sub{font-size:clamp(13px,3.5vw,16px)}
          .desc{font-size:clamp(12px,3vw,14px);max-width:none}
          .btn{padding:12px 22px;font-size:9px}
          .divider{display:none}
          .lotus{top:50vh;top:50dvh}
          .lotus__outer{width:86px;height:86px}
          .lotus__img{width:44px;height:44px}
          .lotus__ring-3{inset:-14px}
          .lotus__ring-2{inset:-6px}
          .nav__links{gap:14px}
          .nav__link{font-size:11px}
        }
        @media(max-width:480px){
          .panel__content{padding:clamp(48px,8vh,70px) 18px clamp(22px,4vh,36px)}
          .title{font-size:clamp(24px,8vw,36px)}
          .btn{padding:11px 18px;font-size:8px;letter-spacing:.10em}
          .lotus__outer{width:74px;height:74px}
          .lotus__img{width:38px;height:38px}
          .nav__links{display:none}
        }
        @media(max-width:375px){
          .title{font-size:clamp(22px,7.5vw,30px)}
          .btn{padding:10px 15px;font-size:7.5px}
        }
      `}</style>

      <motion.nav className="nav" initial={{opacity:0,y:-10}} animate={{opacity:ready?1:0,y:ready?0:-10}} transition={{duration:.5,delay:.1}}>
        <div className="nav__left">
          <img className="nav__logo" src="/logo.png" alt="LotusBloom"/>
          <span className="nav__brand">LotusBloom</span>
        </div>
        <div className="nav__links">
          <a className="nav__link nav__link--active" href="#">Home</a>
          <a className="nav__link" href="#">About</a>
          <a className="nav__link" href="#">Operations</a>
          <a className="nav__link" href="#">Solutions</a>
          <a className="nav__link" href="#">Contact</a>
        </div>
      </motion.nav>

      <div className="hero__grid">
        <Panel side="left" hover={L} ready={ready} px={px} py={py} onEnter={()=>setHov('left')} onLeave={()=>setHov(null)} onTap={()=>setHov(h=>h==='left'?null:'left')}/>
        <Panel side="right" hover={R} ready={ready} px={px} py={py} onEnter={()=>setHov('right')} onLeave={()=>setHov(null)} onTap={()=>setHov(h=>h==='right'?null:'right')}/>

        <motion.div className="lotus" initial={{opacity:0,scale:.85}} animate={{opacity:ready?1:0,scale:ready?1:.85,y:py*-8}} transition={{duration:.6,delay:.2}}>
          <div className="lotus__outer">
            <div className="lotus__glow"/>
            <div className="lotus__ring-3"/>
            <div className="lotus__ring-2"/>
            <div className="lotus__ring-1">
              <div className="lotus__ring-inner"/>
              <img className="lotus__img" src="/logo.png" alt=""/>
            </div>
          </div>
        </motion.div>
        <div className="divider"><div className="divider__shimmer"/><div className="divider__bloom"/><div className="divider__glow"/></div>
      </div>
    </div>
  )
}
