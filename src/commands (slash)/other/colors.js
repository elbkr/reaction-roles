const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "colors",
  async execute(client, cmd) {
    let colorEmbed = new MessageEmbed()
      .setColor("#6D89EA")
      .setTitle("Colors help")
      .setDescription(
        "This message will help you finding the correct color for the embeds"
      )
      .addField(
        "HEX",
        "HEX colors are displayed like `#FFFFFF`. They are used in roles color.\r\n*Tip: Go to roles settings in a server you have permissions and choose and copy your wanted color from the role color editor menu*"
      )
      .addField(
        "RGB",
        "RGB colors are displayed like `RGB 123, 456, 78`. But for the embeds you can use this 2 options:\r\n 1. `R: 123 G: 456 B: 78` | `R:123 G:456 B:78` and same in lower case\n 2. `123, 456, 78` | `123,456,78`"
      )
      .addField(
        "Default colors",
        "If you don't want to search for the color you want, you can use the default ones:\r\n`DEFAULT`, `WHITE`, `AQUA`, `GREEN`, `BLUE`, `YELLOW`, `PURPLE`, `LUMINOUS_VIVID_PINK`, `FUCHSIA`, `GOLD`, `ORANGE`, `RED`, `GREY`, `DARKER_GREY`, `NAVY`, `DARK_AQUA`, `DARK_GREEN`, `DARK_BLUE`, `DARK_PURPLE`, `DARK_VIVID_PINK`, `DARK_GOLD`, `DARK_ORANGE`, `DARK_RED`, `DARK_GREY`, `LIGHT_GREY`, `DARK_NAVY`, `BLURPLE`, `GREYPLE`, `DARK_BUT_NOT_BLACK`, `NOT_QUITE_BLACK`, `RANDOM`"
      )
      .addField(
        "Where do I get the colors?",
        "You can find the color you want [clicking here](https://htmlcolorcodes.com/)"
      );
    cmd.reply({ embeds: [colorEmbed] });
  },
};
