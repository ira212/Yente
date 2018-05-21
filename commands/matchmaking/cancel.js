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
        if (g.nextPlayer == message.author) {
            message.reply("I'll stop looking for your perfect match.");
            g.nextPlayer = "";
        }
    }

}

module.exports = cancelCommand;