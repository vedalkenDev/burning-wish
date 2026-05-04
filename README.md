# Burning Wish

> A Ghost Protocol-edition MTG Commander life tracker — offline-first PWA built for the table, not the app store.

![License](https://img.shields.io/badge/license-MIT-cyan?style=flat-square&color=00E5FF)
![PWA](https://img.shields.io/badge/PWA-offline--first-brightgreen?style=flat-square&color=39FF14)
![Platform](https://img.shields.io/badge/platform-mobile--first-blueviolet?style=flat-square&color=7B61FF)
![Stack](https://img.shields.io/badge/stack-Vite%20%2B%20React%20%2B%20TypeScript-FF3278?style=flat-square)

---

## What is Burning Wish?

Burning Wish is a free, installable, fully offline life tracker for Magic: The Gathering Commander games. It supports pods of 3 to 7 players and is designed to be placed flat on a table — each player reads their card from their own seat, with content rotated to face them.

There are no accounts, no ads, no data collection, no internet requirement after install. It runs entirely on the device.

The name is a reference to the MTG card *Burning Wish* — a card that reaches outside the expected game plan to retrieve something nobody saw coming. That is what this app tries to be: a life tracker that does not look or feel like any other life tracker.

---

## Screenshots

> Coming soon — add your screenshots to `/docs/screenshots/`

---

## Features

### Core Life Tracking
- Starting life total of 40 per player
- Large, high-contrast life total display — readable from across a play mat
- Inline `+` and `–` bumper buttons on either side of the life total
- Single tap adjusts by 1
- Long press (650ms) switches to increments of 10 — hold to scroll rapidly through large swings
- Critical threshold visual at 5 life or below — number turns danger red with glow
- Eliminated players dim out and display `// SIGNAL_LOST`

### Commander Damage Tracking
- Per-player commander damage strip displayed directly below each life total
- One chip per opponent, colour-coded to their player accent
- Chips show a glowing accent dot and damage count when non-zero
- Tap any chip to expand inline controls — `–`, damage count, `+`, and close
- Automatic kill detection at 21 commander damage — chip border turns red, `KLL` label appears
- Commander damage is tracked independently from life total changes

### Poison / Infect Counters
- 10-pip visual tracker accessible via the player detail sheet
- Tap individual pips to set an exact count
- `+1` and `–1` controls alongside the pips
- Kill confirmation shown at 10 poison counters

### Pod Setup
- Choose pod size on launch: 3, 4, 5, 6, or 7 players
- Players are named with default cyberpunk handles — all editable in-game
- Each player is assigned a unique accent colour from a 7-colour system
- Pod size drives the rotation layout automatically

### Table Rotation Layout
- Designed for a phone placed flat in the centre of a square table
- Left-column players: content rotated 90° clockwise — readable from the left seat
- Right-column players: content rotated 90° counter-clockwise — readable from the right seat
- Odd extra players (in 3, 5, 7-player pods): full-width card at the top, rotated 180°
- Card borders and backgrounds remain static; only the inner content rotates
- Layout adapts per pod size automatically — no manual configuration

### Player Detail Sheet
- Tap any life total to open a full bottom-sheet modal for that player
- Editable player handle — tap the name, type, confirm with Enter
- Fine-grained life adjustment: `±1`, `±5`, `±10`, `±20`
- Full poison pip tracker
- Per-opponent commander damage table with `KILL` detection
- All controls accessible without leaving the main game view

### Storm Counter
- Global storm counter in the header — `+` and `–` controls
- Persists for the duration of the session
- Resets on new game

### Threat Marker
- `TGT` button on each player card
- Marks one player as the current table threat
- Red glow border highlights the targeted player
- Only one player can be marked at a time — tapping a new one moves the marker

### Dice Roller
- Accessible from the bottom bar at any time during a game
- Supports d4, d6, d8, d10, d12, d20
- Animated roll with randomised intermediate values
- `NATURAL [MAX]` callout on maximum rolls
- `CRITICAL FAIL` callout on 1s

### Ghost Protocol Design System
- Deep navy-black background (`#020810`)
- Ice cyan primary accent (`#00E5FF`)
- Hot pink-red danger state (`#FF3278`)
- Neon green poison indicator (`#39FF14`)
- Share Tech Mono typeface — terminal-grade monospace
- Rajdhani for display headings
- CRT scanline overlay across the full UI
- Radial vignette for screen depth
- Coordinate grid background at low opacity
- Per-card scan-line sweep animation (4s loop)
- Pulsing glow dots as status indicators per player
- Subtle flicker animation on life totals
- All animations hardware-accelerated via CSS transforms

### Offline-First PWA
- Installable to home screen on Android and iOS
- Full offline functionality — no network required after first load
- Service worker pre-caches all assets at install time (via Workbox)
- Game state persists to localStorage via Zustand persist middleware
- Survives force-close, phone reboot, or browser crash without losing state
- `navigator.storage.persist()` called on first launch to prevent eviction
- Screen wake lock (`navigator.wakeLock`) keeps the display on during play

---

## Supported Pod Sizes

| Pod | Layout | Rotation |
|-----|--------|----------|
| 3 players | 2 columns + 1 full-width bottom | L: 90 / R: 270 / Bottom: 0 |
| 4 players | 2 x 2 grid | L: 90 / R: 270 |
| 5 players | 1 full-width top + 2 x 2 | Top: 180 / L: 90 / R: 270 |
| 6 players | 3 x 2 grid | L: 90 / R: 270 |
| 7 players | 1 full-width top + 3 x 2 | Top: 180 / L: 90 / R: 270 |

---

## Kill Conditions

The app tracks and visually flags all three Commander kill conditions:

| Condition | Threshold | Visual |
|-----------|-----------|--------|
| Life total | 0 or below | Red life number, `SIGNAL_LOST` |
| Poison counters | 10 | Green pip fill, `INFECT_KILL_CONFIRMED` |
| Commander damage | 21 from a single source | Red chip, `KLL` label |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| State | Zustand + persist middleware |
| PWA | vite-plugin-pwa (Workbox) |
| Package manager | PNPM |
| Testing | Vitest |

No backend. No database. No authentication. No external API calls during gameplay.

---

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM (`npm install -g pnpm`)

### Install

```bash
git clone https://github.com/YOUR_USERNAME/burning-wish.git
cd "burning-wish"
pnpm install
```

### Run locally

```bash
pnpm dev
```

### Run on a phone over local network

```bash
pnpm dev --host
```

Vite will output a network URL (e.g. `http://192.168.x.x:5173`). Open that on your phone while both devices are on the same Wi-Fi network.

> **Note:** `navigator.wakeLock` requires HTTPS. For full wake lock testing on device, use a deployed preview (Vercel, Netlify) or set up a local SSL cert via [mkcert](https://github.com/FiloSottile/mkcert).

### Build for production

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview --host
```

---

## Installing as a PWA

### Android (Chrome)
1. Open the network URL in Chrome
2. Tap the three-dot menu
3. Tap **Add to Home Screen**
4. Confirm — the app installs with a standalone fullscreen experience

### iOS (Safari)
1. Open the network URL in Safari
2. Tap the **Share** button
3. Tap **Add to Home Screen**
4. Confirm

> iOS does not support the automatic install prompt. The share-button flow is required.

---

## Project Structure

```
src/
  types/            Player, Slot, TableLayout, DieType
  store/            useGameStore.ts (Zustand + persist)
  hooks/            useLongPress.ts, useWakeLock.ts
  utils/            toHex, accentRgb, getTableLayout
  components/
    SetupScreen.tsx
    PlayerCard.tsx
    CmdStrip.tsx
    LifeRow.tsx
    modals/
      PlayerModal.tsx
      DiceModal.tsx
      ResetModal.tsx
    ui/
      MonoLabel.tsx
      CyberBtn.tsx
      ScanLine.tsx
      CRTOverlay.tsx
  App.tsx
  main.tsx
  index.css
```

---

## Design Philosophy

Every existing MTG life tracker app — Companion, LifeElk, Lifetap — lives in the same visual neighbourhood: dark background, fantasy serif fonts, gold accents, card art. Burning Wish leaves that neighbourhood entirely.

The Ghost Protocol aesthetic is borrowed from Ghost in the Shell and Neuromancer. Ice cyan on deep navy. Monospace terminal fonts. CRT scanlines. Status readouts instead of labels. The UI does not try to look like it belongs inside the game — it looks like the instrument you use to run the game.

Functional decisions that differ from existing apps:

- **7-player support** — every other app caps at 6. Burning Wish supports 3 through 7.
- **Table rotation** — cards rotate to face each seated player. No app has done this.
- **Offline-first** — installable PWA with full offline capability. No Companion-style data dependency.
- **No ads, no account, no store** — share a URL, tap install, play.

---

## Roadmap

- [ ] Floating mana tracker per player
- [ ] Mass life gain / drain calculator (Exsanguinate helper)
- [ ] Game history log with turn-by-turn record
- [ ] Multiple commanders per player (Partner support)
- [ ] Energy counter support
- [ ] Experience counter support
- [ ] Custom player accent colour picker
- [ ] Haptic feedback (Android)
- [ ] PWA push notification for game invites

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

Please keep contributions aligned with the project's offline-first, no-backend constraint. This is a client-only application and should stay that way.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Acknowledgements

Designed and built with the MTG community in mind.  
Inspired by the gaps left by Lifetap, LifeElk, and MTG Companion.  
Named after [Burning Wish](https://scryfall.com/card/jud/87/burning-wish) — a card that reaches outside the expected game plan.

---

*// BURNING_WISH // GHOST_PROTOCOL_EDITION // v0.1*
