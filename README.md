# 🎂 Decorcake Bot v8.0

Bot de WhatsApp para atención al cliente de Decorcake.

## ✨ Características

- ✅ **Sin base de datos** - Funciona de inmediato
- ✅ **Detección inteligente** - Entiende frases y palabras clave
- ✅ **Reconexión automática** - Se reconecta si pierde conexión
- ✅ **Respuestas humanizadas** - Simula que está escribiendo
- ✅ **Fácil de configurar** - Solo edita el archivo `.env`

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar (opcional - editar .env)

# 3. Iniciar
npm start

# 4. Escanear QR con WhatsApp
```

## ⚙️ Configuración

Edita el archivo `.env` para personalizar:

```env
BOT_NAME=Decorcake Bot
EMPRESA_NOMBRE=Decorcake
CATALOGO_URL=https://tu-catalogo.com
TIENDA_URL=https://tu-tienda.com
UBICACION=Tu dirección
HORARIO_LV=9:00 AM - 7:00 PM
HORARIO_SAB=9:00 AM - 6:00 PM
```

## 🔄 Ejecutar 24/7 con PM2

```bash
# Instalar PM2
npm install -g pm2

# Iniciar bot
npm run pm2:start

# Ver logs
npm run pm2:logs

# Detener
npm run pm2:stop
```

## 📱 Uso

El bot responde automáticamente a:
- Saludos (hola, buenos días, etc.)
- Consultas de productos (moldes, colorantes, decoraciones)
- Información de envíos
- Ubicación y horarios
- Precios y formas de pago
- Cotizaciones
- Reclamos

## 📝 Licencia

MIT
