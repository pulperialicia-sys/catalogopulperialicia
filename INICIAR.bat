@echo off
title Catalogo Alicia
color 0A
echo.
echo  ==========================================
echo    Iniciando Catalogo Digital Alicia...
echo  ==========================================
echo.
echo  Abre tu navegador en: http://localhost:5174
echo  Para el QR visita:    http://localhost:5174/qr
echo.
echo  Presiona Ctrl+C para detener el servidor.
echo.
cd /d "%~dp0"
npm run dev
pause
