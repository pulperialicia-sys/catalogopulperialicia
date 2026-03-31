export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      {/* Icono lupa */}
      <span
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none select-none"
        style={{ color: value ? '#60a5fa' : '#475569' }}
      >
        🔍
      </span>

      <input
        type="search"
        inputMode="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar productos…"
        autoComplete="off"
        spellCheck="false"
        className="search-input w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
        style={{
          background:    'rgba(255,255,255,0.05)',
          border:        value
            ? '1px solid rgba(96,165,250,0.45)'
            : '1px solid rgba(255,255,255,0.09)',
          color:         '#f1f5f9',
          caretColor:    '#60a5fa',
        }}
      />

      {/* Botón limpiar */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full transition-all duration-150 hover:scale-110 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.12)', color: '#94a3b8' }}
          aria-label="Limpiar búsqueda"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}
