# AGENTS.md — AI Coding Agent Rules

> This file is the source of truth for AI coding agents working in this repository.
> Agents (Cursor, Claude, GitHub Copilot, Aider) should read this before making any changes.

## Project Overview

**AI Project Docs Generator** — a React + Vite + Tauri desktop/web app that helps developers write the essential documents they need *before* prompting an AI coding assistant. Users fill in structured forms and copy the result as a formatted prompt.

- **Web app**: Vite + React 19, no external UI library, all styles are inline CSS
- **Desktop app**: Tauri 2 wrapping the same React build
- **Data**: 100% local — `localStorage` only, nothing sent to any server
- **Entry point**: `src/docs.js` defines all document types and their sections

## Directory Structure

```
AI-Template/
├── src/
│   ├── docs.js           ← All document definitions (add new docs here)
│   ├── constants.js      ← App-wide constants (theme, storage keys, accents)
│   ├── App.jsx           ← Root component, state management
│   ├── components/
│   │   ├── Sidebar.jsx   ← Navigation sidebar (all 3 variants)
│   │   ├── inputs/       ← BlockInput, LineInput, ListInput
│   │   └── ...
│   ├── layouts/          ← TerminalDirection, ComposeDirection, ManuscriptDirection
│   └── utils/prompt.js   ← buildDocPrompt(), buildAllPrompt(), countFilled()
└── src-tauri/            ← Desktop wrapper (do not modify unless building desktop features)
```

## Coding Conventions

- **No external UI library** — all styling is inline CSS using CSS variables defined in `index.css`
- **CSS variables for theming**: use `var(--accent)`, `var(--bg-1)`, `var(--ink-2)`, etc.  Never hardcode colours.
- **No TypeScript** — this project uses plain JavaScript (JSX)
- **Imports**: use the `@/` alias for `src/` (e.g. `import { DOCS } from "@/docs.js"`)
- **State**: local `useState` only — no external state library
- **Persistence**: `localStorage` only, keys defined in `constants.js`

## Adding a New Document Type

1. Open `src/docs.js`
2. Add a new object to the `DOCS` array following the existing pattern:
   ```js
   {
     id: "unique-id",
     n: "06",               // display number
     short: "Short Name",
     title: "Full Document Title",
     purpose: "One line — what this tells the AI",
     icon: "🔒",
     goldenRule: "One-line insight about why this doc matters",
     sections: [
       { id: "sectionId", title: "Section Title", hint: "Placeholder hint text", kind: "block" | "list" | "line", rows: 4 },
     ],
   }
   ```
3. No other files need changing — the app renders all docs from `DOCS` dynamically.

## Do Not

- Do not add external npm packages without discussion
- Do not add TypeScript or change the build tooling
- Do not modify `src-tauri/` unless the task specifically involves the desktop app
- Do not use TailwindCSS or any CSS-in-JS library
- Do not hardcode colour values — always use CSS custom properties
