# Screenshot Guide for Rephrase

## Quick Reference: What You Need

### iOS (Required)
- **5-10 screenshots** at 6.7" size (1290 x 2796)
- Portrait orientation only

### Android (Required)
- **Minimum 2 screenshots** (1080 x 1920 recommended)
- Portrait orientation only
- **Feature graphic:** 1024 x 500px (banner for Play Store)

---

## Taking Screenshots

### Option 1: iOS Simulator (Easiest)
```bash
cd /Users/adj/Documents/Code/app-development/PianoImprovCards/apps/rephrase

# Start the app
npm start

# Press 'i' to open iOS simulator
# Choose iPhone 15 Pro Max (6.7")

# Take screenshots: Cmd + S (saves to Desktop)
```

### Option 2: Real Device (Best quality)
1. Build on your iPhone: `eas build --profile preview --platform ios`
2. Install via TestFlight or direct install
3. Take screenshots: Volume Up + Side Button
4. AirDrop to Mac

### Option 3: Android
```bash
# Start Android emulator
npm start
# Press 'a'

# Take screenshot in emulator toolbar
```

---

## Suggested Screenshot Order

### Screenshot 1: Practice Mode (Empty State)
**Show:**
- "General Practice" mode selected
- "Draw Prompt" button centered
- Subtitle visible
- Clean, welcoming first impression

### Screenshot 2: Practice Card Drawn
**Show:**
- A compelling practice card (e.g., "Conversational gestures" or "Record & mirror")
- Full card visible with description
- Looks actionable and valuable

### Screenshot 3: Mode Switch
**Show:**
- Both mode buttons visible
- "Improvisation" mode selected
- Shows the app has two distinct uses

### Screenshot 4: Improvisation - Cards Drawn
**Show:**
- Mood banner at top (e.g., "Playful")
- Technical card below (e.g., "All Black" or "Waltz")
- Shows the creative constraint concept

### Screenshot 5: Library View
**Show:**
- Library tab active
- Scrolled to show suit organization (e.g., "PRACTICE PROMPTS" → "Physical", "Listening")
- Shows depth of content (73 cards)
- "Request a Card" button visible

### Screenshot 6 (Optional): Individual Refresh
**Show:**
- Improv mode with both mood and technical card
- Highlight the refresh buttons (↻)
- Shows fine-grained control

---

## Tips for Great Screenshots

### Simulator Settings (Make it Look Real)
Before taking screenshots, in simulator:
1. **Time:** Set to 9:41 AM (Apple's standard)
   - Hardware → Trigger → Time
2. **Battery:** Make sure it's full or charging
3. **Carrier:** Should show "Carrier" or WiFi
4. **Clean state:** Clear drawn cards if needed (switch modes)

### Content Selection
- Use **compelling card titles** with clear value
- Show **variety** across screenshots
- Avoid **repetitive** cards (don't show same suit twice)
- Make sure **text is readable** (check at small size)

### What NOT to Include
- ❌ Debug overlays or red box errors
- ❌ Low battery indicators
- ❌ Notifications
- ❌ Empty/loading states (unless intentional)
- ❌ Landscape orientation

---

## Processing Screenshots

### Resize if Needed
If your screenshots are wrong size:
```bash
# Install imagemagick
brew install imagemagick

# Resize to 6.7" iPhone (1290 x 2796)
magick input.png -resize 1290x2796! output.png
```

### Organize Files
```
screenshots/
├── ios/
│   ├── 01-practice-empty.png
│   ├── 02-practice-card.png
│   ├── 03-mode-switch.png
│   ├── 04-improv-cards.png
│   └── 05-library.png
└── android/
    ├── 01-practice.png
    ├── 02-improv.png
    └── feature-graphic.png
```

---

## Creating Feature Graphic (Android Only)

**Size:** 1024 x 500px
**What it is:** Banner shown at top of Play Store listing

### Option 1: Simple Text Banner
Use Figma, Canva, or Photoshop:
- Background: Clean gradient or solid color (#2563EB blue from app?)
- Text: "Rephrase" + "Creative Practice Prompts for Piano"
- Include piano emoji or simple illustration

### Option 2: Collage
- Screenshots of cards arranged horizontally
- App name overlaid

### Quick Tool
- **Canva** (free): Has "Google Play Feature Graphic" template
- Search "feature graphic" → pick simple template → customize

---

## After You Have Screenshots

### Upload to App Store Connect
1. Go to App Store Connect
2. Navigate to your app → App Store tab
3. Under "App Previews and Screenshots"
4. Click "+" to add screenshots for each device size
5. Drag to reorder (first screenshot shows in search results!)

### Upload to Play Console
1. Go to Play Console
2. Navigate to your app → Store Presence → Main store listing
3. Scroll to "Phone screenshots"
4. Upload 2-8 screenshots
5. Upload feature graphic

---

## Need Help?

If screenshots are tedious, you can:
1. Ship to TestFlight **without** perfect screenshots (reviewers see the app anyway)
2. Add/improve screenshots in a later update
3. Use minimal set (2-3 screenshots) to start

The most important thing is to **ship**. Perfect screenshots can come later.

---

**You're almost there! Once you have screenshots, you're ready to submit.**
