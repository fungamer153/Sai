const Discord = require('discord.js')
const colours = require("../colours.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
    .setTitle("Commands")
    .setColor(colours.mediumspringgreen)
    .addField('**/serverinfo**','Shows the server info.')
    .addField('**/userinfo**', 'Shows your discord.')
    .addField('**/mute**', 'Mute a person.')
    .addField('**/unmute**', 'Unmute a person.')
    .addField('**/ban**', 'Ban a person.')
    .addField('**/unban**', 'unban a person.')
    .addField('**/kick**', 'kick a person.')
    .addField('**/announce**', 'Create a announcement.')
    .addField('**/warn:**', 'Warn a member')
    .addField('**/meme:**', 'Shows a meme')
    .addField('**/purge:**', 'Remove unwanted amount of words')
    .addField('**Prefix:**', '/')

    message.channel.send({embed: sEmbed});
    
}

module.exports.config = {
    name: "cmds",
    aliases: ["msdamn"]
}
