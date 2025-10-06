import { Card } from '@core/types';
import { drawBiasedCard, BiasConfig } from '@core/rotation';
import { DrawEvent, Deck } from '@core/types';

/**
 * Draw a random card from a deck (for improv mode)
 */
export function drawRandomCard(cards: Card[], excludeCardId?: string): Card {
  if (cards.length === 0) {
    throw new Error('No cards available to draw');
  }

  // Filter out the current card if we want a different one
  const availableCards = excludeCardId
    ? cards.filter(card => card.id !== excludeCardId)
    : cards;

  // If we filtered down to nothing, just use all cards (edge case)
  const cardsToDrawFrom = availableCards.length > 0 ? availableCards : cards;

  const randomIndex = Math.floor(Math.random() * cardsToDrawFrom.length);
  return cardsToDrawFrom[randomIndex];
}

/**
 * Draw a card for practice mode (biased toward neglected suits)
 */
export function drawPracticeCard(
  deck: Deck,
  history: DrawEvent[],
  config: BiasConfig = { windowDays: 14, minSuitCooldown: 1 }
): Card {
  return drawBiasedCard(deck, history, config);
}

/**
 * Draw a card for improv mode (random, optionally include mood)
 */
export function drawImprovCard(cards: Card[], includeMood: boolean): Card {
  if (includeMood) {
    // If mood is included, just draw any improv card randomly
    return drawRandomCard(cards);
  } else {
    // If mood is excluded, filter out mood cards
    const nonMoodCards = cards.filter(card => card.suit !== 'mood');
    if (nonMoodCards.length === 0) {
      throw new Error('No non-mood cards available');
    }
    return drawRandomCard(nonMoodCards);
  }
}
