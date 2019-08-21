const Discord = require ("discord.js")
const botconfig = require ("../botconfig.json");
const colours = require ("../colours.json");

module.exports.run = async (bot,message,args) => {

let staffrole = (message.member.roles.some(r => ["sia protection"].includes(r.name)))

if(!message.member.roles.find(r => r.name === "sia")) return message.channel.send("You don't have the permissions")
    
let mutee = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
if(!mutee) return message.channel.send("Please provide a user")


let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

if(mutee.roles.some(r=>["sia protection"].includes(r.name)) ) { 
    return message.channel.send(`This user cannot be muted!`)
  } else {
    let muterole = message.guild.roles.find(r => r.name === "Muted")
    
    if(!muterole) {
        try{
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#514f48",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false,
    
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }
    mutee.addRole(muterole.id).then(() => {
        message.delete()
        mutee.send(`Hello, you have been muted in ${message.guild.name} for ${reason}`)
        message.channel.send(`${mutee.user.username} was successfully muted.`)
    })
    
    let embed = new Discord.RichEmbed()
    .setColor(colours.mediumspringgreen)
    .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconUrl)
    .addField("Moderation:", "mute")
    .addField("Mutee:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("ID:", mutee.user.id)
    let sChannel = message.guild.channels.find(c => c.name === 'sai')
    sChannel.send(embed)
    
    
  }
    


}




module.exports.config = {
    name: "mute",
    description: "Mute members",
    usage: "mute <user> <reason>",
    accessableby: "Admin",
    aliases: ["m", "No speak"]
}