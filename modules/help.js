const Discord = require("discord.js");

module.exports = (bot = Discord.Client) => {

    let currentPage = 0;

    psHelp = async function psHelp(message, prefix) {
        let embed = new Discord.MessageEmbed();
        if (currentPage == 0) {
            embed.setTitle(`\*\*Player Stats Help Guide\*\*`)
        }
        else {
            embed.setTitle(`:question: Help Page ${currentPage}`)
        }
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
                        let embed = new Discord.MessageEmbed();
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
                            react.users.remove();
                        }
                    });
                }
            });

            // Function for page right

            rightArrow.on('collect', async react => {
                if (react.message.id == msg.id && react.users.size > 1) {
                    currentPage = currentPage + 1;
                    let embed = new Discord.MessageEmbed();
                    embed.setTitle(":question: Help Page")
                    embed.setColor("RANDOM")
                    helpFilter(message, prefix, embed, currentPage);
                    if (currentPage != 0) {
                        embed.setFooter(`Page ${currentPage}`);
                    }
                    await msg.edit(embed).catch(console.error);
                    Array.from(react.users.values()).forEach(user => {
                        if (!user.bot) {
                            react.users.remove();
                        }
                    });
                }
            });

            leftArrow.on('end', () => {
                message.reactions.removeAll().catch(console.error);
                console.log("removed");
            });

            rightArrow.on('end', () => {
                message.reactions.removeAll().catch(console.error);
                console.log("removed");
            });

        } catch (error) {
            console.log(error);
        }
    }

    // Switches between the pages in the help command

    helpFilter = async function helpFilter(message, prefix, embed, currentPage) {
        switch (currentPage) {
            case 0:
                psTOC(message, embed);
                break;
            case 1:
                pcInfo(message, embed);
                break;
            default:
                return;
        }
    }

    // Table of Contents 

    psTOC = async function psTOC(message, embed) {
        embed.setDescription("Table of Content");
        embed.addField("Page 1", "Player Card Information");
    }

    // First page of help. Shows help for player card 

    pcInfo = async function pcInfo(message, embed, prefix) {
        embed.addField(`${prefix}playercard [user]`, 'Shows player card for self or for target user');
    }
};