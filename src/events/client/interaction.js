module.exports = async (interaction, client) => {
  if (!interaction.isCommand()) return;
  const commandName = interaction.commandName;

  const command = client.slash.get(commandName);

  try {
    //async execute(interaction)
    command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    interaction.reply
      .send("There was an error executing that command.")
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      })
      .catch(console.error);
  }
};
