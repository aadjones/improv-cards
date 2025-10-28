import { Deck } from '@core/types';
import { customPromptsStore } from './store/customPromptsStore';

export const staticPracticeDeck: Deck = {
  suits: ['physical', 'listening', 'time', 'expression', 'instrument'],
  cards: [
    // Physical cards
    {
      id: 'physical-001',
      suit: 'physical',
      title: 'Unclench protocol',
      description: 'Scan jaw, shoulders, wrists; release before each entrance.',
      type: 'practice',
    },
    {
      id: 'physical-002',
      suit: 'physical',
      title: 'Weight distribution',
      description: 'Feel how weight flows through your instrument.',
      type: 'practice',
    },
    {
      id: 'physical-003',
      suit: 'physical',
      title: 'Micro-movements',
      description: 'Notice the smallest possible gestures that create sound.',
      type: 'practice',
    },
    {
      id: 'physical-004',
      suit: 'physical',
      title: 'Breath rhythm alignment',
      description: 'Match your breathing pattern to the musical pulse.',
      type: 'practice',
    },
    {
      id: 'physical-005',
      suit: 'physical',
      title: 'Personal tension scan',
      description: 'Identify your specific tension points and release them.',
      type: 'practice',
    },

    // Listening cards
    {
      id: 'listening-001',
      suit: 'listening',
      title: 'Record & mirror',
      description: 'Record 20s; replay; imitate your own tone intentionally.',
      type: 'practice',
    },
    {
      id: 'listening-002',
      suit: 'listening',
      title: 'Room acoustics',
      description: 'Play the same phrase in different parts of the room.',
      type: 'practice',
    },
    {
      id: 'listening-003',
      suit: 'listening',
      title: 'Overtone awareness',
      description: 'Listen for the partials above each fundamental.',
      type: 'practice',
    },
    {
      id: 'listening-004',
      suit: 'listening',
      title: 'Eyes closed focus',
      description: 'Play a familiar passage with eyes closed, notice what changes.',
      type: 'practice',
    },
    {
      id: 'listening-005',
      suit: 'listening',
      title: 'Layer separation',
      description: 'In polyphonic passages, isolate each voice mentally while playing.',
      type: 'practice',
    },

    // Time cards
    {
      id: 'time-001',
      suit: 'time',
      title: 'Clap then play',
      description: 'Clap the rhythm first, then play with same precision.',
      type: 'practice',
    },
    {
      id: 'time-002',
      suit: 'time',
      title: 'Elastic time',
      description: 'Stretch and compress time while maintaining pulse integrity.',
      type: 'practice',
    },
    {
      id: 'time-003',
      suit: 'time',
      title: 'Silence as rhythm',
      description: 'Give rests the same attention as notes.',
      type: 'practice',
    },
    {
      id: 'time-004',
      suit: 'time',
      title: 'Extreme slow practice',
      description: 'Play at 25% tempo, maintaining musical intention.',
      type: 'practice',
    },
    {
      id: 'time-005',
      suit: 'time',
      title: 'Rhythmic displacement',
      description: 'Deliberately shift written rhythms forward or back in time.',
      type: 'practice',
    },

    // Expression cards
    {
      id: 'expression-001',
      suit: 'expression',
      title: 'Conversational gestures',
      description: 'Play as if speaking to someone across the room.',
      type: 'practice',
    },
    {
      id: 'expression-002',
      suit: 'expression',
      title: 'Dynamic architecture',
      description: 'Plan the long-term dynamic journey of the phrase.',
      type: 'practice',
    },
    {
      id: 'expression-003',
      suit: 'expression',
      title: 'Echo and response',
      description: 'Create dialogue between different voices or registers.',
      type: 'practice',
    },
    {
      id: 'expression-004',
      suit: 'expression',
      title: 'Morning fog lifting',
      description: 'Shape this phrase like mist slowly rising and dispersing.',
      type: 'practice',
    },
    {
      id: 'expression-005',
      suit: 'expression',
      title: 'Argument between old friends',
      description: 'Play this passage as a heated but affectionate disagreement.',
      type: 'practice',
    },

    // Instrument cards
    {
      id: 'instrument-001',
      suit: 'instrument',
      title: 'Bow speed vs pressure',
      description: 'Hold pitch constant; vary speed and pressure separately.',
      type: 'practice',
    },
    {
      id: 'instrument-002',
      suit: 'instrument',
      title: 'Double-stop resonance',
      description: 'Find pure 3rds/6ths; adjust until beats vanish.',
      type: 'practice',
    },
    {
      id: 'instrument-003',
      suit: 'instrument',
      title: 'Vibrato choices',
      description: 'Play same phrase with no vibrato, narrow vibrato, wide vibrato.',
      type: 'practice',
    },
    {
      id: 'instrument-004',
      suit: 'instrument',
      title: 'Sul ponticello/ordinario',
      description: 'Explore bow positions from bridge to fingerboard.',
      type: 'practice',
    },
    {
      id: 'instrument-005',
      suit: 'instrument',
      title: 'Finger pressure minimum',
      description: 'Use just enough left hand pressure to create clean sound.',
      type: 'practice',
    },
  ],
};

/**
 * Creates a complete deck by merging static cards with user's custom prompts
 */
export async function getCompleteDeck(): Promise<Deck> {
  const customCards = await customPromptsStore.getCustomCards();
  const hasCustomCards = customCards.length > 0;

  return {
    suits: hasCustomCards ? [...staticPracticeDeck.suits, 'custom'] : staticPracticeDeck.suits,
    cards: [...staticPracticeDeck.cards, ...customCards],
  };
}

/**
 * Legacy export for backwards compatibility
 * @deprecated Use getCompleteDeck() instead
 */
export const practiceDeck = staticPracticeDeck;
