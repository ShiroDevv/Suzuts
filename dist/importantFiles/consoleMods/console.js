//* This is to meet the liscense agreement for you. Just put your name in the modified by part if you modified it.
//? Developer : SuzuDev
//? Modified by :
//? Imports
import process from "process";
import chalk from 'chalk';
//? Exports
/**
 * @params None
 *
 * !Errors :
 *
 * * You can get rid of this file from the code. Since its just adding [LOG], [WARN], and [ERROR] to the start of a message and coloring it, its unneeded but nice.
 *
 * ! Not a string
 * ! Fix : Convert text into a string before logging
 *
 */
export default function update() {
    //? This changes log to a green color with [LOG] at the start
    //! Remove this for bot testing. Might make this be auto-disabled unless --production is in the code.
    //* The reason why is it can only log strings for all of these. Anything else doesn't log.
    console.log = function (text) {
        //? In case it cant write it to the console, it catches the error.
        try {
            //? Writing to the console manually.
            process.stdout.write(chalk.greenBright('[LOG] ' + text + "\n"));
        }
        catch (err) {
            //? In case an error was thrown.
            console.error("Failed to log string.");
        }
    };
    //? For warns, it turns yellow and logs [WARN]
    console.warn = function (text) {
        try {
            process.stdout.write(chalk.yellow('[WARN] ' + text + "\n"));
        }
        catch (err) {
            console.error("Error with logging warning");
        }
    };
    //? Logs are red and start with [ERROR].
    console.error = function (text) {
        try {
            process.stdout.write(chalk.red('[ERROR] ' + text + "\n"));
        }
        catch (err) {
            //? This is just so people know that it didnt work.
            console.error("Error logging error moessage.");
        }
    };
}
