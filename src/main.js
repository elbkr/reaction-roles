require("dotenv").config({ path: "src/.env" });

const chalk = require("chalk");
const { prefix, support_server } = require("./json/config.json");
const { Client, Collection, Intents } = require("discord.js");

const { loadCommands } = require("./utilities/loadcmds.js");
const { loadEmojis } = require("./utilities/loademojis.js");
const { loadEvents } = require("./utilities/loadevents.js");
const { nodeEvents } = require("./utilities/nodeevents.js");
const { loadSlash } = require("./utilities/loadslash.js");

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

client.login(process.env.main_token).then(() => {
  console.log(
    chalk.bgBlueBright.black(
      ` Successfully logged in as: ${client.user.username}#${client.user.discriminator} `
    )
  );
});

client.prefix = prefix;
client.support = support_server;
client.slash = new Collection();
client.myemojis = new Collection();
client.commands = new Collection();

loadEvents(client);
loadCommands(client);
loadEmojis(client);
loadSlash(client);
nodeEvents(process);
