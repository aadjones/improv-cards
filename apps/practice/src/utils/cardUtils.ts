import { Card } from '@core/types';

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
