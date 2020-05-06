exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) {
		message.reply("debes estar conectado a un canal de voz");
		return;
	}

    const conn = await message.member.voiceChannel.join();
	const dispatcher = conn.dispatcher;

	if(!conn.speaking){
        message.reply('no estas escuchando nada papito mi rey');
	}

	const volume = parseFloat(args.join(""));
	console.log(volume);

	message.channel.send("xdd");

	if (isNaN(volume) || volume < 0 || volume > 100) {
		message.reply("debes ingresar un numero de 1 a 100");
	}

    conn.dispatcher.setVolume(volume / 100);
	// try {
	// } catch (error) {
	// 	console.log(error);
	// 	message.channel.send("ocurrio un erro");
	// }
};
