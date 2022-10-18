import { player } from "../../../../index.sts";
import Commands from "../../handler/commandImports.js";

export const skip: Commands = {
    name: "skip",
    aliases: ["s", "skip"],
    options: undefined,
    description: "Skips the current song",
    messageCommand: false,
    patreon: false,
    earlyAccess: true,
    run: async function run(Client: any, interaction: any) {
        if (!interaction.member.permissions.has("ManageRoles")) interaction.editReply("You do not have permissions! (Or I coulding find your account.");

        const queue = player.getQueue(interaction.guild.id);

        if (!queue?.playing) {
            return interaction.editReply("No music is currently being played.");
        }

        await queue.skip();

        return interaction.editReply("Skipped the current track!");

    }
}