import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Catálogo', href: '#catalogo', icon: '🛍️' },
  { label: 'Pagos',    href: '#pagos',    icon: '💳'  },
  { label: 'Ubicación',href: '#ubicacion',icon: '📍'  },
  { label: 'Horario',  href: '#horario',  icon: '🕐'  },
]

export default function BottomNav() {
  const [active, setActive] = useState(null)

  const handleClick = (href) => {
    setActive(href)
    setTimeout(() => setActive(null), 400)
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(6,13,31,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleClick(item.href)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all duration-150 ${
                isActive ? 'scale-110' : ''
              }`}
            >
              <span
                className={`text-[22px] leading-none ${isActive ? 'animate-pop' : ''}`}
                style={isActive ? { filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' } : {}}
              >
                {item.icon}
              </span>
              <span
                className="text-[10px] font-semibold tracking-wide transition-colors duration-150"
                style={{ color: isActive ? '#60a5fa' : '#475569' }}
              >
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
