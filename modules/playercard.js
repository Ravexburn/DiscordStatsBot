const Discord = require("discord.js");
const champIcon = require("../modules/lchamps.json");

module.exports = (bot = Discord.Client) => {
 

playerCard = async function playerCard(message){
	let embed = new Discord.RichEmbed()
	.setTitle("Player Card")
	.setColor("#104F74")
	.setThumbnail(lchamps.Aatrox)
	.addField("Current Rank", "<:goldemotemin:702929243872690347> Gold II", true)
	.addField("Main Role", "<:top_lane:702930006745284680> Top", true)
	.addField("Current Team", "<:itzybitzyspiders:702934770920849428> ItzyBitzySpiders", true)
	.addField("Previous Teams", "<:ptp:702937120482000997> PTP", true)
	message.channel.send(embed);
}



};