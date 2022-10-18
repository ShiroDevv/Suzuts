//? importing external files
import axios from 'axios';
import { API_KEY } from '../../../importantFiles/env/envExports.js';
import seperator from '../../../importantFiles/utils/seperator.js';
import getUUid from '../utils/getUuid.js';
export default async function maroNetworth(username) {
    var response = await getUUid(username);
    var id = response;
    var profile = await getProfile(id, API_KEY);
    var networth = await getNetworth(profile, false);
    return username + "'s networth is " + networth;
}
export async function getProfile(uuid, apiKey) {
    if (!apiKey)
        throw new Error("Missing API key");
    const response = await axios.post(`https://api.hypixel.net/skyblock/profiles?key=${apiKey}&&uuid=${uuid}`).catch(err => {
        console.error(err + "\n At hypixel api");
        return "Error: getting data from hypixel api.";
    });
    if (typeof (response) == "string")
        return "Error getting data from hypixel api";
    const { data } = response;
    if (!data?.profiles)
        return "Error: Couldn't get profileData for this player.";
    const activeProfile = getActiveProfile(data.profiles, uuid);
    const profile = activeProfile.members[uuid];
    profile.banking = activeProfile.banking;
    return profile;
}
export function getActiveProfile(profiles, uuid) {
    return profiles.sort((a, b) => b.members[uuid].last_save - a.members[uuid].last_save)[0];
}
export async function getNetworth(profile, returnCategories = false) {
    if (!profile || profile == "{}")
        throw new Error("Missing profile");
    var response = await axios.post('https://skyblock.acebot.xyz/api/networth/categories', { data: profile }).catch(err => {
        console.error(err + "\n At get networth");
        return "Error : Failed to get networth";
    });
    if (typeof (response) == 'string')
        return "Error getting data from maro api";
    var { data } = response;
    if (!returnCategories) {
        var total = data.data.networth + data.data.bank + data.data.purse;
        total = Math.ceil(total);
        total = seperator(total);
        return total;
    }
    var { categories } = data.data;
    categories.total = seperator(data.data.networth + data.data.bank + data.data.purse);
}
