# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers deciding whether to interview. They open the résumé on screen via a link or as a saved PDF.

## Product Purpose

A résumé renderer for Marcos (default) and Camila (`?person=camila`, retail growth positioning). Content lives in Markdown under `resumes/`; success is a reader quickly understanding the candidate's trajectory and value.

## Positioning

One codebase renders the same content as a web page and a print/PDF output, in several languages (`?lang=`) and a compact density (`?compact=1`).

## Operating Context

Web and PDF are equally important and share one CSS path (browser print flow). Compact mode targets a tight print fit.

## Capabilities and Constraints

- Vue 3 + TypeScript + Vite + Tailwind CSS v4; single root route; PWA.
- `resumes/**/*.md` is the content source of truth; `src/pages/index.ts` parses to HTML, `src/pages/index.vue` is presentation only (see AGENTS.md).
- Camila's résumé stays off the navigation and opens only via query string.
- Requested direction (user, this session): centered layout organised as a roadmap; remove the navbar on the web version; add storytelling on web; a more generic, neutral version for PDF.

## Evidence on Hand

Real résumé content in `resumes/`. Do not fabricate roles, metrics or claims.

## Product Principles

- Content is fixed; only presentation changes.
- Web and PDF must both stay first-class.
- Skimmability for a recruiter comes first.
