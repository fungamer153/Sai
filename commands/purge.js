const Discord = require ("discord.js")
const botconfig = require ("../botconfig.json");
const colours = require ("../colours.json");

module.exports.run = async (bot,message,args) => {

    if(!message.member.roles.find(r => r.name === "sia")) return message.channel.send("You don't have the permissions")

    if (isNaN(args[0])) return message.channel.send("Please specify amount of messages to purge.")
    if (args[0] > 500) return message.channel.send("Please supply a number less than 500.")

    message.channel.bulkDelete(args[0])
        .then( message.channel.send(`Successfully deleted ${args[0]}\ messages`)).then( msg => msg.delete({ timeout: 1000}))

        .catch( error => message.channel.send(`Error ${error.message}`));


        let embed = new Discord.RichEmbed()
        .setColor(colours.Cyan)
        .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconUrl)
        .addField("Moderation:", "purge")
        .addField("Amount of messages:", `${args[0]}`)
        .addField("Moderator:", message.author.username)
        let sChannel = message.guild.channels.find(c => c.name === 'sai')
        sChannel.send(embed)

}

module.exports.config = {
    name: "purge",
    description: "purge messages",
    usage: "purge <number>",
    accessableby: "Admin",
    aliases: ["remove"]
}