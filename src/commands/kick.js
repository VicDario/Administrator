exports.run = (client, message, args) => {
	const user = message.mentions.users.first();
	const userRole = message.member.roles.highest.name;
	const razon = args.slice(1).join(" ");

	if (userRole != "admin" && userRole != "collaborator")
		return message.reply("i zi no kiero k");

	if (!user) return message.reply("Debe mencionar a alguien.");

	if (!message.guild.member(user).kickable)
		return message.reply("No puedo patear al usuario mencionado.");

	if (!razon)
		return message.channel.send("Escriba una razón, `-kick @username [razón]`");

	message.guild.member(user).kick(razon);
	message.channel.send(
		`**${user.username}**, fue pateado del servidor por ${razon}.`
	);
	console.log(user);
};
