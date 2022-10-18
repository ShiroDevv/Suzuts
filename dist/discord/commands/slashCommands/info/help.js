//? Importing modules
import { EmbedBuilder } from "discord.js";
//? Creating the command.
export const help = {
    name: "help",
    aliases: [".h"],
    options: [{
            name: "command",
            description: "The command to show how it works",
            type: 3,
            required: true
        }],
    description: "Sends help with commands",
    run: async function (client, interaction) {
        const cmd = client.commands.get(interaction.options.getString('command'));
        if (!cmd)
            return interaction.editReply("Command doesnt exist!");
        if (!cmd.aliases)
            cmd.aliases = "No aliases";
        const fields = [{
                name: "Command",
                value: cmd.name.toString()
            }, {
                name: "Aliases",
                value: cmd.aliases.toString()
            }, {
                name: "requires patreon?",
                value: cmd.patreon.toString()
            }];
        if (cmd.options != undefined) {
            for (let i = 0; i < cmd.options.length; i++) {
                fields.push({
                    name: cmd.options[i].name.toString(),
                    value: cmd.options[i].description.toString()
                });
            }
        }
        const footerOptions = {
            text: `Currently in ${client.guilds.cache.size} guilds!`
        };
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Help')
            .addFields(fields)
            .setFooter(footerOptions);
        interaction.editReply({ content: "", embeds: [embed] });
    },
    messageCommand: false,
    patreon: false,
    earlyAccess: false
};
