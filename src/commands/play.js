exports.run = async (client, message, args) => {
	if (!message.guild) return;

	// Dependencies
	const { google } = require("googleapis");
	const ytdl = require("ytdl-core");
	const { MessageEmbed } = require("discord.js");

	const youtube = google.youtube({
		version: "v3",
		auth: process.env.APIKEY,
	});

	const embed = new MessageEmbed();
	const query = args.join(" ");

	if (query.length == 0) return message.reply("ingresa una cancion");

	if (!message.member.voice.channel)
		return message.reply("conectate a un canal de voz");

	try {
		const conn = await message.member.voice.channel.join();
		const video = await youtube.search.list({
			part: "id,snippet",
			q: query,
			type: "video",
			maxResults: 1,
		});

		// console.log(video.data.items[0]);
		
		let url = `https://www.youtube.com/watch?v=${video.data.items[0].id.videoId}`;
		console.log(url);
		const stream = await ytdl(url, { filter: "audioonly" });
		const dispatcher = conn.play(stream, { quality: "highestaudio" });

		embed.setTitle(`Reproduciendo: ${video.data.items[0].snippet.title}`);
		embed.setThumbnail(video.data.items[0].snippet.thumbnails.high.url);
		embed.setDescription(video.data.items[0].snippet.description);
		embed.setColor("RANDOM");

		message.channel.send(embed);

		dispatcher.on("speaking", (value) => {
			// return a 0 if stopped speaking
			setTimeout(() => {
				if (!value && !dispatcher.paused) {
					conn.disconnect();
				}
			}, 2000); // delaying the disconnect so the pause command can work properly
		});
	} catch (e) {
		console.error(e);
	}
};
