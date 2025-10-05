# Rephrase App - Implementation Plan

## Overview
Merging two separate apps (Practice Cards and Improvisation Cards) into a unified "Rephrase" app with two distinct modes.

## Design Decisions

### Architecture
- **3 tabs**: Practice (home) | Library | Custom
- **2 modes** in Practice tab: General Practice | Improvisation
- **Single card draws** for both modes (simplified from original multi-card improv)
- **No settings persistence** - resets to defaults each session
- **Phone-first design** - minimal, fast interactions

### Data Model Changes
- Renamed practice "time" suit → "tempo"
- Renamed improv "time" suit → "rhythm"
- Unified Card type with `type: 'practice' | 'improv'` field
- Unified `description` field (was `body` in practice, `description` in improv)

### Features Cut
- ❌ Balance view (no visualization of practice distribution)
- ❌ Difficulty levels in UI (metadata kept but not exposed)
- ❌ Multi-card draws for improv (simplified to 1 card)
- ❌ Separate Practice Session screen
- ❌ Settings persistence

### Drawing Logic
- **Practice mode**: Biased rotation (neglected suits weighted higher)
- **Improv mode**: Random draw (pure serendipity)
- **Mood toggle** in improv mode (default: ON)

---

## Implementation Phases

### ✅ Phase 1: Foundation (COMPLETED)
- [x] Create `apps/rephrase/` directory structure
- [x] Update core types in `packages/core/src/types.ts`
- [x] Create unified card dataset (`src/data/cards.ts`)
- [x] Set up `package.json` and `app.json`
- [x] Create `tsconfig.json` and `index.ts`

### Phase 2: Components
- [ ] Card component (merge best from both apps)
- [ ] CardDetailModal component
- [ ] ModeSwitch component (pill toggle)

### Phase 3: Screens
- [ ] PracticeScreen (home/default with mode switching)
  - General Practice mode: biased draw, single card
  - Improvisation mode: random draw, mood toggle
- [ ] LibraryScreen (two sections: Practice Prompts | Improv Cards)
- [ ] CustomScreen (create/edit/delete custom prompts)

### Phase 4: Navigation & App Structure
- [ ] App.tsx with tab navigation
- [ ] Wire up all screens
- [ ] Global CardDetailModal state

### Phase 5: Storage Integration
- [ ] Copy practiceStore from practice app
- [ ] Copy/extend customPromptsStore for both types
- [ ] Integrate with drawing logic

### Phase 6: Polish & Testing
- [ ] Visual design pass (colorful accents, minimal layouts)
- [ ] Test biased rotation
- [ ] Test random draw + mood toggle
- [ ] Test custom prompts creation/deletion
- [ ] Test "Practice This" flow from library

### Phase 7: Deployment
- [ ] Copy assets (icons, splash screen)
- [ ] Set up EAS project
- [ ] Generate QR code
- [ ] Test on device

---

## File Structure

```
apps/rephrase/
├── App.tsx
├── app.json
├── package.json
├── index.ts
├── tsconfig.json
├── assets/
│   ├── icon.png
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Card.tsx
│   │   ├── CardDetailModal.tsx
│   │   └── ModeSwitch.tsx
│   ├── data/
│   │   └── cards.ts (✅ DONE)
│   ├── screens/
│   │   ├── PracticeScreen.tsx
│   │   ├── LibraryScreen.tsx
│   │   └── CustomScreen.tsx
│   ├── store/
│   │   ├── practiceStore.ts
│   │   └── customPromptsStore.ts
│   └── utils/
│       └── drawing.ts
```

---

## UI/UX Specs

### PracticeScreen
```
┌─────────────────────────────────┐
│  [General Practice] [Improv]    │  ← Mode switcher (pill)
│                                 │
│  ☑ Include mood (improv only)   │  ← Toggle (only in improv mode)
│                                 │
│  [ Draw Card / Draw Prompt ]    │  ← Big button
│                                 │
│  [Card displays inline]         │  ← Single card, suit-colored
│                                 │
│  [ Draw Again ]                 │  ← After draw
└─────────────────────────────────┘
```

### LibraryScreen
- Two sections with headers
- Grouped by suit within each section
- Tap card → opens detail modal
- Modal has "Practice This" button

### CustomScreen
- "Add Custom Prompt" button
- Form: Title, Description, Type (practice/improv), Suit (optional)
- List of customs (grouped by type)
- Swipe to delete, tap to edit

---

## Color Palette

### Practice Suits (earthy, focused)
- Physical: `#8B5A3C` (brown)
- Listening: `#4C1D95` (purple)
- Tempo: `#2C5530` (green)
- Expression: `#1A365D` (blue)
- Instrument: `#744210` (orange-brown)

### Improv Suits (vibrant, playful)
- Mood: `#BE185D` (pink)
- Form: `#1D4ED8` (blue)
- Rhythm: `#15803D` (green)
- Pitch: `#7C2D12` (brown-red)
- Position: `#EA580C` (orange)

---

## Technical Notes

### Dependencies
- React Native + Expo ~54
- React Navigation v7 (bottom tabs)
- AsyncStorage for history/customs
- Uses shared `@music-cards/core` package

### Drawing Algorithms
- Practice: `drawBiasedCard()` from `@core/rotation`
- Improv: Simple random selection from filtered deck
- Mood cards: separate pool, only drawn if toggle is ON

### Storage
- Practice history: tracks draws for biased rotation (14-day window)
- Custom prompts: persisted with type tagging
- No settings persistence (always reset to defaults)

---

## Migration Notes

### From Practice App
- ✅ Core types extended
- ✅ Card dataset migrated (renamed "time" → "tempo")
- ⏳ `localStore.ts` to be copied to `practiceStore.ts`
- ⏳ `customPromptsStore.ts` to be extended for type tagging

### From Improv App
- ✅ Card dataset migrated (renamed "time" → "rhythm")
- ⏳ Card component styling to be adapted
- ⏳ CardDetailModal to be reused
- ❌ Settings UI (deleted - no persistence)
- ❌ DrawScreen complexity (simplified)

---

## Testing Checklist

### Functionality
- [ ] Biased draw favors neglected suits in practice mode
- [ ] Random draw works in improv mode
- [ ] Mood toggle includes/excludes mood cards
- [ ] Mode switching preserves UI state
- [ ] Custom prompt creation/editing/deletion
- [ ] "Practice This" navigates correctly
- [ ] Library browsing shows all cards by type

### Edge Cases
- [ ] First-time user (no history)
- [ ] Empty custom prompts
- [ ] All suits equally balanced
- [ ] Switching modes rapidly

### UI/UX
- [ ] Colors are vibrant but readable
- [ ] Touch targets are large enough
- [ ] Card displays inline without scrolling issues
- [ ] Transitions are smooth

---

## Future Enhancements (Out of Scope)

- Dark mode
- Tablet optimization
- Practice history visualization (balance view)
- Multi-card draws for improv
- Settings persistence
- Additional practice modes (e.g., technique/scales tab)
