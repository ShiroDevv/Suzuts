import axios from 'axios';

export default async function getUUid(username: string) {
    var response: any = await axios.get('https://api.mojang.com/users/profiles/minecraft/' + username).catch(err => {
        console.error(err + "\n At get networth");

        return "Error getting username."
    });

    if (!response?.data?.id) return "Error getting data from mojang api";

    var id = response.data.id;


    return id;
}