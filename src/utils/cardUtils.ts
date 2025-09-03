import { Card, CARDS_DATA, MOOD_SUIT, Settings } from '../constants/cards';

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
  const shuffledSuits = availableSuits.sort(() => Math.random() - 0.5);
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
