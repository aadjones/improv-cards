import { Card, Deck, DrawEvent, SuitId } from './types';

export type BiasConfig = {
  windowDays: number; // e.g., 14
  minSuitCooldown?: number; // optional: avoid repeating same suit within N draws
};

export function suitDistribution(
  history: DrawEvent[],
  windowDays: number,
  now = Date.now()
): Record<SuitId, number> {
  const cutoff = now - windowDays * 24 * 60 * 60 * 1000;
  const counts: Record<string, number> = {};
  for (const e of history) {
    if (e.timestamp >= cutoff) counts[e.suit] = (counts[e.suit] ?? 0) + 1;
  }
  return counts;
}

export function drawBiasedCard(
  deck: Deck,
  history: DrawEvent[],
  cfg: BiasConfig,
  now = Date.now()
): Card {
  const dist = suitDistribution(history, cfg.windowDays, now);

  // Lower count => higher weight. Add +1 to avoid zero-weight suits disappearing.
  const suitWeights = Object.fromEntries(deck.suits.map(s => [s, 1 / ((dist[s] ?? 0) + 1)]));

  // Optional cooldown: avoid repeating the latest suit.
  if (cfg.minSuitCooldown && history.length > 0) {
    const recentSuit = history[history.length - 1].suit;
    suitWeights[recentSuit] = Math.max(0.0001, suitWeights[recentSuit] * 0.25);
  }

  // Build weighted pool of cards by suit weight.
  const pool: Card[] = [];
  for (const c of deck.cards) {
    const w = suitWeights[c.suit] ?? 1;
    // Clamp and scale weight to a small integer replication to keep simple.
    const copies = Math.max(1, Math.min(8, Math.round(w * 4)));
    for (let i = 0; i < copies; i++) pool.push(c);
  }

  // Fallback: if something went wrong, random card.
  if (pool.length === 0) return deck.cards[Math.floor(Math.random() * deck.cards.length)];

  return pool[Math.floor(Math.random() * pool.length)];
}
