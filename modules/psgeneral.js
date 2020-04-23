const Discord = require("discord.js");

module.exports = (bot = Discord.Client) => {

	require("../modules/help.js")(bot);
	require("../modules/playercard.js")(bot);
	require("../modules/psadd.js")(bot);
	require("../modules/psremove.js")(bot);

	psGeneral = async function psGeneral(message) {
		let messageArray = message.content.split(" ");
		let command = messageArray[0];
		let args = messageArray.slice(1);
		let prefix = bot.botSettings.prefix;

		if ((command === `${prefix}ps`) || (command === `${prefix}playerstats`) || (command === `${prefix}help`)) {
			psFunc(message, prefix, args);
			return;
		}

		if ((command === `${prefix}playercard`) || (command === `${prefix}pc`)) {
			playerCard(message);
			return;
		}

	}

	return;
};


psFunc = async function psFunc(message, prefix, args) {
	if (args.length === 0) {
		psHelp(message, prefix);
		return;
	}

	switch (args[0]) {
		case "help":
			psHelp(message, prefix);
			break;

		case "add":
			message.channel.send("test");
			break;

		default:
			psHelp(message, prefix);
			return;

	}

	return;
};