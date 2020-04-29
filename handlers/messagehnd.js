const Discord = require("discord.js");


module.exports = (bot = Discord.Client) => {

	require("../modules/psgeneral")(bot);

	// basic hand off function that goes to message handler psGeneral()
	msgHandler = async function msgHandler(message) {
		if (message.system || message.author.bot || message.channel.type === "dm"){
			return null;
		}
		psGeneral(message);
	}

};