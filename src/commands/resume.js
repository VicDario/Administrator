exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) {
		message.reply("debes estar conectado a un canal de voz");
		return;
	}

	try {
		const conn = await message.member.voice.channel.join();
		const dispatcher = conn.dispatcher;

		if (!dispatcher) {
			message.channel.send("No se esta reproduciendo nada");
			conn.disconnect();
			return;
		}

		if (conn.speaking.bitfield)
			return message.channel.send("Ya se esta reproduciendo algo");

		dispatcher.resume();
	} catch (err) {
		console.log(err);
		message.channel.send("Ocurrio un error");
	}
};
