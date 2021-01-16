const Discord = require("discord.js");
const botSettings = require("./botSet.json");
const bot = new Discord.Client({ disableMentions: 'everyone' });
bot.botSettings = botSettings;

require("./handlers/msgHnd.js")(bot);

bot.on('ready', async () => {
    // Logs ready
    console.log('Ready');
    // Sets bot status
    bot.user.setActivity(`${botSettings.prefix}ps for list of commands`);

});

bot.on('message', async message => {
    msgHnd(message);
});

bot.login(botSettings.token);