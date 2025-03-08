# BB Bug Hunter - Comprehensive Game Logic Documentation

## Overview
**BB Bug Hunter** is an interactive and fast-paced game where players must kill bugs before they overrun the area. The game combines dynamic gameplay mechanics with modern web technologies to deliver a fun and engaging experience. It features bug spawning, a unique "Zeher" spray mechanic, customizable settings, and ad integration to support the developer.

---

## Core Game Mechanics

### 1. **Bug Spawning**
- Bugs spawn randomly within the game area at regular intervals (`bugSpawnIntervalTime`).
- Each bug is represented by an emoji (🐞, 🦗, 🐜, 🦟) and moves randomly across the screen.
- The maximum number of alive bugs is capped at `maxBugs`. If this limit is reached, the game ends.

### 2. **Killing Bugs**
- Players can kill bugs by tapping on them.
- When a bug is killed:
  - The score increases by 1.
  - The bug plays a "splat" animation and disappears.
  - Haptic feedback is triggered (if enabled).

### 3. **Zeher Spray Mechanic**
- A "Zeher" bottle fills up over time (`bottleFillTime`).
- Once fully filled, players can activate the Zeher spray:
  - The spray creates a temporary zone (`zeherRadius`) that kills all bugs within it.
  - The spray lasts for `zeherDuration` and then disappears.

### 4. **Game Over**
- The game ends if:
  - The number of alive bugs reaches `maxBugs`.
  - A "Game Over" popup (using SweetAlert2) is displayed, showing the final score and high score.

---

## Features

### 1. **Background Music**
- Background music plays during the game.
- Players can mute/unmute the music using the volume button.

### 2. **Haptic Feedback**
- Haptic feedback is triggered when a bug is killed.
- Players can enable/disable haptic feedback using the haptic button.

### 3. **Pause and Resume**
- Players can pause the game using the pause button.
- When paused, an ad is displayed (using the Ads Script).
- The game can be resumed or the background can be changed while paused.

### 4. **Background Selection**
- Players can change the game background from a selection of images.
- The background selection is implemented using a modal (Materialize CSS).

### 5. **Ad Integration**
- Ads are displayed:
  - When the game is paused.
  - When the game ends (Game Over).
- Ads help the developer earn money.

---

## Libraries Used and Their Roles

### 1. **Materialize CSS**
- **Role**: Provides a responsive and modern UI framework for styling the web app.
- **Usage**:
  - Buttons, modals, and other UI components.
  - Background selection modal.

### 2. **Font Awesome**
- **Role**: Offers a collection of scalable vector icons.
- **Usage**:
  - Icons for buttons (e.g., play, pause, volume).
  - Enhances the visual appeal of the UI.

### 3. **SweetAlert2**
- **Role**: A JavaScript library for creating stylish and customizable popup dialogs.
- **Usage**:
  - Displays the "Game Over" popup with a clean and modern design.

### 4. **Telegram WebApp SDK**
- **Role**: Enables integration with Telegram's WebApp platform.
- **Usage**:
  - Cloud Storage: Saves and retrieves the high score.
  - Haptic Feedback: Provides vibration effects when bugs are killed.
  - Full SCreen mode.
  - Disable vircicle sweep, making better gaming experience.
  - Closing confirmation for mistakeenly closing.

### 5. **Ads Script (~whephiwums.com~ = monetag.com)**
- **Role**: Manages advertisements within the web app.
- **Usage**:
  - Displays ads when the game is paused or ends.
  - Helps monetize the game.

### 6. **Materialize JavaScript**
- **Role**: Adds interactivity to Materialize CSS components.
- **Usage**:
  - Enables functionality for modals (e.g., background selection modal).

---

## Technical Details

### 1. **Variables**
- `maxBugs`: Maximum number of alive bugs (default: 100).
- `bugSpawnIntervalTime`: Time interval for bug spawning (default: 500ms).
- `bottleFillTime`: Time to fill the Zeher bottle (default: 15 seconds).
- `zeherDuration`: Duration of the Zeher spray (default: 6 seconds).
- `zeherRadius`: Radius of the Zeher spray (default: 90px).

### 2. **Game Flow**
1. **Start Screen**: Players click "Play" to start the game.
2. **Gameplay**:
   - Bugs spawn and move randomly.
   - Players kill bugs and activate the Zeher spray.
3. **Pause**: Players can pause the game, triggering an ad.
4. **Game Over**: If bugs overrun the area, the game ends, and a "Game Over" popup is displayed.

### 3. **Code Snippets**

#### Bug Spawning
```javascript
bugSpawnInterval = setInterval(() => {
  if (!gamePaused && aliveBugs < maxBugs) {
    const bug = createBug();
    bugs.push(bug);
    aliveBugs++;
    updateBugCount();
  }
}, bugSpawnIntervalTime);
