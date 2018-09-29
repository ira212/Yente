const commando = require('discord.js-commando');
var g = require("../../global");

class lfgCommand extends commando.Command {
    
    constructor(client) {
        super(client, {
            name: 'lfg',
            group: 'matchmaking',
            memberName: 'lfg',
            description: "Search for a match on TTS or Crucible. Times out after 15 minutes by default. Optionally, include a number afterward to specify the number of minutes you'll be available: !LFG 30"
        });
        
    }

    async run(message, args) {
        var defaultTime = 15;

        // if we got an argument, confirm it's an integer, then use it as a number
        if (args.length > 0) {
            var myArgs = args.split(" ");
            if (Number.isInteger (parseInt(myArgs[0], 10))) {
                defaultTime = myArgs[0];
            }
        }

        // clear anyone old out of the queue
        var currentTime = new Date().getTime();
        if (g.nextPlayerT != "" && currentTime > g.expireTimeT) {
            g.nextPlayerT = "";
            g.expireTimeT = "";
        }
        if (g.nextPlayerC != "" && currentTime > g.expireTimeC) {
            g.nextPlayerC = "";
            g.expireTimeC = "";
        }

        // if there is someone waiting
        if (g.nextPlayerT != "" || g.nextPlayerC != "") {
            // someone new is available, found a match on TTS
            if (g.nextPlayerT != message.author && g.nextPlayerT != "") {
                message.reply("I have the perfect match for you on TTS! Please play "+g.nextPlayerT.username+" (if you haven't played them before), then report the result here: "+g.reportURL);
                g.nextPlayerT.send("I found a match for you on TTS! Please play "+message.author+" (if you haven't played them before), then report the result here: "+g.reportURL);
                // if the author or next player were also waiting on Crucible, remove them from that queue
                if (g.nextPlayerC == g.nextPlayerT || g.nextPlayerC == message.author) {
                    g.nextPlayerC = "";
                    g.expireTimeC = "";
                }
                g.nextPlayerT = "";
                g.expireTimeT = "";
            }
            // someone new is available, found a match on Crucible
            else if (g.nextPlayerC != message.author && g.nextPlayerC != "") {
                message.reply("I have the perfect match for you on Crucible! Please play "+g.nextPlayerC.username+" (if you haven't played them before), then report the result here: "+g.reportURL);
                g.nextPlayerC.send("I found a match for you on Crucible! Please play "+message.author+" (if you haven't played them before), then report the result here: "+g.reportURL);
                // if the author or next player were also waiting on TTS, remove them from that queue
                if (g.nextPlayerT == g.nextPlayerC || g.nextPlayerT == message.author) {
                    g.nextPlayerT = "";
                    g.expireTimeT = "";
                }
                g.nextPlayerC = "";
                g.expireTimeC = "";
            }
            // the player tried to add themself again
            else {
                message.reply("I'll try even harder to find you the perfect match on TTS or Crucible in the next " + defaultTime + " minute" + (defaultTime != 1 ? "s" : "") +"! If you must depart before then, just say !cancel.");
                g.expireTimeT = new Date().getTime() + defaultTime * 60000;
                g.expireTimeC = new Date().getTime() + defaultTime * 60000;
            }

        }
        // currently no one waiting
        else {
            message.reply("I'll find you the perfect match on TTS or Crucible in the next " + defaultTime + " minute" + (defaultTime != 1 ? "s" : "") +"! If you must depart before then, say !cancel. To look for a different amount of time, use LFG 30 (or however many minutes you want).");
            g.nextPlayerT = message.author;
            g.nextPlayerC = message.author;
            g.expireTimeT = new Date().getTime() + defaultTime * 60000;
            g.expireTimeC = new Date().getTime() + defaultTime * 60000;
        }

    }

}

module.exports = lfgCommand;