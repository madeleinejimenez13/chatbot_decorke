//  🎂 BOT WHATSAPP DECORCAKE - VERSIÓN 3.3 (24/7)

const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const http = require('http');

require('dotenv').config();

//  🌐 SERVIDOR HTTP PARA MANTENER ACTIVO 24/7
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const now = new Date().toLocaleString('es-EC', { timeZone: 'America/Guayaquil' });
    
    if (req.url === '/health' || req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'online',
            bot: 'Decorcake WhatsApp Bot',
            version: '3.3',
            time: now,
            uptime: Math.floor(process.uptime()) + ' segundos'
        }));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>🎂 Decorcake Bot</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { font-family: Arial; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           min-height: 100vh; display: flex; align-items: center; justify-content: center; margin: 0; }
                    .card { background: white; padding: 40px; border-radius: 20px; text-align: center; 
                            box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 400px; }
                    h1 { color: #333; margin-bottom: 10px; }
                    .status { background: #4CAF50; color: white; padding: 10px 30px; border-radius: 50px; 
                              display: inline-block; margin: 20px 0; font-weight: bold; }
                    .info { color: #666; margin: 10px 0; }
                    .time { color: #999; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>🎂 Decorcake Bot</h1>
                    <div class="status">✅ ONLINE 24/7</div>
                    <p class="info">Bot de WhatsApp funcionando</p>
                    <p class="info">⏱️ Uptime: ${Math.floor(process.uptime())} segundos</p>
                    <p class="time">📅 ${now}</p>
                </div>
            </body>
            </html>
        `);
    }
});

server.listen(PORT, () => {
    console.log(`🌐 Servidor HTTP activo en puerto ${PORT}`);
});

//  🔄 AUTO-PING PARA MANTENER ACTIVO
setInterval(() => {
    console.log('💓 Keep-alive ping');
}, 300000);

//  ⚙️ CONFIGURACIÓN
const CONFIG = {
    empresa: 'Decorcake',
    catalogo: 'https://drive.google.com/drive/folders/1hI9ftBrE1NnvSgsqzePJrOqxAPQf4nE_',
    tienda: 'https://www.decorcake.com.ec',
    direccion: 'Calle Lourdes entre 18 de noviembre y Sucre, Loja - Ecuador',
    mapa: 'https://maps.app.goo.gl/9CAimnAf433VE8uw9?g_st=ic'
};

//  🔒 CONTROL
const mensajesProcesados = new Set();
const estadoUsuarios = new Map();

setInterval(() => mensajesProcesados.clear(), 300000);
setInterval(() => { estadoUsuarios.clear(); console.log('🔄 Estados limpiados'); }, 1800000);

//  💬 RESPUESTAS
const R = {
    bienvenida: `*¡Hola!* 👋 Bienvenido/a a *${CONFIG.empresa}* 🎂

¿En qué podemos ayudarte?

1️⃣ Ver *catálogo* 📘
2️⃣ *Cotizar* productos 💰
3️⃣ Info de *envíos* 📦
4️⃣ *Ubicación* y horarios 📍
5️⃣ Tengo un *problema* 😔

_Escribe el número o palabra clave_ ✨`,

    catalogo: `📘 *CATÁLOGO DECORCAKE*

🔗 ${CONFIG.catalogo}
🛒 ${CONFIG.tienda}

Moldes, colorantes, fondant, toppers, sprinkles y más 🎂

_¿Quieres cotizar algo? Escribe *cotizar*_ 💛`,

    moldes: `🍰 *MOLDES PARA REPOSTERÍA*

Silicona, aluminio, acero y más.

📘 Catálogo: ${CONFIG.catalogo}

_¿Cuántos necesitas? Escribe *cotizar*_ ✨`,

    colorantes: `🎨 *COLORANTES PROFESIONALES*

Wilton, Americolor, Chef Master 🌈

📘 Catálogo: ${CONFIG.catalogo}

_¿Qué colores buscas?_ 😊`,

    decoraciones: `✨ *DECORACIONES*

▸ Fondant y gumpaste
▸ Toppers y picks  
▸ Sprinkles y confites
▸ Velas y números
▸ Bases y cajas

📘 Catálogo: ${CONFIG.catalogo}`,

    envios: `📦 *ENVÍOS A TODO ECUADOR* 🇪🇨

▸ 🚌 Cooperativas de transporte
▸ 📦 Servientrega
▸ 🏪 Retiro en tienda (Loja)

⏱️ 1-3 días según destino

_¿A qué ciudad enviamos?_ 📍`,

    ciudad: `✅ *¡Llegamos a tu ciudad!*

Para el costo exacto, dinos:
▸ ¿Qué productos?
▸ ¿Cuántas unidades?

_Nuestro equipo te contactará_ 💛`,

    ubicacion: `📍 *NUESTRA TIENDA*

${CONFIG.direccion}

🗺️ *Google Maps:*
${CONFIG.mapa}

🕐 *Horarios:*
▸ Lunes a Viernes
▸ Mañana: 9:00 AM – 1:00 PM
▸ Tarde: 3:00 PM – 6:00 PM
▸ Sábados y Domingos: CERRADO

_¡Te esperamos!_ 💛`,

    horarios: `🕐 *HORARIOS DE ATENCIÓN*

📅 *Lunes a Viernes*
▸ Mañana: 9:00 AM – 1:00 PM  
▸ Tarde: 3:00 PM – 6:00 PM

🚫 *Sábados y Domingos: CERRADO*

📍 ${CONFIG.direccion}`,

    precio: `💰 *PRECIOS*

Varían según el producto.

📘 Catálogo: ${CONFIG.catalogo}

_Escribe *cotizar* para pedir precios_ 😊`,

    pago: `💳 *FORMAS DE PAGO*

▸ 💵 Efectivo
▸ 🏦 Transferencia bancaria
▸ 💳 Tarjeta crédito/débito

_Pago se confirma antes del envío_ ✅`,

    cotizacion: `📋 *¡COTIZACIÓN!*

Dinos:
1️⃣ ¿Qué productos?
2️⃣ ¿Cuántas unidades?
3️⃣ ¿Ciudad de envío?

_Ejemplo: "5 moldes redondos 20cm, Quito"_`,

    cotizacionOk: `✅ *¡RECIBIDO!*

Gracias por tu interés en *${CONFIG.empresa}* 🎂

Nuestro equipo te contactará con:
▸ Precios y disponibilidad
▸ Costo de envío
▸ Tiempo de entrega

_Responderemos pronto_ 💛`,

    reclamo: `😔 *LAMENTAMOS EL INCONVENIENTE*

Para ayudarte, cuéntanos:

1️⃣ ¿Qué pasó exactamente?
2️⃣ ¿Cuál era tu pedido?
3️⃣ ¿Fecha de compra?

_Describe tu problema y te ayudamos_ 🙏`,

    reclamoOk: `✅ *CASO REGISTRADO*

Lamentamos mucho lo sucedido.

Nuestro equipo revisará tu caso y te contactará para darte una solución.

📞 Te responderemos lo antes posible.

_Gracias por tu paciencia_ 🙏`,

    despedida: `💛 *¡GRACIAS POR ESCRIBIRNOS!*

*${CONFIG.empresa}* 🎂
📍 Loja, Ecuador

_¡Hasta pronto!_ 👋`,

    ayuda: `🤔 *¿EN QUÉ TE AYUDO?*

▸ *1* o *catálogo* - Ver productos 📘
▸ *2* o *cotizar* - Pedir precios 💰  
▸ *3* o *envíos* - Info de envíos 📦
▸ *4* o *ubicación* - Dónde estamos 📍
▸ *5* o *problema* - Reportar issue 😔
▸ *horarios* - Cuándo atendemos 🕐
▸ *pagos* - Formas de pago 💳

_Escribe una opción_ ✨`
};

//  🧠 DETECTAR SI ES UN PROBLEMA/RECLAMO
function esProblema(texto) {
    const t = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    const problemas = [
        'no llego', 'no ha llegado', 'no me llego', 'no me ha llegado',
        'nunca llego', 'no llega', 'sin llegar', 'no lo recibi',
        'no he recibido', 'no recibi', 'sigue sin llegar',
        'pedido perdido', 'se perdio', 'extraviado',
        'demora', 'tarda mucho', 'lleva dias', 'lleva semanas',
        'hace una semana', 'hace dias', 'hace mucho',
        'llego incompleto', 'incompleto', 'faltan', 'falta algo', 'faltante',
        'no vino', 'no viene', 'no incluye', 'sin incluir',
        'llego mal', 'llego danado', 'danado', 'roto', 'quebrado',
        'defectuoso', 'no funciona', 'no sirve', 'malo',
        'golpeado', 'abollado', 'rayado', 'manchado',
        'equivocado', 'no es lo que pedi', 'producto incorrecto',
        'error en', 'me mandaron otro', 'no corresponde',
        'mal estado', 'en mal estado', 'deteriorado',
        'vencido', 'caducado', 'expirado',
        'problema', 'reclamo', 'queja', 'inconveniente',
        'molesto', 'enojado', 'decepcionado', 'insatisfecho',
        'pesimo', 'mal servicio', 'mala atencion',
        'devolucion', 'devolver', 'reembolso', 'dinero',
        'cambio', 'cambiar', 'reemplazar', 'reponer',
        'solucion', 'solucionar', 'resolver', 'arreglar',
        'compensacion', 'compensar',
        'urgente', 'ayuda', 'por favor ayuda', 'necesito ayuda'
    ];
    
    for (const p of problemas) {
        if (t.includes(p)) return true;
    }
    return false;
}

//  🔍 DETECTAR INTENCIÓN
function detectar(texto) {
    const t = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    
    if (t === '1') return 'catalogo';
    if (t === '2') return 'cotizacion';
    if (t === '3') return 'envios';
    if (t === '4') return 'ubicacion';
    if (t === '5') return 'reclamo';
    
    if (esProblema(texto)) return 'reclamo';
    
    if (/^(hola|ola|hi|hey|buenas?|buenos?|saludos?|que tal|hello|inicio|menu|holi)/.test(t)) return 'bienvenida';
    if (/^(gracias?|chao|adios|bye|hasta luego|ok gracias|listo|perfecto)$/.test(t)) return 'despedida';
    if (/gracias por/.test(t)) return 'despedida';
    if (/cotiza|precio|cuanto|quiero (comprar|pedir)|necesito \d|pedido|ordenar/.test(t)) return 'cotizacion';
    if (/catalogo|productos|que (tienen|venden|hay)|ver todo|lista/.test(t)) return 'catalogo';
    if (/molde/.test(t)) return 'moldes';
    if (/colorante|wilton|americolor/.test(t)) return 'colorantes';
    if (/decoracion|fondant|topper|vela|sprinkle/.test(t)) return 'decoraciones';
    if (/envio|envian|mandan|llega a|despacho|shipping|delivery/.test(t)) return 'envios';
    if (/quito|guayaquil|cuenca|ambato|loja|manta|machala|riobamba|ibarra|esmeraldas|portoviejo|santo domingo|catamayo|zamora/.test(t)) return 'ciudad';
    if (/ubicacion|direccion|donde|local|tienda|mapa|llegar/.test(t)) return 'ubicacion';
    if (/horario|hora|abren|cierran|atienden|abierto/.test(t)) return 'horarios';
    if (/pago|pagar|tarjeta|transferencia|efectivo|deposito/.test(t)) return 'pago';
    if (/ayuda|opciones|menu|help/.test(t)) return 'ayuda';
    
    return null;
}

function esDescripcion(texto) {
    if (texto.length > 20) return true;
    if (/\d+|semana|dias|fecha|pedido|compre|producto/.test(texto.toLowerCase())) return true;
    return false;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

//  📨 PROCESAR
async function procesar(sock, msg) {
    try {
        const jid = msg.key.remoteJid;
        if (!jid || jid.includes('@g.us') || jid === 'status@broadcast') return;
        if (msg.key.fromMe) return;
        
        const id = msg.key.id;
        if (mensajesProcesados.has(id)) return;
        mensajesProcesados.add(id);
        
        const ts = msg.messageTimestamp;
        if (ts && (Date.now() / 1000 - ts) > 30) return;
        
        const texto = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        if (!texto.trim()) return;
        
        const tel = jid.replace('@s.whatsapp.net', '');
        console.log(`📩 [${tel.slice(-4)}]: ${texto.slice(0, 60)}`);
        
        const intent = detectar(texto);
        const estado = estadoUsuarios.get(tel);
        let respuesta;
        
        if (intent === 'reclamo') {
            if (estado === 'reclamo' && esDescripcion(texto)) {
                estadoUsuarios.delete(tel);
                respuesta = R.reclamoOk;
                console.log(`✅ [${tel.slice(-4)}] RECLAMO REGISTRADO`);
            } else if (texto.length > 30) {
                estadoUsuarios.delete(tel);
                respuesta = R.reclamoOk;
                console.log(`✅ [${tel.slice(-4)}] RECLAMO DIRECTO`);
            } else {
                estadoUsuarios.set(tel, 'reclamo');
                respuesta = R.reclamo;
                console.log(`🔴 [${tel.slice(-4)}] Reclamo iniciado`);
            }
        }
        else if (estado === 'reclamo') {
            estadoUsuarios.delete(tel);
            respuesta = R.reclamoOk;
            console.log(`✅ [${tel.slice(-4)}] Reclamo registrado`);
        }
        else if (intent === 'cotizacion') {
            if (estado === 'cotizacion' && esDescripcion(texto)) {
                estadoUsuarios.delete(tel);
                respuesta = R.cotizacionOk;
            } else {
                estadoUsuarios.set(tel, 'cotizacion');
                respuesta = R.cotizacion;
            }
        }
        else if (estado === 'cotizacion') {
            estadoUsuarios.delete(tel);
            respuesta = R.cotizacionOk;
        }
        else if (intent === 'bienvenida') {
            estadoUsuarios.delete(tel);
            respuesta = R.bienvenida;
        }
        else if (intent === 'despedida') {
            estadoUsuarios.delete(tel);
            respuesta = R.despedida;
        }
        else if (intent && R[intent]) {
            respuesta = R[intent];
        }
        else {
            respuesta = R.ayuda;
        }
        
        await sleep(700 + Math.random() * 500);
        await sock.sendMessage(jid, { text: respuesta });
        console.log(`✅ [${tel.slice(-4)}] Enviado`);
        
    } catch (e) {
        console.error('❌', e.message);
    }
}

//  🔌 CONEXIÓN
async function conectar() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version } = await fetchLatestBaileysVersion();
    
    console.log(`📱 WhatsApp v${version.join('.')}`);
    
    const sock = makeWASocket({
        version,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
        },
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: ['Decorcake', 'Chrome', '1.0'],
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 25000,
        emitOwnEvents: false,
        markOnlineOnConnect: true,
    });
    
    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('\n════════════════════════════════════════');
            console.log('        📱 ESCANEA EL CÓDIGO QR');
            console.log('════════════════════════════════════════');
            console.log(`\n🔗 https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}\n`);
        }
        
        if (connection === 'close') {
            const code = lastDisconnect?.error?.output?.statusCode;
            console.log(`⚠️ Desconectado (${code})`);
            
            if (code === DisconnectReason.loggedOut || code === 401) {
                fs.rmSync('./auth_info_baileys', { recursive: true, force: true });
            } else {
                setTimeout(conectar, 3000);
            }
        }
        
        if (connection === 'open') {
            console.log('\n╔════════════════════════════════════════════╗');
            console.log('║  ✅ BOT DECORCAKE CONECTADO 24/7           ║');
            console.log('║  🎂 Versión 3.3 - Always Online            ║');
            console.log('╚════════════════════════════════════════════╝\n');
        }
    });
    
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        for (const m of messages) procesar(sock, m);
    });
}

console.log('\n🎂 DECORCAKE BOT v3.3 - 24/7\n');
process.on('uncaughtException', (e) => console.error('Error:', e.message));
process.on('unhandledRejection', (e) => console.error('Rejection:', e.message));
process.on('SIGINT', () => { console.log('\n👋 Cerrado\n'); process.exit(); });

conectar();
