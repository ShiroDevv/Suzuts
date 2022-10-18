//? Importing modules
import { EmbedBuilder, APIEmbedField, EmbedFooterOptions } from "discord.js";
import Commands from "../../handler/commandImports.js";

//? Creating the command.
export const github : Commands = {
    name : "github",
    aliases : undefined,
    options : undefined,
    description : "Sends the github repo for the bot.",
    run : async function(client : any, interaction : any) {
        const fields : Array<APIEmbedField> = [ {
            name : "Github",
            value : "https://github.com/SuzzuDev/Suzu.ts"
        }]

        const footerOptions : EmbedFooterOptions = {
            text : `Currently in ${client.guilds.cache.size} guilds!`
        }
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('Suzu github link')
            .addFields(fields)
            .setFooter(footerOptions);

        interaction.editReply({ content : "", embeds : [embed] });
    },
    messageCommand : false,
    patreon : false,
    earlyAccess : false
}