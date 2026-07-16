# Meridian Bank — Construction Cost Calculator

A React + Tailwind CSS rebuild of construction cost calculator, redesigned for a more modern and professional look

## Redesign & improvements

This project redesigns [Duotax's Construction Cost Calculator](https://duotax.com.au/construction-cost-calculator/) as a bank-branded lending tool. Duotax's original is a single-column form — property type, completion year, state, build type, finish level, floor area, bedrooms, floors, wall type, then four feature checkboxes (basement, elevator, mezzanine, ducted air-conditioning) — filled in top to bottom, with a low/high estimate and an "Order Initial Cost Report" CTA appearing once the form is complete.

The underlying cost logic — property/wall base rates, storey and bedroom factors, and a Building Cost Index (BCI) table for location + completion year — is carried over from Duotax's calculation, but the experience is rebuilt around a lender's use case:

- **Live two-panel layout.** Inputs sit in a numbered-step panel (Property details → Size & layout → Features → Finish level) on the left; a sticky result panel on the right updates on every keystroke/selection, instead of a form you complete before a result or CTA appears.
- **Transparent factors panel.** A "What affects your estimate" list and the applied location & year index sit next to the figure, so the estimate doesn't read as a black box.
- **Meridian Bank identity.** Reskinned with a bank nav bar, brand color palette, and typography (Inter Tight / Inter / IBM Plex Mono) centralized as Tailwind v4 design tokens, replacing Duotax's site chrome.
- **Four finish tiers, evenly stepped.** Economy / Standard / Premium / Luxury are preserved, mapped to a consistent ±step multiplier band rather than an uneven jump between tiers.
- **Simplified feature set.** This iteration keeps only the ducted air-conditioning toggle — basement, elevator, and mezzanine were dropped to keep the first release focused, not because their pricing was inaccurate.
- **Responsive by default.** The finish-level segmented control collapses into a native `<select>` on narrow viewports instead of squeezing four buttons into a small width.
- **Componentized React implementation.** `Header`, `Title`, and `Calculator` components, with `FeatureToggle` and `TriToggle` as reusable controls, cost logic isolated in a `useCalculator` hook, and reference data (rate tables, BCI dataset) kept separate in `src/data.jsx` — so the underlying rates can be updated without touching calculation logic or markup.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`

## Project structure

```
src/
├── App.jsx                    # page composition: Header, Title, Calculator
├── data.jsx                   # rate tables, BCI index, option lists (reference data)
├── index.css                  # Tailwind import, design tokens, shared "input" utility
├── hooks/
│   └── useCalculator.js       # form state + cost calculation (useMemo)
└── componants/
    ├── Header.jsx              # bank nav bar
    ├── Title.jsx                # page heading
    ├── Calculator.jsx           # input panel (steps 1–4) + result panel
    ├── Toggle.jsx                # reusable Yes/No segmented control
    └── Tritoggle.jsx             # reusable segmented control / mobile dropdown
```

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Cost model notes

- Base rates, wall-type points, and the BCI location/year index mirror Duotax's calculation structure but haven't been independently re-verified against a live quantity-surveyor rate table.
- `buildType` is collected in the UI but not yet factored into the calculation — this matches Duotax's own form, where the build type field also isn't referenced by the pricing formula.
