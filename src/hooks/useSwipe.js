/**
 * useSwipe — detecta gestos horizontales de deslizamiento en touch devices.
 *
 * Ignora automáticamente gestos que empiezan dentro de contenedores con
 * scroll horizontal (.scrollbar-hide) para no interferir con las filas
 * de productos.
 *
 * @param {object}  options
 * @param {()=>void} options.onSwipeLeft   — se llama al deslizar hacia la izquierda
 * @param {()=>void} options.onSwipeRight  — se llama al deslizar hacia la derecha
 * @param {number}  [options.threshold=62] — píxeles horizontales mínimos para activar
 */
import { useRef, useCallback } from 'react'

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 62 }) {
  const startX = useRef(null)
  const startY = useRef(null)

  const onTouchStart = useCallback((e) => {
    // No interceptar si el gesto empezó dentro de una fila de scroll horizontal
    if (e.target.closest('.scrollbar-hide')) return
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback((e) => {
    if (startX.current === null) return

    const dx = e.changedTouches[0].clientX - startX.current
    const dy = e.changedTouches[0].clientY - startY.current

    // Solo activar si el movimiento es predominantemente horizontal
    const isHorizontal = Math.abs(dx) > Math.abs(dy) * 1.6

    if (isHorizontal && Math.abs(dx) >= threshold) {
      if (dx < 0) onSwipeLeft?.()
      else        onSwipeRight?.()
    }

    startX.current = null
    startY.current = null
  }, [onSwipeLeft, onSwipeRight, threshold])

  return { onTouchStart, onTouchEnd }
}
