const { MessageEmbed } = require("discord.js");
const embed = new MessageEmbed();

exports.run = async (client, message, args) => {
	if (!message.guild) {
		message.reply("debes estar en un canal");
		return;
	}

	let option = args.shift();

	switch (option) {
		case "new":
			if (!verify(message))
				return message.reply(
					"Solo los Colaboradores y Admins pueden crear nuevos roles"
				);

			try {
				add(client, message, args);
			} catch (e) {
				console.log(e);
			}

			break;

		case "delete":
			if (!verify(message))
				return message.reply(
					"Solo los Colaboradores y Admins pueden eliminar roles"
				);

			try {
				del(client, message, args);
			} catch (error) {
				console.log(error);
				message.reply("no se pudo encontrar el rol");
			}
			break;

		case "list":
			try {
				list(client, message, args);
			} catch (e) {
				console.log(e);
			}
			break;
		default:
			message.reply("debes elegir una opcion. para mas inf escribe -help");
	}
};

async function list(client, message, args) {
	const roles = await message.guild.roles.cache;
	embed.setTitle("Lista de Roles");
	embed.setColor("RANDOM");
	let desc = "";
	for (value of roles) {
		if (value[1].name === "@everyone" || value[1].name === "ApBot") continue;
		desc += value[1].name + "\n";
	}
	embed.setDescription(desc);
	message.channel.send(embed);
}

async function add(client, message, args) {
	const roleName = args.shift();
	const roleColor = args.shift().toUpperCase();

	if (!roleName)
		return message.reply(
			'El rol debe tener un nombre: -role new "nombreRol" "colorRol"'
		);

	await message.guild.roles.create({
		data: {
			name: roleName,
			color: roleColor,
		},
	});
	embed.setTitle(`Rol ${roleName}`);
	embed.setColor(roleColor);
	embed.setDescription(`Se ha creado un nuevo rol con exito.`);
	message.channel.send(embed);
}

async function del(client, message, args) {
	const roleName = args.join(" ");  // used the .join method preventing multiple words role
	const roles = await message.guild.roles.cache;
	for (value of roles) {
		if (value[1].name === roleName) {
			const deleted = await value[1].delete();
			message.reply(`El rol ${deleted.name} ha sido eliminado`);
			return;
		}
	}
	message.reply("no se pudo encontrar el rol");
}

function verify(message) {
	const userRole = message.member.roles.highest.name;
	if (userRole != "admin" && userRole != "collaborator") return false;
	return true;
}
