exports.run = async (client, message, args) => {

    const user = message.mentions.users.first();
    
    if(user){

        try {
            const messages = await message.channel.messages.fetch({limit: 100});
            messages.forEach(msg => {
                if(msg.author.id === user.id) msg.delete();
            });
        } catch (error) {
            console.log(error);
        }

    }else {

        try {
            const messages = await message.channel.messages.fetch({limit: 100});
            messages.forEach(msg => msg.delete());
        } catch (error) {
            console.log(error);
        }

    }
}

