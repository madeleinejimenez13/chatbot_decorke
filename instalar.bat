@echo off
echo ============================================
echo   INSTALADOR BOT DECORCAKE HUMANIZADO v7.0
echo ============================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado.
    echo Por favor instala Node.js desde https://nodejs.org
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Instalando dependencias...
npm install

if errorlevel 1 (
    echo ERROR: Fallo la instalacion de dependencias.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   INSTALACION COMPLETADA!
echo ============================================
echo.
echo Para iniciar el bot ejecuta:
echo   npm start
echo.
echo Luego escanea el codigo QR con WhatsApp.
echo.
pause
