const Discord = require("discord.js");

module.exports = (bot = Discord.Client) => {

    playCard = async function playCard(message, prefix) {
        let embed = new Discord.MessageEmbed();
        embed.setTitle(`Player Card for ${message.author.username}`);
        embed.setThumbnail(`${message.author.displayAvatarURL()}`);
        embed.addField('Player Name', `db name call`, true);
        embed.addField('Current Team', `db team name call`, true);
        embed.addField('Average Stats', 'db kill call / db assist call / db death call', true);
        embed.addField('Most Played Champion', 'db champ amount', true);
        message.channel.send(embed);
        return null;
    }

};