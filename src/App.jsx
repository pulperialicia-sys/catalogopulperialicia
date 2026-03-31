import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import QRPage from './pages/QRPage'
import SplashScreen from './components/SplashScreen'

function AppRoutes() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Muestra el splash solo en la home y una vez por sesión
  const [splashDone, setSplashDone] = useState(
    () => !isHome || sessionStorage.getItem('alicia_splash') === '1'
  )

  const handleDone = useCallback(() => {
    sessionStorage.setItem('alicia_splash', '1')
    setSplashDone(true)
  }, [])

  return (
    <>
      {/* Splash — se monta encima del catálogo mientras este ya carga */}
      {!splashDone && <SplashScreen onDone={handleDone} />}

      {/* Catálogo aparece con fade suave al terminar el splash */}
      <div
        style={{
          opacity:    splashDone ? 1 : 0,
          transition: splashDone ? 'opacity 0.5s ease' : 'none',
        }}
      >
        <Routes>
          <Route path="/"   element={<Home />} />
          <Route path="/qr" element={<QRPage />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
