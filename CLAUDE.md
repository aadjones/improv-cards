# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native/Expo app for piano improvisation practice. Uses creative constraint cards (mood, form, time, pitch, position) to guide practice sessions. Features a card drawing interface and browsing mode with detailed card information.

## Development Commands

### Essential Commands
- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator  
- `npm run web` - Run in web browser (testing only)

### Installation
- `npm install` - Install dependencies

## Architecture

### Core Structure
- **App.tsx** - Main app with React Navigation tab structure, shared state management for card modals
- **src/screens/** - DrawScreen (main practice interface) and BrowseScreen (card catalog)
- **src/components/** - Reusable Card component and CardDetailModal
- **src/constants/cards.ts** - Complete card dataset with suit definitions and color schemes
- **src/utils/** - Card drawing logic, storage persistence, responsive design utilities

### Key Components
- **DrawScreen** - Settings-driven card drawing with 2x2 grid layout, advanced filtering, persistent settings via AsyncStorage
- **BrowseScreen** - Suit-organized card browsing with responsive column layouts
- **Card Component** - Touch-optimized cards with suit-based theming
- **CardDetailModal** - Shared modal for card details with "Practice This" functionality

### Data Architecture
- **CARDS_DATA** - Main card dataset (105 cards across 5 suits)
- **SUITS** - Color theming and styling for each card suit
- **Settings** - User preferences for card drawing (count, suits, levels, mood inclusion)
- **AsyncStorage** - Persistent storage for user settings

### Technology Stack
- React Native with Expo (cross-platform)
- TypeScript for type safety
- React Navigation (bottom tabs)
- AsyncStorage for settings persistence
- Native styling (no external CSS frameworks)

## Development Guidelines

### Adding New Cards
1. Add to `CARDS_DATA` array in `src/constants/cards.ts`
2. Include: id, title, suit, level (or null for mood), description
3. Follow existing difficulty level assignments (Beginner/Intermediate/Advanced)
4. Cards automatically appear in both Draw and Browse modes

### Responsive Design
- Uses `src/utils/responsive.ts` for screen size breakpoints
- Phone: 2-column layouts, Tablet: 3-4 column layouts
- Font scaling based on screen dimensions
- Touch-optimized sizing for piano practice context

### State Management
- React state for UI (no external state management)
- AsyncStorage for persistence
- Shared modal state lifted to App.tsx level
- Settings changes auto-save to storage

### Card Drawing Logic
- Configurable number of technical cards (1-4)
- Optional mood card inclusion
- Filtering by suits and difficulty levels
- Ensures no duplicate suits in single draw
- Error handling for insufficient cards matching filters