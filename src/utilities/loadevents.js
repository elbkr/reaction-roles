const clientEvent = (event) => require(`../events/client/${event}`);
const guildEvent = (event) => require(`../events/guild/${event}`);
const otherEvent = (event) => require(`../events/other/${event}`);
const Discord = require("discord.js");

function loadEvents(client) {
  const cooldowns = new Discord.Collection();

  // client events
  client.on("ready", () => clientEvent("ready")(client));
  client.on("interaction", (i) => clientEvent("interaction")(i, client));

  // guild events
  client.on("message", (m) => guildEvent("message")(m, cooldowns));

  // other events
  client.on("message", (m) => otherEvent("checkGuild")(m, client));
  
  // warnings and errors
  client.on("warn", (info) => console.log(info));
  client.on("error", console.error);
}

module.exports = {
  loadEvents,
};
