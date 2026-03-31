import { UBICACION } from '../data/productos'
import { useInView } from '../hooks/useInView'

export default function Ubicacion() {
  const [ref, inView] = useInView()

  return (
    <section
      ref={ref}
      id="ubicacion"
      className="scroll-mt-20 py-8 px-4 md:px-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className={`flex items-center gap-3 mb-4 ${inView ? 'animate-slide-left' : 'opacity-0'}`}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', boxShadow: '0 0 16px rgba(52,211,153,0.15)' }}
        >
          📍
        </div>
        <div>
          <h2 className="font-bold text-white text-base">Ubicación</h2>
          <p className="text-[11px] text-slate-500">¿Dónde encontrarnos?</p>
        </div>
      </div>

      <div
        className={`rounded-2xl p-5 space-y-4 ${inView ? 'animate-scale-in' : 'opacity-0'}`}
        style={{
          animationDelay: '120ms',
          background: 'rgba(52,211,153,0.05)',
          border: '1px solid rgba(52,211,153,0.15)',
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5 flex-shrink-0 animate-float-slow" style={{ display: 'inline-block' }}>🏠</span>
          <div>
            <p className="font-semibold text-white text-sm leading-snug">{UBICACION.direccion}</p>
            <p className="text-xs text-slate-500 mt-1">{UBICACION.ciudad}</p>
          </div>
        </div>

        <div className="h-px" style={{ background: 'rgba(52,211,153,0.15)' }} />

        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5 flex-shrink-0">🗺️</span>
          <p className="text-sm text-slate-300 leading-relaxed">{UBICACION.referencia}</p>
        </div>

        {UBICACION.googleMapsUrl && (
          <a
            href={UBICACION.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.1))',
              border: '1px solid rgba(52,211,153,0.3)',
              color: '#34d399',
            }}
          >
            <span>📌</span> Ver en Google Maps
          </a>
        )}
      </div>
    </section>
  )
}
