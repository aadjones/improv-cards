import { loadSettings, saveSettings } from '../../src/utils/storage';
import { drawCards } from '../../src/utils/cardUtils';
import { DEFAULT_SETTINGS, Settings } from '../../src/constants/cards';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Settings Integration Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should maintain settings persistence through draw workflow', async () => {
    const customSettings: Settings = {
      ...DEFAULT_SETTINGS,
      technicalCount: 3,
      includeMood: true,
      allowedSuits: ['🏗️ Form', '⏳ Time'],
      allowedLevels: ['Beginner', 'Intermediate'],
    };

    // Mock AsyncStorage behavior
    const mockGetItem = require('@react-native-async-storage/async-storage').getItem as jest.Mock;
    const mockSetItem = require('@react-native-async-storage/async-storage').setItem as jest.Mock;

    mockSetItem.mockResolvedValue(null);
    mockGetItem.mockResolvedValue(JSON.stringify(customSettings));

    // Save settings
    await saveSettings(customSettings);

    // Load settings (simulates app restart/navigation)
    const loadedSettings = await loadSettings();

    // Verify settings are consistent
    expect(loadedSettings).toEqual(customSettings);

    // Verify settings work with card drawing (the critical path)
    const drawnCards = drawCards(loadedSettings);

    // Business rule verification
    expect(drawnCards.length).toBeGreaterThan(0);
    expect(drawnCards.length).toBeLessThanOrEqual(4); // 3 technical + 1 mood max

    const technicalCards = drawnCards.filter(card => card.suit !== '🎭 Mood');
    const moodCards = drawnCards.filter(card => card.suit === '🎭 Mood');

    expect(technicalCards.length).toBe(Math.min(3, customSettings.allowedSuits.length));
    expect(moodCards.length).toBe(customSettings.includeMood ? 1 : 0);
  });

  it('should gracefully handle corrupted settings', async () => {
    // Mock corrupted storage data
    const mockGetItem = require('@react-native-async-storage/async-storage').getItem as jest.Mock;
    mockGetItem.mockResolvedValue('invalid json');

    // Load settings - should fall back to defaults gracefully
    const loadedSettings = await loadSettings();

    // Verify it falls back to defaults (the defensive behavior)
    expect(loadedSettings).toEqual(DEFAULT_SETTINGS);

    // Verify defaults work with card drawing
    expect(() => drawCards(loadedSettings)).not.toThrow();
  });

  it('should handle settings that would break card drawing', () => {
    // Test the actual error case that would break the app
    const impossibleSettings: Settings = {
      ...DEFAULT_SETTINGS,
      allowedSuits: [], // This should cause the error
      technicalCount: 1,
      includeMood: false,
    };

    // This should throw the business logic error
    expect(() => drawCards(impossibleSettings)).toThrow('No technical cards available');
  });
});
