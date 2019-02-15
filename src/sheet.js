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

/**
 * 
 * @param {Discord.Message} msg Objet message récupéré depuis le client Discord 
 * pour savoir où la réponse doit être envoyé
 * @param {string} cmd Commande entrée par l'utilisateur
 */
async function getJutsu(msg, cmd) {
    message = msg;
    command = cmd;
    extractDatas(organizeDatas);
}

/**
 * Trie les personnage en fonction de la commande tapé par l'utilisateur
 * puis répond au message de l'utilisateur
 * @param {Village} datas 
 */
function displayResponse(datas) {
    let fieldsByPage = 5;
    let fieldsCount = 0;
    let cardsCount = 0;
    let pages = [];
    let page = 0;
    let embed = new Discord.RichEmbed();
    let group = []

    /**
     * On calcul les données par page
     */
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
    // On initialise la réponse avec la première page
    pages[0].forEach(element => {
        embed.addField(element.name, element.value);
    });
    embed.setDescription("Cliquez sur les réaction pour naviguer entre les pages");
    embed.setFooter(`Page ${page + 1} / ${pages.length}`);


    message.channel.send(embed).then(msg => {
        msg.react(util.reactionControls.PREV_PAGE).then(r => {
            msg.react(util.reactionControls.NEXT_PAGE);
            /**
             * On indique quel réactions on vas utilisé pour la navigation
             * puis on demande d'écouter pendant un sertain temps (en milliscondes) 
             * quand un utilisateur réagit avec les réaction définit dans le filtre
             * @param {Discord.User} reaction 
             * @param {Discord.Emoji} user 
             * @returns {boolean}
             */
            const prevFilter = (reaction, user) => reaction.emoji.name === util.reactionControls.PREV_PAGE && !user.bot;
            const nextFilter = (reaction, user) => reaction.emoji.name === util.reactionControls.NEXT_PAGE && !user.bot;
            const prev = msg.createReactionCollector(prevFilter, {time: 180000});
            const next = msg.createReactionCollector(nextFilter, {time: 180000});

            // Code à éxécuter quand on clique sur le bouton précédent
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

            // Code à éxécuter quand on clique sur le bouton suivant
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

/**
 * Construit un objet JSON à partir des données extraite du fichier,
 * en utilisant les classes Village, Shinobi et Jutsu pour organiser le JSON
 * @param {array} datas Tableau contenant des tableau représentant chaque ligne du Sheets
 */
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

/**
 * Récupère les données depuis Google Sheets
 * @param {function} callback 
 */
function extractDatas(callback) {
    /**
     * Contient les donées nécessaires pour faire une requête
     * qui sont défini dans le fichier config.json
     * @argument {string} spreadsheetId Identifiant de la feuille Google Sheets
     * @argument {Array[string] | string} range Cellules à récupérés (cf https://developers.google.com/sheets/api/guides/concepts#a1_notation)
     * @argument {string} auth
     */
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