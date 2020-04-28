cconst Discord = require("discord.js");

module.exports = (bot = Discord.Client) => {

	let currentPage = 0;

	psHelp = async function psHelp(message, prefix) {
		let embed = new Discord.RichEmbed();
		embed.setTitle(":question: Help Page")
		embed.setColor("RANDOM")
		helpFilter(message, prefix, embed, currentPage);
		if (currentPage != 0) {
			embed.setFooter(`Page ${currentPage}`);
		}
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
						embed.setTitle(":question: Help Page")
						embed.setColor("RANDOM")
						helpFilter(message, prefix, embed, currentPage);
						if (currentPage != 0) {
							embed.setFooter(`Page ${currentPage}`);
						}
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
					embed.setTitle(":question: Help Page")
					embed.setColor("RANDOM")
					helpFilter(message, prefix, embed, currentPage);
					if (currentPage != 0) {
						embed.setFooter(`Page ${currentPage}`);
					}
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

	helpFilter = async function helpFilter(message, prefix, embed, currentPage) {
		switch (currentPage) {
			case 0:
				tocHelp(message, embed);
				break;
			case 1:
				playerCardHelp(message, prefix, embed);
				break;
			case 2:
				playerModHelp(message, prefix, embed);
				break;
			case 3:
				teamHelp(message, prefix, embed);
				break;
			case 4:
				teamModHelp(message, prefix, embed);
				break;
			case 5:
				tournHelp(message, prefix, embed);
				break;
			case 6:
				tournModHelp(message, prefix, embed);
				break;
			default:
				return;
		}


	}

	// Table of Contents 

	tocHelp = async function tocHelp(message, embed) {
		embed.setDescription("**Table of Contents**");
		embed.addField("Page 1", "Player Card Help");
		embed.addField("Page 2", "Player Stats Mod Help");
		embed.addField("Page 3", "Team Stats Help");
		embed.addField("Page 4", "Team Stats Mod Help");
		embed.addField("Page 5", "Tournament Stats Help");
		embed.addField("Page 6", "Tournament Stats Mod Help");
	}

	// Player help

	playerCardHelp = async function playerCardHelp(message, prefix, embed) {
		embed.addField(`${prefix}pc [Player Name | User ID | Mention]`, "Shows stats for a player.");

	}

	playerModHelp = async function playerModHelp(message, prefix, embed) {
		embed.addField(`${prefix}pc add [User ID | Mention]`, "Adds a player to the stats page. (Mod Only)");
		embed.addField(`${prefix}pc remove [User ID | Mention]`, "Removes a player from the stats page. (Mod Only)");
		embed.addField(`${prefix}pc edit [User ID | Mention]`, "Edits a player's info. (Mod Only)");

	}


	teamHelp = async function teamHelp(message, prefix, embed) {
		embed.addField(`${prefix}tc [Team Name]`, "Shows stats for a team.");

	}

	teamModHelp = async function teamModHelp(message, prefix, embed) {
		embed.addField(`${prefix}tc add [Team Name]`, "Adds a team to the stats page. (Mod Only)");
		embed.addField(`${prefix}tc remove [Team Name]`, "Removes a team from the stats page. (Mod Only)");
		embed.addField(`${prefix}tc edit [Team Name]`, "Edits a team's info. (Mod Only)");

	}

	tournHelp = async function tournHelp(message, prefix, embed) {
		embed.addField(`${prefix}tourney [Tournament Name]`, "Shows stats for a tournament.");

	}

	tournModHelp = async function tournModHelp(message, prefix, embed) {
		embed.addField(`${prefix}tourney add [Tournament Name]`, "Adds a player to the stats page. (Mod Only)");
		embed.addField(`${prefix}tourney remove [Tournament Name]`, "Adds a player to the stats page. (Mod Only)");
		embed.addField(`${prefix}tourney edit [Tournament Name]`, "Adds a player to the stats page. (Mod Only)");

	}

};
