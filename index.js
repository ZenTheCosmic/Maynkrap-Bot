// =====================
// EMBED COMMAND (By ZenTheCosmic - UPGRADED)
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
// EMBED COMMAND (FIXED + LOGGING)
// =====================
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  if (!message.content.startsWith("!embed")) return;

  console.log(`[COMMAND] ${message.author.tag}: ${message.content}`);

  let content = message.content.slice(7).trim();
  let sender = "bot";

  // ✅ FLEXIBLE sender detection
  if (content.toLowerCase().startsWith("user")) {
    sender = "user";
    content = content.replace(/^user\s*\|?/i, "").trim();
  } else if (content.toLowerCase().startsWith("bot")) {
    sender = "bot";
    content = content.replace(/^bot\s*\|?/i, "").trim();
  }

  const args = content.split("|").map(a => a.trim());

  let color = "#480FB4";
  let title, description;
  let showIcon = false;

  // WITH COLOR
  if (args[0]?.startsWith("#")) {
    color = args[0];
    title = args[1];
    description = args[2];

    if (args[3]?.toLowerCase() === "icon") {
      showIcon = true;
    }
  } else {
    // WITHOUT COLOR
    title = args[0];
    description = args[1];

    if (args[2]?.toLowerCase() === "icon") {
      showIcon = true;
    }
  }

  if (!title || !description) {
    console.log("[ERROR] Invalid embed format");
    return message.reply(
      "Use:\n!embed user | #color | Title | Description | icon\nOR\n!embed Title | Description"
    );
  }

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description);

  if (showIcon) {
    embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
  }

  try {
    if (sender === "bot") {
      await message.delete().catch(() => {
        console.log("[WARN] Failed to delete message (missing perms?)");
      });
    }

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