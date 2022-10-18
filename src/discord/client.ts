//* This is to meet the liscense agreement for you. Just put your name in the modified by part if you modified it.
//? Developer : SuzuDev
//? Modified by :

//? Importing modules
import { Client, Collection, IntentsBitField, Message, PermissionsBitField } from 'discord.js';
import { setupCommands } from './commands/handler/commandImports.js';
import { Player } from 'discord-player';
import Dashboard from './dashboard/index.js';

//! This is in development. May not work.

/**
 * ! THE PARAM, TYPE, OUTPUT, USE, AND ERRORS ARE GOING TO BE REMOVED ONCE I MAKE A DOCS PAGE.
 * ! THE MAIN CODE WILL STILL HAVE COMMENTS, BUT NOT THE OTHERS. IF YOU ARE CONFUSED ON WHAT THEY DO
 * ! POSSIBLE LINKS : http://suzu.loca.lt OR http://suzudev.loca.lt
 * ! IF BOTH OF THOSE ARE TAKEN, IT IS RANDOMIZED. LOOK AT THE BOTS STATUS OR CONSOLE TO GET THE LINK.
 */

/**
 * @param intents
 * @Type : Array : <string> 
 * 
 * @Output : Array<IntentsBitField>
 * 
 * ? Use
 * * For people who were fond of the discord.jsv12 / 13 intents way (Like me.) I made it so you can use strings with an oversized function.
 * 
 * ! Errors : Invalid intents
 * ! Thrown at : client.ts (setupIntents)
 */

/**
 * ? I forgot to add comments to the part where I convert the types, so here we go.
 * 
 * ? This part of the code checks the string in the array for the intent.
 *  if(intents[i].toLowerCase() == 'dmreactions') {
 *       ? This part takes the intent given, and turns it into the corresponding gatewayintent
 *       returnIntents.push(IntentsBitField.DirectMessageReactions);
 *       ? Stops the code from going through the rest of the intents, by going to the next loop.
 *       continue;
 *  }
 */

export function setupIntents(intents: Array<string> | undefined) {
    //? Creating the return intents array.
    var returnIntents: Array<any> = [];

    //? Checking if the user sent the function intents
    if (!intents) {
        console.warn("No intents were given. Setting intents to 'ALL'");
        intents = ['ALL'];
    }
    //? Going throught the intents
    for (var i = 0; i < intents.length; i++) {
        //? If the user sent the all intents, or the code set it to all.
        if (intents[i].toLowerCase() == 'all') {
            returnIntents.push(IntentsBitField.Flags.DirectMessageReactions);
            returnIntents.push(IntentsBitField.Flags.DirectMessageTyping);
            returnIntents.push(IntentsBitField.Flags.DirectMessages);
            returnIntents.push(IntentsBitField.Flags.Guilds);
            returnIntents.push(IntentsBitField.Flags.GuildBans);
            returnIntents.push(IntentsBitField.Flags.GuildEmojisAndStickers);
            returnIntents.push(IntentsBitField.Flags.GuildIntegrations);
            returnIntents.push(IntentsBitField.Flags.GuildInvites);
            returnIntents.push(IntentsBitField.Flags.GuildMembers);
            returnIntents.push(IntentsBitField.Flags.GuildMessageReactions);
            returnIntents.push(IntentsBitField.Flags.GuildMessageTyping);
            returnIntents.push(IntentsBitField.Flags.GuildMessages);
            returnIntents.push(IntentsBitField.Flags.GuildPresences);
            returnIntents.push(IntentsBitField.Flags.GuildScheduledEvents);
            returnIntents.push(IntentsBitField.Flags.GuildVoiceStates);
            returnIntents.push(IntentsBitField.Flags.GuildScheduledEvents);
            returnIntents.push(IntentsBitField.Flags.MessageContent);
            continue;
        }

        if (intents[i].toLowerCase() == 'dmreactions') {
            returnIntents.push(IntentsBitField.Flags.DirectMessageReactions);
            continue;
        }

        if (intents[i].toLowerCase() == 'dmtyping') {
            returnIntents.push(IntentsBitField.Flags.DirectMessageTyping);
            continue;
        }

        if (intents[i].toLowerCase() == 'dm') {
            returnIntents.push(IntentsBitField.Flags.DirectMessages);
            continue;
        }

        if (intents[i].toLowerCase() == 'bans') {
            returnIntents.push(IntentsBitField.Flags.GuildBans);
            continue;
        }

        if (intents[i].toLowerCase() == 'emojis') {
            returnIntents.push(IntentsBitField.Flags.GuildEmojisAndStickers);
            continue;
        }

        if (intents[i].toLowerCase() == 'integrations') {
            returnIntents.push(IntentsBitField.Flags.GuildIntegrations);
            continue;
        }

        if (intents[i].toLowerCase() == 'invites') {
            returnIntents.push(IntentsBitField.Flags.GuildInvites);
            continue;
        }

        if (intents[i].toLowerCase() == 'members') {
            returnIntents.push(IntentsBitField.Flags.GuildMembers);
            continue;
        }

        if (intents[i].toLowerCase() == 'guildmessagereactions') {
            returnIntents.push(IntentsBitField.Flags.GuildMessageReactions);
            continue;
        }

        if (intents[i].toLowerCase() == 'guildmessagetyping') {
            returnIntents.push(IntentsBitField.Flags.GuildMessageTyping);
            continue;
        }

        if (intents[i].toLowerCase() == 'guildmessages') {
            returnIntents.push(IntentsBitField.Flags.GuildMessages);
            continue;
        }

        if (intents[i].toLowerCase() == 'presences') {
            returnIntents.push(IntentsBitField.Flags.GuildPresences);
            continue;
        }

        if (intents[i].toLowerCase() == 'scheduledevents') {
            returnIntents.push(IntentsBitField.Flags.GuildScheduledEvents);
            continue;
        }

        if (intents[i].toLowerCase() == 'voicestates') {
            returnIntents.push(IntentsBitField.Flags.GuildVoiceStates);
            continue;
        }

        if (intents[i].toLowerCase() == 'webhooks') {
            returnIntents.push(IntentsBitField.Flags.GuildWebhooks);
            continue;
        }

        if (intents[i].toLowerCase() == 'guilds') {
            returnIntents.push(IntentsBitField.Flags.Guilds);
            continue;
        }

        if (intents[i].toLowerCase() == 'messagecontent') {
            returnIntents.push(IntentsBitField.Flags.MessageContent);
            continue;
        }

        throw new Error("Invalid intents.");
    }

    return returnIntents;
}

/**
 * @param Token
 * @type String
 * 
 * @param intents
 * @type Array<String>
 * 
 * @output client : Client<boolean>
 * 
 * ? Use :
 * * Create a client and return it, with just a single line. Meant to run the above function.
 * 
 * ! Errors :
 * ! Invalid intents :
 * ! Thrown at : client.ts (setupIntents)
 * 
 * ! Invalid Intents (Discord.js) : 
 * ! Thrown at : discord.js
 * ! Fix : Manually put in intents in main file, or check my code for incorrect spelling.
 * 
 * ! Missing token
 * !Thrown at : client.ts (clientSetup)
 * ! Fix : Add token into perameters.
 */

export default function clientSetup(token: string | undefined, intents: Array<string> | undefined) {
    if (!token) {
        throw new Error("Function missing token (Sorry for this, I had to make it take undefined so people can use environment variables)");
    }
    // *  Correcting the intents
    var correctedIntents: Array<any> = [];
    correctedIntents = setupIntents(intents);

    //* creating a client with the corrected intents
    const client: any = new Client({
        intents: correctedIntents
    })

    //* Creating collections for the global variables.
    client.commands = new Collection();
    client.slashCommands = new Collection();

    client.dashboard = new Dashboard(client, {
        name : "Suzu",
        description : "A bot that is attempting to do everything",
        baseUrl : "https://suzu.loca.lt",
        secret : process.env.SECRET,
        theme : "dark",
        logRequests : false,
        permissions : [PermissionsBitField.Flags.ManageGuild],
        noPortInCallbackUrl : true
    })

    //* Exporting the client.
    client.login(token);
    return client;
}