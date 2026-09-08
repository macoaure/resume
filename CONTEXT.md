# Project context

This repository is a Vue 3 + TypeScript + Vite resume app styled with Tailwind CSS.

The current architecture is intentionally split into three layers:

- `resumes/resume-{langCode}.md` and `resumes/resume-compact-{langCode}.md` contain the resume source content for each language and density
- `src/pages/index.ts` contains the content resolution, parsing, and HTML generation logic
- `src/pages/index.vue` contains the Vue template that renders the parsed resume

## Product shape

The app is a resume renderer. The root page is the only user-facing route, and it reads the local resume content directly from the codebase. The UI renders only the parsed resume HTML, not the raw source. The content loader selects the best matching `resumes/resume-{langCode}.md` file based on the active language and falls back to `pt-BR`. When compact mode is active, it selects `resumes/resume-compact-{langCode}.md` first and falls back to the full version for that language. The web view exposes query-string controls using `?lang=` and `?compact=1`.
The stylesheet imports Tailwind CSS, defines the resume shell, and includes a dedicated print mode so the same page can be printed cleanly to paper or PDF. The page component also keeps the document title and description in sync with the active language and route metadata.
The navigation rail includes a PDF action that opens the browser print flow, keeping print and saved-PDF output on the same CSS path.

## Conventions

- Keep rendering concerns in Vue SFCs.
- Keep business logic, parsing, data shaping, and page models in plain TypeScript modules.
- Prefer small, explicit modules over large mixed-purpose components.
- Do not reintroduce unrelated demo pages, assets, or starter structure unless the app is being reset intentionally.

## Files that define the current structure

- `src/main.ts` bootstraps Vue and installs the router
- `src/App.vue` renders `<RouterView />`
- `src/style.css` defines the global layout and page styles
- `README.md` describes the current content and module conventions

## Expected future work

When changing the resume:

1. Add or update the appropriate `resumes/resume-{langCode}.md` or `resumes/resume-compact-{langCode}.md` file
2. Update the resolver/parser in `src/pages/index.ts` if the content format changes
3. Keep `src/pages/index.vue` focused on rendering the parsed output
