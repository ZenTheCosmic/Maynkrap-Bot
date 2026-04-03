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
// EMBED COMMAND (CUSTOM + AUTO COLOR)
// =====================
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  if (message.content.startsWith("!embed")) {
    const args = message.content.slice(7).trim().split("|");

    let colorInput = args[0]?.trim();
    let title, description;
    let color = "#480FB4"; // default

    // 🎨 CUSTOM COLOR MODE
    if (colorInput && colorInput.startsWith("#")) {
      color = colorInput;
      title = args[1]?.trim();
      description = args[2]?.trim();
    } else {
      // 🤖 AUTO COLOR MODE
      title = args[0]?.trim();
      description = args[1]?.trim();

      const text = (title + " " + description).toLowerCase();

      if (text.includes("ban")) color = "#FF0000";
      else if (text.includes("warning")) color = "#FFA500";
      else if (text.includes("rules")) color = "#480FB4";
      else if (text.includes("welcome")) color = "#00FF00";
      else if (text.includes("goodbye") || text.includes("leave")) color = "#81058D";
      else if (text.includes("info")) color = "#3498DB";
    }

    if (!title || !description) {
      return message.reply(
        "Use:\n!embed Title | Description\nOR\n!embed #color | Title | Description"
      );
    }

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setDescription(description)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    await message.delete().catch(() => {});
    message.channel.send({ embeds: [embed] });
  }
});

// LOGIN
client.login(process.env.Maynkrap_Bot);