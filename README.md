# TechView — AI Interview Practice

An AI-powered platform for interview practice aimed at IT professionals. Built with Next.js, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js (Turbopack)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (base-ui primitives)
- **Icons:** `react-icons` (Feather Icons — `fi`)
- **Fonts:** Space Grotesk (Google Fonts via `next/font`)
- **Animations:** `react-type-animation`

## Project Structure

```
app/
  layout.tsx              # Root layout with Space Grotesk font
  (root)/page.tsx         # Landing page

components/
  shared/
    Navbar/               # Sticky glassmorphism navbar
      Navbar.tsx
      NavbarDesktop.tsx
      NavbarMovile.tsx    # Animated hamburger/X dropdown for mobile
    HeroBlock/            # Landing hero section
    home/
      HowItWorks.tsx      # 4-step section with numbered cards
    pricing/
      Pricing.tsx         # 3-tier pricing cards (Free, Pro, Premium)
    contact/
      Contact.tsx         # CTA section with stats
    footer/
      Footer.tsx          # Footer with warning banner and TerraLink
    Logo.tsx

data/
  Navbar.data.ts          # Nav links with icon mapping
  HowItWorks.data.ts      # Steps data (title, description, icon)
  pricing.data.ts         # Pricing plans (icon, features, price, popular flag)
```

## Changelog

### Navbar
- Replaced `@phosphor-icons/react` with `react-icons/fi` across all components
- `NavbarDesktop`: icon map using `IconType` from `react-icons` root package
- `NavbarMovile`: animated hamburger/X toggle with staggered dropdown, backdrop close, and branding footer
- Fixed hydration mismatch by adding `suppressHydrationWarning` to `<html>` in `layout.tsx`
- Fixed `Logo.tsx` Next.js image aspect ratio warning with explicit `width`/`height` inline styles

### HeroBlock
- Full redesign: decorative orbs, subtle CSS grid overlay, badge pill, gradient animated heading via `TypeAnimation`, subtitle, dual CTAs (primary + ghost), stats row with 4 cards (Questions, Roles, AI Feedback, Free/No card needed)

### HowItWorks
- Fixed typos in data (`system design`, `AI`, `communications`)
- Replaced semantically incorrect icons (`FiTrello → FiMessageSquare`, `FiMove → FiTrendingUp`)
- Redesigned cards: numbered steps with connector lines on desktop, glass cards with azul icon containers, hover lift effect, visible descriptions

### Pricing
- 3 plans: Free (`FiGift`), Pro (`FiZap`, featured), Premium (`FiStar`)
- Glass cards with icon containers, feature checklists with `FiCheck`, price display, CTA buttons
- Pro card elevated with `scale`, top gradient accent line, and "Most Popular" badge
- Fixed typos and improved feature descriptions across all plans

### Contact
- CTA section with dual buttons (Start Free Trial + How it Works)
- Stats grid redesigned: glass cards with `FiUsers`, `FiTrendingUp`, `FiBriefcase` icons and hover effects
- Fixed typo "Hirign" → "Hiring"

### Footer
- Warning banner: alerts users not to enter real card data (student practice project)
- Brand column: logo, tagline, credit to Microweb-cr
- Platform column: quick links to sections and dashboard
- Connect column: TerraLink button linking to `https://terra-link-phi.vercel.app/MicroWeb-cr`
- Bottom bar: dynamic copyright year + disclaimer

### Section Transitions
- Chained gradients between all sections for smooth color blending:
  - `HeroBlock` (azul-900) → `HowItWorks` (transparent → verde-900) → `Pricing` (verde-900 → gris-900) → `Contact` (gris-900 → azul-950) → `Footer` (azul-950)

## Branches

| Branch      | Purpose                        |
|-------------|--------------------------------|
| `main`      | Stable production code         |
| `home-page` | Landing page (merged ✓)        |
| `dashboard` | Dashboard section (in progress)|

## Getting Started

```bash
npm install
npm run dev
```

## Adding shadcn components

```bash
npx shadcn@latest add button
```
