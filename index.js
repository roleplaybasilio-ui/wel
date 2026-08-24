const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const config = require("./config.json");

if (!process.env.TOKEN) {
  console.error("❌ TOKEN no está configurado en Railway.");
  process.exit(1);
}

if (!config.welcomeChannelId) {
  console.error("❌ welcomeChannelId está vacío en config.json.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", async () => {
  console.log(`✅ BOT CONECTADO: ${client.user.tag}`);
  console.log(`🆔 Bot ID: ${client.user.id}`);
  console.log(`🏠 Servidores: ${client.guilds.cache.size}`);
  console.log(`📢 Canal configurado: ${config.welcomeChannelId}`);

  const channel = await client.channels.fetch(config.welcomeChannelId).catch(() => null);

  if (!channel) {
    console.error("❌ NO SE PUEDE ENCONTRAR EL CANAL CONFIGURADO.");
    console.error("➡️ Revisa welcomeChannelId y que el bot esté dentro del servidor.");
    return;
  }

  if (!channel.isTextBased()) {
    console.error("❌ El welcomeChannelId no corresponde a un canal de texto.");
    return;
  }

  const permissions = channel.permissionsFor(client.user);

  if (!permissions?.has("SendMessages")) {
    console.error("❌ El bot NO tiene permiso Send Messages en el canal.");
  } else {
    console.log("✅ El bot tiene permiso para enviar mensajes.");
  }

  if (!permissions?.has("EmbedLinks")) {
    console.error("⚠️ El bot no tiene Embed Links. La bienvenida puede no mostrarse correctamente.");
  }

  if (!permissions?.has("AttachFiles")) {
    console.error("⚠️ El bot no tiene Attach Files. La imagen no podrá enviarse.");
  }

  console.log("👋 Sistema de bienvenida listo.");
});

client.on("guildMemberAdd", async (member) => {
  console.log(`➡️ Nuevo miembro detectado: ${member.user.tag} | ${member.id} | ${member.guild.name}`);

  if (config.guildId && member.guild.id !== config.guildId) {
    console.log(`⏭️ Entrada ignorada: guildId ${member.guild.id} no coincide con config.`);
    return;
  }

  const channel = await member.guild.channels.fetch(config.welcomeChannelId).catch(() => null);

  if (!channel || !channel.isTextBased()) {
    console.error(`❌ Canal de bienvenida no encontrado: ${config.welcomeChannelId}`);
    return;
  }

  const text = (config.welcomeMessage || "¡Bienvenido a EGO PVP, {user}!")
    .replace(/{user}/g, `<@${member.id}>`);

  const embed = new EmbedBuilder()
    .setTitle(config.title || "👋 ¡BIENVENIDO A EGO PVP!")
    .setDescription(text)
    .setColor(config.color || "#ff00d4")
    .setImage("attachment://welcome.png")
    .setFooter({ text: config.footer || "EGO PVP • Gracias por unirte a nuestra comunidad" })
    .setTimestamp();

  try {
    await channel.send({
      content: `<@${member.id}>`,
      embeds: [embed],
      files: [{
        attachment: "./assets/welcome.png",
        name: "welcome.png"
      }]
    });

    console.log(`✅ BIENVENIDA ENVIADA A ${member.user.tag}`);
  } catch (error) {
    console.error("❌ ERROR ENVIANDO BIENVENIDA:", error);
  }
});

client.on("error", error => console.error("❌ Discord error:", error));
process.on("unhandledRejection", error => console.error("❌ Unhandled rejection:", error));

client.login(process.env.TOKEN).catch(error => {
  console.error("❌ NO SE PUDO INICIAR SESIÓN CON TOKEN:", error.message);
});
