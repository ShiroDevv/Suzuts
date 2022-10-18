import { Message } from "discord.js";
import { player } from "../../../../index.sts";
import Commands from "../../handler/commandImports.js";

export const messageSkip: Commands = {
    name: "skip",
    aliases: ["s", "skip"],
    options: undefined,
    description: "Skips the current song",
    messageCommand: true,
    patreon: false,
    earlyAccess: true,
    run: async function run(Client: any, message: Message, Args: Array<string>) {
        const member = await message.guild?.members.fetch(message.author.id);
        const guildId = message.guildId;

        if (!member?.permissions.has("ManageRoles") || !member) return message.reply("You do not have permissions! (Or I couldnt find your account.");
        if (!guildId) return message.reply("I cant find your guild!");
        const queue = player.getQueue(guildId);

        if (!queue?.playing) {
            return message.reply("No music is currently being played.");
        }

        await queue.skip();

        return message.reply("Skipped the current track!");

    }
}