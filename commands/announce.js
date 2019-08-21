const Discord = require ("discord.js")
const botconfig = require ("../botconfig.json");
const colours = require ("../colours.json");

module.exports.run = async (bot,message,args) => {

    if(!message.member.roles.find(r => r.name === "sia")) return message.channel.send("You don't have the permissions")

    const text = args.slice(0).join(" ");

    let embed = new Discord.RichEmbed()
    .setColor(colours.purplelight)
    .setTitle(`**${message.author.username}**`)
    .setAuthor('Important announcement by')
    .setDescription(text)
    let sChannel = message.guild.channels.find(c => c.name === 'announcements')
    sChannel.send(embed)

    message.delete()




}


module.exports.config = {
    name: "announce",
    description: "Announce things",
    usage: "<announce>",
    accessableby: "Admin",
    aliases: ["die", "gone"]
}