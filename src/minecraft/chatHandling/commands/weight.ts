import axios from 'axios';
import seperator from '../../../importantFiles/utils/seperator.js';

export default async function weight(username: string, type: "senither" | "lily") {
    let weight: number = await getWeight(username, type, true);

    if (!weight) {
        console.error("Error getting data from sky.shiiyu");
        return "Error getting data from sky.shiiyu";
    }

    var returnWeight: any = Math.floor(weight);
    returnWeight = seperator(returnWeight);

    return username + "'s " + type + " weight is " + returnWeight;
}

export async function getProfile(username: any, profileName = "none") {
    const response = await axios.get('https://sky.shiiyu.moe/api/v2/profile/' + username);

    if (typeof (response) == "string") return "there was an error getting data from api.";

    const { data } = response;

    var profiles: any = data.profiles;

    var keyArray = Object.keys(profiles);

    var profileKey = keyArray.map((k: string) => {
        if (profileName == "none") {
            if (profiles[k].current == true) {
                return k;
            }
        } else {
            if(profiles[k].cute_name.toLowerCase() == profileName.toLowerCase()) {
                return k;
            }
        }
    });

    var key: string | undefined;

    profileKey.forEach((k) => {
        if (typeof (k) == "string") {
            key = k;
        }
    })
    if (typeof (key) == "undefined") {
        if(profileName != "none") return "Invalid profile name";
        return "Invalid username";
    }

    return profiles[key];
}

export async function getWeight(username: string, type: "senither" | "lily", overall: boolean = true) {
    const profiles = await getProfile(username);

    if (typeof (profiles) == "string") return "there was an error getting data from the api.";

    if (overall) {
        if (type == "lily") return profiles.data.weight[type].total;
        return profiles.data.weight[type].overall;
    } else {
        return profiles.data.weight[type];
    }
}