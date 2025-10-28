// Mock AsyncStorage for testing
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { customPromptsStore } from '../src/store/customPromptsStore';
import { getCompleteDeck } from '../src/deck';

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('Custom Prompts Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAsyncStorage.getItem.mockResolvedValue(null);
  });

  describe('customPromptsStore', () => {
    it('should create a new custom prompt', async () => {
      mockAsyncStorage.getItem.mockResolvedValue('[]');

      const prompt = await customPromptsStore.addCustomPrompt(
        'Focus on breathing',
        'Synchronize your breathing with the musical phrases'
      );

      expect(prompt.title).toBe('Focus on breathing');
      expect(prompt.description).toBe('Synchronize your breathing with the musical phrases');
      expect(prompt.id).toMatch(/^custom-/);
      expect(mockAsyncStorage.setItem).toHaveBeenCalled();
    });

    it('should validate prompt title', async () => {
      await expect(customPromptsStore.addCustomPrompt('', 'test body')).rejects.toThrow(
        'Title is required'
      );

      const longTitle = 'a'.repeat(101);
      await expect(customPromptsStore.addCustomPrompt(longTitle)).rejects.toThrow(
        'Title must be 100 characters or less'
      );
    });

    it('should convert prompts to cards with custom suit', async () => {
      const mockPrompts = [
        {
          id: 'custom-001',
          title: 'Test Prompt',
          description: 'Test description',
          type: 'practice' as const,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];

      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockPrompts));

      const cards = await customPromptsStore.getCustomCards();

      expect(cards).toHaveLength(1);
      expect(cards[0]).toEqual({
        id: 'custom-001',
        suit: 'custom',
        title: 'Test Prompt',
        description: 'Test description',
        type: 'practice',
        isCustom: true,
      });
    });
  });

  describe('getCompleteDeck', () => {
    it('should include custom suit when custom prompts exist', async () => {
      const mockPrompts = [
        {
          id: 'custom-001',
          title: 'Test Prompt',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];

      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockPrompts));

      const deck = await getCompleteDeck();

      expect(deck.suits).toContain('custom');
      expect(deck.cards.some(card => card.suit === 'custom')).toBe(true);
      expect(deck.cards.some(card => card.isCustom === true)).toBe(true);
    });

    it('should not include custom suit when no custom prompts exist', async () => {
      mockAsyncStorage.getItem.mockResolvedValue('[]');

      const deck = await getCompleteDeck();

      expect(deck.suits).not.toContain('custom');
      expect(deck.cards.every(card => card.suit !== 'custom')).toBe(true);
    });

    it('should merge static and custom cards correctly', async () => {
      const mockPrompts = [
        {
          id: 'custom-001',
          title: 'Custom Prompt',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];

      mockAsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockPrompts));

      const deck = await getCompleteDeck();

      // Should have all static cards plus custom cards
      const staticCardsCount = 25; // 5 cards per suit × 5 suits
      const customCardsCount = 1;
      expect(deck.cards).toHaveLength(staticCardsCount + customCardsCount);

      // Static cards should not have isCustom flag
      const staticCards = deck.cards.filter(card => card.suit !== 'custom');
      expect(staticCards.every(card => !card.isCustom)).toBe(true);

      // Custom cards should have isCustom flag
      const customCards = deck.cards.filter(card => card.suit === 'custom');
      expect(customCards.every(card => card.isCustom === true)).toBe(true);
    });
  });
});
