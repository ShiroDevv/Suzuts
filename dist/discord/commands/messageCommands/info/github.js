//? Importing modules
import { EmbedBuilder } from "discord.js";
//? Creating the command.
export const githubInfo = {
    name: "github",
    aliases: ["git", "github"],
    options: undefined,
    description: "Sends the github repo for the bot.",
    run: async function (client, message, args) {
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
        message.reply({ embeds: [embed] });
    },
    messageCommand: true,
    patreon: false,
    earlyAccess: false
};
