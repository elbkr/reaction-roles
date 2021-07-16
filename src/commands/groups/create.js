const guildDoc = require("../../model/guild");

module.exports = {
  name: "group",
  async execute(client, msg, args, p) {
    let subc = args[0].toLowerCase();
    let name = args.slice(1).join(" ");

    const group = await guildDoc.findOne({
      _id: msg.guild.id,
      name: name,
    });

    if (subc === "create") {
      if (!name)
        return msg.reply({
          content: "Please type the name of the group",
          allowedMentions: { repliedUser: false },
        });

      if (group)
        return msg.reply({
          content: "There is alredy a group with that name",
          allowedMentions: { repliedUser: false },
        });

      let newGroup = new guildDoc({
        _id: msg.guild.id,
        name: name,
      });
      await newGroup.save().catch((e) => console.log(e));

      msg.reply({
        content: `Succesfully created the **${name}** group!`,
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
