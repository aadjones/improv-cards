import { Card, CARDS_DATA, MOOD_SUIT, Settings } from '../constants/cards';

/**
 * Fisher-Yates shuffle algorithm - the gold standard for unbiased shuffling
 * This is the same algorithm used by lodash.shuffle and other established libraries
 * Source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array]; // Don't mutate original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getTechnicalCards(settings: Settings): Card[] {
  return CARDS_DATA.filter(card => {
    if (card.suit === MOOD_SUIT) return false;
    if (!settings.allowedSuits.includes(card.suit)) return false;
    return card.level && settings.allowedLevels.includes(card.level);
  });
}

export function getMoodCards(): Card[] {
  return CARDS_DATA.filter(card => card.suit === MOOD_SUIT);
}

export function drawCards(settings: Settings): Card[] {
  const technicalCards = getTechnicalCards(settings);
  const moodCards = getMoodCards();

  if (technicalCards.length === 0) {
    throw new Error('No technical cards available with current settings.');
  }

  // Group technical cards by suit
  const cardsBySuit: Record<string, Card[]> = {};
  technicalCards.forEach(card => {
    if (!cardsBySuit[card.suit]) {
      cardsBySuit[card.suit] = [];
    }
    cardsBySuit[card.suit].push(card);
  });

  const availableSuits = Object.keys(cardsBySuit);
  const technicalCardsToDrawCount = Math.min(settings.technicalCount, availableSuits.length);

  // Shuffle suits and pick one card from each
  const shuffledSuits = fisherYatesShuffle(availableSuits);
  const selectedCards: Card[] = [];

  for (let i = 0; i < technicalCardsToDrawCount; i++) {
    const suit = shuffledSuits[i];
    const suitCards = cardsBySuit[suit];
    const randomCard = suitCards[Math.floor(Math.random() * suitCards.length)];
    selectedCards.push(randomCard);
  }

  // Always add mood card
  if (moodCards.length > 0) {
    const randomMoodCard = moodCards[Math.floor(Math.random() * moodCards.length)];
    selectedCards.unshift(randomMoodCard); // Add mood card first
  }

  return selectedCards;
}

export function groupCardsBySuit(cards: Card[]): Record<string, Card[]> {
  return cards.reduce(
    (groups, card) => {
      if (!groups[card.suit]) {
        groups[card.suit] = [];
      }
      groups[card.suit].push(card);
      return groups;
    },
    {} as Record<string, Card[]>
  );
}

export function rerollMoodCard(currentCards: Card[]): Card[] {
  const allMoodCards = getMoodCards();
  const currentMoodCard = currentCards.find(card => card.suit === MOOD_SUIT);

  if (allMoodCards.length <= 1) {
    throw new Error('Only one mood card available');
  }

  const availableMoodCards = allMoodCards.filter(card => card.id !== currentMoodCard?.id);
  const newMoodCard = availableMoodCards[Math.floor(Math.random() * availableMoodCards.length)];

  return [newMoodCard, ...currentCards.filter(card => card.suit !== MOOD_SUIT)];
}

export function rerollTechnicalCards(currentCards: Card[], settings: Settings): Card[] {
  const allTechnicalCards = getTechnicalCards(settings);
  const currentTechnicalCards = currentCards.filter(card => card.suit !== MOOD_SUIT);

  if (allTechnicalCards.length <= currentTechnicalCards.length) {
    throw new Error('Not enough different cards available for reroll');
  }

  const cardsBySuit = groupCardsBySuit(allTechnicalCards);
  const availableSuits = Object.keys(cardsBySuit);
  const shuffledSuits = fisherYatesShuffle(availableSuits);
  const newTechnicalCards: Card[] = [];
  const currentCardIds = currentTechnicalCards.map(card => card.id);

  for (let i = 0; i < Math.min(currentTechnicalCards.length, shuffledSuits.length); i++) {
    const suit = shuffledSuits[i];
    const suitCards = cardsBySuit[suit];

    const availableCardsInSuit = suitCards.filter(card => !currentCardIds.includes(card.id));

    const randomCard =
      availableCardsInSuit.length > 0
        ? availableCardsInSuit[Math.floor(Math.random() * availableCardsInSuit.length)]
        : suitCards[Math.floor(Math.random() * suitCards.length)];

    newTechnicalCards.push(randomCard);
  }

  const currentMoodCard = currentCards.find(card => card.suit === MOOD_SUIT);
  return currentMoodCard ? [currentMoodCard, ...newTechnicalCards] : newTechnicalCards;
}
