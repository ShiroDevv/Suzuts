import { player } from '../../../../index.sts';
import axios from 'axios';
import { EmbedBuilder, APIEmbedField, EmbedFooterOptions } from 'discord.js';
import Commands from '../../handler/commandImports.js';

export function getLyrics(title: string) {
    return new Promise(async (ful, rej) => {
        const url = new URL("https://some-random-api.ml/lyrics");
        url.searchParams.append("title", title);

        try {
            const { data } = await axios.get(url.href);
            ful(data);
        } catch (error) {
            rej(error);
        }
    })
}


export function subString(length: number, value: string) {
    const replaced = value.replace(/\n/g, "--");
    const regex = `.{1,${length}}`;
    const lines = replaced.match(new RegExp(regex, "g"))?.map((line: string) => line.replace(/--/g, "\n"));

    return lines;
}

export async function createResponse(title: string) {
    try {
        const data: any = await getLyrics(title);

        const embeds = subString(1024, data.lyrics)?.map((value: string, index: number) => {
            const isFirst = index === 0;
            return new EmbedBuilder()
                .setTitle(isFirst ? `${data.title} - ${data.author}` : null)
                .setThumbnail(isFirst ? data.thumbnail.genius : null)
                .setDescription(value.toString())
        });

        return embeds;
    } catch (err) {
        const embedArray = [];
        embedArray.push(new EmbedBuilder()
            .addFields({
                name: "Error!",
                value: "Cannot find lyrics to this song. Sorry!"
            }))
        return embedArray;
    }
}

export const lyrics: Commands = {
    name: "lyrics",
    description: "Sends the lyrics for the current song or a specified song",
    aliases: undefined,
    options: [
        {
            name: "title",
            description: "Song to find the lyrics for",
            type: 3,
            required: false
        }
    ],
    run: async function run(client: any, interaction: any) {
        const title = interaction.options.getString("title");
        const sendLyrics = (title: string) => {
            return createResponse(title)
                .then((res: any) => {
                    interaction.editReply({ content: "", embeds: res });
                })
                .catch((err: unknown) => console.log(err));
        };

        if (title) return sendLyrics(title);

        const queue = player.getQueue(interaction.guild.id);
        if (!queue.playing) return interaction.editReply({
            content: "No music is currently playing"
        });

        return sendLyrics(queue.current.title);
    },
    patreon: true,
    messageCommand: false,
    earlyAccess: true
}