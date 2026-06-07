# Changelog

All notable `@konaa/baileys` compatibility releases are documented here.

## 1.0.9 — 2026-06-07

Documentation-only release.

- Added this changelog to the repository and npm package.
- Updated README release notes so npm shows the current maintained release history.
- No runtime behavior changes from `1.0.8`.

## 1.0.8 — 2026-06-07

Kiu legacy relay compatibility fix.

- Restored Kiu-style legacy additional relay nodes for old `buttonsMessage` / list-style message shapes.
- Replaced the earlier shallow `biz/buttons` compatibility node with the richer old Kiu-style `biz` node containing:
  - `actual_actors`
  - `host_storage`
  - `privacy_mode_ts`
  - `engagement`
  - `interactive > native_flow` metadata
- Kept modern Baileys RC internals intact.
- Intended to make strict raw relay/clone of deprecated Kiu-style button messages behave closer to old Kiu Baileys.

## 1.0.7 — 2026-06-07

Initial legacy button/list relay compatibility.

- Added relay-level detection for legacy message shapes:
  - `buttonsMessage`
  - `buttonsResponseMessage`
  - `interactiveResponseMessage`
  - `listMessage`
  - `listResponseMessage`
- Added first-pass business-node compatibility for old raw relays and clone-style sends.
- Published as `latest`.

## 1.0.6 — 2026-06-06

Kiu native-flow relay compatibility.

- Added normalization for direct `{ interactiveMessage: ... }` relay payloads into view-once interactive messages.
- Added automatic native-flow `additionalNodes` for Kiu-style quick replies / native-flow messages.
- Confirmed Kiu-style quick reply relay works in MikirBot.
- Published as `latest`.

## 1.0.5 — 2026-06-05

Compatibility audit and package cleanup.

- Continued compatibility hardening for MikirBot and old Kiu-style plugins.
- Preserved newer Baileys RC behavior while adding narrow legacy shims.
- Published as a normal release, not an RC tag.

## 1.0.4 — 2026-06-04

Early compatibility package patch.

- Added package-side legacy compatibility helpers used by MikirBot.
- Avoided replacing the modern Baileys internals wholesale.
