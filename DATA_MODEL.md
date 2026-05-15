# Data Model

## Entities

This application is a **client-side only** tool. There is no backend database. All data is persisted in `localStorage` under the key `ai-docs-values`.

### Shape of `localStorage["ai-docs-values"]`

```json
{
  "prd": {
    "problem": "string",
    "targetUsers": "string",
    "featuresBasic": "string (newline-separated list)",
    "featuresAdv": "string (newline-separated list)",
    "userFlow": "string",
    "techPrefs": "string"
  },
  "system": {
    "frontendArch": "string",
    "backendArch": "string",
    "apiStructure": "string (newline-separated list)",
    "dbSchema": "string",
    "authSecurity": "string"
  },
  "uiux": {
    "keyScreens": "string (newline-separated list)",
    "layoutIdeas": "string",
    "colors": "string",
    "fonts": "string",
    "designStyle": "string"
  },
  "features": {
    "featureList": "string (newline-separated list)",
    "breakdowns": "string",
    "priority": "string",
    "dependencies": "string"
  },
  "master": {
    "projectOverview": "string",
    "strictInstructions": "string (newline-separated list)",
    "techStack": "string (newline-separated list)",
    "codeStyle": "string",
    "outputFormat": "string"
  },
  "datamodel": { ... },
  "security": { ... },
  "testing": { ... },
  "deployment": { ... },
  "agents": { ... }
}
```

### Shape of `localStorage["ai-docs-settings"]`

```json
{
  "theme": "dark" | "light",
  "accent": "#e8b84b",
  "sidebar": "labeled" | "icons",
  "density": "compact" | "cozy" | "comfy",
  "direction": "compose" | "terminal" | "manuscript"
}
```

## Field Kinds

All section values are stored as plain strings regardless of `kind`:

| Kind | UI Component | Storage format |
|------|-------------|----------------|
| `block` | `<textarea>` | raw string |
| `line` | `<input type="text">` | raw string |
| `list` | Managed list with add/remove | newline-separated string |

## Data Flow

```
User types → handleChange() → setAllValues() → localStorage (via useEffect)
                                                      ↓
                                             buildDocPrompt() → clipboard
```

No network requests are made at any point.
