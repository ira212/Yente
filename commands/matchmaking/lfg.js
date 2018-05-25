const commando = require('discord.js-commando');
var g = require("../../global");

class lfgCommand extends commando.Command {
    
    constructor(client) {
        super(client, {
            name: 'lfg',
            group: 'matchmaking',
            memberName: 'lfg',
            description: "Search for a match. Times out after 10 minutes by default. Optionally, include a number afterward to specify the number of minutes you'll be available: !LFG 30"
        });
        
    }

    async run(message, args) {
        var defaultTime = 10;

        // if we got an argument, confirm it's an integer, then use it as a number
        if (args.length > 0) {
            var myArgs = args.split(" ");
            if (Number.isInteger (parseInt(myArgs[0], 10))) {
                defaultTime = myArgs[0];
            }
        }

        // clear anyone old out of the queue
        var currentTime = new Date().getTime();
        if (g.nextPlayer != "" && currentTime > g.expireTime) {
            g.nextPlayer = "";
            g.expireTime = "";
        }

        // if there is someone waiting
        if (g.nextPlayer != "") {
            // the player tried to add themself again
            if (g.nextPlayer == message.author) {
                message.reply("I'll try even harder to find you the perfect match in the next " + defaultTime + " minute" + (defaultTime != 1 ? "s" : "") +"! If you must depart before then, just say !cancel.");
                g.expireTime = new Date().getTime() + defaultTime * 60000;
            }
            // someone new is available, found a match!
            else {
                message.reply("I have the perfect match for you! Please play "+g.nextPlayer.username+" (if you haven't played them before), then report the result here: https://goo.gl/forms/nFYaxxEP1uKYgNF82");
                g.nextPlayer.send("I found a match for you! Please play "+message.author.username+" (if you haven't played them before), then report the result here: https://goo.gl/forms/nFYaxxEP1uKYgNF82");
                g.nextPlayer = "";
                g.expireTime = "";
            }

        }
        // currently no one waiting
        else {
            message.reply("I'll find you the perfect match in the next " + defaultTime + " minute" + (defaultTime != 1 ? "s" : "") +"! If you must depart before then, just say !cancel.");
            g.nextPlayer = message.author;
            g.expireTime = new Date().getTime() + defaultTime * 60000;
        }

    }

}

module.exports = lfgCommand;