//? Importing modules
import { EmbedBuilder } from "discord.js";
//? Creating the command.
export const github = {
    name: "github",
    aliases: undefined,
    options: undefined,
    description: "Sends the github repo for the bot.",
    run: async function (client, interaction) {
        const fields = [{
                name: "Github",
                value: "https://github.com/SuzzuDev/Suzu.ts"
            }];
        const footerOptions = {
            text: `Currently in ${client.guilds.cache.size} guilds!`
        };
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Suzu github link')
            .addFields(fields)
            .setFooter(footerOptions);
        interaction.editReply({ content: "", embeds: [embed] });
    },
    messageCommand: false,
    patreon: false,
    earlyAccess: false
};
