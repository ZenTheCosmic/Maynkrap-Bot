import { Client, GatewayIntentBits } from "discord.js";

// Create client with correct intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot ready
client.once("ready", () => {
  console.log(` Logged in as ${client.user.tag}`);
});

// Message command
client.on("messageCreate", (message) => {
  // Ignore bots
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("🏓 pong!");
  }
});

// 🔥 ERROR HANDLING (prevents crash)
client.on("error", console.error);
process.on("unhandledRejection", console.error);

// Login (your custom variable name)
client.login(process.env.Maynkrap_Bot);