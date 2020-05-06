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
			try {
				add(client, message, args);
			} catch (e) {
				console.log(e);
			}

        break;
        
        case "delete":
            try {
                del(client,message,args);
            } catch (error) {
                console.log(error);
                message.reply('no se pudo encontrar el rol');
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
			message.reply("debes elegir una opcion. para mas inf.");
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
		// console.log(value[1].name);
	}
	embed.setDescription(desc);
	message.reply(embed);
}

async function add(client, message, args) {
	let roleName = args.shift();
	if (roleName) {
		if (
			message.member.roles.highest.name === "admin" ||
			message.member.roles.highest.name === "collaborator"
		) {
			let roleColor = args.shift().toUpperCase();

			await message.guild.roles.create({
				data: {
					name: roleName,
					color: roleColor,
				},
			});
			embed.setTitle(`Rol ${roleName}`);
			embed.setColor(roleColor);
			embed.setDescription(`Se ha creado un nuevo rol con exito.`);
			message.reply(embed);
		} else {
			message.reply(
				"Solo los Colaboradores y Admins pueden crear nuevos roles"
			);
		}
	} else {
		message.reply(
			'El rol debe tener un nombre: -role new "nombreRol" "colorRol"'
		);
	}
}

async function del(client,message,args){
    let roleName = args.join(' ');
    const roles = await message.guild.roles.cache;
    for (value of roles) {
		if (value[1].name === roleName){
            const deleted = await value[1].delete();
            message.reply(`El rol ${deleted.name} ha sido eliminado`);
            return;
        };
    }
    message.reply('no se pudo encontrar el rol');
}
