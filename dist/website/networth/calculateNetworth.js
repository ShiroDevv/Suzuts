import { getProfile } from "../../minecraft/chatHandling/commands/weight.js";
import calculateWardrobePrice from "./wardrobeCalculations.js";
export default async function getNetworth(username, profileName) {
    const profile = await getProfile(username, profileName);
    if (typeof (profile) == "string" || undefined)
        return profile;
    var response = {};
    response.wardrobePrice = await calculateWardrobePrice(profile);
    if (profile == undefined || typeof (profile) == "string")
        return { error: profile };
    response.totalPrice = response.wardrobePrice.total;
    return response;
}
