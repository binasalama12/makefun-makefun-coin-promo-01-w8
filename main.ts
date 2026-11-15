// Judged (JUDGED) — judging criteria explainer for make.fun entries.
// Copies LAUNCH.json to the output dir, verifies its format, then prints
// an explainer of how entries on make.fun are judged, plus this coin's card.
// Pure Node.js standard library, no network access, always exits 0.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR || "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

function isPlausibleMint(v) {
  return typeof v === "string" && v.length >= 32 && v.length <= 44 && BASE58.test(v);
}
function isPlausibleSignature(v) {
  return typeof v === "string" && v.length >= 80 && v.length <= 90 && BASE58.test(v);
}

const CRITERIA = [
  {
    name: "Originality",
    detail:
      "Is the idea genuinely new, or a fresh take on a familiar problem? " +
      "Copied templates and thin reskins score poorly; a clear, ownable angle scores well.",
  },
  {
    name: "Quality",
    detail:
      "Does it actually work, end to end? Clean code, a runnable entry point, " +
      "honest error handling, and a polished README all count toward quality.",
  },
  {
    name: "Usefulness",
    detail:
      "Would someone real use this? Entries that solve a concrete problem for " +
      "builders, agents, or communities outrank demos that only look clever.",
  },
];

function printCriteria() {
  console.log("");
  console.log("=== How entries are judged on make.fun ===");
  console.log("Every entry is scored in the open — no hidden scores, no back room.");
  console.log("Judges weigh three criteria:");
  console.log("");
  for (let i = 0; i < CRITERIA.length; i++) {
    const c = CRITERIA[i];
    console.log((i + 1) + ". " + c.name);
    console.log("   " + c.detail);
  }
  console.log("");
  console.log("Scores are open: entries are ranked publicly, so anyone can see");
  console.log("where each submission stands and why the leaders are leading.");
  console.log("Prizes are paid in USDC to the winners — judgement is not just");
  console.log("feedback, it decides real payouts.");
  console.log("==========================================");
}

function printCoinCard(launch) {
  console.log("");
  console.log("=== Judged (JUDGED) — Coin Card ===");
  console.log("Name:    Judged");
  console.log("Ticker:  JUDGED");
  console.log("Story:   No hidden scores — every entry judged and ranked in front of everyone.");
  console.log("Motto:   For work brave enough to be judged openly.");
  if (launch) {
    console.log("Mint:            " + launch.mint);
    console.log("Create signature: " + launch.create_signature);
  } else {
    console.log("Mint:            (see LAUNCH.json after launch)");
  }
  console.log("Bounty:  https://make.fun/bounty/makefun-coin-promo-01");
  console.log("===================================");
}

function main() {
  const src = join(botDir, "LAUNCH.json");
  if (!existsSync(src)) {
    console.log("LAUNCH.json not found at " + src + " — nothing to copy yet.");
    printCriteria();
    printCoinCard(null);
    return;
  }
  mkdirSync(outDir, { recursive: true });
  const dst = join(outDir, "LAUNCH.json");
  copyFileSync(src, dst);
  console.log("Copied LAUNCH.json -> " + dst);

  let launch;
  try {
    launch = JSON.parse(readFileSync(src, "utf8"));
  } catch (err) {
    console.log("LAUNCH.json is not valid JSON: " + String(err));
    printCriteria();
    printCoinCard(null);
    return;
  }

  const mintOk = isPlausibleMint(launch.mint);
  const sigOk = isPlausibleSignature(launch.create_signature);
  console.log(
    "Format check — mint: " + (mintOk ? "OK" : "INVALID") +
    ", create_signature: " + (sigOk ? "OK" : "INVALID")
  );
  if (!mintOk || !sigOk) {
    console.log("LAUNCH.json fields failed format verification.");
    printCriteria();
    printCoinCard(null);
    return;
  }

  printCriteria();
  printCoinCard(launch);
}

try {
  main();
} catch (err) {
  console.log("Non-fatal error: " + String(err));
}
process.exitCode = 0;

// revision: wallet8
console.log('verdict note: judged in the open, by the work itself — nothing hidden, nothing owed.');
