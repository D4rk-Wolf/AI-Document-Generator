# Testing Strategy

## Philosophy

This project is a **UI-heavy, client-side form app**. The highest-risk logic is:
1. `buildDocPrompt()` / `buildAllPrompt()` — prompt generation correctness
2. `countFilled()` — progress tracking accuracy
3. All three layout variants rendering correctly with all doc types

## Test Pyramid

```
        ┌──────────────────────┐
        │   E2E (Playwright)   │  ← Critical user flows
        ├──────────────────────┤
        │  Component (Vitest)  │  ← Inputs, Sidebar, progress
        ├──────────────────────┤
        │    Unit (Vitest)     │  ← prompt.js utilities (highest priority)
        └──────────────────────┘
```

## Priority 1 — Unit Tests (`src/utils/prompt.js`)

These are the most important tests. Run: `npx vitest`

| Test | Scenario |
|------|----------|
| `buildDocPrompt` — block field | Returns field content under heading |
| `buildDocPrompt` — list field | Renders each line as `- item` |
| `buildDocPrompt` — empty fields | Shows `(empty)` placeholder |
| `buildAllPrompt` | Joins all docs separated by `---` |
| `countFilled` — list kind | Counts only non-empty lines |
| `countFilled` — block kind | Counts non-whitespace-only values |

## Priority 2 — E2E Tests (Playwright)

Critical happy paths:

1. **Fill a PRD and copy** → clipboard contains formatted markdown with all section headings
2. **Switch between all docs** → active doc updates, previously entered values persist
3. **Export All** → clipboard contains all 10 docs joined with `---`
4. **Keyboard shortcut** `Ctrl+Enter` / `Cmd+Enter` → triggers copy
5. **Settings persistence** → change theme/accent, reload → settings restored from localStorage
6. **All 3 layout directions render** → no visual errors for terminal / compose / manuscript

## Tooling

```bash
# Unit + component tests
npm install -D vitest @vitest/ui
npx vitest

# E2E
npm install -D @playwright/test
npx playwright test
```

## CI Integration

Tests should run in GitHub Actions on every pull request to `main`:

```yaml
- name: Run unit tests
  run: npm run test
- name: Run E2E tests
  run: npx playwright test
```

No PR should be merged if unit tests or E2E critical-path tests fail.
