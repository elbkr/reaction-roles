module.exports = {
  name: "roles",
  botPerms: ["MANAGE_ROLES"],
  async execute(client, cmd) {
    const add = cmd.options.get("add");
    const remove = cmd.options.get("remove");
    const list = cmd.options.get("list");

    if (add && !remove && !list) {
      let { role } = add.options.get("role");

      if (add.options.get("user")) {
        let { user } = add.options.get("user");

        member = await cmd.guild.members.fetch(user.id);

        const targetPosition = member.roles?.highest.position;
        const memberPosition = cmd.member.roles?.highest.position;
        const clientPosition = cmd.guild.me.roles?.highest.position;

        if (memberPosition <= targetPosition) {
          return cmd.reply(
            "You can't add the role to that user beacuse it's highest role is equal/higher than yours"
          );
        } else if (clientPosition <= targetPosition) {
          return cmd.reply(
            "I can't add the role to that user beacuse it's highest role is equal/higher than mine"
          );
        }

        member.roles.add(role, ["Used /roles command"]);
        cmd.reply(`Correctly added ${role} to ${user}`);
      } else {
        let user = cmd.member;

        const memberPosition = cmd.member.roles?.highest.position;
        const clientPosition = cmd.guild.me.roles?.highest.position;

        if (clientPosition <= memberPosition) {
          return cmd.reply(
            "I can't add the role to you beacuse your highest role is equal/higher than mine"
          );
        }

        user.roles.add(role, ["Used /roles command"]);
        cmd.reply(`Correctly added ${role} to ${user}`);
      }
    } else if (!add && remove && !list) {
      let { role } = remove.options.get("role");

      if (remove.options.get("user")) {
        let { user } = remove.options.get("user");

        member = await cmd.guild.members.fetch(user.id);

        const targetPosition = member.roles?.highest.position;
        const memberPosition = cmd.member.roles?.highest.position;
        const clientPosition = cmd.guild.me.roles?.highest.position;

        if (memberPosition <= targetPosition) {
          return cmd.reply(
            "You can't remove the role to that user beacuse it's highest role is equal/higher than yours"
          );
        } else if (clientPosition <= targetPosition) {
          return cmd.reply(
            "I can't remove the role to that user beacuse it's highest role is equal/higher than mine"
          );
        }
        if (!member.roles.cache.has(role.id))
          return cmd.reply("The user doesn't have that role");

        member.roles.remove(role, ["Used /roles command"]);
        cmd.reply(`Correctly removed ${role} to ${user}`);
      } else {
        let user = cmd.member;

        const memberPosition = cmd.member.roles?.highest.position;
        const clientPosition = cmd.guild.me.roles?.highest.position;

        if (clientPosition <= memberPosition) {
          return cmd.reply(
            "I can't remove the role to you beacuse your highest role is equal/higher than mine"
          );
        }
        if (!user.roles.cache.has(role.id))
          return cmd.reply("You don't have that role");

        user.roles.remove(role, ["Used /roles command"]);
        cmd.reply(`Correctly removed ${role} to ${user}`);
      }
    }
    if (!add && !remove && list) {
      if (list.options?.get("user")) {
        let { user } = list.options.get("user");

        member = await cmd.guild.members.fetch(user.id);

         let noEveryone = member.roles.cache.filter((r) => r.id !== cmd.guild.id);
         let roles = noEveryone.map((r) => `${r}`).join(" | ");
        cmd.reply(roles);
      } else {
        let user = cmd.member;
        let noEveryone = user.roles.cache.filter((r) => r.id !== cmd.guild.id);
        let roles = noEveryone.map((r) => `${r}`).join(" | ");
       cmd.reply(roles);
      }
    }
  },
};
