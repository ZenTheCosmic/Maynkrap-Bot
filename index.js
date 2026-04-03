// =====================
// EMBED COMMAND (NO TIME + OPTIONAL SENDER)
// =====================
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;

  if (message.content.startsWith("!embed")) {
    const args = message.content.slice(7).trim().split("|");

    let color = "#480FB4";
    let title, description;
    let showIcon = false;
    let sender = "bot"; // 👈 NEW (default bot)

    // =====================
    // CHECK IF FIRST IS bot/user
    // =====================
    if (args[0]?.trim().toLowerCase() === "bot" || args[0]?.trim().toLowerCase() === "user") {
      sender = args[0].trim().toLowerCase();

      // SHIFT VALUES (same style as yours)
      if (args[1]?.trim().startsWith("#")) {
        color = args[1].trim();
        title = args[2]?.trim();
        description = args[3]?.trim();

        if (args[4]?.trim().toLowerCase() === "icon") {
          showIcon = true;
        }

      } else {
        title = args[1]?.trim();
        description = args[2]?.trim();

        if (args[3]?.trim().toLowerCase() === "icon") {
          showIcon = true;
        }
      }

    } else {
      // =====================
      // ORIGINAL LOGIC (UNCHANGED)
      // =====================

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
    }

    if (!title || !description) {
      return message.reply(
        "Use:\n!embed bot | #color | Title | Description | icon\nOR\n!embed user | Title | Description"
      );
    }

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setDescription(description); // ❌ STILL NO TIME

    // OPTIONAL ICON
    if (showIcon) {
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
    }

    // =====================
    // SEND LOGIC
    // =====================
    if (sender === "bot") {
      await message.delete().catch(() => {});
      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send({ embeds: [embed] });
    }
  }
});