import axios from 'axios';
import seperator from '../../../importantFiles/utils/seperator.js';
export default async function auction(username, item) {
    const items = await updateItems();
    if (typeof (items) == "string")
        return items;
    const itemFound = await getItem(items, item);
    if (typeof (itemFound) == "string" || typeof (itemFound) == "undefined")
        return "Could not get item.";
    return "The price of " + itemFound.name + " is " + seperator(itemFound.price) + " coins.";
}
export async function updateItems() {
    const response = await axios.get('https://skyblock.acebot.xyz/api/auctions/all');
    if (typeof (response) == "string")
        return "Error getting data from api.";
    const { data } = response;
    let items = [];
    for (let i = 0; i < data.data.length; i++) {
        items.push({
            id: data.data[i].id,
            name: data.data[i].name,
            price: data.data[i].lowestBin
        });
    }
    ;
    return items;
}
export async function getItem(items, item) {
    var returnItem;
    item = item.replace(".ah ", "");
    for (let i = 0; i < items.length; i++) {
        var name = items[i].name;
        var id = items[i].id;
        if (name.toLowerCase().includes(item) || id.toLowerCase().includes(item)) {
            return items[i];
        }
    }
    if (typeof (returnItem) == "undefined")
        return "Could not get item from array";
}
