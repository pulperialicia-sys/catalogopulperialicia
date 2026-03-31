import { useState } from 'react'

export default function ShareButton({ className = '', compact = false }) {
  const [state, setState] = useState('idle') // 'idle' | 'copied'

  const handleShare = async () => {
    const url = window.location.origin
    const shareData = {
      title: 'Pulpería Alicia 🛒',
      text: '¡Mira el catálogo digital de Pulpería Alicia! Encuentra productos frescos, abarrotes y más.',
      url,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // El usuario canceló — ignorar el error
      }
    } else {
      // Fallback: copiar URL al portapapeles
      try {
        await navigator.clipboard.writeText(url)
        setState('copied')
        setTimeout(() => setState('idle'), 2200)
      } catch {
        // Navegador sin permiso de clipboard
      }
    }
  }

  const isCopied = state === 'copied'

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] ${className}`}
      style={{
        background: isCopied ? 'rgba(52,211,153,0.13)' : 'rgba(255,255,255,0.07)',
        border:     isCopied ? '1px solid rgba(52,211,153,0.35)' : '1px solid rgba(255,255,255,0.12)',
        color:      isCopied ? '#34d399' : '#94a3b8',
        boxShadow:  isCopied ? '0 0 14px rgba(52,211,153,0.18)' : 'none',
      }}
    >
      {isCopied ? (
        <>
          {/* Checkmark */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ¡Enlace copiado!
        </>
      ) : (
        <>
          {/* Share icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {compact ? 'Compartir' : 'Compartir catálogo'}
        </>
      )}
    </button>
  )
}
