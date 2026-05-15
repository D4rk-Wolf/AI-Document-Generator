# Deployment & DevOps Plan

## Environments

| Environment | URL / Location | Trigger |
|-------------|---------------|---------|
| **Development** | `localhost:5173` (Vite dev server) | `npm run dev` |
| **Web Preview** | Vercel / Netlify preview URL | PR to `main` |
| **Web Production** | GitHub Pages or custom domain | Push to `main` or version tag |
| **Desktop Release** | GitHub Releases page | Push a `v*` tag |

## Web Deployment (Static)

The app builds to a static bundle — deploy anywhere that serves static files.

```bash
npm run build        # Output → AI-Template/dist/
npm run preview      # Preview the production build locally
```

**Recommended hosts**: Vercel, Netlify, GitHub Pages, Cloudflare Pages.

## Desktop Builds (Tauri / GitHub Actions)

Desktop installers are built automatically via `.github/workflows/release.yml` when a version tag is pushed.

### Release Steps

```bash
# 1. Bump version in package.json and src-tauri/Cargo.toml / tauri.conf.json
# 2. Commit and tag
git tag v1.2.0
git push origin v1.2.0
# 3. GitHub Actions builds Windows (.msi), macOS (.dmg), Linux (.AppImage/.deb)
# 4. Installers are uploaded to the GitHub Release automatically
```

### Required Secrets (GitHub Actions)

| Secret | Purpose |
|--------|---------|
| `APPLE_CERTIFICATE` | macOS code signing |
| `APPLE_CERTIFICATE_PASSWORD` | Signing cert password |
| `APPLE_SIGNING_IDENTITY` | Developer ID string |
| `APPLE_ID` / `APPLE_PASSWORD` | Notarisation |
| `TAURI_PRIVATE_KEY` + `TAURI_KEY_PASSWORD` | Tauri updater signing |

### First-Time Setup

```bash
# Generate app icons from the SVG source
cd AI-Template
npm run tauri icon public/app-icon.svg
# Commit src-tauri/icons/ to git
```

## Monitoring & Observability

- **Error tracking**: Not currently implemented. Recommended: Sentry (free tier) with `@sentry/react`.
- **Usage analytics**: Intentionally none — privacy-first product.
- **Update notifications**: Tauri's built-in updater can check a GitHub Releases endpoint for new versions.

## Rollback Plan

- Web: Vercel/Netlify keep all deployment history — one-click rollback via dashboard.
- Desktop: Previous installers remain on the GitHub Releases page indefinitely. Users can download any prior version.
