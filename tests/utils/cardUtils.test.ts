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
    it('should draw technical cards plus mood card', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        technicalCount: 2,
      };

      const result = drawCards(settings);

      expect(result).toHaveLength(3); // 2 technical + 1 mood
      expect(result.some(card => card.suit === MOOD_SUIT)).toBe(true);
      expect(result.filter(card => card.suit !== MOOD_SUIT)).toHaveLength(2);
    });

    it('should always include mood card', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        technicalCount: 1,
      };

      const result = drawCards(settings);

      expect(result).toHaveLength(2); // 1 technical + 1 mood
      expect(result.some(card => card.suit === MOOD_SUIT)).toBe(true);
      expect(result.some(card => card.suit !== MOOD_SUIT)).toBe(true);
    });

    it('should not draw duplicate suits (except mood)', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        technicalCount: 3,
      };

      const result = drawCards(settings);
      const technicalCards = result.filter(card => card.suit !== MOOD_SUIT);
      const technicalSuits = technicalCards.map(card => card.suit);
      const uniqueTechnicalSuits = new Set(technicalSuits);

      expect(technicalSuits.length).toBe(uniqueTechnicalSuits.size);
      expect(result.some(card => card.suit === MOOD_SUIT)).toBe(true);
    });

    it('should throw error when no technical cards available', () => {
      const settings = {
        ...DEFAULT_SETTINGS,
        allowedSuits: [],
        technicalCount: 1,
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
