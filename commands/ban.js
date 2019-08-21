const Discord = require ("discord.js")
const botconfig = require ("../botconfig.json");
const colours = require ("../colours.json");

module.exports.run = async (bot,message,args) => {


    if(!message.member.roles.find(r => r.name === "sia")) return message.channel.send("You don't have the permissions")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!banMember) return message.channel.send("Please supply a  user to be banned!");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given!"

    message.delete()

    if(banMember.roles.some(r=>["sia protection"].includes(r.name)) ) { 
        message.delete()
        return message.channel.send(`This user cannot be banned!`)
    } else {
        banMember.send(`You have been banned from ${message.guild.name} for: ${reason} ,contact fungamer153#3798 for any appeals.`).then(() => 
        message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))
    
        message.channel.send(`**${banMember.user.tag}** has been banned`)
    
        let embed = new Discord.RichEmbed()
        .setColor(colours.pink)
        .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconUrl)
        .addField("Moderation:", "ban")
        .addField("Banned:", banMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("ID:", banMember.user.id)
        .addField("Date:", message.createdAt)
        let sChannel = message.guild.channels.find(c => c.name === 'sai')
        sChannel.send(embed)

}}



module.exports.config = {
    name: "ban",
    description: "ban members",
    usage: "ban <user> <reason>",
    accessableby: "Admin",
    aliases: ["a", "b"]
}
