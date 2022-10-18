//? Importing modules
import mineflayer from 'mineflayer';

//? Importing my files
import handleMessages from './chatHandling/messageHandler.js';

//? exporting the creation process, returning the bot

//* This is to meet the liscense agreement for you. Just put your name in the modified by part if you modified it.
//? Developer : SuzuDev
//? Modified by :

/**
 * 
 * @param username npm i --save-dev @types/suzufunctions
 * @type string
 * @param password
 * @type string | undefined 
 * @param host 
 * @type string | undefined
 * @param auth 
 * @type string | undefined
 * 
 * ? Use : Creating a mineflayer bot for a guild.
 * 
 * ! ERRORS : 
 * 
 * ! Invalid credentials :
 * ! Caused by : mineflayer
 * ! Fixes : [
 * !    1 : delete password field
 * !    2 : Check credentials.
 * !]
 */
export function setUpBot(username : string, host : string, password : string | undefined, auth : "mojang" | "microsoft" | "offline", limits = true) {
    //? getting rid of the password function for people.
    if(auth == "microsoft" || auth == "offline") {
        password = undefined;
    }
    //? Creating the bot
    const bot = mineflayer.createBot({
        username : username,
        password: password,
        auth : auth || "microsoft",
        host : host,
        version: "1.8.9"
    })

    //? when the bot runs into an error
    bot.on('error', (err) => {
        console.error(err);
    });

    //? When the bot get a message
    bot.on("message", async (message) => {
        try {
            var response = await handleMessages(message, limits, bot.username);
        } catch(err) {
            console.error(err);
        }
            

        if(response != undefined) bot.chat(response);
    });

    bot.on("login", () => {
        console.log(`Logged in as ${bot.username}`);
    })

    return bot;
}