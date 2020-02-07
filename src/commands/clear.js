exports.run = (client, message, args) => {

    const user = message.mentions.users.first();

    const member = message.guild.member(user);

    if(member){
            
            message.channel.fetchMessages()
            .then(messages => `${messages.filter(m => {
               if (m.author.id === member.id){
                   m.delete().catch(console.error)
               }
            
            })}`)
            .catch(console.error);

    }else{
        message.channel.fetchMessages().delete().catch(console.error)
    }
}
}
