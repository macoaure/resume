# Resume

A Vue 3 + TypeScript + Vite app that renders language-specific markdown resumes as a styled, installable web page, with PDF export and offline support.

**Live:** https://macoaure.github.io/resume/

## Stack

- [Vue 3](https://vuejs.org/) + [Vue Router](https://router.vuejs.org/) — single resume route, content-driven
- [Vite](https://vite.dev/) — dev server and build
- [Tailwind CSS](https://tailwindcss.com/) — layout, shell, and print styles
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) — installable manifest, icons, offline service worker

## Project structure

```
resumes/
  resume-{langCode}.md           default person (Marcos), one file per language
  resume-compact-{langCode}.md   compact source for the default person
  {person}/resume-*.md           separate resume for another person (e.g. camila/)
src/
  pages/
    index.ts             resolves the active language file, parses markdown to HTML
    index.vue            renders the parsed resume
  router/
    index.ts             single resume route
  style.css              Tailwind imports, resume shell, print styles
public/
  favicon.svg, pwa-*.png, apple-touch-icon.png   PWA icons
.github/workflows/
  deploy.yml              builds and deploys to GitHub Pages on push to main
```

## Content

- Add or edit the default resume by creating/updating `resumes/resume-{langCode}.md`
- Add a separate person under `resumes/{person}/resume-{langCode}.md` (Camila is hidden from the nav and opens only with `?person=camila`)
- Add or edit a compact resume by creating/updating `resume-compact-{langCode}.md` in the same folder
- The web view switches language via the `?lang=` query parameter, falling back to `pt-BR`
- Compact mode uses `?compact=1` and falls back to the full file when a compact file is missing
- Document title/description update to match the active person and language
- The navigation rail includes a PDF action that opens the browser print/save-as-PDF flow

## Development

```
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and deploys `dist/` to GitHub Pages. The build sets `GITHUB_PAGES=true` so Vite serves assets from the `/resume/` subpath.
