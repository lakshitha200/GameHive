export type NewsArticle = {
  id: number;
  title: string;
  slug: string;
  category: "Updates" | "Esports" | "Industry" | "Guides";
  summary: string;
  content: string[];
  date: string;
  author: string;
  image: string;
};

const steam = (id: number) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`;

export const newsArticles: NewsArticle[] = [
  {
    id: 1, title: "New Expansion Released for CS:GO", slug: "csgo-new-expansion", category: "Updates",
    summary: "CS:GO launches a new map expansion with updated skins.",
    content: [
      "Counter-Strike: Global Offensive has released a new expansion featuring maps, skins, and weapon updates. Players can now explore new tactical gameplay and competitive modes.",
      "The update rebalances several economy mechanics and introduces three community-designed maps that have been in testing for months.",
      "Valve says matchmaking ranks will be re-calibrated over the next two weeks, so expect some volatility when queueing.",
    ],
    date: "2025-09-10", author: "Mira Santos", image: steam(730),
  },
  {
    id: 2, title: "Dota 2 Major Tournament Highlights", slug: "dota2-major-tournament", category: "Esports",
    summary: "Team highlights and winner analysis from the latest Dota 2 Major.",
    content: [
      "The Dota 2 Major concluded with an intense final. Team strategies, hero picks, and standout plays were analyzed, with top players making history.",
      "A surprise draft in game three turned the series around, with the underdogs taking the title after a 70-minute epic.",
      "Viewership peaked at over 1.2 million concurrent viewers, a new record for the circuit.",
    ],
    date: "2025-09-08", author: "Jonas Weber", image: steam(570),
  },
  {
    id: 3, title: "GTA V Online Update Adds Heist Missions", slug: "gta-v-online-heist-update", category: "Updates",
    summary: "Grand Theft Auto V Online introduces new heist missions and vehicles.",
    content: [
      "GTA V Online now includes a series of heist missions, new vehicles, and enhanced multiplayer interactions, bringing fresh challenges for players.",
      "Crews of up to four can plan multi-stage jobs, with branching approaches and bigger payouts for stealth runs.",
    ],
    date: "2025-09-06", author: "Priya Nair", image: steam(271590),
  },
  {
    id: 4, title: "Apex Legends Introduces New Legend", slug: "apex-legends-new-legend", category: "Updates",
    summary: "Apex Legends adds a new legend with unique abilities to the roster.",
    content: [
      "The latest Apex Legends update brings a new playable legend, new weapons, and map improvements, enhancing the battle royale experience.",
      "The new legend focuses on mobility and zone control, and early pro scrims suggest a strong pick rate in ranked.",
    ],
    date: "2025-09-05", author: "Mira Santos", image: steam(1172470),
  },
  {
    id: 5, title: "Stardew Valley Players Hit a New Milestone", slug: "stardew-valley-milestone", category: "Industry",
    summary: "The cosy farming sim crosses another huge sales milestone, nine years on.",
    content: [
      "ConcernedApe's farming sim keeps growing, with the community surpassing yet another sales milestone nearly a decade after launch.",
      "Regular free updates, mod support and a devoted community are credited for the game's remarkable longevity.",
      "The developer hinted that more content is on the way, though no date has been announced.",
    ],
    date: "2025-09-03", author: "Leo Park", image: steam(413150),
  },
  {
    id: 6, title: "Beginner Guide: Surviving Your First Night in Rust", slug: "rust-beginner-guide", category: "Guides",
    summary: "Gather, build, and defend: a short guide to not losing everything in hour one.",
    content: [
      "Rust is unforgiving, but a few habits will keep you alive. Start by gathering wood and stone, then craft a hatchet and a pickaxe.",
      "Build a small base with a door, a sleeping bag and a few storage boxes. Never store everything in one place.",
      "Finally, avoid the monuments until you have a decent weapon, and always pack a few bandages.",
    ],
    date: "2025-09-01", author: "Jonas Weber", image: steam(252490),
  },
  {
    id: 7, title: "Sekiro Speedrun Record Falls Again", slug: "sekiro-speedrun-record", category: "Esports",
    summary: "A new world record shaves another 40 seconds off the any% route.",
    content: [
      "The Sekiro any% record has been broken yet again, with a new route skipping an entire boss encounter.",
      "The runner credits a newly discovered movement glitch found by the community only days earlier.",
    ],
    date: "2025-08-28", author: "Priya Nair", image: steam(814380),
  },
  {
    id: 8, title: "Free-to-Play Is Winning: Why Players Prefer It", slug: "free-to-play-trend", category: "Industry",
    summary: "Analysts look at why free games keep topping the most-played charts.",
    content: [
      "Free-to-play titles now account for the majority of play time on PC, according to a new industry report.",
      "Cosmetic-only monetisation and frequent seasonal content are cited as the keys to retaining players.",
      "Premium games are responding with demos and generous free weekends to compete for attention.",
    ],
    date: "2025-08-25", author: "Leo Park", image: steam(570),
  },
];

export const newsCategories = ["All", ...Array.from(new Set(newsArticles.map((n) => n.category)))];
