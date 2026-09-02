# Changelog

All notable changes to this fork are documented in this file.

This is a community-maintained fork of [steven-tey/novel](https://github.com/steven-tey/novel), which has been inactive since January 2025. This changelog tracks fork-specific maintenance work — fixes ported from stale upstream pull requests, dependency/compatibility repairs, and new work done here. Individual package version history (as published to npm) still lives in [`packages/headless/CHANGELOG.md`](packages/headless/CHANGELOG.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Fixed

- AI generate route (`apps/web/app/api/generate/route.ts`) never passed the built system prompt to `streamText`, so AI commands ran with no instructions (ports upstream [steven-tey/novel#497](https://github.com/steven-tey/novel/pull/497)).
- `UploadImagesPlugin` read transaction metadata via `tr.getMeta(this)`, which never resolved inside a plain function and silently broke upload placeholder tracking; now reads via the actual `PluginKey` (ports upstream [steven-tey/novel#493](https://github.com/steven-tey/novel/pull/493)).
- Slash-command popup could drift out of view or overlap page edges while scrolling; added tippy's `sticky` plugin with `flip`/`preventOverflow` popper modifiers (ports upstream [steven-tey/novel#377](https://github.com/steven-tey/novel/pull/377)).
- Removed the deprecated `downlevelIteration` compiler option from the shared base `tsconfig`; every workspace package already targets `ESNext`, where the option is a no-op, and TypeScript warns it will stop working in 7.0.
