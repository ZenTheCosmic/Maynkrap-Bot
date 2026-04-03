const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// READY
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// =====================
// WELCOME
// =====================
client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.get("1434403930653069430");
  if (!channel) return;

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
// LEAVE
// =====================
client.on("guildMemberRemove", (member) => {
  const channel = member.guild.channels.cache.get("1489566955290755203");
  if (!channel) return;

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
// BAN
// =====================
client.on("guildBanAdd", (ban) => {
  const channel = ban.guild.channels.cache.get("1489567134521753761");
  if (!channel) return;

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
// EMBED COMMAND (MANUAL ICON ONLY)
// =====================
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  if (message.content.startsWith("!embed")) {
    const args = message.content.slice(7).trim().split("|");

    let color = "#480FB4";
    let title, description;
    let showIcon = false; // 👈 OFF by default

    // WITH COLOR
    if (args[0]?.trim().startsWith("#")) {
      color = args[0].trim();
      title = args[1]?.trim();
      description = args[2]?.trim();

      if (args[3]?.trim().toLowerCase() === "icon") {
        showIcon = true;
      }

    } else {
      // WITHOUT COLOR
      title = args[0]?.trim();
      description = args[1]?.trim();

      if (args[2]?.trim().toLowerCase() === "icon") {
        showIcon = true;
      }
    }

    if (!title || !description) {
      return message.reply(
        "Use:\n!embed Title | Description | icon (optional)\nOR\n!embed #color | Title | Description | icon"
      );
    }

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setDescription(description)
      .setTimestamp();

    // 👇 ONLY SHOW ICON IF YOU TYPE "icon"
    if (showIcon) {
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
    }

    await message.delete().catch(() => {});
    message.channel.send({ embeds: [embed] });
  }
});

// LOGIN
client.login(process.env.Maynkrap_Bot);