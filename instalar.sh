#!/bin/bash

echo "============================================"
echo "  INSTALADOR BOT DECORCAKE HUMANIZADO v7.0"
echo "============================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js no está instalado."
    echo "Por favor instala Node.js desde https://nodejs.org"
    exit 1
fi

echo "✓ Node.js encontrado: $(node --version)"
echo ""

echo "Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Falló la instalación de dependencias."
    exit 1
fi

echo ""
echo "============================================"
echo "  ✅ INSTALACIÓN COMPLETADA!"
echo "============================================"
echo ""
echo "Para iniciar el bot ejecuta:"
echo "  npm start"
echo ""
echo "Luego escanea el código QR con WhatsApp."
echo ""
