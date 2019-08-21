const Discord = require ("discord.js")
const botconfig = require ("../botconfig.json");
const colours = require ("../colours.json");


module.exports.run = async (bot,message,args) => {

    let staffrole = (message.member.roles.some(r => ["Founders"].includes(r.name)))


    if(!message.member.roles.find(r => r.name === "sia")) return message.channel.send("You don't have the permissions")

    let warned = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!warned) return message.channel.send("Please supply a  user to be warned");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "You probably did something wrong"

    message.delete()

    if(warned.roles.some(r=>["sia protection"].includes(r.name)) ) { 
        message.delete()
        return message.channel.send(`This user cannot be warned!`)
    } else {
        warned.send(`You have been warned in ${message.guild.name} for: ${reason}.`).then(() => 
        message.guild.warn()).catch(err => console.log(err))
    
        message.channel.send(`**${warned.user.tag}** has been warned`)
    
        let embed = new Discord.RichEmbed()
        .setColor(colours.Red)
        .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconUrl)
        .addField("Moderation:", "warn")
        .addField("Warned:", warned.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("ID:", warned.user.id)
        let sChannel = message.guild.channels.find(c => c.name === 'sai')
        sChannel.send(embed)
    
    
    

}}



module.exports.config = {
    name: "warn",
    description: "warn members",
    usage: "warn <user> <reason>",
    accessableby: "Admin",
    aliases: ["w", "warn"]
}