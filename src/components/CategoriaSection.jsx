import { useRef, useState, useEffect } from 'react'
import ProductoCard from './ProductoCard'
import { useInView } from '../hooks/useInView'
import { NEON } from '../data/neonColors'

export default function CategoriaSection({ categoria, productos }) {
  const [ref, inView] = useInView()
  const scrollRef  = useRef(null)
  const [scrolled, setScrolled] = useState(false)   // ¿ya hizo scroll el usuario?
  const [canScroll, setCanScroll] = useState(false)  // ¿hay contenido extra para scrollear?

  // Detecta si la fila tiene overflow scrolleable
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => setCanScroll(el.scrollWidth > el.clientWidth + 4)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [productos])

  // Cuando el usuario scrollea, ocultar el indicador
  const handleScroll = () => {
    if (!scrolled) setScrolled(true)
  }

  if (!productos || productos.length === 0) return null

  const neon = NEON[categoria.id] || NEON.abarrotes
  const showHint = canScroll && !scrolled

  return (
    <div ref={ref} id={categoria.id} className="scroll-mt-32 mb-6">

      {/* Encabezado de categoría */}
      <div
        className={`flex items-center gap-3 px-4 md:px-8 mb-3 ${inView ? 'animate-slide-left' : 'opacity-0'}`}
      >
        {/* Icono con glow */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: neon.pill,
            border: `1px solid ${neon.color}40`,
            boxShadow: `0 0 16px ${neon.glow}`,
          }}
        >
          {categoria.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-sm md:text-base leading-tight" style={{ color: neon.color }}>
            {categoria.nombre}
          </h2>
          <p className="text-[10px] text-slate-500">{productos.length} producto{productos.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Línea degradada */}
        <div
          className="flex-1 h-px hidden sm:block"
          style={{ background: `linear-gradient(90deg, ${neon.color}30, transparent)` }}
        />
      </div>

      {/* Scroll horizontal estilo Netflix + indicador de deslizamiento */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto px-4 md:px-8 pb-2 scrollbar-hide"
        >
          {productos.map((producto, i) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Gradiente + flecha — solo si hay overflow y el usuario no ha scrolleado */}
        <div
          className="absolute right-0 top-0 bottom-2 w-20 pointer-events-none flex items-center justify-end pr-2"
          style={{
            background: `linear-gradient(to right, transparent, rgba(6,13,31,0.92))`,
            opacity:    showHint ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <span
            className="text-xl leading-none animate-bounce-x select-none"
            style={{ color: neon.color, filter: `drop-shadow(0 0 6px ${neon.glow})` }}
          >
            ›
          </span>
        </div>
      </div>
    </div>
  )
}
