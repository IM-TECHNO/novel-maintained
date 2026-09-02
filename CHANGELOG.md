# Changelog

All notable changes to this fork are documented in this file.

This is a community-maintained fork of [steven-tey/novel](https://github.com/steven-tey/novel), which has been inactive since January 2025. This changelog tracks fork-specific maintenance work — fixes ported from stale upstream pull requests, dependency/compatibility repairs, and new work done here. Individual package version history (as published to npm) still lives in [`packages/headless/CHANGELOG.md`](packages/headless/CHANGELOG.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Fixed

- The AI extension (continue/improve/fix/shorter/longer/zap) was completely broken: it was built against ai SDK v3 (`ai/react`, `streamText().toDataStreamResponse()`, `maxTokens`), none of which exist on the current SDK. Rewrote `apps/web/app/api/generate/route.ts` and `ai-selector.tsx` against `ai@7`/`@ai-sdk/react@4`/`@ai-sdk/openai@4` (closes upstream [steven-tey/novel#473](https://github.com/steven-tey/novel/issues/473), [#445](https://github.com/steven-tey/novel/issues/445)).
- The `dev` and `typecheck` turbo tasks didn't depend on `packages/headless` (the `novel` package) being built, so a fresh clone running `pnpm dev` or `pnpm typecheck` hit `Cannot find module 'novel'` / `has no exported member ...` before `dist/` ever existed. This is the root cause behind upstream [steven-tey/novel#485](https://github.com/steven-tey/novel/issues/485), [#484](https://github.com/steven-tey/novel/issues/484), [#450](https://github.com/steven-tey/novel/issues/450), [#447](https://github.com/steven-tey/novel/issues/447), [#357](https://github.com/steven-tey/novel/issues/357), and [#327](https://github.com/steven-tey/novel/issues/327).
- AI generate route (`apps/web/app/api/generate/route.ts`) never passed the built system prompt to `streamText`, so AI commands ran with no instructions (ports upstream [steven-tey/novel#497](https://github.com/steven-tey/novel/pull/497)).
- `UploadImagesPlugin` read transaction metadata via `tr.getMeta(this)`, which never resolved inside a plain function and silently broke upload placeholder tracking; now reads via the actual `PluginKey` (ports upstream [steven-tey/novel#493](https://github.com/steven-tey/novel/pull/493)).
- Slash-command popup could drift out of view or overlap page edges while scrolling; added tippy's `sticky` plugin with `flip`/`preventOverflow` popper modifiers (ports upstream [steven-tey/novel#377](https://github.com/steven-tey/novel/pull/377)).
- Removed the deprecated `downlevelIteration` compiler option from the shared base `tsconfig`; every workspace package already targets `ESNext`, where the option is a no-op, and TypeScript warns it will stop working in 7.0.
