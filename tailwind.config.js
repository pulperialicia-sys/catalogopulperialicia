/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blob1: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(40px,-60px) scale(1.15)' },
          '66%':      { transform: 'translate(-30px,30px) scale(0.9)' },
        },
        blob2: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(-50px,40px) scale(1.1)' },
          '66%':      { transform: 'translate(40px,-30px) scale(0.95)' },
        },
        blob3: {
          '0%,100%': { transform: 'translate(-50%,-50%) scale(1)' },
          '50%':      { transform: 'translate(-50%,-50%) scale(1.25)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400% center' },
          '100%': { backgroundPosition: '400% center' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-left': {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.88)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-16px) rotate(-4deg)' },
          '66%':      { transform: 'translateY(-8px) rotate(3deg)' },
        },
        pop: {
          '0%':   { transform: 'scale(1)' },
          '40%':  { transform: 'scale(0.88)' },
          '70%':  { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'neon-pulse': {
          '0%,100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-8deg)' },
          '50%':      { transform: 'rotate(8deg)' },
        },
        'bounce-x': {
          '0%,100%': { transform: 'translateX(0)',    animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%':      { transform: 'translateX(6px)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
      animation: {
        'blob1':      'blob1 14s ease-in-out infinite',
        'blob2':      'blob2 18s ease-in-out infinite',
        'blob3':      'blob3 12s ease-in-out infinite',
        'shimmer':    'shimmer 4s linear infinite',
        'fade-up':    'fade-up 0.55s ease both',
        'fade-in':    'fade-in 0.4s ease both',
        'slide-left': 'slide-left 0.5s ease both',
        'scale-in':   'scale-in 0.45s ease both',
        'float':      'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 3.5s ease-in-out infinite',
        'pop':        'pop 0.35s ease',
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'spin-slow':  'spin-slow 12s linear infinite',
        'wiggle':     'wiggle 0.5s ease-in-out',
        'bounce-x':   'bounce-x 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
