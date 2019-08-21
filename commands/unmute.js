const Discord = require ("discord.js")
const botconfig = require ("../botconfig.json");
const colours = require ("../colours.json");


module.exports.run = async (bot,message,args) => {

    if(!message.member.roles.find(r => r.name === "sia")) return message.channel.send("You don't have the permissions")

    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mutee) return message.channel.send("Please supply a  user to be muted");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"


    let muterole = message.guild.roles.find(r => r.name === "Muted")
    if(!muterole) return message.channel.send("There is no mute role to remove")


    mutee.removeRole(muterole.id).then(() =>  {
        message.delete()
        mutee.send(`Hello you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
        message.channel.send(`${mutee.user.username} was unmuted!`)
})

    let embed = new Discord.RichEmbed()
    .setColor(colours.mediumspringgreen)
    .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconUrl)
    .addField("Moderation:", "unmute")
    .addField("Unmuted:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("ID:", mutee.user.id)
    let sChannel = message.guild.channels.find(c => c.name === 'sai')
    sChannel.send(embed)







}




module.exports.config = {
    name: "unmute",
    description: "unmute members",
    usage: "unmute <user> <reason>",
    accessableby: "Admin",
    aliases: ["m", "speak"]
}