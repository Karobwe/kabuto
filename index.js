const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const getJutsu = require("./src/sheet");
const util = require("./src/Util");

client.on('ready', () => {
    console.log(`Connexion établie`);
});

client.on('message', message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    if (command === "ping") {
        message.reply(new Discord.RichEmbed().setColor("#088da5").setTitle(`Pong !`));
    }

    if (util.natures.includes(command)) {
        if(command === "impacte") command = "impact";
        if(command === "normale") command = "normal";
        if(command === "manipulate") command = "manipulation";
        console.log(`${message.author.tag} a demander les jutsu de type ${command}`);
        getJutsu(message, command);
    }
});

client.login(config.token);
