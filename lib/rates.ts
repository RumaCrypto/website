import "server-only";

import { unstable_cache } from "next/cache";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { createPrices } from "@p2pdotme/sdk/prices";
import type { CurrencyCode } from "@p2pdotme/sdk/country";
import { RAILS, type RailCode } from "./rails";

/** Local currency per US dollar, by country. A missing country has no quote right now. */
export type Rates = Partial<Record<RailCode, number>>;

// Type check only: every rail's `sdkCurrency` must be a code the SDK quotes.
RAILS satisfies readonly { sdkCurrency: CurrencyCode }[];

/** `sellPrice` is fixed-point at 6 decimals, whatever the fiat's own precision (same as the PWA). */
const SELL_PRICE_DECIMALS = 6;

/**
 * P2P.ME's sell price for USDC in each country: the rate a payout settles at,
 * the same figure the Ruma app quotes when you send. Read on the server and
 * cached for a minute, since the price is on-chain config, not a live tick.
 *
 * Needs P2P_DIAMOND_ADDRESS (the same Diamond the app reads, on Base).
 * Without it, or if a read fails, the page simply shows no reference value.
 */
async function readSellRates(): Promise<Rates> {
  const diamond = process.env.P2P_DIAMOND_ADDRESS;
  if (!diamond || !/^0x[0-9a-fA-F]{40}$/.test(diamond)) return {};

  const prices = createPrices({
    publicClient: createPublicClient({ chain: base, transport: http(process.env.BASE_RPC_URL) }),
    diamondAddress: diamond as `0x${string}`,
  });

  const quotes = await Promise.all(
    RAILS.map(async (rail) => {
      try {
        const result = await prices.getPriceConfig({ currency: rail.sdkCurrency });
        if (result.isErr()) return null;
        const rate = Number(result.value.sellPrice) / 10 ** SELL_PRICE_DECIMALS;
        return rate > 0 ? ([rail.code, rate] as const) : null;
      } catch {
        return null;
      }
    }),
  );

  return Object.fromEntries(quotes.filter((q) => q !== null));
}

export const getSellRates = unstable_cache(readSellRates, ["p2pme-sell-rates"], { revalidate: 60 });
