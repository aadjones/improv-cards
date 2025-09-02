# Piano Improvisation Cards - React Native App

A React Native mobile app for piano improvisation practice, converted from the original React web app. This app provides creative constraints to inspire and guide your piano improvisation practice sessions.

## Features

### 🎲 Draw Cards Mode

- Draw 1-4 constraint cards from different suits (Form, Time, Pitch, Position)
- Optionally add a mood card for emotional context
- 2x2 grid layout optimized for practice sessions
- Advanced filtering by suits and difficulty levels
- Settings persistence with AsyncStorage

### 📚 Browse Mode

- Explore all available cards organized by suit
- Tap any card to view detailed descriptions
- "Practice This" functionality to start a session with a specific card

### 🎹 Card Types

- **🎭 Mood Cards**: Emotional context (Playful, Somber, Energetic, etc.)
- **🏗️ Form Cards**: Structural constraints (ABA, Loop, Rondo, etc.)
- **⏳ Time Cards**: Rhythmic constraints (Waltz, March, Syncopation, etc.)
- **〰️ Pitch Cards**: Melodic/harmonic constraints (Drone, Alberti, Chorale, etc.)
- **🎹 Position Cards**: Physical/technical constraints (Crossover, Mirror, etc.)

### 📱 Mobile-Optimized Design

- Native React Navigation with tab-based interface
- Touch-optimized UI for phones and tablets
- Responsive design that scales for different screen sizes
- Native styling (no Tailwind dependency)
- Smooth animations and transitions

## Technical Stack

- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for navigation (Bottom Tabs)
- **AsyncStorage** for persistent settings
- **Native styling** optimized for mobile devices

## Project Structure

```
src/
├── components/
│   ├── Card.tsx                 # Reusable card component with touch support
│   └── CardDetailModal.tsx      # Modal for card details
├── screens/
│   ├── DrawScreen.tsx           # Main practice card drawing interface
│   └── BrowseScreen.tsx         # Browse all cards by suit
├── constants/
│   └── cards.ts                 # Card data, types, and constants
└── utils/
    ├── cardUtils.ts             # Card drawing and filtering logic
    ├── responsive.ts            # Responsive design utilities
    └── storage.ts               # AsyncStorage wrapper functions
```

## Key Features for Piano Practice

### Practice Session Workflow

1. **Set Preferences**: Choose number of cards, include/exclude moods, filter by difficulty
2. **Draw Cards**: Get random constraints laid out in an intuitive 2x2 grid
3. **Practice**: Use the mood banner and constraint cards to guide improvisation
4. **Explore**: Browse all cards to understand different techniques and approaches

### Tablet-Optimized Experience

The app is specifically designed to work well on tablets, making it perfect for:

- Placing on a piano music stand
- Easy reading while practicing
- Touch-friendly controls even with hands positioned for playing

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. Clone or download the project
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Running on Different Platforms

- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web** (for testing): `npm run web`

## Configuration

### Card Data

Cards are defined in `src/constants/cards.ts`. Each card includes:

- `id`: Unique identifier
- `title`: Display name
- `suit`: Category (Mood, Form, Time, Pitch, Position)
- `level`: Difficulty (Beginner, Intermediate, Advanced) or null for mood cards
- `description`: Detailed explanation of the constraint

### Responsive Design

The app automatically adapts to different screen sizes:

- **Phone**: 2-column card layout
- **Tablet**: 3-column layout
- **Large Tablet**: 4-column layout

Font sizes and spacing scale accordingly.

## Development

### Adding New Cards

1. Add card data to `CARDS_DATA` array in `src/constants/cards.ts`
2. Ensure proper suit classification and difficulty level
3. Cards automatically appear in both Draw and Browse modes

### Customizing Appearance

- Card colors are defined in the `SUITS` object in `src/constants/cards.ts`
- Responsive breakpoints can be adjusted in `src/utils/responsive.ts`
- Native styling is handled in each component's StyleSheet

### Storage

User preferences (number of cards, included suits/levels, mood preference) are automatically saved to device storage and restored when the app starts.

## Future Enhancements

- Audio examples for each card type
- Video demonstrations of techniques
- Practice session timer and tracking
- Custom card creation
- Export practice session combinations
- Integration with music notation software

## Contributing

When adding new improvisation techniques:

1. Follow the existing card structure
2. Provide clear, actionable descriptions
3. Assign appropriate difficulty levels
4. Test on both phone and tablet layouts

## License

All Rights Reserved. See [LICENSE](LICENSE) file for details.
