---
name: Resume
description: A flat, monochrome A4 résumé sheet with a sticky utility rail, built to read on screen and print identically.
colors:
  ink: "#0c0a09"
  text: "#1c1917"
  muted: "#57534e"
  rule: "#d6d3d1"
  hairline: "#e7e5e4"
  wash: "#fafaf9"
  paper: "#ffffff"
typography:
  display:
    fontFamily: "Arial, sans-serif"
    fontSize: "1.82rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    letterSpacing: "0.025em"
  body:
    fontFamily: "Arial, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 400
  label:
    fontFamily: "Arial, sans-serif"
    fontSize: "0.65rem"
    letterSpacing: "0.32em"
rounded:
  none: "0px"
spacing:
  sm: "6px"
  md: "16px"
  sheet: "40px"
---

# Design System: Resume

## Overview

**Creative North Star: "The Printed Sheet"**

The page is an A4 sheet (max 210mm) set on white, with no color, no radius and no shadow on the sheet itself. Screen and print share one CSS path, so everything must survive being printed in black on paper.

A sticky left rail (13rem, xl and up) holds language, compact toggle, section links and PDF. It is utilitarian: square-cornered stone-grey buttons with a soft ambient shadow.

**Key Characteristics:**
- Monochrome stone neutrals; no accent color.
- Square corners everywhere.
- Single sans family (Arial) at tight, document-like sizes.
- Hierarchy by weight and hairline rules, not color.

## Colors

Stone greyscale on pure white.

### Neutral
- **Ink** (#0c0a09): name heading.
- **Text** (#1c1917): body and section headings.
- **Muted** (#57534e): contact lines, secondary labels.
- **Rule** (#d6d3d1): section underlines, nav borders.
- **Hairline** (#e7e5e4): sheet border, inactive controls.
- **Wash** (#fafaf9): inactive nav buttons.

**The No Accent Rule.** No hue is introduced; contrast comes from weight and ink density.

## Typography

**Font:** Arial, sans-serif (declared as `font-serif` in the theme).

### Hierarchy
- **Display** (600, 1.82rem): candidate name.
- **Title** (600, 1rem, tracking-wide, underlined with a hairline): section headings.
- **Body** (400, ~0.94rem): summary and bullets.
- **Label** (0.65rem, 0.32em, uppercase): nav captions.

## Layout

Centered grid, max `210mm + 16rem`: rail + sheet at xl, stacked below. Sheet padding scales 20px to 40px. Print mode drops the rail.

## Elevation & Depth

Flat. Only the nav rail carries a soft shadow (`0 14px 32px rgba(15,23,42,0.08)`).

## Shapes

Square. 1px borders in stone; PDF button uses a dashed border.

## Components

### Navigation rail
Bordered white panel; items are 36px-tall square buttons with a small index chip; active state inverts to stone-900 on white text; hover lifts 1px.

## Do's and Don'ts

### Do:
- **Do** keep every change legible when printed monochrome.
- **Do** leave content (Markdown) untouched.

### Don't:
- **Don't** add radius, gradients or color accents without explicit direction.
