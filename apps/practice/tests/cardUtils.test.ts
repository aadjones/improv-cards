import { groupCardsBySuit } from '../src/utils/cardUtils';
import { Card } from '@core/types';

describe('cardUtils', () => {
  describe('groupCardsBySuit', () => {
    it('groups cards by suit correctly', () => {
      const cards: Card[] = [
        { id: 'p1', suit: 'physical', title: 'Card 1', description: 'Body 1', type: 'practice' },
        { id: 't1', suit: 'time', title: 'Card 2', description: 'Body 2', type: 'practice' },
        { id: 'p2', suit: 'physical', title: 'Card 3', description: 'Body 3', type: 'practice' },
      ];

      const result = groupCardsBySuit(cards);

      expect(result).toEqual({
        physical: [
          { id: 'p1', suit: 'physical', title: 'Card 1', description: 'Body 1', type: 'practice' },
          { id: 'p2', suit: 'physical', title: 'Card 3', description: 'Body 3', type: 'practice' },
        ],
        time: [
          { id: 't1', suit: 'time', title: 'Card 2', description: 'Body 2', type: 'practice' },
        ],
      });
    });

    it('handles empty array', () => {
      const result = groupCardsBySuit([]);
      expect(result).toEqual({});
    });

    it('handles single card', () => {
      const cards: Card[] = [
        {
          id: 'e1',
          suit: 'expression',
          title: 'Solo Card',
          description: 'Solo Body',
          type: 'practice',
        },
      ];

      const result = groupCardsBySuit(cards);

      expect(result).toEqual({
        expression: [
          {
            id: 'e1',
            suit: 'expression',
            title: 'Solo Card',
            description: 'Solo Body',
            type: 'practice',
          },
        ],
      });
    });
  });
});
