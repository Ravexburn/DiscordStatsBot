const Discord = require("discord.js");
const botSettings = require("./botsettings.json");
const bot = new Discord.Client({ disableEveryone: true, messageCacheMaxSize: 100 });
bot.botSettings = botSettings;

//Required Files

require("./handlers/messagehnd.js")(bot);

bot.on("ready", async () => {
	console.log('Ready');
	try {
		let link = await bot.generateInvite();
		console.log(link);
	} catch (error) {
		console.log(error.stack);
	}
	bot.user.setActivity(`${botSettings.prefix}ps for list of commands`);
});

bot.on('message', async message => {
	msgHandler(message);
});

bot.login(botSettings.token);