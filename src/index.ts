//* This is to meet the liscense agreement for you. Just put your name in the modified by part if you modified it.
//? Developer : SuzuDev
//? Modified by :

//TODO Readd comments to the bots code.
//! This bot is documented!
//! Go to localhost:(port)/docs to go to the docs!
//? Importing my files
import { app, setupReact } from "./website/setupExpress.js";
import { TOKEN, PASSWORD, AUTH } from './importantFiles/env/envExports.js';
import { setUpBot } from "./minecraft/setupBot.js";
import update from "./importantFiles/consoleMods/console.js";
import passthrough from "./minecraft/extras/passthrough.js";
import { setupCommands } from "./discord/commands/handler/commandImports.js";
import clientSetup, { setupIntents } from "./discord/client.js";

//? Importing modules
import path from "path";
import chalk from "chalk";
import { Player } from "discord-player";
import { argv } from "process";
import { Client, Message } from "discord.js";
import Filter from "badwords-filter";
import localtunnel from "localtunnel";

//? Checking the arguments for starting the bot
//? For checking if the bot is in production mode.
var production: boolean = false;
for (let i = 0; i < argv.length; i++) {
    //? Checking the args for --production
    if (argv[i] == "--production") {
        //? Updating the terminal
        update();
        //? Setting production to true
        production = true;
    }
}

//? checking the production variable
if (!production) {
    //? If it is false, log the warning
    console.warn(chalk.yellow("[WARN] Bot is not in production mode. \n\n The custom terminal will be disabled"));
}

//? Creating the react file
//! If you want to use a port other than 3000, you will need to edit the code. Dashboard redirect is always Localhost:3000
var port = Number(process.env.PORT) || 3000;
setupReact(port);


//? creating the client
const client: any = clientSetup(TOKEN, ["ALL"]);


client.on("ready", async () => {
    setTimeout(async () => {
        var tunnel = await localtunnel({ subdomain: "suzu", port: Number(process.env.port) || 3000 });
        console.log(tunnel.url);
        if (tunnel.url.toString() != "https://suzu.loca.lt") {
            tunnel.close();
            tunnel = await localtunnel({ subdomain: "suzudev", port: Number(process.env.port) || 3000 });
        }
        client.user.setActivity({ type: 0, name: tunnel.url })
        console.log(tunnel.url);
    }, 500)
})
//? Setting up the slash commands.
await setupCommands(client);

//? Setting up the auth option
var auth: any = AUTH;
if (auth != "microsoft" && auth != "mojang" && auth != 'offline') {
    auth = "microsoft";
}

const bot = setUpBot("", "mc.hypixel.net", PASSWORD, auth || 'microsoft', true);
//? If the bots get a message send the message to the passthrough channel.
bot.on("message", async (message: any) => {
    if (message.toString().includes("You're currently guild muted for")) return bot.chat('/g unmute ' + bot.username);

    //? This checks if the message includes Guild > and if it doesn't, returns undefined
    //! This can't return something, since it is a void function.
    if (!message.toString().includes("Guild >")) return undefined;
    try {
        var channel = await client.channels.fetch("878026030877663262");
        if (channel) {
            passthrough(message.toString(), channel);
        }
    } catch (err) {

    }
})

const filter = new Filter();

client.on("messageCreate", async (message: any) => {
    //! You need this so it doesnt constantly repeat itself
    if (message.author.id == "907385763178627142") return;

    if (message.channel.id == "878026030877663262") {
        //? Sends the message.
        if (filter.isUnclean(message.content)) return message.reply("Screw you, nice try, I added a content filter");
        if (filter.isUnclean(message.content.replaceAll(" ", ""))) return message.reply("Screw you, nice try, I added a content filter")
        if ((message.author.username.length + 3 + message.content.length) > 100) return message.reply("Message too long!");
        bot.chat(message.author.username + " : " + message.content);
    }

    //! So we dont continue with commands that dont start with .
    if (!message.content.startsWith(".")) { return };
})

//? When someone types something into the console, send it to the guild chat.
process.stdin.on("data", (data) => {
    bot.chat(data.toString().replace("hakari", ""));
});

process.on("exit", (code) => {
    console.log("Process ended with code : " + code);
})

const player = new Player(client, {
    ytdlOptions: {
        filter: "audioonly",
        highWaterMark: 1 << 25,
        quality: "highestaudio"
    }
})

player.on('error', () => { })

export { player };
