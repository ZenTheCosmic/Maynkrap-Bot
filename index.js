// =====================
// EMBED BOT (By ZenTheCosmic - UPGRADE)
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

Welcome to **Maynkrap Server!**

🧱 Survival • ⚔️ PvP • 🏗️ Building  
🔴 Redstone • 🌍 Exploration  

📜 Read the rules in <#1485230100348797060>  
💬 Chat with others in <#1434403931601113199>  

Enjoy your stay and have fun! ✨`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: `Member #${member.guild.memberCount}` })
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

// =====================
// LEAVE (WITH TIME)
// =====================
client.on("guildMemberRemove", (member) => {
  console.log(`[LEAVE] ${member.user.tag} left`);

  const channel = member.guild.channels.cache.get("1489566955290755203");
  if (!channel) return console.log("[ERROR] Leave channel not found");

  const embed = new EmbedBuilder()
    .setColor("#81058D")
    .setTitle(`👋 Goodbye from ${member.guild.name}`)
    .setDescription(
`<@${member.id}> has left the server.

We hope to see you again someday 💔`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

// =====================
// BAN (WITH TIME)
// =====================
client.on("guildBanAdd", (ban) => {
  console.log(`[BAN] ${ban.user.tag} was banned`);

  const channel = ban.guild.channels.cache.get("1489567134521753761");
  if (!channel) return console.log("[ERROR] Ban channel not found");

  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("🚫 User Banned")
    .setDescription(
`<@${ban.user.id}> has been permanently removed from **${ban.guild.name}**.`
    )
    .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

// =====================
//EMBED COMMAND
// =====================
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  if (!message.content.startsWith("!embed")) return;

  console.log(`[COMMAND] ${message.author.tag}: ${message.content}`);

  let content = message.content.slice(7).trim();
  const args = content.split("|").map(a => a.trim());

  let color = "#480FB4";
  let title, description;
  let showIcon = false;

  let authorName, authorIcon;
  let thumbnail, image;
  let footerText, footerIcon;

  // BASE
  if (args[0]?.startsWith("#")) {
    color = args[0];
    title = args[1];
    description = args[2];
  } else {
    title = args[0];
    description = args[1];
  }

  // OPTIONS
  args.forEach(arg => {
    const lower = arg.toLowerCase();

    if (lower === "icon") showIcon = true;
    if (lower.startsWith("author:")) authorName = arg.slice(7).trim();
    if (lower.startsWith("authoricon:")) authorIcon = arg.slice(11).trim();
    if (lower.startsWith("thumbnail:")) thumbnail = arg.slice(10).trim();
    if (lower.startsWith("image:")) image = arg.slice(6).trim();
    if (lower.startsWith("footer:")) footerText = arg.slice(7).trim();
    if (lower.startsWith("footericon:")) footerIcon = arg.slice(11).trim();
  });

  if (!title || !description) {
    console.log("[ERROR] Invalid embed format");
    return message.reply("Use: !embed #color | Title | Description");
  }

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description);

  if (showIcon) {
    embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
  }

  if (authorName) {
    embed.setAuthor({
      name: authorName,
      iconURL: authorIcon || undefined
    });
  }

  if (thumbnail) embed.setThumbnail(thumbnail);
  if (image) embed.setImage(image);

  if (footerText) {
    embed.setFooter({
      text: footerText,
      iconURL: footerIcon || undefined
    });
  }

  try {
    await message.delete().catch(() => {
      console.log("[WARN] Failed to delete message");
    });

    await message.channel.send({ embeds: [embed] });

    console.log("[SUCCESS] Embed sent");
  } catch (err) {
    console.error("[CRASH]", err);
  }
});

// =====================
// LOGIN
// =====================
client.login(process.env.Maynkrap_Bot);