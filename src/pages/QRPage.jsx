import { QRCodeSVG } from 'qrcode.react'
import { Link } from 'react-router-dom'
import ShareButton from '../components/ShareButton'

const CATALOG_URL = import.meta.env.VITE_CATALOG_URL || window.location.origin

export default function QRPage() {
  return (
    <div
      className="qr-page min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: '#060d1f' }}
    >
      {/* Blobs de fondo — ocultos al imprimir */}
      <div className="no-print animate-blob1 absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'rgba(59,130,246,0.18)', filter: 'blur(80px)' }} />
      <div className="no-print animate-blob2 absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(139,92,246,0.15)', filter: 'blur(80px)' }} />
      <div className="no-print hero-dots absolute inset-0 pointer-events-none" />

      {/* Tarjeta QR */}
      <div
        className="qr-card relative z-10 w-full max-w-sm rounded-3xl p-7 animate-scale-in"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="qr-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl animate-neon-pulse"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              boxShadow: '0 0 24px rgba(59,130,246,0.5)',
            }}
          >
            🛒
          </div>
          <h1 className="qr-card-title gradient-text-shimmer text-xl font-black">
            Pulpería Alicia
          </h1>
          <p className="qr-card-subtitle text-slate-500 text-sm mt-1">
            Escanea para ver el catálogo
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-5">
          <div
            className="qr-wrapper p-4 rounded-2xl"
            style={{ background: '#f1f5f9', boxShadow: '0 0 32px rgba(96,165,250,0.2)' }}
          >
            <QRCodeSVG
              value={CATALOG_URL}
              size={210}
              level="M"
              includeMargin={false}
              fgColor="#1e3a8a"
              bgColor="#f1f5f9"
            />
          </div>
        </div>

        {/* URL */}
        <p
          className="qr-url text-center text-[11px] font-mono break-all px-3 py-2 rounded-xl mb-5"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: '#475569',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {CATALOG_URL}
        </p>

        {/* Instrucción solo para impresión */}
        <p
          className="qr-print-only text-center text-[11px] text-slate-500 mb-4"
          style={{ color: '#64748b', fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Visita <strong style={{ color: '#1e3a8a' }}>{CATALOG_URL}</strong> para ver el catálogo completo
        </p>

        {/* Botones — ocultos al imprimir */}
        <div className="qr-cta flex flex-col gap-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 text-white"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              boxShadow: '0 0 20px rgba(59,130,246,0.4)',
            }}
          >
            🛍️ Ver Catálogo
          </Link>

          <div className="flex gap-2">
            <ShareButton className="flex-1 justify-center" compact />
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 flex-1 justify-center"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94a3b8',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <polyline points="6 9 6 2 18 2 18 9" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="6" y="14" width="12" height="8" rx="1"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Imprimir
            </button>
          </div>
        </div>
      </div>

      <p className="no-print relative z-10 text-slate-600 text-xs mt-6">
        Pulpería Alicia · Honduras
      </p>
    </div>
  )
}
