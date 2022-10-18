"use strict";
//! The server this was set up for was deleted.
// export default async function reactionRoles(client: any, text: string) {
//     const channelId = "1013133622565421107";
//     const getEmoji = (emojiName: string) => {
//         const response = client.emojis.cache.find((emoji: any) => {
//             emoji.name == emojiName;
//         })
//     }
//     var emojiText = `To access the server, react with ⚫ to get the members rank. If you are a guild member, react with ✔️`;
//     setUproles(client, channelId, emojiText, ['⚫', '✔️']);
//     const handleReaction = async (reaction: any, user: any, add: any) => {
//         if (user.id === '907385763178627142') return;
//         const emoji = reaction._emoji.name;
//         var rolename: any;
//         if (emoji == '⚫') {
//             rolename = "Members";
//         }
//         if (emoji == "✔️") {
//             rolename = "Guild-member"
//         }
//         if (!rolename) return;
//         await reaction.message.guild.roles.fetch();
//         const role = await reaction.message.guild.roles.cache.find((r: any) => r.name == rolename)
//         const member = await reaction.message.guild.members.cache.find((m: any) => m.id == user.id)
//         if (add) {
//             member.roles.add(role)
//         } else {
//             member.roles.remove(role)
//         }
//     }
//     client.on('messageReactionAdd', (reaction: any, user: any) => {
//         if (reaction.message.channel.id === channelId) {
//             handleReaction(reaction, user, true)
//         }
//     })
//     client.on('messageReactionRemove', (reaction: any, user: any) => {
//         if (reaction.message.channel.id === channelId) {
//             handleReaction(reaction, user, false)
//         }
//     })
// }
// export async function setUproles(client: any, id: string, text: string, reactions: Array<string>) {
//     const channel = await client.channels.fetch(id);
//     channel.messages.fetch().then((messages: any) => {
//         if (messages.size == 0) {
//             channel.send(text).then((message: any) => {
//                 addReactions(message, reactions);
//             })
//         } else {
//             for (const message of messages) {
//                 message[1].edit(text)
//                 addReactions(message[1], reactions)
//             }
//         }
//     })
// }
// export function addReactions(message: any, reactions: Array<string>) {
//     message.react(reactions[0]);
//     reactions.shift();
//     if (reactions.length > 0) {
//         setTimeout(() => addReactions(message, reactions), 750);
//     }
// }
