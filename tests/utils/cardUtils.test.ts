import {
  drawCards,
  getTechnicalCards,
  getMoodCards,
  groupCardsBySuit,
} from '../../src/utils/cardUtils';
import {
  CARDS_DATA,
  DEFAULT_SETTINGS,
  TECHNICAL_SUITS,
  MOOD_SUIT,
} from '../../src/constants/cards';

describe('cardUtils', () => {
  describe('getTechnicalCards', () => {
    it('should filter cards by allowed suits and levels', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        allowedSuits: ['🏗️ Form'],
        allowedLevels: ['Beginner'],
      };

      const result = getTechnicalCards(settings);

      expect(result.length).toBeGreaterThan(0);
      result.forEach(card => {
        expect(settings.allowedSuits).toContain(card.suit);
        expect(settings.allowedLevels).toContain(card.level);
      });
    });

    it('should exclude mood cards', () => {
      const result = getTechnicalCards(DEFAULT_SETTINGS);

      result.forEach(card => {
        expect(card.suit).not.toBe(MOOD_SUIT);
      });
    });
  });

  describe('getMoodCards', () => {
    it('should return only mood cards', () => {
      const result = getMoodCards();

      expect(result.length).toBeGreaterThan(0);
      result.forEach(card => {
        expect(card.suit).toBe(MOOD_SUIT);
        expect(card.level).toBeNull();
      });
    });
  });

  describe('drawCards', () => {
    it('should draw the correct number of technical cards', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        technicalCount: 2,
        includeMood: false,
      };

      const result = drawCards(settings);

      expect(result).toHaveLength(2);
      result.forEach(card => {
        expect(card.suit).not.toBe(MOOD_SUIT);
      });
    });

    it('should include mood card when requested', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        technicalCount: 1,
        includeMood: true,
      };

      const result = drawCards(settings);

      expect(result).toHaveLength(2);
      expect(result.some(card => card.suit === MOOD_SUIT)).toBe(true);
      expect(result.some(card => card.suit !== MOOD_SUIT)).toBe(true);
    });

    it('should not draw duplicate suits', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        technicalCount: 3,
        includeMood: false,
      };

      const result = drawCards(settings);
      const suits = result.map(card => card.suit);
      const uniqueSuits = new Set(suits);

      expect(suits.length).toBe(uniqueSuits.size);
    });

    it('should throw error when no technical cards available', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        allowedSuits: [],
        technicalCount: 1,
        includeMood: false,
      };

      expect(() => drawCards(settings)).toThrow('No technical cards available');
    });
  });

  describe('groupCardsBySuit', () => {
    it('should group cards by their suit', () => {
      const result = groupCardsBySuit(CARDS_DATA);

      TECHNICAL_SUITS.forEach(suit => {
        expect(result[suit]).toBeDefined();
        expect(Array.isArray(result[suit])).toBe(true);
        if (result[suit].length > 0) {
          result[suit].forEach(card => {
            expect(card.suit).toBe(suit);
          });
        }
      });

      expect(result[MOOD_SUIT]).toBeDefined();
      result[MOOD_SUIT].forEach(card => {
        expect(card.suit).toBe(MOOD_SUIT);
      });
    });
  });
});
