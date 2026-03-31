import { CUENTAS } from '../data/productos'
import { useInView } from '../hooks/useInView'

export default function CuentasBancarias() {
  const [ref, inView] = useInView()

  return (
    <section
      ref={ref}
      id="pagos"
      className="scroll-mt-20 py-8 px-4 md:px-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className={`flex items-center gap-3 mb-6 ${inView ? 'animate-slide-left' : 'opacity-0'}`}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)', boxShadow: '0 0 16px rgba(96,165,250,0.15)' }}
        >
          💳
        </div>
        <div>
          <h2 className="font-bold text-white text-base">Cuentas Bancarias</h2>
          <p className="text-[11px] text-slate-500">Pagos móviles y transferencias</p>
        </div>
      </div>

      <p
        className={`text-xs text-slate-400 mb-5 leading-relaxed ${inView ? 'animate-fade-up' : 'opacity-0'}`}
        style={{ animationDelay: '100ms' }}
      >
        Envía tu pago a cualquiera de estas cuentas y manda el comprobante por WhatsApp.
      </p>

      <div className="flex flex-col gap-4">
        {CUENTAS.map((cuenta, i) => (
          <div
            key={i}
            className={`bank-card rounded-2xl p-5 text-white shadow-2xl ${inView ? 'animate-scale-in' : 'opacity-0'}`}
            style={{
              animationDelay: `${150 + i * 130}ms`,
              background: `linear-gradient(135deg, ${cuenta.gradient.split(' ')[1] || '#1d4ed8'}, ${cuenta.gradient.split(' ')[3] || '#1e3a8a'})`,
            }}
          >
            <div
              className="bg-gradient-to-br"
              style={{
                background: `linear-gradient(135deg, var(--from, #1d4ed8), var(--to, #1e3a8a))`,
              }}
            />

            {/* Decoración */}
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
            <div className="absolute -right-2 bottom-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cuenta.logo}</span>
                  <span className="text-sm font-bold opacity-95">{cuenta.banco}</span>
                </div>
                <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-semibold tracking-wide">
                  {cuenta.tipo}
                </span>
              </div>

              {/* Número tipo tarjeta */}
              <div className="mb-4">
                <p className="text-[10px] text-white/50 mb-1 tracking-widest uppercase">Número</p>
                <p className="text-lg font-mono font-bold tracking-widest opacity-95">{cuenta.numero}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/50 tracking-widest uppercase mb-0.5">A nombre de</p>
                  <p className="text-sm font-semibold">{cuenta.nombre}</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-lg opacity-80">
                  💰
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
