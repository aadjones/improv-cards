# Music Practice Cards - Monorepo

A monorepo containing two React Native/Expo apps for musical practice: **Improvisation Cards** and **Practice Cards**. Both apps share core functionality through a common package architecture.

## Apps Overview

### 🎹 Improvisation Cards (`apps/improv`)
Creative constraint cards for piano improvisation practice.

**Features:**
- Draw 1-4 constraint cards from different suits (Form, Time, Pitch, Position)
- Optional mood cards for emotional context
- 2x2 grid layout optimized for practice sessions
- Advanced filtering by suits and difficulty levels
- Browse mode to explore all available cards

### 🎯 Practice Cards (`apps/practice`)
Mindful practice prompts to guide attention across practice dimensions.

**Features:**
- Biased card drawing that promotes neglected practice areas
- 36 practice cards across 6 suits: tone, intonation, rhythm, phrasing, body, listening
- Balance view showing practice distribution over last 14 days
- Minimal, distraction-free interface
- No gamification or guilt - just mindful guidance

## Monorepo Structure

```
├── apps/
│   ├── improv/           # Improvisation Cards app
│   └── practice/         # Practice Cards app
├── packages/
│   └── core/             # Shared types, rotation logic, and storage interface
├── package.json          # Workspace configuration
└── tsconfig.base.json    # Shared TypeScript config
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Apps

**Practice Cards:**
```bash
# From project root
npm run start --workspace=apps/practice

# Or from app directory
cd apps/practice && npm start
```

**Improvisation Cards:**
```bash
# From project root
npm run start --workspace=apps/improv

# Or from app directory
cd apps/improv && npm start
```

### Platform-Specific Commands

```bash
# Web (for testing)
npm run web --workspace=apps/practice
npm run web --workspace=apps/improv

# iOS
npm run ios --workspace=apps/practice
npm run ios --workspace=apps/improv

# Android
npm run android --workspace=apps/practice
npm run android --workspace=apps/improv

# TypeScript checking
npm run typecheck --workspace=apps/practice
npm run typecheck --workspace=apps/improv
```

## App Details

### Practice Cards App

**Philosophy:** Help advanced musicians maintain attention balance across practice dimensions without gamification or guilt.

**Core Mechanism:** The app tracks which practice suits you've drawn recently and biases future draws toward neglected areas (last 14 days).

**Practice Suits:**
- **Tone**: Sound quality, attack, resonance, color palette
- **Intonation**: Pitch accuracy, harmonic context, temperament
- **Rhythm**: Timing, subdivision, polyrhythm, metric displacement
- **Phrasing**: Musical breathing, conversation, dynamic architecture
- **Body**: Physical awareness, posture, tension release, movement
- **Listening**: Recording analysis, acoustic awareness, spatial imaging

**Example Cards:**
- "Begin from silence" (tone)
- "Double-stop resonance" (intonation)
- "Subdivide internally" (rhythm)
- "Breath-shaped line" (phrasing)
- "Unclench protocol" (body)
- "Record & mirror" (listening)

### Improvisation Cards App

**Philosophy:** Creative constraints to inspire piano improvisation practice.

**Card Types:**
- **🎭 Mood**: Emotional context (Playful, Somber, Energetic)
- **🏗️ Form**: Structural constraints (ABA, Loop, Rondo)
- **⏳ Time**: Rhythmic constraints (Waltz, March, Syncopation)
- **〰️ Pitch**: Melodic/harmonic constraints (Drone, Alberti, Chorale)
- **🎹 Position**: Physical/technical constraints (Crossover, Mirror)

## Shared Core Package

The `packages/core` package provides:

**Types:**
```typescript
type Card = {
  id: string;
  suit: string;
  title: string;
  body?: string;
  tags?: string[];
};

type DrawEvent = {
  cardId: string;
  suit: string;
  timestamp: number;
};
```

**Rotation Logic:**
- `drawBiasedCard()`: Draws cards with bias toward neglected suits
- `suitDistribution()`: Calculates practice distribution over time window
- Configurable bias settings (window days, cooldown periods)

**Storage Interface:**
```typescript
interface PracticeStore {
  getHistory(): Promise<DrawEvent[]>;
  append(event: DrawEvent): Promise<void>;
  clear(): Promise<void>;
}
```

## Development

### Adding Cards to Practice App

Edit `apps/practice/src/deck.ts`:

```typescript
export const practiceDeck: Deck = {
  suits: ["tone", "intonation", "rhythm", "phrasing", "body", "listening"],
  cards: [
    {
      id: "tone-007",
      suit: "tone",
      title: "Your prompt title",
      body: "Detailed guidance for the practice focus."
    }
    // ...
  ]
};
```

### Testing

```bash
# Run tests for core package
npm test --workspace=packages/core

# Run tests for specific app
npm test --workspace=apps/practice
npm test --workspace=apps/improv
```

### TypeScript

Both apps extend the shared `tsconfig.base.json` which provides path mapping to the core package:

```json
{
  "paths": {
    "@core/*": ["packages/core/src/*"]
  }
}
```

## Bundle Configuration

**Practice App:**
- iOS: `com.yourco.practice`
- Android: `com.yourco.practice`

**Improvisation App:**
- iOS: `com.anonymous.Unscored`
- Android: `com.anonymous.Unscored`

## Philosophy & Design Principles

### Practice App
- **Simple > Clever**: Minimal UI focused on the practice prompt
- **No Guilt**: Balance view is optional and informational only
- **Mindful Attention**: Prompts guide focus without prescribing techniques
- **Advanced Users**: Assumes musical sophistication and self-direction

### Improvisation App
- **Creative Constraints**: Boundaries that spark rather than limit creativity
- **Session-Oriented**: Designed for practice sessions, not daily habits
- **Exploration**: Browse mode encourages discovery of new approaches

## License

All Rights Reserved. See [LICENSE](LICENSE) file for details.