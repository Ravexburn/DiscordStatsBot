const Discord = require("discord.js");
const champIcon = require("../modules/lchamps.json");

module.exports = (bot = Discord.Client) => {


	playerCard = async function playerCard(message) {
		let currentPage = 0;
		let embed = new Discord.RichEmbed()
			.setTitle("Player Card")
			.setColor("#104F74")
		playerCardFilter(message, embed, currentPage);
		try {
			const msg = await message.channel.send(embed);
			await msg.react("⬅️");
			await msg.react("➡️");

			const leftArrow = await msg.createReactionCollector((reaction) => reaction.emoji.name === "⬅️", {
				time: 300000
			});

			const rightArrow = await msg.createReactionCollector((reaction) => reaction.emoji.name === "➡️", {
				time: 300000
			});

			// Function for page left

			leftArrow.on('collect', async react => {
				if (react.message.id == msg.id && react.users.size > 1) {
					if (currentPage !== 0) {
						currentPage = currentPage - 1;
						let embed = new Discord.RichEmbed();
						embed.setTitle("Player Card")
						embed.setColor("#104F74")
						playerCardFilter(message, embed, currentPage);
						await msg.edit(embed).catch(console.error);
					}
					Array.from(react.users.values()).forEach(user => {
						if (!user.bot) {
							react.remove(user);
						}
					});
				}
			});

			// Function for page right

			rightArrow.on('collect', async react => {
				if (react.message.id == msg.id && react.users.size > 1) {
					currentPage = currentPage + 1;
					let embed = new Discord.RichEmbed();
					embed.setTitle("Player Card")
					embed.setColor("#104F74")
					playerCardFilter(message, embed, currentPage);
					await msg.edit(embed).catch(console.error);
					Array.from(react.users.values()).forEach(user => {
						if (!user.bot) {
							react.remove(user);
						}
					});
				}
			});

			leftArrow.on('end', () => {
				message.clearReactions().catch(console.error);
			});

			rightArrow.on('end', () => {
				message.clearReactions().catch(console.error);
			});

		} catch (error) {
			console.log(error);
		}
	}

	playerCardFilter = async function playerCardFilter(message, embed, currentPage) {
		switch (currentPage) {
			case 0:
				rankedCard(message, embed);
				break;
			case 1:
				playerTeamCard(message, embed);
				break;
			default:
				return;
		}

	}

	rankedCard = async function rankedCard(message, embed) {
		embed.setThumbnail("http://ddragon.leagueoflegends.com/cdn/10.8.1/img/champion/Aatrox.png")
		embed.addField("Current Rank", "<:goldemotemin:702929243872690347> Gold II", true)
		embed.addField("Most Played Champ", "Aatrox", true)
		embed.addField("Main Role", "<:top_lane:702930006745284680> Top", true)
		embed.addField("Recently Played Champ", "Aatrox", true)
		embed.addField("Current Ranked KDA", "XD", true)
		embed.addField("Overall Ranked KDA", "Blast cone", true);
	}

	playerTeamCard = async function playerTeamCard(message, embed) {
		embed.setThumbnail("https://imgur.com/a/dceKMJ9")
		embed.addField("Current Team", "<:itzybitzyspiders:702934770920849428> ItzyBitzySpiders", true)
		embed.addField("Previous Teams", "<:ptp:702937120482000997> PTP", true)
		embed.addField("Team Role", "<:top_lane:702930006745284680> Top", true)
		embed.addField("Most Played Champ", "Aatrox", true)
		embed.addField("Recently Played Champ", "Aatrox", true)
		embed.addField("Current Season KDA", "XD", true)
		embed.addField("Overall KDA", "Blast cone", true);

	}



};