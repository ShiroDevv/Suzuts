//* This is to meet the liscense agreement for you. Just put your name in the modified by part if you modified it.
//? Developer : SuzuDev
//? Modified by :

//? Importing external modules.
import dotenv from 'dotenv';

//? Dotenv config
dotenv.config({
    path : `${process.cwd()}/.env`
});

//? Getting the config things
const { TOKEN, PASSWORD, AUTH, API_KEY } = process.env;

//? Exporting the values
export {
    TOKEN,
    PASSWORD,
    AUTH,
    API_KEY
}