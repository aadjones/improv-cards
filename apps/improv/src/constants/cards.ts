export interface Card {
  id: string;
  title: string;
  suit: string;
  level: string | null;
  description: string;
}

export interface SuitInfo {
  color: string;
  darkColor: string;
  lightColor: string;
  textColor: string;
}

export interface Settings {
  technicalCount: number;
  includeMood: boolean;
  allowedSuits: string[];
  allowedLevels: string[];
}

// Complete card dataset from the original web app
export const CARDS_DATA: Card[] = [
  // Mood Cards (no difficulty level)
  {
    id: 'playful',
    title: 'Playful',
    suit: '🎭 Mood',
    level: null,
    description: 'Improvise with a light, bouncy character, like gentle teasing.',
  },
  {
    id: 'somber',
    title: 'Somber',
    suit: '🎭 Mood',
    level: null,
    description: 'Create a melancholy, serious atmosphere.',
  },
  {
    id: 'energetic',
    title: 'Energetic',
    suit: '🎭 Mood',
    level: null,
    description: 'Play with high energy and excitement.',
  },
  {
    id: 'introspective',
    title: 'Introspective',
    suit: '🎭 Mood',
    level: null,
    description: 'Turn inward with thoughtful, contemplative playing.',
  },
  {
    id: 'aggressive',
    title: 'Aggressive',
    suit: '🎭 Mood',
    level: null,
    description: 'Use forceful, intense musical gestures.',
  },
  {
    id: 'hopeful',
    title: 'Hopeful',
    suit: '🎭 Mood',
    level: null,
    description: 'Express optimism and forward-looking emotion.',
  },
  {
    id: 'mournful',
    title: 'Mournful',
    suit: '🎭 Mood',
    level: null,
    description: 'Express grief or sadness through your playing.',
  },
  {
    id: 'personal',
    title: 'Personal',
    suit: '🎭 Mood',
    level: null,
    description: 'Express something deeply personal through your playing.',
  },

  // Form Cards
  {
    id: 'aba',
    title: 'ABA',
    suit: '🏗️ Form',
    level: 'Intermediate',
    description: 'Create a three-part form: statement, contrasting section, return to opening.',
  },
  {
    id: 'loop',
    title: 'Loop',
    suit: '🏗️ Form',
    level: 'Beginner',
    description: 'Repeat a short musical phrase with subtle variations.',
  },
  {
    id: 'rondo',
    title: 'Rondo',
    suit: '🏗️ Form',
    level: 'Advanced',
    description: 'Return to a main theme between contrasting episodes (ABACA).',
  },
  {
    id: 'question-answer',
    title: 'Question/Answer',
    suit: '🏗️ Form',
    level: 'Beginner',
    description: 'Create a phrase with a question and answer character.',
  },
  {
    id: 'theme-variations',
    title: 'Theme + Variations',
    suit: '🏗️ Form',
    level: 'Advanced',
    description: 'State a simple melody, then create variations on it.',
  },
  {
    id: 'binary',
    title: 'Binary',
    suit: '🏗️ Form',
    level: 'Intermediate',
    description: 'Create a two-part form with each section repeated.',
  },

  // Time Cards
  {
    id: 'waltz',
    title: 'Waltz',
    suit: '⏳ Time',
    level: 'Intermediate',
    description: 'Play in 3/4 time with a characteristic waltz feel.',
  },
  {
    id: 'march',
    title: 'March',
    suit: '⏳ Time',
    level: 'Beginner',
    description: 'Use a steady, processional rhythm like a military march.',
  },
  {
    id: 'gigue',
    title: 'Gigue',
    suit: '⏳ Time',
    level: 'Intermediate',
    description: 'Play a lively dance in compound time (6/8 or 12/8).',
  },
  {
    id: 'silence',
    title: 'Silence',
    suit: '⏳ Time',
    level: 'Beginner',
    description: 'Use pauses and rests as an important part of your improvisation.',
  },
  {
    id: 'syncopation',
    title: 'Syncopation',
    suit: '⏳ Time',
    level: 'Intermediate',
    description: 'Emphasize off-beats and create rhythmic surprise.',
  },
  {
    id: 'accelerando-ritardando',
    title: 'Accelerando/Ritardando',
    suit: '⏳ Time',
    level: 'Beginner',
    description: 'Gradually speed up or slow down during your improvisation.',
  },
  {
    id: 'tuplets',
    title: 'Tuplets',
    suit: '⏳ Time',
    level: 'Intermediate',
    description: 'Use irregular groupings of notes (triplets, quintuplets, etc.).',
  },

  // Pitch Cards
  {
    id: 'drone',
    title: 'Drone',
    suit: '〰️ Pitch',
    level: 'Beginner',
    description: 'Keep a bass note constant and shift the melody on top of it',
  },
  {
    id: 'alberti',
    title: 'Alberti',
    suit: '〰️ Pitch',
    level: 'Intermediate',
    description: 'Improvise with a broken arpeggio pattern in the left hand',
  },
  {
    id: 'one-note',
    title: 'One Note',
    suit: '〰️ Pitch',
    level: 'Advanced',
    description: 'Build an entire improvisation around a single repeated pitch.',
  },
  {
    id: 'chorale',
    title: 'Chorale',
    suit: '〰️ Pitch',
    level: 'Intermediate',
    description: 'Play in four-part harmony like a hymn or Bach chorale.',
  },
  {
    id: 'stacked-intervals',
    title: 'Stacked intervals',
    suit: '〰️ Pitch',
    level: 'Intermediate',
    description: 'Build chords from consistent intervals (fourths, fifths, seconds).',
  },
  {
    id: 'inside-outside',
    title: 'Inside/Outside',
    suit: '〰️ Pitch',
    level: 'Intermediate',
    description:
      'Improvise a melody that goes back and forth between inside and outside the harmony',
  },
  {
    id: 'ostinato',
    title: 'Ostinato',
    suit: '〰️ Pitch',
    level: 'Intermediate',
    description: 'Repeat a short melodic or rhythmic pattern throughout.',
  },
  {
    id: 'clusters',
    title: 'Clusters',
    suit: '〰️ Pitch',
    level: 'Beginner',
    description: 'Use close intervals played together (tone clusters).',
  },

  // Position Cards
  {
    id: 'extreme-registers',
    title: 'Extreme registers',
    suit: '🎹 Position',
    level: 'Beginner',
    description: 'Use the very high and very low notes of the piano.',
  },
  {
    id: 'thumb-pinkie',
    title: 'Thumb and pinkie',
    suit: '🎹 Position',
    level: 'Intermediate',
    description: 'Use only your thumb and pinkie fingers.',
  },
  {
    id: 'crossover',
    title: 'Crossover',
    suit: '🎹 Position',
    level: 'Advanced',
    description: 'Cross your hands over each other while playing.',
  },
  {
    id: 'all-black',
    title: 'All Black',
    suit: '🎹 Position',
    level: 'Beginner',
    description: 'Use only the black keys of the piano.',
  },
  {
    id: 'sequential',
    title: 'Sequential',
    suit: '🎹 Position',
    level: 'Intermediate',
    description: 'Move patterns up or down the keyboard in sequence.',
  },
  {
    id: 'two-part',
    title: '2-part',
    suit: '🎹 Position',
    level: 'Beginner',
    description: 'Play only two independent melodic lines.',
  },
  {
    id: 'mirror',
    title: 'Mirror',
    suit: '🎹 Position',
    level: 'Intermediate',
    description: 'Create mirrored patterns between your hands.',
  },
];

export const SUITS: Record<string, SuitInfo> = {
  '🎭 Mood': {
    color: '#fce7f3',
    darkColor: '#be185d',
    lightColor: '#fce7f3',
    textColor: '#9f1239',
  },
  '🏗️ Form': {
    color: '#dbeafe',
    darkColor: '#1d4ed8',
    lightColor: '#dbeafe',
    textColor: '#1e40af',
  },
  '⏳ Time': {
    color: '#dcfce7',
    darkColor: '#15803d',
    lightColor: '#dcfce7',
    textColor: '#166534',
  },
  '〰️ Pitch': {
    color: '#e9d5ff',
    darkColor: '#7c2d12',
    lightColor: '#e9d5ff',
    textColor: '#7c2d12',
  },
  '🎹 Position': {
    color: '#fed7aa',
    darkColor: '#ea580c',
    lightColor: '#fed7aa',
    textColor: '#c2410c',
  },
};

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const TECHNICAL_SUITS = ['🏗️ Form', '⏳ Time', '〰️ Pitch', '🎹 Position'];
export const MOOD_SUIT = '🎭 Mood';

export const DEFAULT_SETTINGS: Settings = {
  technicalCount: 1,
  includeMood: true,
  allowedSuits: TECHNICAL_SUITS,
  allowedLevels: LEVELS,
};
