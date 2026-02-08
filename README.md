# EyeZen

Desktop eye protection app that reduces eye strain by filtering blue light and controlling screen brightness. Built with Electron, React, TypeScript, Vite, and Tailwind CSS v4.

## Features
- Blue‑light filter overlay (warmth and brightness controls)
- Day/Night toggle (light/dark UI theme + filter presets)
- Presets: Health, Office, Reading, Game, Movie, Editing, Custom
- Global keyboard shortcuts
- Cross‑platform packaging via Electron Forge

## Download (Windows)
1. Go to the repo Releases page.
2. Download:
   - EyeZen‑Setup.exe — installer (recommended)
   - EyeZen‑Win.zip — portable (no install)
3. Run the installer and launch EyeZen from Start Menu.

Portable ZIP: unzip, run `EyeZen.exe`, delete folder to remove.

## Keyboard Shortcuts
- Ctrl + Alt + F — Toggle overlay on/off
- Ctrl + Alt + D — Open Display page
- Ctrl + Alt + S — Open Settings page

## Development
### Prerequisites
- Node.js 18+ (LTS)
- npm 9+

### Install
```bash
npm install
```

### Run (dev)
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

### Package (make installers)
```bash
npm run make
```
Artifacts are placed under `out/`.

## Tailwind v4 Setup
- `src/index.css`
```css
@import "tailwindcss";
```
- `postcss.config.cjs`
```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```
- Renderer imports CSS:
```ts
import "./index.css";
```

## Project Structure
- `src/pages/Dashboard.tsx` — UI with sliders, presets, Day/Night
- `src/pages/settings.tsx` — settings page
- `src/pages/schedule.tsx` — scheduling UI
- `src/main.ts` — Electron main (overlay, shortcuts, IPC)
- `src/preload.ts` — secure IPC bridge
- `src/router.tsx` — routing + sidebar
- `src/index.css` — Tailwind directives + custom styles
- `postcss.config.cjs` — Tailwind v4 PostCSS

## Troubleshooting
- If styles look plain, restart app or use latest release.
- ESM plugin errors: keep `vite.renderer.config.ts` minimal; Tailwind via PostCSS.
- Antivirus flags: app is Electron; allow if needed.

## License
MIT
