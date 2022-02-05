const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const message = await interaction.reply(
        {
          content: ':ping_pong: Pong!',
          fetchReply: true,
        },
    );
    const ping = message.createdTimestamp - interaction.createdTimestamp;
    await message.edit(
        {
          content: `:ping_pong: Pong! (Took ${ping}ms)`,
        },
    );
  },
};
