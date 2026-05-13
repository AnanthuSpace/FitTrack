# FitTrack - Fitness & Wellness Platform

A premium frontend-first fitness app built for technical assessment goals: beautiful landing page, polished 5-step onboarding, and a modern dashboard UI.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- shadcn/ui-style component architecture + Radix UI primitives
- Framer Motion (micro-interactions and transitions)
- React Hook Form + Zod (real-time validation)
- React Router v6
- Zustand (theme state)
- Recharts (dashboard chart)
- Lucide React icons

## Key Features

### Landing Page
- Sticky navbar with transparent-to-solid scroll behavior
- Mobile hamburger menu with slide-in drawer
- Hero section with animated visual treatment, CTAs, social proof
- Features grid, how-it-works timeline, testimonial cards, pricing tiers
- Final CTA with email input and polished footer

### 5-Step Authentication & Onboarding
- Step progress indicator (`Step X of 5`) + animated progress bar fill
- Smooth step transitions using Framer Motion
- Real-time inline validation (not only on submit)
- Password strength indicator
- Goal cards (multi-select), activity-level cards, profile setup section
- Optional skip links on steps 4 and 5
- Success completion state with celebratory animation and redirect to dashboard

### Dashboard
- Sidebar navigation (desktop) + mobile quick nav
- Welcome header with avatar
- Stats cards for calories, workouts, streak, and progress
- Today's workout checklist with empty-state fallback
- Weekly activity bar chart
- Quick actions row
- Skeleton loading placeholder support

### Design & UX
- Responsive layouts for mobile/tablet/desktop
- Reusable component system (`Button`, `Card`, `Input`, `Progress`, etc.)
- Dark mode toggle with persisted theme
- Focus styles, labels, and accessible controls

## Project Structure

```text
src/
  components/
    ui/              # reusable shadcn-style primitives
    theme-toggle.tsx
  data/
    mock.ts          # static content and chart data
  hooks/
    use-theme.ts
  lib/
    utils.ts
  pages/
    landing-page.tsx
    onboarding-page.tsx
    dashboard-page.tsx
  App.tsx
  main.tsx
```

## Setup

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run build
npm run lint
```
