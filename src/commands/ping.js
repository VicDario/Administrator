exports.run = (client, message, args) => {
  const ping = Math.floor(message.client.ping);

  message.channel.send(':ping_pong: Pong!')
      .then((m) => {
        m.edit(`:incoming_envelope: Ping Mensajes: 
        \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n
        :satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
      });
};
