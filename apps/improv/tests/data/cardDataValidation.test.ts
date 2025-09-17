import { CARDS_DATA, TECHNICAL_SUITS, MOOD_SUIT, LEVELS } from '../../src/constants/cards';

describe('Card Data Validation', () => {
  it('should have valid card data structure', () => {
    expect(CARDS_DATA.length).toBeGreaterThan(0);

    CARDS_DATA.forEach(card => {
      // Required properties
      expect(card.id).toBeDefined();
      expect(typeof card.id).toBe('string');
      expect(card.title).toBeDefined();
      expect(typeof card.title).toBe('string');
      expect(card.suit).toBeDefined();
      expect(typeof card.suit).toBe('string');
      expect(card.description).toBeDefined();
      expect(typeof card.description).toBe('string');

      // Business rules
      if (card.suit === MOOD_SUIT) {
        expect(card.level).toBeNull();
      } else {
        expect(TECHNICAL_SUITS).toContain(card.suit);
        expect(LEVELS).toContain(card.level);
      }
    });
  });

  it('should have cards for all technical suits', () => {
    TECHNICAL_SUITS.forEach(suit => {
      const cardsInSuit = CARDS_DATA.filter(card => card.suit === suit);
      expect(cardsInSuit.length).toBeGreaterThan(0);
    });
  });

  it('should have mood cards', () => {
    const moodCards = CARDS_DATA.filter(card => card.suit === MOOD_SUIT);
    expect(moodCards.length).toBeGreaterThan(0);

    moodCards.forEach(card => {
      expect(card.level).toBeNull();
    });
  });

  it('should have cards for all difficulty levels', () => {
    LEVELS.forEach(level => {
      const cardsInLevel = CARDS_DATA.filter(card => card.level === level);
      expect(cardsInLevel.length).toBeGreaterThan(0);
    });
  });
});
