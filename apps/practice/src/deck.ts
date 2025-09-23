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
      body: 'Scan jaw, shoulders, wrists; release before each entrance.',
    },
    {
      id: 'physical-002',
      suit: 'physical',
      title: 'Weight distribution',
      body: 'Feel how weight flows through your instrument.',
    },
    {
      id: 'physical-003',
      suit: 'physical',
      title: 'Micro-movements',
      body: 'Notice the smallest possible gestures that create sound.',
    },
    {
      id: 'physical-004',
      suit: 'physical',
      title: 'Breath rhythm alignment',
      body: 'Match your breathing pattern to the musical pulse.',
    },
    {
      id: 'physical-005',
      suit: 'physical',
      title: 'Personal tension scan',
      body: 'Identify your specific tension points and release them.',
    },

    // Listening cards
    {
      id: 'listening-001',
      suit: 'listening',
      title: 'Record & mirror',
      body: 'Record 20s; replay; imitate your own tone intentionally.',
    },
    {
      id: 'listening-002',
      suit: 'listening',
      title: 'Room acoustics',
      body: 'Play the same phrase in different parts of the room.',
    },
    {
      id: 'listening-003',
      suit: 'listening',
      title: 'Overtone awareness',
      body: 'Listen for the partials above each fundamental.',
    },
    {
      id: 'listening-004',
      suit: 'listening',
      title: 'Eyes closed focus',
      body: 'Play a familiar passage with eyes closed, notice what changes.',
    },
    {
      id: 'listening-005',
      suit: 'listening',
      title: 'Layer separation',
      body: 'In polyphonic passages, isolate each voice mentally while playing.',
    },

    // Time cards
    {
      id: 'time-001',
      suit: 'time',
      title: 'Clap then play',
      body: 'Clap the rhythm first, then play with same precision.',
    },
    {
      id: 'time-002',
      suit: 'time',
      title: 'Elastic time',
      body: 'Stretch and compress time while maintaining pulse integrity.',
    },
    {
      id: 'time-003',
      suit: 'time',
      title: 'Silence as rhythm',
      body: 'Give rests the same attention as notes.',
    },
    {
      id: 'time-004',
      suit: 'time',
      title: 'Extreme slow practice',
      body: 'Play at 25% tempo, maintaining musical intention.',
    },
    {
      id: 'time-005',
      suit: 'time',
      title: 'Rhythmic displacement',
      body: 'Deliberately shift written rhythms forward or back in time.',
    },

    // Expression cards
    {
      id: 'expression-001',
      suit: 'expression',
      title: 'Conversational gestures',
      body: 'Play as if speaking to someone across the room.',
    },
    {
      id: 'expression-002',
      suit: 'expression',
      title: 'Dynamic architecture',
      body: 'Plan the long-term dynamic journey of the phrase.',
    },
    {
      id: 'expression-003',
      suit: 'expression',
      title: 'Echo and response',
      body: 'Create dialogue between different voices or registers.',
    },
    {
      id: 'expression-004',
      suit: 'expression',
      title: 'Morning fog lifting',
      body: 'Shape this phrase like mist slowly rising and dispersing.',
    },
    {
      id: 'expression-005',
      suit: 'expression',
      title: 'Argument between old friends',
      body: 'Play this passage as a heated but affectionate disagreement.',
    },

    // Instrument cards
    {
      id: 'instrument-001',
      suit: 'instrument',
      title: 'Bow speed vs pressure',
      body: 'Hold pitch constant; vary speed and pressure separately.',
    },
    {
      id: 'instrument-002',
      suit: 'instrument',
      title: 'Double-stop resonance',
      body: 'Find pure 3rds/6ths; adjust until beats vanish.',
    },
    {
      id: 'instrument-003',
      suit: 'instrument',
      title: 'Vibrato choices',
      body: 'Play same phrase with no vibrato, narrow vibrato, wide vibrato.',
    },
    {
      id: 'instrument-004',
      suit: 'instrument',
      title: 'Sul ponticello/ordinario',
      body: 'Explore bow positions from bridge to fingerboard.',
    },
    {
      id: 'instrument-005',
      suit: 'instrument',
      title: 'Finger pressure minimum',
      body: 'Use just enough left hand pressure to create clean sound.',
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
    suits: hasCustomCards
      ? [...staticPracticeDeck.suits, 'custom']
      : staticPracticeDeck.suits,
    cards: [
      ...staticPracticeDeck.cards,
      ...customCards,
    ],
  };
}

/**
 * Legacy export for backwards compatibility
 * @deprecated Use getCompleteDeck() instead
 */
export const practiceDeck = staticPracticeDeck;
