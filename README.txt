EGO PVP - BOT DE BIENVENIDA
============================

ESTE ZIP ES UNA VERSIÓN CORREGIDA CON MENSAJES DE DIAGNÓSTICO EN RAILWAY.

1. CONFIGURAR config.json
-------------------------
Pon los IDs reales:

"guildId": "ID_DE_TU_SERVIDOR",
"welcomeChannelId": "ID_DEL_CANAL_LLEGADAS"

No pongas el token aquí.

2. DISCORD DEVELOPER PORTAL
---------------------------
En la aplicación del bot:

Bot > Privileged Gateway Intents

Activa:
[X] Server Members Intent

Para este bot es especialmente importante. Sin Server Members Intent, el evento guildMemberAdd puede no llegar al bot.

3. PERMISOS EN EL CANAL
-----------------------
El bot necesita en el canal de bienvenida:

- View Channel
- Send Messages
- Embed Links
- Attach Files

4. TOKEN
---------
Railway > Variables:

TOKEN = TOKEN_REAL_DEL_BOT

El código usa process.env.TOKEN.

5. RAILWAY
----------
El servicio debe iniciar con:

npm start

Después de desplegar, entra en:
Deployments > View logs

DEBES VER:

✅ BOT CONECTADO: ...
🆔 Bot ID: ...
🏠 Servidores: ...
📢 Canal configurado: ...
✅ El bot tiene permiso para enviar mensajes.
👋 Sistema de bienvenida listo.

6. SI SALE "NO SE PUEDE ENCONTRAR EL CANAL"
-------------------------------------------
El welcomeChannelId está mal o el bot no está en el servidor que contiene ese canal.

Activa Modo Desarrollador en Discord:
Ajustes > Avanzado > Modo desarrollador.

Clic derecho al canal > Copiar ID.

Pega ese ID en welcomeChannelId.

7. SI EL BOT CONECTA PERO NO DA BIENVENIDA
------------------------------------------
Comprueba Server Members Intent.

Después:
- Guarda el cambio en Developer Portal.
- Reinicia/redeploya Railway.
- Entra con una cuenta NUEVA al servidor para probar.

El evento guildMemberAdd solo se produce cuando un miembro entra.

8. IMPORTANTE
-------------
No necesitas crear start.sh.
No necesitas carpetas adicionales.
No hay token dentro del ZIP.

Estructura:

index.js
package.json
config.json
README.txt
assets/welcome.png
