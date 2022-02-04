const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!'),
  async execute(interaction) {
    console.log('aaaaaaaaaaaaaaa');
    await interaction.reply({
      content: 'Pong!',
      ephemeral: true,
    });
  },
};

/* exports.run = (client, message, args) => {
  const ping = Math.floor(message.client.ping);

  message.channel.send(':ping_pong: Pong!')
      .then((m) => {
        m.edit(`:incoming_envelope: Ping Mensajes:
        \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n
        :satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
      });
}; */
