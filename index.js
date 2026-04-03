// =====================
// EMBED COMMAND (By ZenTheCosmic - FINAL FIX)
// =====================
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// =====================
// READY
// =====================
client.once("ready", () => {
  console.log(`[READY] Logged in as ${client.user.tag}`);
});

// =====================
// WELCOME (WITH TIME)
// =====================
client.on("guildMemberAdd", (member) => {
  console.log(`[JOIN] ${member.user.tag} joined`);

  const channel = member.guild.channels.cache.get("1434403930653069430");
  if (!channel) return console.log("[ERROR] Welcome channel not found");

  const embed = new EmbedBuilder()
    .setColor("#480FB4")
    .setTitle(`🎉 Welcome to ${member.guild.name}!`)
    .setDescription(
`Hello <@${member.id}> 👋

Welcome to **Maynkrap Server!**`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Member #${member.guild.memberCount}` })
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

// =====================
// LEAVE
// =====================
client.on("guildMemberRemove", (member) => {
  console.log(`[LEAVE] ${member.user.tag} left`);

  const channel = member.guild.channels.cache.get("1489566955290755203");
  if (!channel) return console.log("[ERROR] Leave channel not found");

  const embed = new EmbedBuilder()
    .setColor("#81058D")
    .setTitle(`👋 Goodbye`)
    .setDescription(`<@${member.id}> left.`)
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

// =====================
// EMBED COMMAND (FIXED PROPERLY)
// =====================
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  if (!message.content.toLowerCase().startsWith("!embed")) return;

  console.log("RAW:", message.content);

  // remove !embed
  let content = message.content.substring(6).trim();

  let sender = "bot";

  // ✅ SUPER SAFE DETECTION
  const firstPart = content.split("|")[0].trim().toLowerCase();

  if (firstPart === "user") {
    sender = "user";
    content = content.substring(content.indexOf("|") + 1).trim();
  } else if (firstPart === "bot") {
    sender = "bot";
    content = content.substring(content.indexOf("|") + 1).trim();
  }

  console.log("CLEAN CONTENT:", content);

  const args = content.split("|").map(x => x.trim());

  console.log("ARGS:", args);

  let color = "#480FB4";
  let title, description;
  let showIcon = false;

  if (args[0] && args[0].startsWith("#")) {
    color = args[0];
    title = args[1];
    description = args[2];
    if (args[3] && args[3].toLowerCase() === "icon") showIcon = true;
  } else {
    title = args[0];
    description = args[1];
    if (args[2] && args[2].toLowerCase() === "icon") showIcon = true;
  }

  if (!title || !description) {
    console.log("❌ INVALID FORMAT");
    return message.reply("Wrong format bro");
  }

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description);

  if (showIcon) {
    embed.setThumbnail(message.author.displayAvatarURL());
  }

  try {
    if (sender === "bot") {
      await message.delete().catch(() => console.log("Can't delete"));
    }

    await message.channel.send({ embeds: [embed] });

    console.log("✅ SENT SUCCESS");
  } catch (e) {
    console.error("💥 ERROR:", e);
  }
});

// =====================
// LOGIN
// =====================
client.login(process.env.Maynkrap_Bot);