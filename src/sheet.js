const Discord = require('discord.js');
const {google} = require('googleapis');
const sheets = google.sheets('v4');

const Village = require("./Village");
const Shinobi = require("./Shinobi");
const Jutsu = require("./Jutsu");
const config = require("../config.json");
const util = require("./Util");

// Variables stockant les donées du clients
let message = null;
let command = null;

async function getJutsu(msg, cmd) {
    message = msg;
    command = cmd;
    extractDatas(organizeDatas);
}

function displayResponse(datas) {
    let fieldsByPage = 5;
    let fieldsCount = 0;
    let cardsCount = 0;
    let pages = [];
    let page = 0;
    let embed = new Discord.RichEmbed();
    let group = []

    datas.members.forEach(shinobi => {
        if(fieldsCount >= fieldsByPage) {
            pages.push(group)
            group = [];
            fieldsCount = 0;
        }

        if(shinobi.getAllJutsu(command) !== undefined) {
            group.push({
                name: shinobi.name,
                value: shinobi.getAllJutsu(command)
            });
            fieldsCount++;
            cardsCount++;
        }
    });

    embed.setAuthor(`Cartes de type ${util.toTitleCase(command)} (Total : ${cardsCount})`, Jutsu.getNatureIcon(command));
    embed.setColor(Jutsu.getNatureColor(command));
    // On initialise la première page
    pages[0].forEach(element => {
        embed.addField(element.name, element.value);
    });
    embed.setDescription("Cliquez sur les réaction pour naviguer entre les pages");
    embed.setFooter(`Page ${page + 1} / ${pages.length}`);


    message.channel.send(embed).then(msg => {
        msg.react(util.reactionControls.PREV_PAGE).then(r => {
            msg.react(util.reactionControls.NEXT_PAGE);
            const prevFilter = (reaction, user) => reaction.emoji.name === util.reactionControls.PREV_PAGE && !user.bot;
            const nextFilter = (reaction, user) => reaction.emoji.name === util.reactionControls.NEXT_PAGE && !user.bot;
            const prev = msg.createReactionCollector(prevFilter, {time: 180000});
            const next = msg.createReactionCollector(nextFilter, {time: 180000});
    
            prev.on('collect', r => {
                embed.fields = [];

                if(page > 0 && page < pages.length) {
                    page--;
                } else {
                    page = pages.length - 1;
                }

                for (let i = 0; i < pages[page].length; i++) {
                    const element = pages[page][i];
                    embed.addField(element.name, element.value);
                }

                embed.setFooter(`Page ${page + 1} / ${pages.length}`);
                msg.edit(embed);
            })

            next.on('collect', r => {
                embed.fields = [];

                if(page < pages.length - 1) {
                    page++;
                } else {
                    page = 0;
                }

                for (let i = 0; i < pages[page].length; i++) {
                    const element = pages[page][i];
                    embed.addField(element.name, element.value);
                }

                embed.setFooter(`Page ${page + 1} / ${pages.length}`);
                msg.edit(embed);
            })
        });
    });
}

function organizeDatas(datas) {
    let allShinobi = new Village();

    datas.forEach(row => {
        let [jutsuType, name, stars, jutsuName, type] = row;

        stars = parseInt(stars);
        if(typeof stars !== "number") {
            stars = 1;
        }

        let jutsu = new Jutsu(jutsuName, "", jutsuType, stars);
        let character = new Shinobi(name, type, [jutsu]);

        allShinobi.addShinobi(character);
    });

    displayResponse(allShinobi);
}

function extractDatas(callback) {
    let request = {
        spreadsheetId: config.spreadsheetId,
        range: ['Tout!A2:E'],
        auth: config.key,
    };
    
    sheets.spreadsheets.values.get(request, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        callback(response.data.values);
    });
}

module.exports = getJutsu;