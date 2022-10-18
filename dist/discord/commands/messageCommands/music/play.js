import { QueryType } from "discord-player";
import { player } from "../../../../index.js";
export const playMessage = {
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
    run: async function (client, message, args) {
        const songTitle = message.content.replace(args[0], "");
        if (!args[1])
            return message.reply("Missing song title");
        if (!message.member.voice.channel)
            return message.reply({ content: "Please join a voice channel first!", emphameral: true });
        const searchResult = await player.search(songTitle, {
            requestedBy: message.user,
            searchEngine: QueryType.AUTO
        });
        const queue = await player.createQueue(message.guild.id, {
            metadata: message.channel
        });
        if (!queue.connection) {
            await queue.connect(message.member.voice.channel);
        }
        queue.setVolume(40);
        message.reply({ content: `Added ${songTitle} to queue!` });
        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing)
            await queue.play();
    },
    patreon: false,
    aliases: ["p", "play"],
    messageCommand: true,
    earlyAccess: true
};
