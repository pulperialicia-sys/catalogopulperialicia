import { Link } from 'react-router-dom'
import { STORE_INFO } from '../data/productos'

const NAV_LINKS = [
  { label: 'Catálogo', href: '#catalogo', icon: '🛍️' },
  { label: 'Pagos',    href: '#pagos',    icon: '💳'  },
  { label: 'Ubicación',href: '#ubicacion',icon: '📍'  },
  { label: 'Horario',  href: '#horario',  icon: '🕐'  },
]

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: 'rgba(6,13,31,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg animate-neon-pulse"
            style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.3)' }}>
            🛒
          </div>
          <div>
            <h1 className="font-black text-base leading-none gradient-text-shimmer">
              {STORE_INFO.nombre}
            </h1>
            <p className="text-[11px] text-slate-500 tracking-widest uppercase mt-0.5 hidden sm:block">
              Honduras
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-white/5"
            >
              <span>{link.icon}</span>{link.label}
            </a>
          ))}
          <Link
            to="/qr"
            className="ml-3 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              boxShadow: '0 0 16px rgba(59,130,246,0.4)',
            }}
          >
            <span>📱</span> Ver QR
          </Link>
        </nav>

      </div>
    </header>
  )
}
