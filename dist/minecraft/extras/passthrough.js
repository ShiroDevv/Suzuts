export default async function passthrough(message, channel) {
    if (!channel)
        throw new Error("Missing channel");
    if (channel?.isTextBased()) {
        channel.send(message.replace("Guild > ", ""));
    }
}
