//? Importing files
import axios from "axios";
import fs from "fs";
//! Note : Does not include item prices, since most of them are soulbound.
export default async function getEsscenceCost(itemID, starAmount) {
    if (starAmount == 0)
        return 0;
    const json = fs.readFileSync(`${process.cwd().replaceAll("\\", "/")}/sbJsonFiles/constants/essencecosts.json`);
    const stringJson = json.toString();
    const esscenseJson = JSON.parse(stringJson);
    // fs.writeFileSync("C:/Users/ayvie/Desktop/Suzu.ts/test.json", JSON.stringify(esscenseJson));
    const ItemJson = esscenseJson[itemID];
    if (!ItemJson)
        return 0;
    let EsscenceType = "";
    let esscenceAmount = 0;
    let starLoops = 0;
    for (let key in ItemJson) {
        if (key == "type")
            EsscenceType = `ESSENCE_${ItemJson[key].toUpperCase()}`;
        key = key.replace(/[^1234567890]/g, "");
        if (+key == 0 || +key == null || key == undefined)
            continue;
        if (+key > starAmount)
            continue;
        if (+key != undefined || +key != null) {
            starLoops += 1;
            esscenceAmount += ItemJson[key];
        }
    }
    const apiResponse = await axios.get("https://api.hypixel.net/skyblock/bazaar").catch((err) => {
        return 0;
    });
    let essencecost = 0;
    if (typeof (apiResponse) != "number") {
        if (EsscenceType == "")
            return 0;
        var sellPrice = apiResponse.data.products[EsscenceType].quick_status.sellPrice;
        if (sellPrice == null)
            return 0;
        essencecost += sellPrice * esscenceAmount;
    }
    if (starLoops != starAmount)
        console.error("ERROR: STARLOOPS WRONG");
    return Math.floor(essencecost);
}
