exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) {
		message.reply("debes estar conectado a un canal de voz");
		return;
	}

	const volume = parseFloat(args.join(""));

	if (isNaN(volume) || volume < 0 || volume > 100) {
		message.reply("debes ingresar un numero de 1 a 100");
		return;
	}

	try {
		const conn = await message.member.voice.channel.join();
		const dispatcher = conn.dispatcher;

		if (!conn.speaking.bitfield) {
			message.reply("no estas escuchando nada papito mi rey");
			conn.disconnect();
			return;
		}

		dispatcher.setVolume(volume / 100);
	} catch (error) {
		console.log(error);
		message.channel.send("ocurrio un error");
		if(conn) conn.disconnect();
	}
};
