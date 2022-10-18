import { QueryType } from "discord-player";
import { player } from "../../../../index.js";
export const play = {
    name: "play",
    description: "Play music in a voice channel",
    options: [
        {
            name: "songtitle",
            description: "title of the song",
            type: 3,
            required: true
        }
    ],
    run: async function (client, interaction) {
        const songTitle = interaction.options.getString("songtitle");
        if (!interaction.member.voice.channel)
            return interaction.editReply({ content: "Please join a voice channel first!", emphameral: true });
        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        });
        const queue = await player.createQueue(interaction.guild.id, {
            metadata: interaction.channel
        });
        if (!queue.connection) {
            queue.setVolume(40);
            await queue.connect(interaction.member.voice.channel);
        }
        interaction.editReply({ content: `Added ${songTitle} to queue!` });
        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing)
            await queue.play();
    },
    patreon: false,
    aliases: undefined,
    messageCommand: false,
    earlyAccess: true
};
