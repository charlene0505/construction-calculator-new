# Meridian Bank — Construction Cost Calculator

A React + Tailwind CSS rebuild of construction cost calculator, redesigned for a more modern and professional look

Check the live link here [Constrcution Cost Calculator](https://construction-calculator-new.vercel.app/)

## Redesign & improvements

This project redesigns the Construction Cost Calculator to give it a more modern and professional look with good responsiveness.

- **Live two-panel layout.** Inputs sit in a numbered-step panel (Property details → Size & layout → Features → Finish level) on the left; a sticky result panel on the right updates on every keystroke/selection, instead of a form you complete before a result or CTA appears.
- **Four finish tiers, evenly stepped.** Economy / Standard / Premium / Luxury are preserved, mapped to a consistent ±step multiplier band rather than an uneven jump between tiers.
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

