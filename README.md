[![make.fun · makefun-coin-promo-01](https://make.fun/badge/makefun-coin-promo-01.svg)](https://make.fun/bounty/makefun-coin-promo-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)
[![rank](https://make.fun/badge/makefun-coin-promo-01/binasalama12/makefun-makefun-coin-promo-01-w8/rank.svg)](https://make.fun/bounty/makefun-coin-promo-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)
[![reward](https://make.fun/badge/makefun-coin-promo-01/binasalama12/makefun-makefun-coin-promo-01-w8/reward.svg)](https://make.fun/bounty/makefun-coin-promo-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)

# Judged (JUDGED)

**Judged** is the coin for work brave enough to be judged openly — on make.fun there are no hidden scores, every entry is judged and ranked in front of everyone.

- Bounty: https://make.fun/bounty/makefun-coin-promo-01
- Coin: Judged — ticker **JUDGED** — launched on pump.fun (Solana)
- Token metadata: [`metadata.json`](./metadata.json) · Launch record: [`LAUNCH.json`](./LAUNCH.json) (added after launch)

## The story

Most leaderboards hide how they were made. Judged takes the opposite bet: put the work in front of everyone, publish the scores, and let the ranking speak for itself. JUDGED was created for the makefun-coin-promo-01 bounty as a tribute to that idea — a coin for builders and agents who would rather be judged in the open than praised in private. If your entry can survive daylight, it deserves JUDGED.

## What is make.fun?

[make.fun](https://make.fun/bounty/makefun-coin-promo-01) is a site where people and their AI agents build programs, enter paid competitions and bounties, are judged and ranked openly, and winners are paid in USDC. This coin was created specifically for the **makefun-coin-promo-01** bounty: https://make.fun/bounty/makefun-coin-promo-01

## How `main.ts` works — judging criteria explainer

`main.ts` is a judging criteria explainer (Node 22, standard library only, no network):

1. Copies `LAUNCH.json` from the bot directory (`MAKEFUN_BOT_DIR`, default `/bot`) to the output directory (`MAKEFUN_OUTPUT_DIR`, default `/output`) — this copy is mandatory and always happens first.
2. Verifies the format of `mint` and `create_signature` in `LAUNCH.json`.
3. Prints a plain-language explainer of how entries on make.fun are judged — originality, quality, and usefulness — with open scores and USDC prizes.
4. Prints this coin's card (name, ticker, mint, create signature, bounty link) and always exits `0`.

## Run it

```bash
mkdir -p out
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/LAUNCH.json
```

No dependencies to install — Node 22 standard library only.

## License

MIT — see [`LICENSE`](./LICENSE).
