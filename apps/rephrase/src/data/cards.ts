import { Card } from '@core/types';

/**
 * Unified card dataset for Rephrase app
 * - Practice cards (type: 'practice') renamed "time" → "tempo"
 * - Improv cards (type: 'improv') renamed "time" → "rhythm"
 */

// ============================================
// PRACTICE CARDS
// ============================================

export const PRACTICE_CARDS: Card[] = [
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

  // Tempo cards (renamed from "time")
  {
    id: 'tempo-001',
    suit: 'tempo',
    title: 'Clap then play',
    description: 'Clap the rhythm first, then play with same precision.',
    type: 'practice',
  },
  {
    id: 'tempo-002',
    suit: 'tempo',
    title: 'Elastic time',
    description: 'Stretch and compress time while maintaining pulse integrity.',
    type: 'practice',
  },
  {
    id: 'tempo-003',
    suit: 'tempo',
    title: 'Silence as rhythm',
    description: 'Give rests the same attention as notes.',
    type: 'practice',
  },
  {
    id: 'tempo-004',
    suit: 'tempo',
    title: 'Extreme slow practice',
    description: 'Play at 25% tempo, maintaining musical intention.',
    type: 'practice',
  },
  {
    id: 'tempo-005',
    suit: 'tempo',
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

  // Instrument cards (piano-specific)
  {
    id: 'instrument-001',
    suit: 'instrument',
    title: 'Pedaling precision',
    description: 'Practice half-pedal, flutter pedal, and pedal changes on beat vs off beat.',
    type: 'practice',
  },
  {
    id: 'instrument-002',
    suit: 'instrument',
    title: 'Hand independence',
    description: 'Play polyrhythmic patterns where each hand has different subdivision.',
    type: 'practice',
  },
  {
    id: 'instrument-003',
    suit: 'instrument',
    title: 'Voicing balance',
    description: 'In chords, bring out different voices - top, bottom, inner notes.',
    type: 'practice',
  },
  {
    id: 'instrument-004',
    suit: 'instrument',
    title: 'Touch variety',
    description: 'Play same passage with different attacks: staccato, legato, portato.',
    type: 'practice',
  },
  {
    id: 'instrument-005',
    suit: 'instrument',
    title: 'Chord voicing exploration',
    description: 'Rearrange chord notes across registers and inversions.',
    type: 'practice',
  },
];

// ============================================
// IMPROVISATION CARDS
// ============================================

export const IMPROV_CARDS: Card[] = [
  // Mood Cards
  {
    id: 'playful',
    title: 'Playful',
    suit: 'mood',
    description: 'Improvise with a light, bouncy character, like gentle teasing.',
    type: 'improv',
  },
  {
    id: 'somber',
    title: 'Somber',
    suit: 'mood',
    description: 'Create a melancholy, serious atmosphere.',
    type: 'improv',
  },
  {
    id: 'energetic',
    title: 'Energetic',
    suit: 'mood',
    description: 'Play with high energy and excitement.',
    type: 'improv',
  },
  {
    id: 'introspective',
    title: 'Introspective',
    suit: 'mood',
    description: 'Turn inward with thoughtful, contemplative playing.',
    type: 'improv',
  },
  {
    id: 'aggressive',
    title: 'Aggressive',
    suit: 'mood',
    description: 'Use forceful, intense musical gestures.',
    type: 'improv',
  },
  {
    id: 'hopeful',
    title: 'Hopeful',
    suit: 'mood',
    description: 'Express optimism and forward-looking emotion.',
    type: 'improv',
  },
  {
    id: 'mournful',
    title: 'Mournful',
    suit: 'mood',
    description: 'Express grief or sadness through your playing.',
    type: 'improv',
  },
  {
    id: 'personal',
    title: 'Personal',
    suit: 'mood',
    description: 'Express something deeply personal through your playing.',
    type: 'improv',
  },

  // Form Cards
  {
    id: 'aba',
    title: 'ABA',
    suit: 'form',
    description: 'Create a three-part form: statement, contrasting section, return to opening.',
    type: 'improv',
  },
  {
    id: 'loop',
    title: 'Loop',
    suit: 'form',
    description: 'Repeat a short musical phrase with subtle variations.',
    type: 'improv',
  },
  {
    id: 'rondo',
    title: 'Rondo',
    suit: 'form',
    description: 'Return to a main theme between contrasting episodes (ABACA).',
    type: 'improv',
  },
  {
    id: 'question-answer',
    title: 'Question/Answer',
    suit: 'form',
    description: 'Create a phrase with a question and answer character.',
    type: 'improv',
  },
  {
    id: 'theme-variations',
    title: 'Theme + Variations',
    suit: 'form',
    description: 'State a simple melody, then create variations on it.',
    type: 'improv',
  },
  {
    id: 'binary',
    title: 'Binary',
    suit: 'form',
    description: 'Create a two-part form with each section repeated.',
    type: 'improv',
  },

  // Rhythm Cards (renamed from "time")
  {
    id: 'waltz',
    title: 'Waltz',
    suit: 'rhythm',
    description: 'Play in 3/4 time with a characteristic waltz feel.',
    type: 'improv',
  },
  {
    id: 'march',
    title: 'March',
    suit: 'rhythm',
    description: 'Use a steady, processional rhythm like a military march.',
    type: 'improv',
  },
  {
    id: 'gigue',
    title: 'Gigue',
    suit: 'rhythm',
    description: 'Play a lively dance in compound time (6/8 or 12/8).',
    type: 'improv',
  },
  {
    id: 'silence',
    title: 'Silence',
    suit: 'rhythm',
    description: 'Use pauses and rests as an important part of your improvisation.',
    type: 'improv',
  },
  {
    id: 'syncopation',
    title: 'Syncopation',
    suit: 'rhythm',
    description: 'Emphasize off-beats and create rhythmic surprise.',
    type: 'improv',
  },
  {
    id: 'accelerando-ritardando',
    title: 'Accelerando/Ritardando',
    suit: 'rhythm',
    description: 'Gradually speed up or slow down during your improvisation.',
    type: 'improv',
  },
  {
    id: 'tuplets',
    title: 'Tuplets',
    suit: 'rhythm',
    description: 'Use irregular groupings of notes (triplets, quintuplets, etc.).',
    type: 'improv',
  },

  // Pitch Cards
  {
    id: 'drone',
    title: 'Drone',
    suit: 'pitch',
    description: 'Keep a bass note constant and shift the melody on top of it',
    type: 'improv',
  },
  {
    id: 'alberti',
    title: 'Alberti',
    suit: 'pitch',
    description: 'Improvise with a broken arpeggio pattern in the left hand',
    type: 'improv',
  },
  {
    id: 'one-note',
    title: 'One Note',
    suit: 'pitch',
    description: 'Build an entire improvisation around a single repeated pitch.',
    type: 'improv',
  },
  {
    id: 'chorale',
    title: 'Chorale',
    suit: 'pitch',
    description: 'Play in four-part harmony like a hymn or Bach chorale.',
    type: 'improv',
  },
  {
    id: 'stacked-intervals',
    title: 'Stacked intervals',
    suit: 'pitch',
    description: 'Build chords from consistent intervals (fourths, fifths, seconds).',
    type: 'improv',
  },
  {
    id: 'inside-outside',
    title: 'Inside/Outside',
    suit: 'pitch',
    description:
      'Improvise a melody that goes back and forth between inside and outside the harmony',
    type: 'improv',
  },
  {
    id: 'ostinato',
    title: 'Ostinato',
    suit: 'pitch',
    description: 'Repeat a short melodic or rhythmic pattern throughout.',
    type: 'improv',
  },
  {
    id: 'clusters',
    title: 'Clusters',
    suit: 'pitch',
    description: 'Use close intervals played together (tone clusters).',
    type: 'improv',
  },

  // Position Cards
  {
    id: 'extreme-registers',
    title: 'Extreme registers',
    suit: 'position',
    description: 'Use the very high and very low notes of the piano.',
    type: 'improv',
  },
  {
    id: 'thumb-pinkie',
    title: 'Thumb and pinkie',
    suit: 'position',
    description: 'Use only your thumb and pinkie fingers.',
    type: 'improv',
  },
  {
    id: 'crossover',
    title: 'Crossover',
    suit: 'position',
    description: 'Cross your hands over each other while playing.',
    type: 'improv',
  },
  {
    id: 'all-black',
    title: 'All Black',
    suit: 'position',
    description: 'Use only the black keys of the piano.',
    type: 'improv',
  },
  {
    id: 'sequential',
    title: 'Sequential',
    suit: 'position',
    description: 'Move patterns up or down the keyboard in sequence.',
    type: 'improv',
  },
  {
    id: 'two-part',
    title: '2-part',
    suit: 'position',
    description: 'Play only two independent melodic lines.',
    type: 'improv',
  },
  {
    id: 'mirror',
    title: 'Mirror',
    suit: 'position',
    description: 'Create mirrored patterns between your hands.',
    type: 'improv',
  },
];

// ============================================
// UNIFIED DATASET
// ============================================

export const ALL_CARDS: Card[] = [...PRACTICE_CARDS, ...IMPROV_CARDS];

export const PRACTICE_SUITS = ['physical', 'listening', 'tempo', 'expression', 'instrument'];
export const IMPROV_SUITS = ['mood', 'form', 'rhythm', 'pitch', 'position'];

// Suit color configuration
export interface SuitColors {
  background: string;
  border: string;
  text: string;
}

export const SUIT_COLORS: Record<string, SuitColors> = {
  // Practice suits - earthy, focused tones
  physical: {
    background: '#FEF3C7',
    border: '#8B5A3C',
    text: '#78350F',
  },
  listening: {
    background: '#E9D5FF',
    border: '#4C1D95',
    text: '#581C87',
  },
  tempo: {
    background: '#D1FAE5',
    border: '#2C5530',
    text: '#065F46',
  },
  expression: {
    background: '#DBEAFE',
    border: '#1A365D',
    text: '#1E40AF',
  },
  instrument: {
    background: '#FED7AA',
    border: '#744210',
    text: '#92400E',
  },

  // Improv suits - vibrant, playful tones
  mood: {
    background: '#FCE7F3',
    border: '#BE185D',
    text: '#9F1239',
  },
  form: {
    background: '#DBEAFE',
    border: '#1D4ED8',
    text: '#1E40AF',
  },
  rhythm: {
    background: '#DCFCE7',
    border: '#15803D',
    text: '#166534',
  },
  pitch: {
    background: '#E9D5FF',
    border: '#7C2D12',
    text: '#7C2D12',
  },
  position: {
    background: '#FED7AA',
    border: '#EA580C',
    text: '#C2410C',
  },

  // Custom prompts
  custom: {
    background: '#F3F4F6',
    border: '#7C2D12',
    text: '#78350F',
  },
};

// Helper functions
export function getCardsBySuit(suit: string): Card[] {
  return ALL_CARDS.filter(card => card.suit === suit);
}

export function getCardsByType(type: 'practice' | 'improv'): Card[] {
  return ALL_CARDS.filter(card => card.type === type);
}

export function getPracticeDeck(): Card[] {
  return PRACTICE_CARDS;
}

export function getImprovDeck(): Card[] {
  return IMPROV_CARDS;
}
