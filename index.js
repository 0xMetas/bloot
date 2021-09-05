// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const blootAddress = "0x4f8730e0b32b04beaa5757e5aea3aef970e5b613";
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const loot = new ethers.Contract(blootAddress, abi, rpc);

(async () => {
  // In-mem retrieval
  let retrievedBloot = [];

  // Collect 1...8000 ids
  for (let i = 1; i <= 8008; i++) {
    console.log("Collecting: ", i);

    try {
      // Collect parts
      const [chest, foot, hand, head, neck, ring, waist, weapon] =
        await Promise.all([
          loot.getChest(i),
          loot.getFoot(i),
          loot.getHand(i),
          loot.getHead(i),
          loot.getNeck(i),
          loot.getRing(i),
          loot.getWaist(i),
          loot.getWeapon(i),
        ]);

      // Push parts to array
      retrievedBloot.push({
        [i]: {
          chest,
          foot,
          hand,
          head,
          neck,
          ring,
          waist,
          weapon,
        },
      });

      if (i % 1000 === 0) {
        // Save to file every 1000 so we don't lose everything on a crash
        console.log("Saving...")
        fs.writeFileSync("./output/bloot.json", JSON.stringify(retrievedBloot));
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  // Write output
  fs.writeFileSync("./output/bloot.json", JSON.stringify(retrievedBloot));
})();
