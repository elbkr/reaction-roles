const { MessageEmbed, MessageCollector } = require("discord.js");

module.exports = {
  name: "embed",
  async execute(client, cmd) {
    const { channel } = cmd.options.get("channel");

    let hexRegex = /^#[0-9A-F]{6}$/i;
    let rgbRegex =
      /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/;

    let embedC = "";

    if (color) {
      let rgb = color
        .replace("r: ", "")
        .replace("g: ", "")
        .replace("b: ", "")
        .split(" ");

      if (color.startsWith("#") && !hexRegex.test(color))
        return cmd.reply("please insert a valid color! See /colors");
      if (color.includes("r:" && "g:" && "b:") && !rgbRegex.test(`rgb(${rgb})`))
        return cmd.reply("please insert a valid color! See /colors");

      if (color.startsWith("#") && hexRegex.test(color)) embedC = color;
      if (color.includes("r:" && "g:" && "b:") && rgbRegex.test(`rgb(${rgb})`))
        embedRgb = [];

      rgb.forEach((a) => {
        embedRgb.push(parseInt(a));
      });
      embedC = embedRgb;
    }

    if (
      !cmd.guild.me.permissionsIn(channel).has(["SEND_MESSAGES", "EMBED_LINKS"])
    )
      return cmd.reply(`I can't send emebeds in ${channel}`);

    let defEmbed = new MessageEmbed()
      .setAuthor(
        "This is the author",
        client.user.displayAvataruRL({ dynamic: true, type: "png" }),
        "https://author.url"
      )
      .setTitle("This is the title")
      .setURL("https://the.url")
      .setDescription("This is the description")
      .setFooter(
        "This is the footer | the date is the timeStamp",
        client.user.displayAvataruRL({ dynamic: true, type: "png" })
      )
      .addField("This is a field", "This is the field value")
      .setImage(
        "https://cdn.discordapp.com/attachments/838482670655897650/859851330852225034/image.jpg"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/838482670655897650/859851332541612112/thumb.jpg"
      )
      .setTimestamp();

     cmd.reply("This is the preview!! If you skip a question, the option will not be displayed. After you finish, the embed will be sent to the desired channel.\n", {embeds: [defEmbed]});

     cmd.channel.send("Send the author's ")
    const filter = (message) => message.author.id === cmd.user.id;
    const collector = new MessageCollector(cmd.channel, filter, {
      max: 1,
      time: 30000,
    });

    // author 
    collector.on("collect", (message) => {
        let defEmbed = new MessageEmbed()
      .setAuthor(
        message.content,
        client.user.displayAvataruRL({ dynamic: true, type: "png" }),
        "https://author.url"
      )
      .setTitle("This is the title")
      .setURL("https://the.url")
      .setDescription("This is the description")
      .setFooter(
        "This is the footer | the date is the timeStamp",
        client.user.displayAvataruRL({ dynamic: true, type: "png" })
      )
      .addField("This is a field", "This is the field value")
      .setImage(
        "https://cdn.discordapp.com/attachments/838482670655897650/859851330852225034/image.jpg"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/838482670655897650/859851332541612112/thumb.jpg"
      )
      .setTimestamp();

      resolve(collected.customID);
      collected.reply(client.myemojis.get("invisible"));
      collected.deleteReply();
    });
    collector.on("end", (message) => {
      if (collected.size <= 0) {
        cmd.channel.send("You didn't do anything so you automatically stand.");
        resolve("stay");
      }
    });
    cmd.reply("Succesfully sent the embed");
  },
};
