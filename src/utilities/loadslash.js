function loadSlash(client) {
  const fs = require("fs");

  const commandFolders = fs.readdirSync("./src/commands (slash)");
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./src/commands (slash)/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../commands (slash)/${folder}/${file}`);
      client.slash.set(command.name, command);
    }
  }
}

module.exports = {
  loadSlash,
};
