//? Importing modules
import { EmbedBuilder, APIEmbedField, EmbedFooterOptions } from "discord.js";
import Commands from "../../handler/commandImports.js";

//? Creating the command.
export const messageInfo : Commands = {
    name : "info",
    aliases : ["i", "info"],
    options : undefined,
    description : "Sends info on the development on the bot.",
    run : async function(client : any, message : any, args : Array<string>) {
        const fields : Array<APIEmbedField> = [{
            name : "Creator",
            value : "PuppyNuff (SuzuDev)",
            inline : true
        }, {
            name : "Version",
            value : "1.1.0",
            inline : false
        }, {
            name : "Prefix",
            value : "."
        }, {
            name : "Discord",
            value : "https://discord.gg/zjBHr3DGft"
        }]

        const footerOptions : EmbedFooterOptions = {
            text : `Currently in ${client.guilds.cache.size} guilds!`
        }
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Suzu')
            .addFields(fields)
            .setFooter(footerOptions);

        message.reply({ embeds : [embed] });
    },
    messageCommand : true,
    patreon : false,
    earlyAccess : false
}