import { useState, useMemo, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import CategoriaSection from '../components/CategoriaSection'
import CuentasBancarias from '../components/CuentasBancarias'
import Ubicacion from '../components/Ubicacion'
import Horario from '../components/Horario'
import SearchBar from '../components/SearchBar'
import ShareButton from '../components/ShareButton'
import ProductoCard from '../components/ProductoCard'
import { CATEGORIAS, PRODUCTOS, STORE_INFO } from '../data/productos'
import { NEON } from '../data/neonColors'
import { useStoreStatus } from '../hooks/useStoreStatus'
import { useSwipe } from '../hooks/useSwipe'

// Ciclo de categorías para swipe: null = "Todo", luego cada id
const CAT_CYCLE = [null, ...CATEGORIAS.map((c) => c.id)]

export default function Home() {
  const [categoriaActiva, setCategoriaActiva] = useState(null)
  const [filterKey, setFilterKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const { isOpen, openTime, closeTime } = useStoreStatus()

  // Resultados de búsqueda — filtra por nombre en tiempo real
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return PRODUCTOS.filter((p) => p.nombre.toLowerCase().includes(q))
  }, [searchQuery])

  // Ir a los resultados cada vez que cambia la búsqueda
  useEffect(() => {
    if (!searchQuery.trim()) return
    // Esperar un frame para que React haya renderizado #search-results
    requestAnimationFrame(() => {
      const el = document.getElementById('search-results')
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 130
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      }
    })
  }, [searchQuery])

  const isSearching = searchQuery.trim().length > 0

  // ── Toast de swipe ──────────────────────────────────────────────────────
  const [swipeToast, setSwipeToast] = useState(null) // { label, key }

  useEffect(() => {
    if (!swipeToast) return
    const t = setTimeout(() => setSwipeToast(null), 1600)
    return () => clearTimeout(t)
  }, [swipeToast?.key])

  // ── Navegación de categorías ────────────────────────────────────────────
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }
  }

  const handleCategoria = (id) => {
    setCategoriaActiva((prev) => (prev === id ? null : id))
    setFilterKey((k) => k + 1)
    scrollToCatalog()
  }

  const goToCategory = useCallback((id) => {
    setCategoriaActiva(id)
    setFilterKey((k) => k + 1)
    scrollToCatalog()
    const label = id
      ? CATEGORIAS.find((c) => c.id === id)?.nombre ?? id
      : '🛍️ Todos los productos'
    setSwipeToast({ label, key: Date.now() })
  }, [])

  // ── Swipe gestures ──────────────────────────────────────────────────────
  const { onTouchStart, onTouchEnd } = useSwipe({
    onSwipeLeft: useCallback(() => {
      if (isSearching) return
      const idx = CAT_CYCLE.indexOf(categoriaActiva)
      goToCategory(CAT_CYCLE[(idx + 1) % CAT_CYCLE.length])
    }, [categoriaActiva, isSearching, goToCategory]),

    onSwipeRight: useCallback(() => {
      if (isSearching) return
      const idx = CAT_CYCLE.indexOf(categoriaActiva)
      goToCategory(CAT_CYCLE[(idx - 1 + CAT_CYCLE.length) % CAT_CYCLE.length])
    }, [categoriaActiva, isSearching, goToCategory]),
  })

  const categoriasFiltradas = categoriaActiva
    ? CATEGORIAS.filter((c) => c.id === categoriaActiva)
    : CATEGORIAS

  return (
    <div className="min-h-screen" style={{ background: '#060d1f' }}>
      <Header />

      <main className="pt-16 pb-20 md:pb-0">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-5 md:px-16 pt-12 md:pt-20 pb-20 md:pb-28">

          {/* Grid de puntos */}
          <div className="hero-dots absolute inset-0 pointer-events-none" />

          {/* Blobs animados */}
          <div className="animate-blob1 absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'rgba(59,130,246,0.18)', filter: 'blur(80px)' }} />
          <div className="animate-blob2 absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'rgba(139,92,246,0.15)', filter: 'blur(80px)' }} />
          <div className="animate-blob3 absolute top-1/2 left-1/2 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: 'rgba(251,191,36,0.10)', filter: 'blur(70px)' }} />

          {/* Contenido */}
          <div className="relative z-10 max-w-7xl mx-auto">

            {/* Badge — estado en tiempo real */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 animate-fade-up"
              style={{
                animationDelay: '0ms',
                background: isOpen ? 'rgba(52,211,153,0.1)' : 'rgba(239,68,68,0.1)',
                border:     isOpen ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(239,68,68,0.25)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={
                  isOpen
                    ? { background: '#34d399', boxShadow: '0 0 6px #34d399' }
                    : { background: '#ef4444', boxShadow: '0 0 6px #ef4444' }
                }
              />
              <span
                className="text-xs font-semibold tracking-wider"
                style={{ color: isOpen ? '#34d399' : '#ef4444' }}
              >
                {isOpen
                  ? `Abierto ahora · cierra ${closeTime}`
                  : openTime
                    ? `Cerrado · abre ${openTime}`
                    : 'Cerrado hoy'}
              </span>
            </div>

            {/* Título principal */}
            <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
              <h2 className="font-black leading-none mb-1" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
                <span className="gradient-text">Pulpería</span>
              </h2>
              <h2 className="font-black leading-none mb-5" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
                <span className="gradient-text-gold">Alicia</span>
                <span className="text-3xl md:text-5xl ml-2">✨</span>
              </h2>
            </div>

            {/* Descripción */}
            <p
              className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mb-8 animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              {STORE_INFO.descripcion}
            </p>

            {/* Stats */}
            <div
              className="flex items-center gap-6 animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              {[
                { value: CATEGORIAS.length, label: 'Categorías', color: '#60a5fa' },
                { value: `${PRODUCTOS.length}+`, label: 'Productos', color: '#fbbf24' },
                { value: '7/7', label: 'Días abierto', color: '#34d399' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-black leading-none" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Botón de compartir */}
            <div className="animate-fade-up mt-6" style={{ animationDelay: '350ms' }}>
              <ShareButton />
            </div>

            {/* Atajos de categoría — desktop */}
            <div
              className="hidden md:flex flex-wrap gap-2 mt-8 animate-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              {CATEGORIAS.map((cat) => {
                const neon = NEON[cat.id]
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoria(cat.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      background: neon.pill,
                      border: `1px solid ${neon.color}30`,
                      color: neon.color,
                    }}
                  >
                    <span>{cat.emoji}</span>
                    {cat.nombre.split(' ')[0]}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Divisor */}
        <div className="divider-shimmer mx-4 md:mx-8 my-2" />

        {/* ── Catálogo ─────────────────────────────────────────────────────── */}
        <div
          id="catalogo"
          className="max-w-7xl mx-auto"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >

          {/* Pills + Buscador — sticky */}
          <div
            id="pills-bar"
            className="sticky top-16 z-30 pt-3 pb-3"
            style={{
              background: 'rgba(6,13,31,0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* Barra de búsqueda */}
            <div className="px-4 md:px-8 mb-2.5">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Pills de categoría — se ocultan al buscar */}
            {!isSearching && (
              <div className="flex gap-2 overflow-x-auto px-4 md:px-8 scrollbar-hide md:flex-wrap md:overflow-visible">
                {/* Todo */}
                <button
                  onClick={() => {
                    setCategoriaActiva(null)
                    setFilterKey(k => k + 1)
                    const catalogo = document.getElementById('catalogo')
                    if (catalogo) {
                      const top = catalogo.getBoundingClientRect().top + window.scrollY - 64
                      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
                    }
                  }}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 min-h-[44px]"
                  style={
                    categoriaActiva === null
                      ? {
                          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                          color: 'white',
                          boxShadow: '0 0 18px rgba(59,130,246,0.45)',
                          transform: 'scale(1.05)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.05)',
                          color: '#64748b',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }
                  }
                >
                  🛍️ Todo
                </button>

                {CATEGORIAS.map((cat) => {
                  const neon = NEON[cat.id]
                  const isActive = categoriaActiva === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoria(cat.id)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${isActive ? 'animate-pop' : ''}`}
                      style={
                        isActive
                          ? {
                              background: neon.pill,
                              color: neon.color,
                              border: `1px solid ${neon.color}50`,
                              boxShadow: `0 0 16px ${neon.glow}`,
                              transform: 'scale(1.05)',
                            }
                          : {
                              background: 'rgba(255,255,255,0.04)',
                              color: '#475569',
                              border: '1px solid rgba(255,255,255,0.07)',
                            }
                      }
                    >
                      {cat.emoji} {cat.nombre.split(' ')[0]}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── Resultados de búsqueda ────────────────────────────────────── */}
          {isSearching ? (
            <div id="search-results" className="px-4 md:px-8 pt-5 pb-8 animate-fade-in">
              {/* Header de resultados */}
              <p className="text-xs text-slate-500 mb-4 font-medium">
                {searchResults.length > 0
                  ? <><span className="text-slate-300 font-bold">{searchResults.length}</span> resultado{searchResults.length !== 1 ? 's' : ''} para "<span className="text-blue-400">{searchQuery.trim()}</span>"</>
                  : <>Sin resultados para "<span className="text-slate-400">{searchQuery.trim()}</span>"</>
                }
              </p>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {searchResults.map((prod, i) => {
                    const cat  = CATEGORIAS.find((c) => c.id === prod.categoria)
                    const neon = NEON[prod.categoria] || NEON.abarrotes
                    return (
                      <div key={prod.id} className="relative">
                        <ProductoCard producto={prod} index={i} inView={true} />
                        {/* Badge de categoría */}
                        <div
                          className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold pointer-events-none"
                          style={{
                            background: neon.pill,
                            color:      neon.color,
                            border:     `1px solid ${neon.color}40`,
                          }}
                        >
                          {cat?.emoji}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                /* Estado vacío */
                <div className="text-center py-16 animate-fade-up">
                  <p className="text-6xl mb-4 select-none">🔍</p>
                  <p className="text-slate-300 font-bold text-base mb-1">No encontramos ese producto</p>
                  <p className="text-slate-600 text-sm">Intenta con otro nombre o revisa la categoría</p>
                </div>
              )}
            </div>
          ) : (
            /* ── Secciones de productos normal ─────────────────────────── */
            <div id="productos-grid" key={filterKey} className="pt-4 animate-fade-in">
              {categoriasFiltradas.map((cat) => (
                <CategoriaSection
                  key={cat.id}
                  categoria={cat}
                  productos={PRODUCTOS.filter((p) => p.categoria === cat.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Divisor shimmer */}
        <div className="divider-shimmer mx-4 md:mx-8 my-8" />

        {/* ── Info sections ────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto md:grid md:grid-cols-3 md:items-start">
          <CuentasBancarias />
          <Ubicacion />
          <Horario />
        </div>

        {/* Footer */}
        <footer
          className="text-center py-10 px-4 mt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="gradient-text-shimmer text-sm font-black mb-1">Pulpería Alicia</p>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} · Honduras · Hecho con ❤️</p>
        </footer>
      </main>

      <BottomNav />

      {/* ── Toast de navegación por swipe ──────────────────────────────── */}
      {swipeToast && (
        <div
          key={swipeToast.key}
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[60]
                     px-5 py-2.5 rounded-full text-sm font-bold text-white
                     animate-fade-up pointer-events-none whitespace-nowrap"
          style={{
            background:    'rgba(6,13,31,0.92)',
            border:        '1px solid rgba(255,255,255,0.14)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow:     '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {swipeToast.label}
        </div>
      )}
    </div>
  )
}
