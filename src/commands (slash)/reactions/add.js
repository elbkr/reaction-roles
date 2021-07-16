module.exports = {
  name: "add",
  async execute(client, cmd) {
    const { channel } = cmd.options.get("channel");
    const { value: ID } = cmd.options.get("message");
    const { value: string } = cmd.options.get("emoji");
    const { role } = cmd.options.get("role");

    let msg = await channel.messages.fetch(ID);
    if (!msg) return cmd.reply("I can't find that message :/");

    await msg.react(string);
    cmd.reply("done");
  },
};
