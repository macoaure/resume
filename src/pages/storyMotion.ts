import { animate, hover, inView, scroll, stagger } from 'motion'

// Starts every motion effect of the story view and returns a function that stops them all.
// Content stays fully visible when the user prefers reduced motion.
export function startStoryMotion(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  const stops: Array<() => void> = []
  const hidden = { opacity: 0, y: 24 }

  // Hero: letters spring in one by one, then the rest of the header follows.
  const chars = document.querySelectorAll<HTMLElement>('.story-char')

  if (chars.length) {
    animate(
      chars,
      {
        opacity: [0, 1],
        y: [-60, 0],
        rotate: [-14, 0],
        scale: [0.6, 1],
      },
      { type: 'spring', bounce: 0.55, duration: 0.9, delay: stagger(0.055, { startDelay: 0.2 }) },
    )

    animate(
      document.querySelectorAll('.resume-content--story-header > :not(h1)'),
      { opacity: [0, 1], y: [16, 0] },
      { duration: 0.7, delay: stagger(0.15, { startDelay: 1 }) },
    )

    stops.push(
      hover(chars, (char) => {
        animate(char, { y: [0, -14, 0], rotate: [0, -6, 0], scale: [1, 1.12, 1] }, { duration: 0.45 })
      }),
    )
  }

  // Blocks outside the timeline rows fade in and rise when they enter the view, and again on the way back.
  const loose = document.querySelectorAll<HTMLElement>(
    '.resume-content--story > :not(.story-timeline), .story-timeline-title',
  )
  const years = document.querySelectorAll<HTMLElement>('.story-year')
  const stopsInRows = document.querySelectorAll<HTMLElement>('.story-stop')
  const yearHidden = { opacity: 0, x: -36 }
  const stopHidden = { opacity: 0, y: 28 }

  animate(loose, hidden, { duration: 0 })
  animate(years, yearHidden, { duration: 0 })
  animate(stopsInRows, stopHidden, { duration: 0 })

  stops.push(
    inView(
      loose,
      (el) => {
        animate(el, { opacity: 1, y: 0 }, { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] })

        return () => {
          animate(el, hidden, { duration: 0.4 })
        }
      },
      { margin: '0px 0px -12% 0px' },
    ),
  )

  // Each row: the year springs in from the rail, then its stops follow one after another.
  stops.push(
    inView(
      document.querySelectorAll<HTMLElement>('.story-row'),
      (row) => {
        const year = row.querySelector<HTMLElement>('.story-year')
        const rowStops = row.querySelectorAll<HTMLElement>('.story-stop')

        if (year) {
          animate(year, { opacity: 1, x: 0 }, { type: 'spring', bounce: 0.45, duration: 0.9 })
        }

        animate(
          rowStops,
          { opacity: 1, y: 0 },
          { duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: stagger(0.15, { startDelay: 0.2 }) },
        )

        return () => {
          if (year) {
            animate(year, yearHidden, { duration: 0.4 })
          }

          animate(rowStops, stopHidden, { duration: 0.4 })
        }
      },
      { margin: '0px 0px -12% 0px' },
    ),
  )

  // Technology map: tiles pop in group by group, and lift with a spring under the pointer.
  const tiles = document.querySelectorAll<HTMLElement>('.tech-family, .soft-card')
  const tileHidden = { opacity: 0, scale: 0.6, y: 20 }

  if (tiles.length) {
    animate(tiles, tileHidden, { duration: 0 })

    stops.push(
      inView(
        document.querySelectorAll<HTMLElement>('.tech-family, .soft-card'),
        (family) => {
          animate(family, { opacity: 1, scale: 1, y: 0 }, { type: 'spring', bounce: 0.35, duration: 0.8 })
          animate(
            family.querySelectorAll('.tech-member'),
            { opacity: [0, 1], y: [12, 0] },
            { duration: 0.5, delay: stagger(0.05, { startDelay: 0.25 }) },
          )

          return () => {
            animate(family, tileHidden, { duration: 0.3 })
          }
        },
        { margin: '0px 0px -10% 0px' },
      ),
    )

    stops.push(
      hover(tiles, (tile) => {
        animate(tile, { y: -4 }, { type: 'spring', bounce: 0.5, duration: 0.6 })

        return () => {
          animate(tile, { y: 0 }, { type: 'spring', bounce: 0.3, duration: 0.5 })
        }
      }),
    )
  }

  // Each timeline's rail fills as it scrolls through the middle of the screen; rows light up once it reaches them.
  document.querySelectorAll<HTMLElement>('.story-timeline').forEach((timeline) => {
    const rows = timeline.querySelectorAll<HTMLElement>('.story-row')

    stops.push(
      scroll(
        (progress: number) => {
          timeline.style.setProperty('--story-progress', progress.toFixed(4))

          const reachedAt = progress * timeline.offsetHeight

          rows.forEach((row) => row.classList.toggle('is-reached', reachedAt >= row.offsetTop + 40))
        },
        { target: timeline, offset: ['start 55%', 'end 55%'] },
      ),
    )
  })

  return () => {
    stops.forEach((stop) => stop())
    ;[...loose, ...years, ...stopsInRows, ...tiles].forEach((el) => {
      el.style.opacity = ''
      el.style.transform = ''
    })
  }
}
