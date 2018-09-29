const commando = require('discord.js-commando');
var g = require("../../global");

class cancelCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cancel',
            group: 'matchmaking',
            memberName: 'cancel',
            description: 'Stop looking for a match.'
        });
    }

    async run(message, args) {
        if (g.nextPlayerT == message.author && g.nextPlayerC == message.author) {
            message.reply("I'll stop looking for your perfect match for TTS and Crucible.");
            g.nextPlayerT = "";
            g.nextPlayerC = "";
        }
        if (g.nextPlayerT == message.author) {
            message.reply("I'll stop looking for your perfect match for TTS.");
            g.nextPlayerT = "";
        }
        if (g.nextPlayerC == message.author) {
            message.reply("I'll stop looking for your perfect match for Crucible.");
            g.nextPlayerC = "";
        }

    }

}

module.exports = cancelCommand;