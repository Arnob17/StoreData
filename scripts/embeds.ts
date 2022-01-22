const dApi = require('discord.js');
class MsmEmbed {
    cEmbed(message, cashIn, cashOut, Tax) {
        return {
            embeds: [
                {
                    author: {
                        name: 'MelroseSnowyMint.bank'
                    },
                    description: `Name: \`${message.author.username}\``,
                    fields: [
                        {
                            name: 'Cash-Added',
                            value: `\`\`\`js\n+${cashIn} [-${Tax}(TAX)]\`\`\``
                        },
                        {
                            name: 'Cash-Subtract',
                            value: `\`\`\`js\n-${cashOut}\`\`\``
                        },
                        {
                            name: 'IssueId',
                            value: `\`\`\`js\n${Date.now() + 100}\`\`\``
                        }
                    ],
                    color: "#F1B4CB"
                }
            ]
        }
    }

    pagination (msm, message, embed, field, field2, array) {
        let currPage = 0;
        let i = 0;
        let embedS = [];

        array.forEach(element => {
            if (!embedS[Math.floor(i / 4)]) {
                embedS.push(embed, embed.setFooter(`CurrentPage->[${embedS.length + 1}/${array.length}]`))
            }
            embedS[Math.floor(i / 4)].addField(`${field}`, `${field2}`)
            i++;
        });
        let buttonRow = new dApi.MessageActionRow()
        .addComponents(
            new dApi.MessageButton()
                .setCustomId("prev")
                .setStyle("SUCCESS")
                .setLabel("Prev"),
            new dApi.MessageButton()
                .setCustomId("next")
                .setStyle("SUCCESS")
                .setLabel("Next")
        )
        message.reply({ embeds: [embedS[currPage]], components: [buttonRow] }).then(async (message) => {
            const buttons = async (i) => {
                if (!i.user.id == message.author.id) { return message.channel.send({ embeds: [{ description: "Error: `x0017`" }] }) }
                if (i.customId == "next") {
                    if (currPage < embedS.length - 1) {
                        currPage++;
                        i.deferUpdate();
                        await i.message.edit({ embeds: [embedS[currPage]], components: [buttonRow] });
                    } else {
                        i.deferUpdate();
                    }
                } else if (i.customId == "prev") {
                    if (currPage !== 0) {
                        --currPage;
                        i.deferUpdate();
                        await i.message.edit({ embeds: [embedS[currPage]], components: [buttonRow] });
                    } else {
                        i.deferUpdate();
                    }
                }
            }
            const filter = (interaction) => {
    
                return !interaction.user.bot
            };
            const collector = message.createMessageComponentCollector({
                filter,
                componentType: "BUTTON",
                time: 60000
            });
            collector.on("collect", buttons);
        })
    }
}

module.exports = MsmEmbed;