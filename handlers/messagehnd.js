const Discord = require("discord.js");


module.exports = (bot = Discord.Client) => {

	require("../modules/psgeneral")(bot);

	msgHandler = async function msgHandler(message) {
		if (message.system || message.author.bot || message.channel.type === "dm") return;
		psGeneral(message);
	}

};