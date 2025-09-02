# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native/Expo app for piano improvisation practice. Uses creative constraint cards (mood, form, time, pitch, position) to guide practice sessions. Features a card drawing interface and browsing mode with detailed card information.

## Core Development Principles

- **Simple > Clever:** Prefer simple, readable solutions even if they are less "elegant."
- **Delete > Add:** Aggressively seek opportunities to remove code and dependencies.
- **Working > Perfect:** Focus on delivering a working solution for the immediate problem.
- **Honest & Direct:** State limitations and push back on bad ideas clearly and without jargon.
- **Question Assumptions:** Don't blindly accept that a new feature, dependency, or "best practice" is necessary.

## Debugging Mode: Think Like a Detective

When something isn't working, **STOP FLAILING** and become systematic:

### 1. State Your Theory

Form a specific, testable hypothesis about the root cause:

- "I think X is happening because of Y"
- "The symptom suggests Z might be broken"

### 2. Design a Minimal Test

Create the simplest possible test to prove/disprove your theory:

- Isolate one variable at a time
- Remove all unnecessary complexity
- Make the test outcome binary (works/doesn't work)

### 3. Collect Evidence

Look at actual data, not assumptions:

- React Native Debugger/Flipper
- Metro bundler logs and error messages
- Expo DevTools and console output
- File contents and configurations

### 4. Test Systematically

Run tests in logical order:

- Start with the most likely cause
- Test one thing at a time
- Document what you tried and the results

### 5. Form New Theory

Based on evidence, either:

- Confirm your theory and fix the root cause
- Reject your theory and form a new one
- Discover the issue was elsewhere entirely

## Development Commands

### Essential Commands

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser (testing only)

### Installation

- `npm install` - Install dependencies

### Testing

- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format:check` - Check Prettier formatting
- `npm run format` - Auto-fix Prettier formatting
- `npm run typecheck` - Run TypeScript type checking

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

### Testing Framework

- **Jest** with **jest-expo** preset for React Native/Expo compatibility
- **React Native Testing Library** for component testing
- Mocked AsyncStorage and React Navigation
- Test files: `tests/**/*.test.ts` (mirrors src structure) or `**/*.test.ts` (co-located)
- Focus on utility functions and core logic (following user's testing philosophy)

### Code Quality & CI/CD

- **Husky** pre-commit hooks run type checking, linting, and formatting
- **GitHub Actions** CI runs on push/PR with Node.js 18.x and 20.x
- Pipeline includes: TypeScript checking, ESLint, Prettier, Jest tests, and Expo compatibility checks
- **lint-staged** processes only staged files for performance
