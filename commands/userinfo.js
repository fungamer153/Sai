const Discord = require('discord.js')
const colours = require("../colours.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
    .setColor(colours.mediumspringgreen)
    .setTitle("UserInfo")
    .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
    .addField("**Username:**", `${message.author.username}`, true)
    .addField("**Discriminator:**", `${message.author.discriminator}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Created At:**", `${message.author.createdAt}`, true)
    .setFooter(`Sia`, bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});

}

module.exports.config = {
    name: "userinfo",
    aliases: ["a"]
}
