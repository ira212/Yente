const Commando = require('discord.js-commando');
const bot = new Commando.Client({
    owner: '212395045125357568'
});

bot.registry.registerGroup('matchmaking', 'Matchmaking');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(process.env.BOT_TOKEN);
