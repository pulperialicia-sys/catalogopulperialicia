import { useState } from 'react'
import { CATEGORIAS } from '../data/productos'
import { NEON } from '../data/neonColors'

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dor5xz9up/image/upload/f_auto,q_auto/'

export default function ProductoCard({ producto, index = 0, inView = false }) {
  const [hovered,   setHovered]   = useState(false)
  const [imgError,  setImgError]  = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const categoria = CATEGORIAS.find((c) => c.id === producto.categoria)
  const neon = NEON[producto.categoria] || NEON.abarrotes
  const imageUrl = producto.imagen ? `${CLOUDINARY_BASE}${producto.imagen}` : null
  const showPlaceholder = !imageUrl || imgError
  const delay = Math.min(index * 55, 550)

  return (
    <div
      className={`product-card w-[138px] md:w-[158px] flex-shrink-0 rounded-2xl overflow-hidden cursor-default
        ${inView ? 'animate-fade-up' : 'opacity-0'}`}
      style={{
        animationDelay: `${delay}ms`,
        background: hovered
          ? `linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))`
          : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: hovered ? `1px solid ${neon.color}50` : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered ? `0 12px 40px ${neon.glow}, 0 0 0 1px ${neon.color}30` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen / Placeholder */}
      <div
        className="h-[138px] md:h-[158px] flex items-center justify-center relative overflow-hidden transition-colors duration-300"
        style={{
          background: imgLoaded
            ? '#ffffff'
            : `linear-gradient(145deg, ${neon.dark}, ${neon.dark}99)`,
        }}
      >
        {!showPlaceholder ? (
          <>
            {/* Skeleton — visible mientras la imagen no cargó */}
            {!imgLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <img
              src={imageUrl}
              alt={producto.nombre}
              className="w-full h-full object-contain p-2"
              style={{
                opacity:    imgLoaded ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }}
              loading="lazy"
              onLoad={()  => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <span
            className="text-5xl md:text-6xl select-none transition-transform duration-300"
            style={{ transform: hovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1)' }}
          >
            {categoria?.emoji || '📦'}
          </span>
        )}

        {/* Línea neon superior */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${neon.color}, transparent)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Brillo en esquina */}
        <div
          className="absolute top-0 right-0 w-10 h-10 rounded-bl-full pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${neon.color}20, transparent)` }}
        />
      </div>

      {/* Nombre */}
      <div className="px-2.5 py-2.5">
        <p className="text-[11px] md:text-xs font-semibold text-center line-clamp-2 leading-snug"
          style={{ color: hovered ? '#f1f5f9' : '#94a3b8' }}>
          {producto.nombre}
        </p>
      </div>
    </div>
  )
}
