const Discord = require("discord.js");

module.exports = (bot = Discord.Client) => {
    
    require("../modules/generalCmdHnd.js")(bot);

    msgHnd = async function msgHnd(message) {
        if (message.system || message.author.bot || message.channel.type === "dm") return null;
            psGeneral(message);
       
    }

};