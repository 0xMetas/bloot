// Imports
const fs = require("fs");
const ethers = require("ethers");
const { abi } = require("./abi");

// Setup contract
const blootAddress = "0x4f8730e0b32b04beaa5757e5aea3aef970e5b613";
const rpc = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const loot = new ethers.Contract(blootAddress, abi, rpc);

(async () => {
  // List to hold images
  let images = [];

  for (let i = 1; i <= 8008; i++) {
    console.log("Collecting: ", i);

    try {
      // Get base64 encoded URI
      let uri = await loot.tokenURI(i);
      uri = uri.split(',')[1];

      // Decode into a JSON string 
      // { 
      //   "name": "Bloot #{#}",
      //   "description": "{GENERIC_STRING}", 
      //   "image": "data:image/svg+xml;base64,{BASE64_DATA}"
      // }
      const json_uri = Buffer.from(uri, 'base64').toString('utf-8');
      const image = JSON.parse(json_uri)['image']

      images.push({
        [i]: {
          image
        }
      });
      
      if (i % 1000 === 0) {
        // Save to file every 1000 so we don't lose everything on a crash
        console.log("Saving...")
        fs.writeFileSync("./output/images.json", JSON.stringify(images));
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  // Write output
  fs.writeFileSync("./output/images.json", JSON.stringify(images));
})();