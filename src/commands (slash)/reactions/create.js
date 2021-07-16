const { MessageEmbed } = require("discord.js");
const { isDefault } = require("../../resource/functions/isDefault");

module.exports = {
  name: "create",
  async execute(client, cmd) {
    const { value: embed } = cmd.options.get("embed");
    const { value: emoji } = cmd.options.get("emoji");
    const { value: colorInput } = cmd.options.get("color");
    const { value: text } = cmd.options.get("text");
    const { channel } = cmd.options.get("channel");
    const { role } = cmd.options.get("role");

    const color = colorInput.toLowerCase();

    let hexRegex = /^#[0-9A-F]{6}$/i;
    let rgbRegex =
      /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/;

    let embedC = "RANDOM";

    if (embed) {
      if (color) {
        let rgb;
        if (color.includes("r: " && "g: " && "b: ")) {
          rgb = color.replace(/(r:\s|g:\s|b:\s)/gi, "").split(" ");
        }
        if (color.includes("r:" && "g:" && "b:") && !color.includes("r: " && "g: " && "b: ")) {
          rgb = color.replace(/(r:|g:|b:)/gi, "").split(" ");
        }
        if (color.includes("r:" && "g:" && "b:") && !color.includes(" " && " " && " ")) {
          rgb = color
            .replace(/(r:)/gi, "")
            .replace(/(g:|b:)/gi, " ")
            .split(" ");
        }
        if (color.includes(", " && ", ")) {
          rgb = color.replace(/(,\s)/gi, " ").split(" ");
        }
        if (color.includes("," && ",") && !color.includes(", " && ", ")) {
          rgb = color.replace(/(,)/gi, " ").split(" ");
        }

        if (color.startsWith("#") && !hexRegex.test(color))
          return cmd.reply("please insert a valid hex color! See `/colors`");
        if (
          (color.includes("," && ",") ||
            color.includes("r:" && "g:" && "b:")) &&
          !rgbRegex.test(`rgb(${rgb})`)
        )
          return cmd.reply("please insert a valid rgb color! See `/colors`");

        if (
          !rgbRegex.test(`rgb(${rgb})`) &&
          !hexRegex.test(color) &&
          !isDefault(color.toUpperCase())
        )
          return cmd.reply("please insert a valid color! See `/colors`");

        if (isDefault(color.toUpperCase())) embedC = color.toUpperCase();
        if (color.startsWith("#") && hexRegex.test(color)) embedC = color;
        if (
          (color.includes("," && ",") ||
            color.includes("r:" && "g:" && "b:")) &&
          rgbRegex.test(`rgb(${rgb})`)
        ) {
          embedRgb = [];

          rgb.forEach((a) => {
            embedRgb.push(parseInt(a));
          });
          embedC = embedRgb;
        }
      }
    }

    let content = embed
      ? { embeds: [new MessageEmbed().setTitle(text).setColor(embedC)] }
      : text;

    let chPerms = embed ? ["SEND_MESSAGES", "EMBED_LINKS"] : "SEND_MESSAGES";
    if (!cmd.guild.me.permissionsIn(channel).has(chPerms))
      return cmd.reply(`I can't send messages in ${channel}`);

    let msg = await channel.send(content);
    msg.react(emoji);
    cmd.reply("Succesfully sent the message");
  },
};
