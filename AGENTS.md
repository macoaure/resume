# Agent operating rules

These rules apply to any automated or assisted work in this repository.

## Primary objective

Preserve the current architecture:

- Vue Router keeps a single root route for the resume page
- `resume.md` is the source of truth for content
- `src/pages/index.ts` owns content parsing and HTML generation
- `src/pages/index.vue` is presentation only
- Tailwind CSS owns the visual system for shell, navigation, and resume framing

## Working rules

- Read `CONTEXT.md` before making structural changes.
- Prefer small, local edits over broad rewrites.
- Keep logic out of Vue templates unless it is purely presentational.
- Do not add framework starter/demo content back into the app.
- Keep the app centered on the single resume route unless the user asks for more pages.
- Update documentation when the architecture changes.
- Prefer Tailwind utility classes and small component-scoped style layers over large handcrafted CSS blocks.

## Verification rules

- Run the build after structural changes.
- Fix TypeScript and route resolution issues instead of suppressing them.
- If a change affects page loading or routing, verify the generated route behavior.

## File ownership rules

- `src/router/**` is for route creation and router setup.
- `src/pages/index.ts` is for parsing, data shaping, and page models.
- `src/pages/index.vue` is for page markup and template bindings.
- `src/style.css` is for global layout and visual system rules.
