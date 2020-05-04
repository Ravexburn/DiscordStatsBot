const Discord = require("discord.js");
const TeemoJS = require('teemojs')
const champMap = require('./leagueChampMap.json')

module.exports = (bot = Discord.Client) => {

	require("../modules/help.js")(bot);
	require("../modules/playercard.js")(bot);
	require("../modules/psadd.js")(bot);
	require("../modules/psremove.js")(bot);
	require("../modules/RiotAPIandSQLite3Module.js")(bot)

	psGeneral = async function psGeneral(message) {
		let messageArray = message.content.split(" ");
		let command = messageArray[0];
		let args = messageArray.slice(1);
		let prefix = bot.botSettings.prefix;

		if ((command === `${prefix}ps`) || (command === `${prefix}playerstats`) || (command === `${prefix}help`)) {
			psFunc(message, prefix, args);
			return null;
		}

		if ((command === `${prefix}playercard`) || (command === `${prefix}pc`)) {
			playerCard(message);
			return null;
		}

		if(command === `${prefix}test`){
			nonTourneyLeagueSQLOperation(message,messageArray)
			return null
		}

	}

	return null
};


psFunc = async function psFunc(message, prefix, args) {
	if (args.length === 0) {
		psHelp(message, prefix);
		return null;
	}

	// this is the command the bot was issued
	const command = args[0]

	// uses a different function depending on the case
	switch (command) {
		case "help":
			psHelp(message, prefix);
			break;

		case "add":
			message.channel.send("test");
			break;

		default:
			psHelp(message, prefix);
			return null;

	}

	return null;
};