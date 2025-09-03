import { drawCards } from '../../src/utils/cardUtils';
import { DEFAULT_SETTINGS } from '../../src/constants/cards';
import type { RootStackParamList } from '../../src/types/navigation';

describe('Navigation Data Flow', () => {
  it('should generate valid navigation parameters for PracticeScreen', () => {
    // Simulate the exact flow: DrawScreen draws cards → navigates to PracticeScreen
    const settings = {
      ...DEFAULT_SETTINGS,
      technicalCount: 2,
      includeMood: true,
    };

    const drawnCards = drawCards(settings);

    // Simulate navigation parameter creation (this is what DrawScreen does)
    const navigationParams: RootStackParamList['Practice'] = {
      drawnCards: drawnCards,
    };

    // Verify the navigation parameters are valid for PracticeScreen
    expect(navigationParams.drawnCards).toBeDefined();
    expect(Array.isArray(navigationParams.drawnCards)).toBe(true);
    expect(navigationParams.drawnCards.length).toBeGreaterThan(0);

    // Verify PracticeScreen can process the data correctly
    const constraintCards = navigationParams.drawnCards.filter(card => card.suit !== '🎭 Mood');
    const moodCard = navigationParams.drawnCards.find(card => card.suit === '🎭 Mood');

    expect(constraintCards.length).toBe(settings.technicalCount);
    expect(moodCard).toBeDefined(); // includeMood is true

    // Verify all cards have required properties for display
    navigationParams.drawnCards.forEach(card => {
      expect(card.id).toBeDefined();
      expect(card.title).toBeDefined();
      expect(card.suit).toBeDefined();
      expect(card.description).toBeDefined();
    });
  });

  it('should always include mood card in onecard design', () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      technicalCount: 1,
    };

    const drawnCards = drawCards(settings);
    const navigationParams: RootStackParamList['Practice'] = {
      drawnCards: drawnCards,
    };

    const constraintCards = navigationParams.drawnCards.filter(card => card.suit !== '🎭 Mood');
    const moodCard = navigationParams.drawnCards.find(card => card.suit === '🎭 Mood');

    expect(constraintCards.length).toBe(1);
    expect(moodCard).toBeDefined(); // Always includes mood in onecard design
  });
});
