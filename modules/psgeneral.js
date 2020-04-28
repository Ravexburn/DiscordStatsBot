const Discord = require("discord.js");

module.exports = (bot = Discord.Client) => {

	require("../modules/help.js")(bot);
	require("../modules/playercard.js")(bot);
	require("../modules/psadd.js")(bot);
	require("../modules/psremove.js")(bot);
	require("../modules/teamcard.js")(bot);

	psGeneral = async function psGeneral(message) {
		let messageArray = message.content.split(" ");
		let command = messageArray[0];
		let args = messageArray.slice(1);
		let prefix = bot.botSettings.prefix;

		if ((command === `${prefix}help`)) {
			psHelp(message, prefix);
			return;
		}

		if ((command === `${prefix}pc`) || (command === `${prefix}playercard`)) {
			playerCard(message);
			return;
		}

		if ((command === `${prefix}tc`) || (command === `${prefix}teamcard`)) {
			teamCard(message);
			return;
		}
	}

	return;
};