# AI Project Document Templates

A browser-based tool that helps you build the 5 essential documents you should write **before** prompting an AI coding assistant. Structured inputs produce a clean, copyable prompt for each document type.

---

## Why

AI coding tools give better results when given structured context. This app guides you through the five documents that together give an AI everything it needs to produce production-quality output.

## The 5 Documents

| # | Document | Purpose |
|---|----------|---------|
| 01 | **PRD** — Product Requirement Document | Tells the AI *what* to build |
| 02 | **System Design Document** | Tells the AI *how* to build it |
| 03 | **UI/UX Wireframes** | Gives the AI visual and design clarity |
| 04 | **Feature Breakdown Document** | Breaks big features into step-by-step tasks |
| 05 | **Master Prompt Document** | Combines everything into one authoritative prompt |

## How It Works

1. Select a document from the sidebar
2. Fill in each section (problem statement, architecture, design style, etc.)
3. Click **Copy as Prompt** to copy the formatted document to your clipboard
4. Paste directly into your AI coding tool (ChatGPT, Claude, Cursor, etc.)

All data stays in your browser — nothing is sent to a server.

## Getting Started

```bash
# Clone the repo
git clone https://github.com/confox/AI-Docs-Generator.git
cd AI-Docs-Generator/AI-Template

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

Output is in `AI-Template/dist/`. Deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Tech Stack

- [React 19](https://react.dev)
- [Vite 8](https://vite.dev)
- No external UI library — all styles are inline CSS

## Project Structure

```
AI-Template/
├── src/
│   ├── App.jsx        # Main app — all document definitions and UI
│   ├── main.jsx       # React entry point
│   ├── App.css
│   └── index.css
├── public/
├── index.html
└── vite.config.js
```

## License

MIT
