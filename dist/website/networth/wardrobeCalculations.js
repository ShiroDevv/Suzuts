//! All add ons other than stars is reduced by 1/4
//* Skyblock api calculations
//TODO Reduce the amount of times I pull from the hypixel api.
//? Importing modules
import axios from "axios";
import getEsscenceCost from "./esscenceConst.js";
import reforgeCost from "./reforgeCost.js";
//? Since this is the main export, I am setting it to the default.
export default async function calculateWardrobePrice(profile) {
    //? This part is to get wardrobe items without having to do the extra stuff.
    const wardrobeItems = profile.items.wardrobe;
    //? Essence cost reporting
    let essCost = 0;
    //? Data to return.
    const returnItems = [];
    //? Wardrobe price data
    var wardrobePrice = 0;
    //? To tell total reforge cost
    var totalReforgeCost = 0;
    //? Looping throught every armor set in the wardrobe
    for (let i = 0; i < wardrobeItems.length; i++) {
        //? Looping through all the items in the armor set.
        for (let j = 0; j < wardrobeItems[i]?.length; j++) {
            //? So I can make sure axios does its job
            var completed = true;
            //? Pulling ah data from the maro api
            const response = await axios.get("https://skyblock.acebot.xyz/api/auctions/quickStats/" + wardrobeItems[i][j]?.tag.ExtraAttributes.id).catch((err) => {
                completed = false;
            });
            //? If there is an error, go to the next loop
            if (!completed)
                continue;
            //? Making sure the response is a axios response, not a string or undefined
            if (typeof (response) == "string" || response == undefined) {
                return "Failed getting wardrobe data.";
            }
            ;
            //? If it is recombobulated, add the cost of a recombobulator on to it
            if (wardrobeItems[i][j].recombobulated == true) {
                //response.data.data.mode
                //? Getting bazaar data.
                const apiresponse = await axios.get("https://api.hypixel.net/skyblock/bazaar").catch((err) => {
                });
                //? If the data does exist, I want to add the price on to the current wardrobe price
                if (apiresponse != undefined) {
                    response.data.data.mode += (Math.ceil(apiresponse.data.products.RECOMBOBULATOR_3000.quick_status.sellPrice * (3 / 4)));
                }
            }
            //? Checking for the hot potato books and fuming potato books.
            if (wardrobeItems[i][j].tag.ExtraAttributes.hot_potato_count > 0) {
                //? Price variables.
                var hotPotatoPrice;
                var fumingPotatoPrice;
                const apiresponse = await axios.get("https://api.hypixel.net/skyblock/bazaar").catch((err) => {
                });
                if (apiresponse != undefined) {
                    //? Getting hot potato data from the api.
                    hotPotatoPrice = (Math.ceil(apiresponse.data.products.HOT_POTATO_BOOK.quick_status.sellPrice * (3 / 4)));
                    fumingPotatoPrice = (Math.ceil(apiresponse.data.products.FUMING_POTATO_BOOK.quick_status.sellPrice * (3 / 4)));
                }
                //? I cant just multiply it, since the hot_potato_count variable is up to 15, with 5 being fumings.
                for (let l = 0; l < wardrobeItems[i][j]?.tag.ExtraAttributes.hot_potato_count; l++) {
                    if (l <= 10)
                        response.data.data.mode += hotPotatoPrice;
                    else {
                        response.data.data.mode += fumingPotatoPrice;
                    }
                    ;
                }
            }
            //? Getting api data for enchants.
            const apiresponse = await axios.get("https://api.hypixel.net/skyblock/bazaar").catch((err) => {
            });
            if (apiresponse != undefined) {
                for (const key in wardrobeItems[i][j].tag.ExtraAttributes.enchantments) {
                    //? Making it so I can work with the Enchantments
                    var enchantName = `ENCHANTMENT_${key.toUpperCase()}_${wardrobeItems[i][j].tag.ExtraAttributes.enchantments[key]}`;
                    //? If the enchant is stackable, add a base amount to its value
                    if (enchantName.includes("HECATOMB")) {
                        enchantName = `ENCHANTMENT_${key.toUpperCase()}_1`;
                        //? Turning the level into a number
                        var level = Number(wardrobeItems[i][j].tag.ExtraAttributes.enchantments[key]);
                        for (let g = 0; g < level; g++) {
                            //? adding 50k per level to its value.
                            response.data.data.mode += 50000;
                        }
                    }
                    ;
                    //? Adding the enchant price.
                    var enchantPrice = Math.ceil(apiresponse.data.products[enchantName]?.quick_status.sellPrice * (3 / 4));
                    //? checking if the enchantPrice is NaN (Not a Number)
                    if (enchantPrice != null && !isNaN(enchantPrice)) {
                        response.data.data.mode += enchantPrice;
                    }
                }
                //? Getting the master star prices
                var firstStarPrice = Math.ceil(apiresponse.data.products.FIRST_MASTER_STAR.quick_status.sellPrice);
                var secondStarPrice = Math.ceil(apiresponse.data.products.SECOND_MASTER_STAR.quick_status.sellPrice);
                var thirdStarPrice = Math.ceil(apiresponse.data.products.THIRD_MASTER_STAR.quick_status.sellPrice);
                var fourthStarPrice = Math.ceil(apiresponse.data.products.FOURTH_MASTER_STAR.quick_status.sellPrice);
                var fifthStarPrice = Math.ceil(apiresponse.data.products.FIFTH_MASTER_STAR.quick_status.sellPrice);
                //? Each emoji stands for a different amount of master stars
                if (wardrobeItems[i][j].display_name.includes("➊")) {
                    response.data.data.mode += firstStarPrice;
                }
                if (wardrobeItems[i][j].display_name.includes("➋")) {
                    response.data.data.mode += firstStarPrice;
                    response.data.data.mode += secondStarPrice;
                }
                if (wardrobeItems[i][j].display_name.includes("➌")) {
                    response.data.data.mode += firstStarPrice;
                    response.data.data.mode += secondStarPrice;
                    response.data.data.mode += thirdStarPrice;
                }
                if (wardrobeItems[i][j].display_name.includes("➍")) {
                    response.data.data.mode += firstStarPrice;
                    response.data.data.mode += secondStarPrice;
                    response.data.data.mode += thirdStarPrice;
                    response.data.data.mode += fourthStarPrice;
                }
                if (wardrobeItems[i][j].display_name.includes("➎")) {
                    response.data.data.mode += firstStarPrice;
                    response.data.data.mode += secondStarPrice;
                    response.data.data.mode += thirdStarPrice;
                    response.data.data.mode += fourthStarPrice;
                    response.data.data.mode += fifthStarPrice;
                }
                //? This one is hard to explain.
                //? roughness of the gemstone
                var roughness = "";
                var gem;
                for (const key in wardrobeItems[i][j].extra?.gems) {
                    if (roughness == "")
                        gem = undefined;
                    //? For each time of gemstone, add their correstponding tag.
                    if (key.includes("jasper".toUpperCase())) {
                        gem = wardrobeItems[i][j].extra.gems[key] + "_JASPER_GEM";
                    }
                    if (key.includes("ruby".toUpperCase())) {
                        gem = wardrobeItems[i][j].extra.gems[key] + "_RUBY_GEM";
                    }
                    if (key.includes("amethyst".toUpperCase())) {
                        gem = wardrobeItems[i][j].extra.gems[key] + "_AMETHYST_GEM";
                    }
                    if (key.includes("jade".toUpperCase())) {
                        gem = wardrobeItems[i][j].extra.gems[key] + "_JADE_GEM";
                    }
                    if (key.includes("opal".toUpperCase())) {
                        gem = wardrobeItems[i][j].extra.gems[key] + "_OPAL_GEM";
                    }
                    if (key.includes("topaz".toUpperCase())) {
                        gem = wardrobeItems[i][j].extra.gems[key] + "_TOPAZ_GEM";
                    }
                    if (key.includes("sapphire".toUpperCase())) {
                        gem = wardrobeItems[i][j].extra.gems[key] + "_SAPPHIRE_GEM";
                    }
                    if (key.includes("amber".toUpperCase())) {
                        gem = wardrobeItems[i][j].extra.gems[key] + "_AMBER_GEM";
                    }
                    //? If it is a type of gemstone, then add the value of the gemstone from the key.
                    if (key.includes("COMBAT") && !key.includes("_gem")) {
                        roughness = wardrobeItems[i][j].extra.gems[key];
                        continue;
                    }
                    if (key.includes("OFFENSIVE") && !key.includes("_gem")) {
                        roughness = wardrobeItems[i][j].extra.gems[key];
                        continue;
                    }
                    if (key.includes("DEFENSIVE") && !key.includes("_gem")) {
                        roughness = wardrobeItems[i][j].extra.gems[key];
                        continue;
                    }
                    if (key.includes("MINING") && !key.includes("_gem")) {
                        roughness = wardrobeItems[i][j].extra.gems[key];
                        continue;
                    }
                    if (key.includes("UNIVERSAL") && !key.includes("_gem")) {
                        roughness = wardrobeItems[i][j].extra.gems[key];
                        continue;
                    }
                    if (roughness != "") {
                        gem = roughness + "_" + wardrobeItems[i][j].extra.gems[key] + "_GEM";
                        roughness = "";
                    }
                    //? If the gem is not undefined
                    if (gem != undefined) {
                        var gemPrice = Math.ceil(apiresponse.data.products[gem]?.quick_status.sellPrice);
                        if (gemPrice != null && !isNaN(gemPrice)) {
                            response.data.data.mode += gemPrice;
                        }
                    }
                }
            }
            //? Getting the price of base stars
            let starAmount = wardrobeItems[i][j]?.display_name.replace(/[^✪]/g, "").length;
            if (!starAmount)
                starAmount = 0;
            //? Using the getEssenceCost function from one of my files to get the cost
            const esscenceCost = await getEsscenceCost(wardrobeItems[i][j]?.tag.ExtraAttributes.id, starAmount);
            response.data.data.mode += esscenceCost;
            wardrobeItems[i][j].esscenceCost = esscenceCost;
            essCost += esscenceCost;
            //? getting the reforge stone and the corresponding cost
            //! WIP : DIFFERENT FILE
            var reforgingCost = 0;
            const reforgeStone = await reforgeCost(wardrobeItems[i][j]);
            if (reforgeStone && reforgeStone != "") {
                if (apiresponse != undefined) {
                    reforgingCost += apiresponse.data.products[reforgeStone]?.quick_status.sellPrice * 3 / 4;
                }
            }
            totalReforgeCost += reforgingCost;
            response.data.data.mode += reforgingCost;
            //? Setting the price of the item to the price. (So people can see the exact price given.)
            wardrobeItems[i][j].price = response.data.data.mode;
            returnItems.push(wardrobeItems[i][j]);
            if (typeof (response.data.data.mode) == "number") {
                wardrobePrice += response.data.data.mode;
            }
            else {
                //? Adding the price together.
                var price = +response.data.data.mode;
                try {
                    wardrobePrice += price;
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
    }
    //? Returning the data.
    return {
        total: wardrobePrice,
        items: returnItems,
        essenceCost: essCost,
        reforgeCost: totalReforgeCost
    };
}
