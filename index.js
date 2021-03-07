const { Client, MessageEmbed } = require("discord.js");
const config = require("./config.json");

const client = new Client();

client.on("message", function(message) { 
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    
    const commandBody = message.content.replace(config.prefix, '').trim();
    const args = commandBody.split(' ');
    const command = args.shift(); 
    
    getMessageEmbedDescription = () => {
        const msg = `Ich mach dich schösch, ${message.author.username}`;
        return `${msg}${args.length > 0 ? ' - ' + args.join(', ') : ''}!`;
    }
    // client.on('ready', () => {
    //     console.log('Los gehts!');
    // });

    if (command === "meem") {
        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle('Bodychange!')
        // Set the color of the embed
        .setColor(0xff0000)
        // Set the main content of the embed
        .setDescription(getMessageEmbedDescription())
        .setThumbnail(client.user.avatarURL());
      // Send the embed to the same channel as the message
      message.channel.send(embed);
    } 
});

client.login(config.token);