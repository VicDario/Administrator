exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) {
		message.reply("debes estar conectado a un canal de voz");
		return;
	}

	try {
		const conn = await message.member.voice.channel.join();
		const dispatcher = conn.dispatcher;

		if (conn.speaking.bitfield) {
			message.channel.send("Ya se esta reproduciendo algo");
			return;
		} else if (dispatcher) {
			if (dispatcher.paused) {
				dispatcher.resume();
				return;
			}
		}

		message.channel.send("No estas reproduciendo nada");
		conn.disconnect();
	} catch (err) {
		console.log(err);
	}
};
