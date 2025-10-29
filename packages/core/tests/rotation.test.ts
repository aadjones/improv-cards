import { suitDistribution, drawBiasedCard, BiasConfig } from '../src/rotation';
import { Deck, DrawEvent } from '../src/types';

// Test deck with predictable structure
const testDeck: Deck = {
  suits: ['tone', 'rhythm', 'phrasing'],
  cards: [
    { id: 'tone-1', suit: 'tone', title: 'Tone Card 1', type: 'practice' },
    { id: 'tone-2', suit: 'tone', title: 'Tone Card 2', type: 'practice' },
    { id: 'rhythm-1', suit: 'rhythm', title: 'Rhythm Card 1', type: 'improv' },
    { id: 'rhythm-2', suit: 'rhythm', title: 'Rhythm Card 2', type: 'improv' },
    { id: 'phrasing-1', suit: 'phrasing', title: 'Phrasing Card 1', type: 'improv' },
    { id: 'phrasing-2', suit: 'phrasing', title: 'Phrasing Card 2', type: 'improv' },
  ],
};

describe('suitDistribution', () => {
  it('calculates distribution correctly for recent events', () => {
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000;

    const history: DrawEvent[] = [
      { cardId: 'tone-1', suit: 'tone', timestamp: oneDayAgo },
      { cardId: 'tone-2', suit: 'tone', timestamp: oneDayAgo },
      { cardId: 'rhythm-1', suit: 'rhythm', timestamp: twoDaysAgo },
    ];

    const distribution = suitDistribution(history, 7, now);

    expect(distribution.tone).toBe(2);
    expect(distribution.rhythm).toBe(1);
    expect(distribution.phrasing).toBeUndefined();
  });

  it('excludes events outside the time window', () => {
    const now = Date.now();
    const eightDaysAgo = now - 8 * 24 * 60 * 60 * 1000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const history: DrawEvent[] = [
      { cardId: 'tone-1', suit: 'tone', timestamp: eightDaysAgo }, // Outside 7-day window
      { cardId: 'rhythm-1', suit: 'rhythm', timestamp: oneDayAgo }, // Inside window
    ];

    const distribution = suitDistribution(history, 7, now);

    expect(distribution.tone).toBeUndefined();
    expect(distribution.rhythm).toBe(1);
  });

  it('handles empty history gracefully', () => {
    const distribution = suitDistribution([], 14);
    expect(Object.keys(distribution)).toHaveLength(0);
  });
});

describe('drawBiasedCard', () => {
  it('returns a valid card from the deck', () => {
    const config: BiasConfig = { windowDays: 14 };
    const card = drawBiasedCard(testDeck, [], config);

    expect(testDeck.cards).toContainEqual(card);
  });

  it('biases away from recently drawn suits', () => {
    const now = Date.now();
    const recentHistory: DrawEvent[] = [
      // Heavily bias toward tone
      { cardId: 'tone-1', suit: 'tone', timestamp: now - 1000 },
      { cardId: 'tone-2', suit: 'tone', timestamp: now - 2000 },
      { cardId: 'tone-1', suit: 'tone', timestamp: now - 3000 },
      { cardId: 'tone-2', suit: 'tone', timestamp: now - 4000 },
    ];

    const config: BiasConfig = { windowDays: 1 };

    // Draw many cards and check that tone is less frequent
    const drawCounts = { tone: 0, rhythm: 0, phrasing: 0 };
    const numDraws = 100;

    for (let i = 0; i < numDraws; i++) {
      const card = drawBiasedCard(testDeck, recentHistory, config, now);
      drawCounts[card.suit as keyof typeof drawCounts]++;
    }

    // Tone should be drawn less frequently than other suits
    expect(drawCounts.tone).toBeLessThan(drawCounts.rhythm);
    expect(drawCounts.tone).toBeLessThan(drawCounts.phrasing);
  });

  it('applies cooldown to prevent immediate suit repetition', () => {
    const now = Date.now();
    const recentHistory: DrawEvent[] = [{ cardId: 'tone-1', suit: 'tone', timestamp: now - 1000 }];

    const config: BiasConfig = { windowDays: 14, minSuitCooldown: 1 };

    // Draw many cards and verify tone is significantly reduced relative to other suits
    const drawCounts = { tone: 0, rhythm: 0, phrasing: 0 };
    const numDraws = 1000;

    for (let i = 0; i < numDraws; i++) {
      const card = drawBiasedCard(testDeck, recentHistory, config, now);
      drawCounts[card.suit as keyof typeof drawCounts]++;
    }

    // With cooldown, tone should be drawn less than EACH of the other suits
    // This tests relative behavior, not absolute thresholds
    expect(drawCounts.tone).toBeLessThan(drawCounts.rhythm);
    expect(drawCounts.tone).toBeLessThan(drawCounts.phrasing);

    // Additionally, tone should be significantly below equal distribution (33.3%)
    // With 1000 samples and cooldown, tone should be well below 30%
    expect(drawCounts.tone).toBeLessThan(numDraws * 0.30);
  });

  it('handles deck with no cards gracefully', () => {
    const emptyDeck: Deck = { suits: [], cards: [] };
    const config: BiasConfig = { windowDays: 14 };

    // Should not throw, though behavior is undefined for empty deck
    expect(() => drawBiasedCard(emptyDeck, [], config)).not.toThrow();
  });

  it('promotes neglected suits over time', () => {
    const now = Date.now();
    const fiveDaysAgo = now - 5 * 24 * 60 * 60 * 1000;

    // Old history that has aged out of recent bias
    const oldHistory: DrawEvent[] = [
      { cardId: 'tone-1', suit: 'tone', timestamp: fiveDaysAgo },
      { cardId: 'tone-2', suit: 'tone', timestamp: fiveDaysAgo },
    ];

    // Recent history favoring rhythm
    const recentHistory: DrawEvent[] = [
      { cardId: 'rhythm-1', suit: 'rhythm', timestamp: now - 1000 },
      { cardId: 'rhythm-2', suit: 'rhythm', timestamp: now - 2000 },
    ];

    const config: BiasConfig = { windowDays: 3 }; // Only recent history matters

    const drawCounts = { tone: 0, rhythm: 0, phrasing: 0 };
    const numDraws = 100;

    for (let i = 0; i < numDraws; i++) {
      const card = drawBiasedCard(testDeck, recentHistory, config, now);
      drawCounts[card.suit as keyof typeof drawCounts]++;
    }

    // Tone and phrasing should be favored over rhythm
    expect(drawCounts.rhythm).toBeLessThan(drawCounts.tone);
    expect(drawCounts.rhythm).toBeLessThan(drawCounts.phrasing);
  });
});
