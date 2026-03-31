import { useState, useEffect } from 'react'
import { HORARIO } from '../data/productos'

// Honduras siempre es UTC-6, sin horario de verano
function getHondurasNow() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Tegucigalpa' }))
}

// Convierte "6:00 AM" o "9:00 PM" → minutos desde medianoche
function parseTo24Minutes(str) {
  const clean = str.trim()
  const [timePart, period] = clean.split(' ')
  const [h, m] = timePart.split(':').map(Number)
  let hours = h
  if (period === 'PM' && h !== 12) hours += 12
  if (period === 'AM' && h === 12) hours = 0
  return hours * 60 + (m || 0)
}

// Retorna el horario del día actual (índice del arreglo HORARIO)
function getScheduleIndex(day) {
  if (day === 0) return 2 // Domingo
  if (day === 6) return 1 // Sábado
  return 0                // Lunes – Viernes
}

function computeStatus() {
  const now      = getHondurasNow()
  const day      = now.getDay()
  const idx      = getScheduleIndex(day)
  const schedule = HORARIO[idx]

  if (!schedule?.abierto) {
    return { isOpen: false, closeTime: null, openTime: null, todayIndex: idx }
  }

  // Separar por " – " (guión largo, en-dash)
  const parts      = schedule.hora.split(' \u2013 ')
  const openMins   = parseTo24Minutes(parts[0])
  const closeMins  = parseTo24Minutes(parts[1])
  const currentMin = now.getHours() * 60 + now.getMinutes()

  return {
    isOpen:     currentMin >= openMins && currentMin < closeMins,
    openTime:   parts[0].trim(),
    closeTime:  parts[1].trim(),
    todayIndex: idx,
  }
}

export function useStoreStatus() {
  const [status, setStatus] = useState(computeStatus)

  useEffect(() => {
    const id = setInterval(() => setStatus(computeStatus()), 30_000)
    return () => clearInterval(id)
  }, [])

  return status
}
