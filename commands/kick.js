const Discord = require ("discord.js")
const botconfig = require ("../botconfig.json");
const colours = require ("../colours.json");

module.exports.run = async (bot,message,args) => {

    if(!message.member.roles.find(r => r.name === "sia")) return message.channel.send("You don't have the permissions")

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!kickMember) return message.channel.send("Please supply a  user to kick!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given!"

    if(kickMember.roles.some(r=>["sia protection"].includes(r.name)) ) { 
        message.delete()
        return message.channel.send(`This user cannot be kicked!`)
    } else {
        kickMember.send(`You have been kicked from ${message.guild.name} for: ${reason}.`).then(() => 
    kickMember.kick()).catch(err => console.log(err))
    
    message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000))

    let embed = new Discord.RichEmbed()
    .setColor(colours.pink)
    .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconUrl)
    .addField("Moderation:", "Kick")
    .addField("Kicked:", kickMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("ID:", kickMember.user.id)
    .addField("Date:", message.createdAt)
    let sChannel = message.guild.channels.find(c => c.name === 'sai')
    sChannel.send(embed)




}}


module.exports.config = {
    name: "kick",
    description: "kick members",
    usage: "kick <user> <reason>",
    accessableby: "Admin",
    aliases: ["die", "gone"]
}