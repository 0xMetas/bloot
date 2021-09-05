<h1 align=center> Bloot (not for Weaks) </h1>
<p align="center">
<a href="https://discord.gg/eMVGun4cvK">Discord</a></b>
<a href="https://opensea.io/collection/blootofficial">OpenSea</a></b>
<a href="https://etherscan.io/address/0x4f8730e0b32b04beaa5757e5aea3aef970e5b613">Etherscan</a></b>
</p>

# About

This repository contains tooling and data for [Bloot](https://opensea.io/collection/blootofficial) and other derivative projects, and is free to use without credit or attribution, for any means.

I don't really know how to explain bloot itself. Good luck.

## Distribution

- tokenIds `1` to `8008` claimable by user.
- Each token has attributes: `chest`, `foot`, `hand`, `head`, `neck`, `ring`, `waist`, `weapon`.

## Output

- `output/bloot.json` contains all tokenIds and their attributes.
- `output/occurrences.json` contains the number of occurrences by attribute.
- `output/rare.json` contains a mapping of `blootId` to `score` (which is the sum of number of occurrences of each child attribute for a `blootId`), sorted ascending by `score`. It also includes `rarest` which is how rare the loot bags attributes are (`1` == `rarest`, `8008` == `least rare`), based on this specific ranking mechanism.
- `output/probability.json` contains a mapping of `blootId` to `rank` by probabilistic occurrence rather than rank (`P(A in bag at slot 1)` and `P(B in bag at slot 2)`, then `P(A in slot 1 and B in slot 2)` is the product of the 2 probabilities).
- `output/images.json` contains the base64 encoded SVG of each tokenId

## Run locally

```bash
# Install dependencies
npm install

# Collect all Bloot
npm run collect

# Parse Bloot statistics
npm run parse

# Collect Bloot base64 encoded images
npm run images
```


# Credits

> "Forked" from [@Anish-Agnihotri](https://github.com/Anish-Agnihotri/dhof-loot)'s work done for Loot. This repo is not a fork solely because my account already contains a fork of [dhof-loot](https://github.com/ktasbas/dhof-loot/).

# License

The code is licensed under [The Unlicense](https://github.com/ktasbas/bloot/blob/master/LICENSE)—a license with no conditions whatsoever which dedicates works to the public domain.

Unlicensed works, modifications, and larger works may be distributed under different terms and without source code.
