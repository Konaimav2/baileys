# Changelog

All notable `@konaa/baileys` releases are documented here.

This package keeps modern Baileys RC behavior while adding targeted compatibility shims for MikirBot and older Kiu/@z4phdev-style WhatsApp bot projects.

The entries below were rebuilt from the published npm tarballs for `@konaa/baileys`, comparing each release against the previous one.

## 1.0.11 — 2026-06-09

Kiu/Kyuu native-flow relay compatibility release.

### Added

- Added native-flow button-name detection in `lib/Socket/messages-send.js` for wrapped and direct `interactiveMessage` payloads.
- Added compatibility mapping for newer Kiu/Kyuu-style native-flow button names:
  - `review_and_pay`
  - `review_order`
  - `payment_info`
  - `payment_status`
  - `payment_method`
  - generic native-flow/interactive menus.

### Changed

- Extended legacy/Kiu additional-node selection so native-flow interactive menus get a more accurate Kiu-compatible relay node instead of only the generic native-flow node.
- Kept modern Baileys RC behavior intact while improving raw relay/clone compatibility for menus produced by `@kyuu2nd/baileys`.
- Bumped package metadata from `1.0.10` to `1.0.11`.

### Fixed

- Improved `.clone`/raw relay compatibility for newer Kiu/Kyuu native-flow menu payloads that could render as “unsupported/incompatible WhatsApp version” when relayed through the older `@konaa/baileys` runtime.

## 1.0.10 — 2026-06-07

Documentation-only release.

### Added

- Expanded `CHANGELOG.md` into a detailed release history from the first published release through `1.0.9`.
- Added source-backed notes reconstructed from published npm tarball diffs for `1.0.0-BaileysRC13` through `1.0.9`.
- Documented early releases that were previously too vague, including LID/PN receive normalization, message-ID compatibility, Kiu socket/store helpers, legacy root exports, native-flow relay normalization, and legacy button/list relay changes.

### Changed

- Bumped package metadata from `1.0.9` to `1.0.10` so npm can show the expanded changelog.
- No runtime behavior changes from `1.0.9`.

### Runtime

- No runtime code changes from `1.0.9`.

## 1.0.9 — 2026-06-07

Documentation-only release.

### Added

- Added `CHANGELOG.md` to the npm package tarball.
- Added release-history visibility for npm users.
- Added README changelog section pointing to `CHANGELOG.md`.
- Added README latest highlights for `1.0.6` through `1.0.9`.

### Changed

- Updated README current maintained release from `1.0.5` to `1.0.9`.
- Added `CHANGELOG.md` to the package `files` allowlist.
- Bumped package metadata from `1.0.8` to `1.0.9`.

### Runtime

- No runtime code changes from `1.0.8`.

## 1.0.8 — 2026-06-07

Kiu-style legacy additional-node relay fix.

### Added

- Added `getKiuAdditionalNode(name)` in `lib/Socket/messages-send.js`.
- Added Kiu-style `biz` relay nodes for old/deprecated interactive message shapes.
- Added additional-node metadata matching the old Kiu behavior:
  - `actual_actors: '2'`
  - `host_storage: '2'`
  - `privacy_mode_ts`
  - `engagement`
  - `interactive` with `type: 'native_flow'`
  - nested `native_flow` with `name: 'mixed'`
- Added support for order-response/native-flow name mapping through Kiu-style relay metadata.

### Changed

- Replaced the simpler `1.0.7` shallow legacy `biz/buttons` node with richer Kiu-compatible additional nodes.
- Broadened legacy-node detection so existing Kiu-style `biz` metadata is not duplicated.
- Kept modern Baileys RC send internals intact while only extending relay metadata for legacy payloads.

### Fixed

- Improved strict raw relay/clone compatibility for old `buttonsMessage` and list-style messages that old Kiu Baileys could relay.

## 1.0.7 — 2026-06-07

Initial legacy buttons/list relay compatibility.

### Added

- Added legacy button/list message detection in `lib/Socket/messages-send.js`.
- Added detection for these deprecated/raw message shapes:
  - `buttonsMessage`
  - `buttonsResponseMessage`
  - `interactiveResponseMessage`
  - `listMessage`
  - `listResponseMessage`
- Added first-pass legacy `biz` button metadata injection for raw relays/clones.
- Added list-type handling for legacy `listMessage.listType` values.
- Added duplicate-node guard so legacy `biz` nodes are not inserted twice.

### Fixed

- Improved compatibility for old Kiu-style plugins that relay/clone raw legacy buttons or lists instead of rebuilding them as modern native-flow messages.

## 1.0.6 — 2026-06-06

Kiu native-flow and bot-JID compatibility release.

### Added

- Added `normalizeKiuRelayMessage(message)` in `lib/Socket/messages-send.js`.
- Added automatic wrapping for direct `{ interactiveMessage: ... }` relay payloads into view-once interactive-message structure.
- Added recursive native-flow detection for messages inside:
  - `interactiveMessage`
  - `viewOnceMessage`
  - `viewOnceMessageV2`
  - `ephemeralMessage`
- Added native-flow `additionalNodes` injection for Kiu-style quick replies/native-flow messages.
- Added duplicate native-flow node detection.
- Added `lidToJid(jid)` helper in `lib/WABinary/jid-utils.js`.
- Added `getBotJid(jid)` helper in `lib/WABinary/jid-utils.js`.
- Added internal bot-JID mapping support for legacy `@bot` JIDs.

### Changed

- Updated README into the maintained-package presentation for MikirBot and Kiu-style projects.
- Expanded README compatibility notes for:
  - `makeInMemoryStore()`
  - store compatibility helpers
  - legacy export aliases
  - Kiu-style socket helper methods
  - raw proto send branches
  - quoted-message safety behavior
- Bumped package metadata from `1.0.5` to `1.0.6`.

### Fixed

- Fixed direct Kiu-style native-flow relay payloads that were not in the newer Baileys view-once wrapper format.
- Improved compatibility for Kiu-style quick replies/native-flow buttons in MikirBot.

## 1.0.5 — 2026-06-05

Legacy root exports and quoted-message safety release.

### Added

- Added Kiu/@z4phdev legacy root exports in `lib/index.js`:
  - `MessageType`
  - `Presence`
  - `Mimetype`
  - `WAFlag`
  - `WA_MESSAGE_STUB_TYPES`
- Added TypeScript declarations for those legacy root exports in `lib/index.d.ts`.
- Added README documentation for compatibility helpers, including:
  - `makeInMemoryStore`
  - `isJidUser`
  - `isJidNewsLetter`
  - `MessageType`
  - `Presence`
  - `Mimetype`
  - `WAFlag`
  - `WA_MESSAGE_STUB_TYPES`
  - selected old socket/store helper names.

### Changed

- Changed quoted-message normalization in `lib/Utils/messages.js` to use safer `let` variables for `innerMessage` and content keys.
- Made context-info handling more defensive by checking that the target message content exists and is an object before reading/writing `contextInfo`.
- Bumped package metadata from `1.0.4` to `1.0.5`.

### Fixed

- Reduced crashes when quoted content is a primitive/string-like value but Baileys tries to merge `contextInfo`.
- Improved compatibility for clone/eval-style plugins that pass old quoted-message shapes.

## 1.0.4 — 2026-06-05

Kiu-style socket/store helper compatibility release.

### Added

- Added `generateWAMessageFromContent` import to `lib/Socket/messages-send.js` for raw proto send branches.
- Added `STORIES_JID` import to support status/story sends.
- Added `setLabelGroup(id, text)` socket helper.
- Added `sendStatusMention(content, jids)` socket helper.
- Added `sendMessage()` support for Kiu-style album payloads:
  - `albumMessage`
  - `album`
- Added `sendMessage()` support for status mention payloads:
  - `groupStatusMessage`
  - `statusMentionMessage`
- Added raw proto send branches for:
  - `requestPaymentMessage`
  - `interactiveMessage`
  - `productMessage`
  - `eventMessage`
  - `pollResultMessage`
  - `orderMessage`
- Added forwarding of selected relay options for raw proto branches:
  - `additionalAttributes`
  - `additionalNodes`
  - `statusJidList`
- Added store fields in `lib/Store/index.js`:
  - `labels`
  - `labelAssociations`
- Added in-memory store helper methods:
  - `loadMessages(jid, count)`
  - `fetchImageUrl(jid)`
  - `fetchGroupMetadata(jid)`
  - `fetchMessageReceipts()`
  - `getLabels()`
  - `getChatLabels(jid)`
  - `getMessageLabels(jid, id)`
- Added persistence support for `labels` and `labelAssociations` in store JSON read/write flow.
- Added `makeCacheManagerAuthState()` legacy placeholder export for old Kiu/@z4phdev imports.
- Added JID aliases in `lib/WABinary/jid-utils.js`:
  - `isJidUser` aliasing `isPnUser`
  - `isJidNewsLetter` aliasing `isJidNewsletter`

### Changed

- Extended `sendMessage()` while preserving the existing modern Baileys message path for normal content.
- Bumped package metadata from `1.0.3` to `1.0.4`.

### Fixed

- Improved compatibility with old plugins expecting Kiu-style socket helpers, store helpers, status sends, album sends, raw proto sends, and legacy JID helper names.

## 1.0.3 — 2026-06-04

MikirBot message-ID compatibility release.

### Changed

- Replaced the upstream-style `generateMessageIDV2(userId)` implementation in `lib/Utils/generics.js`.
- Changed both message ID generators to use the old MikirBot-compatible prefix:
  - `generateMessageID()` now returns IDs like `MikirBot-<random>`.
  - `generateMessageIDV2()` now delegates to `generateMessageID()`.
- Bumped package metadata from `1.0.2` to `1.0.3`.

### Fixed

- Restored old MikirBot/Kiu-style outbound message ID shape for code paths that route through `generateMessageIDV2()`.

## 1.0.2 — 2026-06-04

Package cleanup release.

### Changed

- Bumped package metadata from `1.0.1` to `1.0.2`.

### Fixed

- Removed an accidentally published backup file from the package tarball:
  - `lib/Socket/messages-recv.js.bak-lid-pn-npm-20260604T131631+0700`

### Runtime

- No runtime code changes from `1.0.1`.

## 1.0.1 — 2026-06-04

LID/PN receive-side compatibility release.

### Added

- Added `lru-cache` dependency to package metadata.
- Added receive-side normalization in `lib/Socket/messages-recv.js`:
  - If `msg.key.participant` is a LID and `participantAlt` exists, use `participantAlt`.
  - If a non-group `remoteJid` is a LID and `remoteJidAlt` exists, use `remoteJidAlt`.
  - If a group quoted-message `contextInfo.participant` is a LID, look up group metadata and replace it with the participant's `jid`/`pn` when available.

### Changed

- Bumped package metadata from `1.0.0-BaileysRC13` to `1.0.1`.

### Fixed

- Improved old plugin compatibility with newer WhatsApp LID/PN identifiers in received messages and quoted group messages.

### Packaging note

- This release accidentally included a `.bak` file in the npm tarball; that was removed in `1.0.2`.

## 1.0.0-BaileysRC13 — 2026-06-04

Initial RC baseline release.

### Added

- Published the package as `@konaa/baileys` under the npm scope.
- Published the Baileys RC13-based baseline package.
- Included the main package surface:
  - `lib/**/*`
  - `WAProto/**/*`
  - `engine-requirements.js`
  - `README.md`
- Published with core dependencies including:
  - `@cacheable/node-cache`
  - `@hapi/boom`
  - `async-mutex`
  - `libsignal`
  - `music-metadata`
  - `p-queue`
  - `pino`
  - `protobufjs`
  - `whatsapp-rust-bridge`
  - `ws`

### Release channel

- Published as the first available package version.
- Kept available through the `rc` dist-tag as `1.0.0-BaileysRC13`.
