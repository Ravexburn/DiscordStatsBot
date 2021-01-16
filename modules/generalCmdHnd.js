const Discord = require("discord.js");
const playerCard = require("./playerCard.js");

module.exports = (bot = Discord.Client) => {

    require("../modules/help.js")(bot);
    require("../modules/playerCard.js")(bot);

    psGeneral = async function psGeneral(message) {
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);
        let prefix = bot.botSettings.prefix;

        if ((command === `${prefix}ps`) || (command === `${prefix}playerstats`) || (command === `${prefix}help`)) {
            psHelp(message, prefix);
            return null;
        }

        if ((command === `${prefix}playercard`) || (command === `${prefix}pc`)){
            playCard(message, prefix);
            return null;
        }




    }

    return null;
};