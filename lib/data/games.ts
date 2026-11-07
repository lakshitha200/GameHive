import { rawGames } from "./games-raw";

export type Game = (typeof rawGames)[number] & {
  developer: string;
  releaseDate: string; // ISO
  popularity: number; // 0-100, used for "Popularity" sort
  tags: string[];
  features: string[];
  requirements: { os: string; cpu: string; ram: string; gpu: string; storage: string };
};

type Extra = { developer: string; releaseDate: string; popularity: number; tags: string[] };

const extras: Record<number, Extra> = {
  1: { developer: "Valve", releaseDate: "2012-08-21", popularity: 98, tags: ["Competitive", "Esports", "Team-based"] },
  2: { developer: "Valve", releaseDate: "2013-07-09", popularity: 95, tags: ["Esports", "Free to Play", "Strategic"] },
  3: { developer: "Rockstar North", releaseDate: "2015-04-14", popularity: 96, tags: ["Open World", "Crime", "Online Co-op"] },
  4: { developer: "Respawn Entertainment", releaseDate: "2020-11-04", popularity: 90, tags: ["Free to Play", "Hero Shooter", "Squads"] },
  5: { developer: "Behaviour Interactive", releaseDate: "2016-06-14", popularity: 82, tags: ["Asymmetric", "Scary", "Survival"] },
  6: { developer: "KRAFTON", releaseDate: "2017-12-21", popularity: 88, tags: ["Realistic", "Last Man Standing", "Tactical"] },
  7: { developer: "Rare", releaseDate: "2018-03-20", popularity: 78, tags: ["Pirates", "Co-op", "Sandbox"] },
  8: { developer: "Facepunch Studios", releaseDate: "2018-02-08", popularity: 80, tags: ["Crafting", "PvP", "Base Building"] },
  9: { developer: "ConcernedApe", releaseDate: "2016-02-26", popularity: 92, tags: ["Cozy", "Farming", "Pixel Graphics"] },
  10: { developer: "Rockstar Games", releaseDate: "2019-11-05", popularity: 94, tags: ["Western", "Story Rich", "Open World"] },
  11: { developer: "Blue Mammoth Games", releaseDate: "2017-10-17", popularity: 70, tags: ["Platform Fighter", "Free to Play", "Cross-play"] },
  12: { developer: "Pearl Abyss", releaseDate: "2016-03-03", popularity: 72, tags: ["Open World", "Character Creation", "Action Combat"] },
  13: { developer: "Ubisoft Montreal", releaseDate: "2015-12-01", popularity: 86, tags: ["Tactical", "Competitive", "Destructible"] },
  14: { developer: "Digital Extremes", releaseDate: "2013-03-25", popularity: 84, tags: ["Sci-fi", "Loot", "Co-op"] },
  15: { developer: "Zeekerss", releaseDate: "2023-10-23", popularity: 89, tags: ["Co-op", "Funny", "Horror"] },
  16: { developer: "Infinity Ward", releaseDate: "2022-10-28", popularity: 85, tags: ["Military", "Campaign", "Multiplayer"] },
  17: { developer: "Blizzard Entertainment", releaseDate: "2022-10-04", popularity: 87, tags: ["Hero Shooter", "Team-based", "Free to Play"] },
  18: { developer: "Valve", releaseDate: "2007-10-10", popularity: 75, tags: ["Class-based", "Comedy", "Classic"] },
  19: { developer: "Crate Entertainment", releaseDate: "2016-02-25", popularity: 68, tags: ["Hack and Slash", "Dark Fantasy", "Loot"] },
  20: { developer: "FromSoftware", releaseDate: "2019-03-22", popularity: 93, tags: ["Souls-like", "Difficult", "Ninja"] },
};

const reqFor = (paid: boolean, big: boolean) => ({
  os: "Windows 10 64-bit",
  cpu: big ? "Intel Core i7-8700 / Ryzen 5 3600" : "Intel Core i5-6600 / Ryzen 3 1200",
  ram: big ? "16 GB" : paid ? "8 GB" : "4 GB",
  gpu: big ? "NVIDIA GTX 1060 6GB / RX 580" : "NVIDIA GTX 660 / Radeon HD 7870",
  storage: big ? "80 GB" : paid ? "30 GB" : "15 GB",
});

export const games: Game[] = rawGames.map((g) => ({
  ...g,
  ...extras[g.id],
  features: [
    g.platforms.length > 1 ? "Cross-platform availability" : "PC optimised",
    g.categories.includes("Multiplayer") || g.categories.includes("MOBA") ? "Online multiplayer" : "Single-player friendly",
    "Instant digital delivery",
    "Achievements & leaderboards",
  ],
  requirements: reqFor(g.price > 0, g.price >= 29),
}));

export const getGame = (id: number) => games.find((g) => g.id === id);

export const allCategories = Array.from(new Set(games.flatMap((g) => g.categories))).sort();
export const allPlatforms = Array.from(new Set(games.flatMap((g) => g.platforms)));
export const maxPrice = Math.ceil(Math.max(...games.map((g) => g.price)));

export const relatedGames = (game: Game, limit = 4) =>
  games
    .filter((g) => g.id !== game.id)
    .map((g) => ({ g, score: g.categories.filter((c) => game.categories.includes(c)).length }))
    .sort((a, b) => b.score - a.score || b.g.popularity - a.g.popularity)
    .slice(0, limit)
    .map((x) => x.g);
