# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Markdown-driven resume content per language (`resumes/resume-{langCode}.md`)
- `?lang=` query parameter to switch the active language, falling back to `pt-BR`
- PDF export from the navigation rail
- Installable PWA support (manifest, icons, offline service worker)
- GitHub Actions workflow deploying the static build to GitHub Pages on push to `main`
- `robots.txt` and a `noindex, nofollow` meta tag to keep the site out of search results

### Changed

- Rebuilt on Vue Router with a single resume route, replacing the Vite starter template
- Styling moved to Tailwind CSS, including dedicated print styles for paper/PDF output

[Unreleased]: https://github.com/macoaure/resume/commits/main
