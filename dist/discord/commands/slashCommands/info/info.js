//? Importing modules
import { EmbedBuilder } from "discord.js";
//? Creating the command.
export const info = {
    name: "info",
    aliases: undefined,
    options: undefined,
    description: "Sends info on the development on the bot.",
    run: async function (client, interaction) {
        const fields = [{
                name: "Creator",
                value: "PuppyNuff (SuzuDev)",
                inline: true
            }, {
                name: "Version",
                value: "1.1.0",
                inline: false
            }, {
                name: "Prefix",
                value: "."
            }, {
                name: "Discord",
                value: "https://discord.gg/zjBHr3DGft"
            }];
        const footerOptions = {
            text: `Currently in ${client.guilds.cache.size} guilds!`
        };
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Suzu')
            .addFields(fields)
            .setFooter(footerOptions);
        interaction.editReply({ content: "", embeds: [embed] });
    },
    messageCommand: false,
    patreon: false,
    earlyAccess: false
};
