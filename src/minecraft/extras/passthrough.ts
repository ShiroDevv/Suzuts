import { TextBasedChannel } from "discord.js";

export default async function passthrough(message : string, channel : TextBasedChannel) {

    if(!channel) throw new Error("Missing channel");

    if(channel?.isTextBased()) {
        channel.send(message.replace("Guild > ", ""));
    }
}