//? Importing modules
import { EmbedBuilder, APIEmbedField, EmbedFooterOptions } from "discord.js";
import Commands from "../../handler/commandImports.js";

//? Creating the command.
export const helpMessage: Commands = {
    name: "help",
    aliases: ["h", "help"],
    options: [{
        name: "command",
        description: "The command to show how it works",
        type: 3,
        required: true
    }],
    description: "Sends help with commands",
    run: async function (client: any, message: any, args : Array<string>) {

        if(!args[1]) return message.reply("Missing the commands name")

        const cmd = client.commands.get(args[1]);
        

        if (!cmd) return message.reply("Command doesnt exist!")

        if (!cmd.aliases) cmd.aliases = "No aliases"

        const fields: Array<APIEmbedField> = [{
            name: "Command",
            value: cmd.name.toString()
        }, {
            name: "Aliases",
            value: cmd.aliases.toString()
        }, {
            name: "requires patreon?",
            value: cmd.patreon.toString()
        }]

        if (cmd.options != undefined) {
            for (let i = 0; i < cmd.options.length; i++) {
                fields.push({
                    name: cmd.options[i].name.toString(),
                    value: cmd.options[i].description.toString()
                })
            }
        }

        const footerOptions: EmbedFooterOptions = {
            text: `Currently in ${client.guilds.cache.size} guilds!`
        }
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Help')
            .addFields(fields)
            .setFooter(footerOptions);

        message.reply({ embeds: [embed] });
    },
    messageCommand: true,
    patreon: false,
    earlyAccess : false
}