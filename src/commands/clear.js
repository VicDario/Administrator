exports.run = (client, message, args) => {

    const user = message.mentions.users.first();
    
    if(user){
            
            message.channel.fetchMessages({limit: 100})
            .then(messages => messages.filter(m => {
               if (m.author.id === user.id){
                   m.delete().catch(console.error);
               }
            
            }))
            .catch(console.error);

    }else {
        message.channel.fetchMessages({limit: 100})
        .then(messages => messages.filter(m => {
                m.delete().catch(console.error);
         })).catch(console.error);
    }
}

