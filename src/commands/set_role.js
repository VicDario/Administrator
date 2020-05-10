exports.run = async (client, message, args) => {
	const { MessageEmbed } = require("discord.js");
	const embed = new MessageEmbed();
	const user = message.mentions.members.first();
	const userRole = message.member.roles.highest.name;

	if (userRole != "Admin" && userRole != "Collaborator")
		return message.reply(
			"Solo los Colaboradores y Admins pueden asignar roles"
		);

	try {
		console.log(user);
    // if (!user) return message.reply('debes mencionar un usuario');
    message.channel.send('este comando aun no esta desarrollado');
		
	} catch (e) {
		console.log(e);
	}
};
