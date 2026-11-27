# Design System: Alexander Dial Portfolio

## 1. Visual Theme & Atmosphere

A calm, well-lit studio interface for a student developer who wants to be hired. The
page should read as competent and organized first, with a small amount of personality
(the dog punching through the wall on the home page) kept in its own clearly framed spot.

- **Density:** 4, "Daily App Balanced". Generous whitespace around headings, compact
  cards so a recruiter can scan every project without hunting.
- **Variance:** 5, "Offset Asymmetric". Split heroes and label-plus-content section rows.
  No centered hero on content pages. The home intro overlay is the one centered composition.
- **Motion:** 4, "Fluid CSS". Short staggered fade-up reveals on load, one perpetual
  pulse on the "open to roles" status dot, and tactile press feedback on buttons.

Every page shares the same frame: sticky nav, a page header (eyebrow, title, lead),
content sections on the canvas, a dark call-to-action band, then the footer.

## 2. Color Palette & Roles

- **Canvas** (#FAFAFA): page background
- **Surface** (#FFFFFF): cards, page headers, the hero
- **Ink** (#18181B): headings and primary text (Zinc-900, never pure black)
- **Body** (#3F3F46): paragraph text
- **Muted** (#71717A): metadata, captions, counts
- **Line** (#E4E4E7): 1px borders and dividers
- **Night** (#111113): CTA band, footer, home intro, homelab panel, logo tile
- **Fern** (#1F7A54): the single accent. Primary buttons, links, focus rings, active
  states, the targeted-card outline. HSL saturation about 59%.
- **Fern Strong** (#17603F): accent hover and pressed state
- **Fern Soft** (#E8F3ED): accent tint behind highlights and hovered links
- **Fern Bright** (#5CC497): accent for text on Night backgrounds only

One palette (Zinc) across every page. No warm or cool gray mixing. No gradients on
buttons, headings or bands.

## 3. Typography Rules

- **Display and body:** Geist, loaded through `next/font/google`. Headlines are
  semibold, tracked tight (-0.02em to -0.03em) and sized with `clamp()`. Hierarchy
  comes from weight and color before size.
- **Body:** Geist at 1rem minimum (1.125rem for leads), relaxed leading, lines capped
  at about 60 to 65 characters.
- **Mono:** Geist Mono for eyebrows, dates, counts and tech chips.
- **Banned:** Inter, generic serifs, all-caps headlines.

## 4. Component Stylings

- **Buttons:** 44px minimum height, 0.75rem radius, semibold label.
  - Primary: Fern fill with white text.
  - Secondary: white fill with a Line border.
  - On Night backgrounds, the secondary is a ghost button with a white/25 border.
  - Pressed state moves the button 1px down. No glows, no gradient fills.
- **Cards:** white Surface, 1px Line border, 1.25rem radius, and a soft shadow tinted
  with Ink at 4 to 8% opacity. On hover they lift 2px. Use them only for things you can
  act on: projects, skills, the contact form.
- **Chips:** pill shape in Geist Mono at 0.75rem with a Line border. A chip that links
  turns Fern on hover and grows to a 44px tap height on touch screens.
- **Inputs:** label above, Canvas fill, 1px Line border, and a Fern focus ring
  (3px at 20% opacity).
- **Targeted card:** when the URL hash points at a card, it gets a 2px Fern outline
  for 2.4 seconds after scrolling into view.

## 5. Layout Principles

- Content width is capped at 72rem, with side padding of 1rem, then 1.5rem from
  640px, then 2rem from 1024px.
- **Home hero:** a two-column split, text left (1.35fr) and headshot right (1fr).
  - On phones it stacks, with the name, pitch, both CTAs and the résumé link inside
    the first screen at 375x667.
- **Section rows:** on Skills, a sticky section label sits left (220px) with a skill
  grid right.
- **Grids:** project grids use 2 columns on desktop. No three-equal-card feature rows.
  - The home "Selected work" block is asymmetric: one large card plus two stacked.
- No horizontal scrolling rows anywhere. Every grid collapses to one column below 640px.
- Anchor targets use `scroll-margin-top: 6rem` so the sticky nav never covers them.

## 6. Motion & Interaction

- **Reveal:** content fades up 12px over 0.7s with `cubic-bezier(0.22, 1, 0.36, 1)`.
  Each item is delayed 70ms more than the one before it (the `--i` index).
- **Perpetual:** the status dot in the hero pulses on a 2.4s loop.
- **Animation rules:** animate only `transform` and `opacity`, and turn everything off
  under `prefers-reduced-motion`.
- **Home intro:** a fresh load of `/` plays a 1.8s intro with no click needed.
  - The logo pops in and the leaf springs into the brackets.
  - The name rises letter by letter, an accent line draws, then the dark curtain lifts.
  - The hero reveals start as the curtain moves, so the page is already arriving.
  - Client-side navigation back to Home skips it. Reduced-motion users never see it.
  - It is pure CSS, so it runs before hydration.

## 7. Logo

The mark is a leaf inside code brackets: developer work plus the "leafy" handle
used across leafyalex and leafyserver. It sits on a Night tile with white
brackets and a Fern Bright leaf. On dark backgrounds it inverts to a white tile,
Night brackets and a Fern leaf. The source lives in `components/Logo.js` and
`app/icon.svg` (the favicon). It stays legible down to 16px.

## 8. Cross-linking

Skills and projects link both ways:

- **Projects:** every project has an `id` slug and a `tech` list.
  - A tech chip that matches a skill card, or one of its frameworks, links to
    `/skills#<skill>`.
- **Skills:** every skill card lists "Used in" links to `/projects#<id>`.
  - Each framework lives under exactly one skill card, so every link has one target.
- **Career:** entries with a matching project link to it.

## 9. Anti-Patterns (Banned)

- No emojis in the UI (the 😎 logo is now the bracket-leaf mark)
- No Inter, no pure black, no neon or outer glows, no purple-blue gradients
- No proficiency bars, scores or gauges
- No invented metrics, testimonials or client logos
- No "Elevate", "Seamless", "Unleash" copy. Write in plain first person, sentence case.
- No "scroll to explore" hints or bouncing chevrons
- No custom cursors or cursor trails
- No em dashes in UI copy

## 10. Deliberate exceptions

The user's explicit requests take priority over the taste rules:

- **Two CTAs:** the hero and the CTA band keep a secondary "See my projects" button
  next to "Get in touch". The owner asked for it to push visitors toward projects.
- **"$1,000+":** this is a real, owner-provided revenue figure for TireDash Mobile.
  It is not an invented round number.
