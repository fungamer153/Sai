const randomPuppy = require('random-puppy');

module.exports.run = async (bot,message,args) => {
    let nsg = await message.channel.send("Fetching spicy memes...")
    let reddit = [

        "meme",

        "dank",

        "megadankmemes",

        "animememes",

        "OffensiveMemes",

        "dankmemes",

        "dankmeme",

        "dank_meme",

        "MemeEconomy",

        "techsupportanimals",

        "meirl",

        "me_irl",

        "2meirl4meirl",

        "AdviceAnimals"

    ]
    



    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];



    message.channel.startTyping();



    randomPuppy(subreddit).then(async url => {

            await message.channel.send({

                files: [{

                    attachment: url,

                    name: 'meme.png'

                }]

            }).then(() => message.channel.stopTyping());

    }).catch(err => console.error(err));



};




module.exports.config = {
    name: "meme",
    description: "memes",
    usage: "meme",
    accessableby: "Admin",
    aliases: ["mememe", "mem"]
}
