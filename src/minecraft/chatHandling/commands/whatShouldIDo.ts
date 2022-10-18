export default async function whatShouldIDo(username : string) {
    var ideas = ["Combat", "Foraging", "Farming", "Mining", "Fishing", "Alchemy", "Zombie slayer", "Tarantula slayer", "wolf slayer", "Voidgloom", "blaze slayer", "dungeons", "master mode", "dragons", "kuudra", "Jump around the skyblock hub"];

    const idea = ideas[Math.floor(Math.random() * ideas.length)];

    return "You should do " + idea + " " + username + "!";
}