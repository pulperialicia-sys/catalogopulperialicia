import { HORARIO } from '../data/productos'
import { useInView } from '../hooks/useInView'
import { useStoreStatus } from '../hooks/useStoreStatus'

export default function Horario() {
  const [ref, inView] = useInView()
  const { isOpen, todayIndex } = useStoreStatus()

  return (
    <section
      ref={ref}
      id="horario"
      className="scroll-mt-20 py-8 px-4 md:px-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className={`flex items-center gap-3 mb-4 ${inView ? 'animate-slide-left' : 'opacity-0'}`}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', boxShadow: '0 0 16px rgba(167,139,250,0.15)' }}
        >
          🕐
        </div>
        <div>
          <h2 className="font-bold text-white text-base">Horario de Atención</h2>
          <p className="text-[11px] text-slate-500">Siempre disponibles para ti</p>
        </div>
      </div>

      <div
        className={`rounded-2xl overflow-hidden ${inView ? 'animate-scale-in' : 'opacity-0'}`}
        style={{ animationDelay: '120ms', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {HORARIO.map((item, i) => {
          const isToday = i === todayIndex
          return (
            <div
              key={i}
              className={`flex justify-between items-center px-5 py-4 transition-colors duration-300 ${inView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{
                animationDelay: `${200 + i * 80}ms`,
                borderBottom: i < HORARIO.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: isToday
                  ? isOpen
                    ? 'rgba(52,211,153,0.07)'
                    : 'rgba(239,68,68,0.06)'
                  : 'transparent',
              }}
            >
              <div className="flex items-center gap-2.5">
                {isToday ? (
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                    style={
                      isOpen
                        ? { background: '#34d399', boxShadow: '0 0 6px #34d399' }
                        : { background: '#ef4444', boxShadow: '0 0 6px #ef4444' }
                    }
                  />
                ) : (
                  item.abierto && (
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(148,163,184,0.25)' }} />
                  )
                )}
                <span
                  className="text-sm font-medium"
                  style={{ color: isToday ? 'white' : '#94a3b8' }}
                >
                  {item.dia}
                  {isToday && (
                    <span
                      className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={
                        isOpen
                          ? { background: 'rgba(52,211,153,0.18)', color: '#34d399' }
                          : { background: 'rgba(239,68,68,0.18)', color: '#ef4444' }
                      }
                    >
                      {isOpen ? 'Abierto' : 'Cerrado'}
                    </span>
                  )}
                </span>
              </div>
              <span
                className="text-sm font-bold tabular-nums"
                style={{ color: isToday ? (isOpen ? '#34d399' : '#ef4444') : '#a78bfa' }}
              >
                {item.hora}
              </span>
            </div>
          )
        })}
      </div>

      <p
        className={`text-xs text-slate-500 mt-3 flex items-center gap-2 ${inView ? 'animate-fade-up' : 'opacity-0'}`}
        style={{ animationDelay: '500ms' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" style={{ boxShadow: '0 0 6px #34d399' }} />
        Abiertos todos los días del año
      </p>
    </section>
  )
}
