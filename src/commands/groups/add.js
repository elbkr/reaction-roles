

module.exports = {
  name: "group",
  async execute(client, msg, args, p) {
    let subc = args[0].toLowerCase();
    let msgID = args[1];
    let name = args.slice(2).join(" ");

    const group = await groupDoc.findOne({
      _id: msg.guild.id,
      name: name,
    });

    if (subc === "add") {
      if (!msgID)
        return msg.reply({
          content:
            "Please type the id of the message that contains the reaction roles",
          allowedMentions: { repliedUser: false },
        });

      if (!name)
        return msg.reply({
          content: "Please type the name of the group",
          allowedMentions: { repliedUser: false },
        });

        if(!group) return msg.reply({
        content: "There is no group with that name",
        allowedMentions: { repliedUser: false },
        });

      if (group.messages.includes(msgID))
        return msg.reply({
          content: `That message is alredy in **${name}** group`,
          allowedMentions: { repliedUser: false },
        });

      group.messages.push(msgID)
      await group.save().catch((e) => console.log(e));

      msg.reply({
        content: `Succesfully added ${message} to **${name}**!`,
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
