import { groupCardsBySuit } from '../src/utils/cardUtils';
import { Card } from '@core/types';

describe('cardUtils', () => {
  describe('groupCardsBySuit', () => {
    it('groups cards by suit correctly', () => {
      const cards: Card[] = [
        { id: 'p1', suit: 'physical', title: 'Card 1', body: 'Body 1' },
        { id: 't1', suit: 'time', title: 'Card 2', body: 'Body 2' },
        { id: 'p2', suit: 'physical', title: 'Card 3', body: 'Body 3' },
      ];

      const result = groupCardsBySuit(cards);

      expect(result).toEqual({
        physical: [
          { id: 'p1', suit: 'physical', title: 'Card 1', body: 'Body 1' },
          { id: 'p2', suit: 'physical', title: 'Card 3', body: 'Body 3' },
        ],
        time: [{ id: 't1', suit: 'time', title: 'Card 2', body: 'Body 2' }],
      });
    });

    it('handles empty array', () => {
      const result = groupCardsBySuit([]);
      expect(result).toEqual({});
    });

    it('handles single card', () => {
      const cards: Card[] = [
        { id: 'e1', suit: 'expression', title: 'Solo Card', body: 'Solo Body' },
      ];

      const result = groupCardsBySuit(cards);

      expect(result).toEqual({
        expression: [{ id: 'e1', suit: 'expression', title: 'Solo Card', body: 'Solo Body' }],
      });
    });
  });
});
