# Resume

Vue 3 + TypeScript + Vite app that reads language-specific markdown files from `resumes/` and renders the resume as HTML, styled with Tailwind CSS.

## Structure

- `resumes/resume-{langCode}.md` is the content source pattern
- `src/pages/index.ts` resolves the active language file and converts the content into HTML
- `src/pages/index.vue` renders the parsed resume
- `src/router/index.ts` keeps the app on the single resume route
- `src/style.css` imports Tailwind, defines the resume shell, and includes print styles for paper/PDF output
- the navigation rail includes a PDF download action
- the web view uses the `?lang=` query parameter for the active language switch
- document metadata is updated from the active language and route title

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
