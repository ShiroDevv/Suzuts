//? Import modules
import fs from "fs";
export default async function reforgeCost(item) {
    //? Getting the reforge stone and its corresponding cost
    //? Get the json and parse it
    const json = fs.readFileSync(`${process.cwd().replaceAll("\\", "/")}/sbJsonFiles/constants/reforgestones.json`);
    const parsedJSon = JSON.parse(json.toString());
    //? Each item is formatted like this : 
    /**
     * * "BULKY_STONE": {
     * *    "internalName : "BULKY:STONE", <- What we are trying to get
     * *    "reforgeName" : "Bulky" <- What we are looking for
     * *}
     */
    //? So we can go through each ket and read the reforgename, and if it is the same as the current items reforge, take the internal name, and get the rest from the hypixel api.
    const reforgeName = item.tag.ExtraAttributes.modifier;
    for (let key in parsedJSon) {
        if (parsedJSon[key].reforgeName.toLowerCase() == reforgeName?.toLowerCase()) {
            return parsedJSon[key].internalName;
        }
    }
    return null;
}
