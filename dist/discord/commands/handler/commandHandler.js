export default async function commandHandler(client) {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isCommand()) {
            await interaction.reply({ ephemeral: false, content: "Loading...\n If the loading progess takes to long, please report this in my discord server~" }).catch((err) => {
                console.error(err);
            });
            const cmd = client.slashCommands.get(interaction.commandName);
            if (!cmd)
                return interaction.editReply({ content: "Command doesnt exist in current version." });
            const args = [];
            for (let option of interaction.options.data) {
                if (option.type.toString() === "SUB_COMMAND") {
                    if (option.name)
                        args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value)
                            args.push(x.value);
                    });
                }
                else if (option.value)
                    args.push(option.value);
            }
            interaction.member = interaction.guild?.members.cache.get(interaction.user.id);
            try {
                if (cmd.earlyAccess) {
                    const hasPatreon = await earlyAccess(interaction.user, client);
                    if (!hasPatreon)
                        return interaction.editReply("Command limited to my tier 2+ Patreon Supporters")
                            .catch((err) => console.error(err));
                    cmd.run(client, interaction);
                }
                else if (cmd.patreon) {
                    const hasPatreon = await isSupporter(interaction.user, client);
                    if (!hasPatreon)
                        return interaction.editReply("Command limited to my Patreon Supporters")
                            .catch((err) => console.error(err));
                    cmd.run(client, interaction);
                }
                else {
                    cmd.run(client, interaction, args);
                }
            }
            catch (e) {
                console.error(e);
                interaction.editReply("There was an error!");
            }
            // Context Menu Handling
            if (interaction.isContextMenuCommand()) {
                await interaction.deferReply({ ephemeral: false });
                const command = client.slashCommands.get(interaction.commandName);
                try {
                    if (command.earlyAccess) {
                        const hasPatreon = await earlyAccess(interaction.user, client);
                        if (!hasPatreon)
                            return interaction.editReply("Command limited to my tier 2+ Patreon Supporters")
                                .catch((err) => console.error(err));
                        command.run(client, interaction);
                    }
                    else if (command) {
                        if (command.patreon) {
                            const hasPatreon = await isSupporter(interaction.user, client);
                            if (!hasPatreon)
                                return interaction.editReply("Command limited to my Patreon Supporters")
                                    .catch((err) => console.error(err));
                            command.run(client, interaction);
                        }
                        else {
                            command.run(client, interaction);
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                    interaction.editReply({ content: "An error has occured " });
                }
            }
        }
    });
    client.on("messageCreate", async (message) => {
        if (!message.content.startsWith(".") || message.author.bot)
            return;
        const args = message.content.split(' ');
        var cmd = client.commands.get(args[0].replace(".", ""));
        // message.member = message.guild?.members.cache.get(message.author.id);
        if (!cmd) {
            client.commands.forEach((command) => {
                command.aliases?.forEach((alias) => {
                    if (alias == args[0].replace(".", ""))
                        cmd = command;
                });
            });
        }
        if (!cmd)
            return message.reply("Failed to find command.");
        if (cmd.earlyAccess) {
            const hasPatreon = await earlyAccess(message.author, client);
            if (hasPatreon != true)
                return message.reply("Command limited to my tier 2+ patreon supporters")
                    .catch((err) => console.error(err));
            cmd.run(client, message, args);
        }
        else if (cmd.patreon) {
            const hasPatreon = await isSupporter(message.author, client);
            if (hasPatreon != true)
                return message.reply("Command limited to my Patreon Supporters")
                    .catch((err) => console.error(err));
            cmd.run(client, message, args);
        }
        else {
            cmd.run(client, message, args);
        }
    });
}
async function isSupporter(user, client) {
    const homeServer = client.guilds.cache.get("967117817663074304");
    if (!homeServer)
        return console.log("Couln\'t find the bots home guild!");
    const member = homeServer.members.cache.get(user.id);
    if (!member)
        return false;
    const role = member.roles.cache.find((role) => role.name.includes("Patreon"));
    if (!role)
        return false;
    return true;
}
async function earlyAccess(user, client) {
    const homeServer = client.guilds.cache.get("967117817663074304");
    if (!homeServer)
        return console.log("Couln\'t find the bots home guild!");
    const member = homeServer.members.cache.get(user.id);
    if (!member)
        return false;
    const role = member.roles.cache.find((role) => role.id === "1020128179001765918");
    if (!role)
        return false;
    return true;
}
