import { Client, messageLink } from "discord.js";
import { githubInfo } from "../messageCommands/info/github.js";
import { helpMessage } from "../messageCommands/info/help.js";
import { messageInfo } from "../messageCommands/info/info.js";
import { Messagelyrics } from "../messageCommands/music/lyrics.js";
import { playMessage } from "../messageCommands/music/play.js";
import { github } from "../slashCommands/info/github.js";
import { help } from "../slashCommands/info/help.js";
import { info } from "../slashCommands/info/info.js";
import { lyrics } from "../slashCommands/music/lyrics.js";
import { play } from "../slashCommands/music/play.js";
import { messageSkip } from "../messageCommands/music/skip.js";
import { skip } from "../slashCommands/music/skip.js";
import commandHandler from "./commandHandler.js";
import { clearCommand } from "../slashCommands/moderation/clear.js";

//? Exporting it as a default so its easier to make the things for the commands.
export default interface Commands { 
    name : string;
    options : Array<{
        name : string;
        description : string;
        type : number;
        required : boolean;
    }> | undefined;
    description : string;
    run : Function;
    aliases : Array<string> | undefined;
    messageCommand : boolean;
    patreon : boolean;
    earlyAccess : boolean;
}

//? Because I am moving to EMCA script, you cant dynamically import the files.
export const commandList: Array<Commands> = [
    info,
    messageInfo,
    github,
    githubInfo,
    help,
    helpMessage, 
    play,
    playMessage,
    Messagelyrics,
    lyrics,
    skip,
    messageSkip,
    clearCommand
];

//? So the commands get uploaded to discords api.
export async function setupCommands(client : any) {
    // console.clear();

    let slashCommands : Array<{
        name : string;
        description : string;
        options : Array<{
            name : string;
            description : string;
            type : number;
            required : boolean;
        }> | undefined;
        run : Function;
    }> = []

    for(let i = 0; i < commandList.length; i++) {
        if(commandList[i].messageCommand == true) {
            client.commands.set(commandList[i].name, commandList[i]);
            client.dashboard.registerCommand(commandList[i].name, commandList[i].description, commandList[i].aliases)
            continue;
        }
        slashCommands.push({
            name : commandList[i].name,
            description : commandList[i].description,
            options : commandList[i].options,
            run : commandList[i].run
        })
        client.slashCommands.set(commandList[i].name, commandList[i]);
    }
    

    client.once("ready", async () => {
        console.clear();
        await client.application?.commands.set(slashCommands);
        console.log("React listening to port 3000~");
        console.log("Logged in as " + client.user.tag + "~");
    })

    commandHandler(client);
}