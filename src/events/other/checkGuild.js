const guildDoc = require("../../model/guild");

module.exports = async (message, client) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  // check if guild exists, if not, create it
  let guildID = message.guild.id;

  let guild = await guildDoc.findOne({
    _id: guildID,
  });

  if (!guild) {
    const sb = new guildDoc({
      _id: guildID,
      prefix: client.prefix,
    });
    await sb.save().catch((e) => console.log(e));
  }
};
