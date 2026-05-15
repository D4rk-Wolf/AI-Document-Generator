# Security & Compliance

## Threat Model

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| User pastes real API keys into form fields | Medium | Warn users in UI hints to use placeholders. Data never leaves the device. |
| XSS via clipboard content | Low | Output is plain text copied to clipboard, not rendered as HTML. |
| Supply chain attack via npm dependency | Medium | Minimise dependencies. Run `npm audit` before every release. |
| Tauri native RCE via malicious file | Low | Tauri's capability system restricts filesystem access to `$APPDATA` only. |

## Security Checklist

### Data & Privacy
- [x] No backend — zero data transmission
- [x] All data stored in `localStorage` — scoped to origin, never shared
- [x] No analytics, telemetry, or tracking of any kind
- [x] No user accounts or authentication required

### Dependencies
- [ ] Run `npm audit` before each release and resolve HIGH/CRITICAL issues
- [ ] Pin major versions in `package.json` — avoid using `*` or `latest`
- [ ] Review new dependencies before adding them (prefer zero-dependency alternatives)

### Desktop (Tauri)
- [x] Tauri capability model restricts filesystem access
- [ ] Verify `tauri.conf.json` `allowlist` is minimal — only enable what is used
- [ ] Code-sign the installer for each platform before publishing to Releases

### Build & Release
- [ ] GitHub Actions release workflow must only trigger on signed version tags (`v*`)
- [ ] Do not commit `.env` files or secrets to the repository
- [ ] Verify no API keys or tokens exist in the codebase before tagging a release

## Compliance Notes

- **GDPR**: Not applicable — no personal data is collected or processed server-side.
- **App Store**: No tracking or advertising SDKs are used. Privacy manifest for macOS: declare zero data collection.
