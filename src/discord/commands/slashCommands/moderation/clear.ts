import { Client, Interaction } from "discord.js";
import Commands from "../../handler/commandImports.js";


export const clearCommand : Commands = {
    name : "clear",
    options : [{
        name : "amount",
        description : "Amount to clear",
        type : 4,
        required : true
    }],
    messageCommand : false,
    patreon : false,
    aliases : undefined,
    description : "clears a bulk amount of messages",
    run : function (client : Client, interaction : any) {
        interaction.channel?.bulkDelete(interaction.options.getInteger("amount"));
    },
    earlyAccess : false
}
