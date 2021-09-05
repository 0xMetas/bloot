// Imports
const fs = require("fs");

(async () => {
  // Load bloot data
  const data = await fs.readFileSync("./output/bloot.json");
  const bloot = JSON.parse(data);

  // Calculate attribute rarities
  let rarityIndex = {};
  for (let i = 0; i < bloot.length; i++) {
    const attributes = bloot[i][(i + 1).toString()];

    // Add up number of occurrences of attributes
    for (const attribute of Object.values(attributes)) {
      rarityIndex[attribute] = rarityIndex[attribute]
        ? rarityIndex[attribute] + 1
        : 1;
    }
  }

  // Output occurrences
  await fs.writeFileSync(
    "./output/occurrences.json",
    JSON.stringify(rarityIndex)
  );

  // Calculate occurrence scores
  let scores = [];
  for (let i = 0; i < bloot.length; i++) {
    let score = 0;
    const attributes = bloot[i][(i + 1).toString()];

    for (const attribute of Object.values(attributes)) {
      score += rarityIndex[attribute];
    }
    scores.push({ blootId: i + 1, score });
  }

  // Sort by score
  scores = scores.sort((a, b) => a.score - b.score);
  // Sort by index of score
  scores = scores.map((bloot, i) => ({
    ...bloot,
    rarest: i + 1,
  }));

  // Print bloot rarity by score
  await fs.writeFileSync("./output/rare.json", JSON.stringify(scores));

  // Calculate pure probability
  let probability = [];
  for (let i = 0; i < bloot.length; i++) {
    let scores = [];
    const attributes = bloot[i][(i + 1).toString()];

    for (const attribute of Object.values(attributes)) {
      // Collect probability of individual attribute occurrences
      scores.push(rarityIndex[attribute] / 8000);
    }

    // Multiply probabilities P(A and B) = P(A) * P(B)
    const p = scores.reduce((a, b) => a * b);
    probability.push({ blootId: i + 1, score: p });
  }

  // Sort by probability
  probability = probability.sort((a, b) => a.score - b.score);
  // Sort by index of probability
  probability = probability.map((bloot, i) => ({
    ...bloot,
    score: Math.abs(Math.log(bloot.score)),
    rarest: i + 1,
  }));

  // Print bloot rarity by score
  await fs.writeFileSync(
    "./output/probability.json",
    JSON.stringify(probability)
  );
})();
