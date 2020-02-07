exports.run = (client, message, args) => {

    const user = message.mentions.users.first();
    
    if(user){

    const member = message.guild.member(user);

    if(member){
            
            message.channel.fetchMessages({limit: 100})
            .then(messages => `${messages.filter(m => {
               if (m.author.id === user.id){
                   m.delete().catch(console.error)
               }
            
            })}`)
            .catch(console.error);

    }else {
        message.channel.fetchMessages({limit: 100})
        .then(messages => messages.filter(m => {
                m.delete().catch(console.error)
         })).catch(console.error);
    }else{
        for(int x=0;x>20;x++){
            message.channel.fetchMessages().delete().catch(console.error)
        }
        
    }
}
}
