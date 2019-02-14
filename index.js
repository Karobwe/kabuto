const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const getJutsu = require("./src/sheet")

client.on('ready', () => {
    console.log(`Connexion établie`);
});

client.on('message', message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const commands = ["annihilation", "impact", "manipulation", "lunge", "normal", "release"];

    if (command === "ping") {
        message.reply(new Discord.RichEmbed().setColor("#088da5").setTitle(`Pong !`));
    }

    if (commands.includes(command)) {
        console.log(`${message.author.tag} a demander les jutsu de type ${command}`);
        getJutsu(message, command);
    }
});

client.login(config.token);
