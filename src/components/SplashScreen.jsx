import { useEffect, useState, useMemo } from 'react'

// Emojis de productos de la pulpería
const EMOJIS = [
  '🛒','🥑','🥦','🍅','🥕','🌽','🍎','🧀','🥤','🌾',
  '🍬','🥚','🧅','🥔','🍞','🧄','🌶️','🥐','🧃','🫙',
  '🥜','🍳','🧂','🥛','🍫','🌰','🥝','🍊','🫒','🧁',
  '🧈','🫑',
]

// Menos partículas en móvil para mejor rendimiento
const N_PARTICLES = window.innerWidth < 400 ? 26 : 32

// Ecuación paramétrica del corazón
function heartXY(t, scale) {
  const x =  scale * 16 * Math.pow(Math.sin(t), 3) / 16
  const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 13
  return { x, y }
}

export default function SplashScreen({ onDone }) {
  const [phase, setPhase]   = useState(0) // 0 scatter · 1 form · 2 beat · 3 fadeout
  const [beat,  setBeat]    = useState(false)

  const W = window.innerWidth
  const H = window.innerHeight
  const scale       = Math.min(W, H) * 0.38
  const vertOffset  = scale * 0.35   // centra el corazón visualmente en pantalla

  // Genera posición inicial aleatoria (fuera de pantalla) y posición final (corazón)
  const particles = useMemo(() => {
    return Array.from({ length: N_PARTICLES }, (_, i) => {
      const t = (i / N_PARTICLES) * 2 * Math.PI
      const { x: tx, y: ty } = heartXY(t, scale)

      const angle = Math.random() * 2 * Math.PI
      const dist  = Math.max(W, H) * (0.7 + Math.random() * 0.6)
      const sx    = Math.cos(angle) * dist
      const sy    = Math.sin(angle) * dist

      return {
        tx, ty, sx, sy,
        emoji: EMOJIS[i % EMOJIS.length],
        delay: i * 18,
        dur:   800 + Math.random() * 250,
        size:  22 + Math.floor(Math.random() * 10),
      }
    })
  }, [scale, W, H])

  // Fases de la animación
  useEffect(() => {
    const ts = [
      setTimeout(() => setPhase(1), 200),    // partículas empiezan a volar
      setTimeout(() => setPhase(2), 1900),   // corazón formado → latido + texto
      setTimeout(() => setPhase(3), 3700),   // fade out
      setTimeout(onDone, 4300),              // listo
    ]
    return () => ts.forEach(clearTimeout)
  }, [onDone])

  // Latido del corazón
  useEffect(() => {
    if (phase < 2) return
    const id = setInterval(() => setBeat(b => !b), 650)
    return () => clearInterval(id)
  }, [phase])

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center"
      style={{
        background: '#060d1f',
        opacity:    phase === 3 ? 0 : 1,
        transition: phase === 3 ? 'opacity 0.65s ease' : 'none',
        pointerEvents: phase === 3 ? 'none' : 'auto',
      }}
    >
      {/* Fondo de puntos */}
      <div className="hero-dots absolute inset-0 pointer-events-none" />

      {/* Blobs de color de fondo */}
      <div className="animate-blob1 absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(251,113,133,0.12)', filter: 'blur(90px)' }} />
      <div className="animate-blob2 absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'rgba(167,139,250,0.12)', filter: 'blur(90px)' }} />

      {/* Glow detrás del corazón */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width:      scale * 2.8,
          height:     scale * 2.8,
          marginTop:  -vertOffset,
          background: 'radial-gradient(circle, rgba(251,113,133,0.22) 0%, rgba(139,92,246,0.12) 45%, transparent 75%)',
          transform:  `scale(${phase >= 2 ? (beat ? 1.18 : 0.92) : 0})`,
          transition: phase >= 2 ? 'transform 0.3s ease' : 'transform 1.2s ease',
        }}
      />

      {/* Contenedor de partículas — se centra en pantalla, corazón sube para dejar espacio al texto */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ marginTop: -vertOffset }}
      >
        {/* Este div escala como un todo para el latido */}
        <div
          style={{
            transform:  phase >= 2 ? `scale(${beat ? 1.09 : 1})` : 'scale(1)',
            transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute select-none pointer-events-none"
              style={{
                fontSize:    p.size,
                left:        '50%',
                top:         '50%',
                marginLeft:  -p.size / 2,
                marginTop:   -p.size / 2,
                transform:   phase >= 1
                  ? `translate(${p.tx}px, ${p.ty}px)`
                  : `translate(${p.sx}px, ${p.sy}px) scale(0.2)`,
                opacity:     phase === 0 ? 0 : 1,
                transition:  phase === 0
                  ? 'none'
                  : `transform ${p.dur}ms cubic-bezier(0.34,1.56,0.64,1) ${p.delay}ms,
                     opacity   0.5s ease ${p.delay * 0.3}ms`,
                filter:      phase >= 2
                  ? 'drop-shadow(0 0 6px rgba(251,113,133,0.55))'
                  : 'none',
                zIndex: 1,
              }}
            >
              {p.emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Texto central — aparece cuando el corazón ya está formado */}
      <div
        className="relative z-10 text-center pointer-events-none px-8 py-5 rounded-2xl"
        style={{
          opacity:    phase >= 2 ? 1 : 0,
          transform:  phase >= 2 ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(10px)',
          transition: 'opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s',
          background: phase >= 2 ? 'rgba(6,13,31,0.88)' : 'transparent',
          backdropFilter: window.innerWidth > 400 ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: window.innerWidth > 400 ? 'blur(14px)' : 'none',
          border: phase >= 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}
      >
        <p className="text-slate-400 text-[10px] font-semibold tracking-[0.35em] uppercase mb-2">
          Bienvenido a
        </p>

        <h1
          className="gradient-text-shimmer font-black leading-none"
          style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}
        >
          Pulpería Alicia
        </h1>

        <p className="text-slate-500 text-[11px] mt-2 tracking-widest">🇭🇳 Honduras</p>

        {/* Puntos de carga animados */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block w-1.5 h-1.5 rounded-full animate-bounce"
              style={{
                background:      '#60a5fa',
                animationDelay:  `${i * 160}ms`,
                boxShadow:       '0 0 6px rgba(96,165,250,0.7)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
