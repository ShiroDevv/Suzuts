export const clearCommand = {
    name: "clear",
    options: [{
            name: "amount",
            description: "Amount to clear",
            type: 4,
            required: true
        }],
    messageCommand: false,
    patreon: false,
    aliases: undefined,
    description: "clears a bulk amount of messages",
    run: function (client, interaction) {
        interaction.channel?.bulkDelete(interaction.options.getInteger("amount"));
    },
    earlyAccess: false
};
