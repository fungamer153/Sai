const Discord = require('discord.js')
const colours = require("../colours.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
    .setColor(colours.mediumspringgreen)
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Guild Name:**", `${message.guild.name}`, true)
    .addField("**Guild Owner:**", `${message.guild.owner}`, true)
    .addField("**Member count:**", `${message.guild.memberCount}`, true)
    .addField("**Role Count:**", `${message.guild.roles.size}`, true)
    .setFooter(`Sia`, bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["b"]
}
