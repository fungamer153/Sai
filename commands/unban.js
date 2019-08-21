const Discord = require ("discord.js")
const botconfig = require ("../botconfig.json");
const colours = require ("../colours.json");

module.exports.run = async (bot,message,args) => {

    if(!message.member.roles.find(r => r.name === "sia")) return message.channel.send("You don't have the permissions")

    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"
        
    try{
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} has been un-banned from the guild!`)
    } catch(e) {
        console.log(e.message)
    }

    
    let embed = new Discord.RichEmbed()
    .setColor(colours.purple)
    .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconUrl)
    .addField("Moderation:", "Un-ban")
    .addField("Un-banned:", `${bannedMember.username}`)
    .addField("Moderation by:", message.author.username)
    .addField("Reason:", reason)
    .addField("ID:", `${bannedMember.id}`)
    .addField("Date:", message.createdAt)
    let sChannel = message.guild.channels.find(c => c.name === 'sai')
    sChannel.send(embed)






}


module.exports.config = {
    name: "unban",
    description: "kick members",
    usage: "unban <user> <reason>",
    accessableby: "Admin",
    aliases: ["die", "gone"]
}
