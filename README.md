# TechView — AI Interview Practice

An AI-powered platform for interview practice aimed at IT professionals. Built with Next.js, Tailwind CSS, and shadcn/ui.

---

## Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-00E699?style=for-the-badge&logo=postgresql&logoColor=black)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)

</div>

| Categoría | Tecnología |
|---|---|
| **Framework** | Next.js 16 (Turbopack) |
| **Lenguaje** | TypeScript |
| **Estilos** | Tailwind CSS v4 |
| **Componentes UI** | shadcn/ui (base-ui primitives) |
| **Autenticación** | Clerk (`@clerk/nextjs` v7) |
| **Base de datos** | Neon (PostgreSQL serverless) |
| **ORM** | Prisma 7 (`prisma-client` generator) |
| **Iconos** | `react-icons` (Feather — `fi`) + `@phosphor-icons/react` |
| **Formularios** | React Hook Form + Zod |
| **Fuentes** | Space Grotesk (Google Fonts via `next/font`) |
| **Animaciones** | `react-type-animation`, `tw-animate-css` |

---

## Project Structure

```
app/
  layout.tsx                     # Root layout (ClerkProvider + ThemeProvider)
  (root)/page.tsx                 # Landing page
  (auth)/
    layout.tsx                   # Auth layout (centered, HeroBlock-style bg)
    sign-in/[[...sign-in]]/      # Clerk Sign In page
  (dashboard)/dashboard/
    layout.tsx                   # Dashboard layout (header + AppSidebar)
    page.tsx                     # Dashboard home with MetricCards

components/
  shared/
    Navbar/                      # Sticky glassmorphism navbar
    HeroBlock/                   # Landing hero with TypeAnimation
    home/HowItWorks.tsx          # 4-step section with numbered cards
    pricing/Pricing.tsx          # 3-tier pricing cards
    contact/Contact.tsx          # CTA section with stats
    footer/Footer.tsx            # Footer with warning banner
    Logo.tsx
  dashboard/
    sidebar/
      Sidebar.tsx                # AppSidebar (collapsible="icon")
      AccessStatus.tsx           # Selects plan component based on user plan
      StatusFreeTrial.tsx        # Free plan — amber card with upgrade button
      StatusPaid.tsx             # Pro plan — green card
      StatusPremium.tsx          # Premium plan — purple card
      UserFooter.tsx             # User photo + name + sign out button
    metric-card/
      MetricCard.tsx             # Horizontal metric card (icon + value + title)
    create-interview/
      BtnCreateInterview.tsx     # Button + Dialog trigger (responsive)
      FormCreateInterview.tsx    # Form with name input + role/level selects

data/
  Navbar.data.ts
  HowItWorks.data.ts
  pricing.data.ts
  sidebarItems.data.ts
  FormCreateInterview.data.ts
  infoContact.data.ts

form/
  FormCreateInterview.form.ts    # Zod schema for the interview form

lib/
  db.ts                          # Prisma singleton (PrismaNeon adapter, WS port 443)
  utils.ts

middleware.ts                    # Clerk middleware (protects routes)

prisma/
  schema.prisma                  # Data models: User, Interview, Payment
  schema.applied.prisma          # Snapshot of last applied schema
  migrations/                    # Migration SQL files history

scripts/
  migrate.ts                     # Custom migration script (bypasses TCP 5432)

generated/
  prisma/                        # Prisma Client output (auto-generated)
```

---

## Authentication (Clerk)

Authentication is handled by **Clerk v7** with the `@clerk/nextjs` package.

### Setup

Add your Clerk keys to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

### Routes

| Route | Access |
|---|---|
| `/` | Public (landing page) |
| `/sign-in` | Public (Clerk hosted UI) |
| `/dashboard` | Protected (requires sign in) |

### Components used

- `ClerkProvider` — wraps the entire app in `app/layout.tsx`
- `Show when="signed-in/out"` — conditional rendering in dashboard header
- `SignInButton`, `SignUpButton`, `UserButton` — header auth controls
- `UserFooter` — sidebar footer with user photo, name and sign out button
- `clerkMiddleware()` — in `middleware.ts` protects all non-static routes
- `auth()` from `@clerk/nextjs/server` — server-side user session in dashboard page

---

## Database Setup (Neon + Prisma 7)

> **Important:** Neon's pooler URL uses WebSockets (port 443). The Prisma CLI needs TCP port 5432 for `prisma migrate dev`, which may be blocked on some networks. Use the custom migrate script instead.

### First time setup

1. Add your Neon connection string to `.env`:
   ```env
   DATABASE_URL="postgresql://..."
   ```

2. Generate the Prisma Client:
   ```bash
   npm run generate
   ```

3. Apply the initial migration:
   ```bash
   npm run migrate -- init
   ```

### After changing `prisma/schema.prisma`

```bash
npm run generate
npm run migrate -- describe_your_change
```

### How the migrate script works

`scripts/migrate.ts` replaces `prisma migrate dev` for networks where TCP port 5432 is blocked:

1. Diffs `prisma/schema.applied.prisma` against `prisma/schema.prisma`
2. Saves the generated SQL to `prisma/migrations/<timestamp>_<name>/migration.sql`
3. Executes the SQL against Neon via **WebSockets (port 443)**
4. Updates `prisma/schema.applied.prisma` as the new snapshot

---

## Dashboard

### Header
- Transparent glassmorphism pill that adapts to the sidebar width (open/closed)
- `SidebarTrigger` integrated inside the header alongside the Logo
- Clerk `Show` component renders auth buttons or `UserButton` based on session state

### Sidebar
- `collapsible="icon"` — collapses to icon-only rail on desktop, Sheet drawer on mobile
- Mobile background fixed to match desktop dark theme via `--sidebar` CSS variable
- **Footer sections:**
  - Plan card (`StatusFreeTrial` / `StatusPaid` / `StatusPremium`) — upgradeable
  - `UserFooter` — user photo + name + sign out button with red hover state

### Plan System

| Plan | Color | Description |
|---|---|---|
| `free` | Amber/Orange | Free Trial — shows upgrade button |
| `pro` | Green | Pro Plan — full access |
| `premium` | Purple | Premium — unlimited + exclusive features |

### Dashboard Page Metrics
- **Completed** interviews count
- **Total** interviews count
- **Average duration** (minutes)
- **Success rate** (%)

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run generate` | Regenerate Prisma Client from schema |
| `npm run migrate -- <name>` | Apply schema changes to Neon DB |
| `npm run lint` | Run ESLint |
| `npm run format` | Prettier format all `.ts/.tsx` files |
| `npm run typecheck` | TypeScript type check (no emit) |

---

## Changelog

### Authentication (Clerk)
- Integrated `@clerk/nextjs` v7 with `ClerkProvider` wrapping the full app
- `clerkMiddleware()` applied in `middleware.ts` for route protection
- `Show when="signed-in/out"` replaces deprecated `SignedIn`/`SignedOut` components (Clerk v7)
- `UserFooter` sidebar component: photo, full name, sign out via `useClerk().signOut()`
- Auth layout (`app/(auth)/layout.tsx`) with HeroBlock-style background (orbs + grid overlay)
- Added `img.clerk.com` and `images.clerk.dev` to `next.config.mjs` `remotePatterns`

### Dashboard — Header & Layout
- Header moved inside `SidebarProvider` so it adapts to sidebar open/closed state
- Transparent glassmorphism pill header (no dark background strip)
- `SidebarTrigger` moved into header left side alongside Logo
- `pl-6` on header to avoid collision with collapsed sidebar border

### Dashboard — Plan Status
- `AccessStatus` refactored: `type Plan = "free" | "pro" | "premium"` with `// TODO` for real logic
- `StatusFreeTrial`: amber card with "Actualizar plan →" gradient button
- `StatusPaid`: green card confirming full access
- `StatusPremium`: new purple card for premium tier

### Dashboard — Sidebar
- `AppSidebar` built with shadcn/ui `collapsible="icon"` mode
- Mobile sidebar background fixed: `--sidebar` CSS variable set to `#0e2b43` (azul-950)
- `UserFooter`: user photo (`next/image`), full name truncated, "Cerrar sesión" red hover button

### Dashboard — Metrics
- `MetricCard` redesigned: horizontal layout (large icon left, value + title right)
- Glassmorphism card with `bg-white/5 backdrop-blur-sm`, border + hover states

### Database
- Prisma 7 setup with `prisma-client` generator outputting to `./generated/prisma`
- `lib/db.ts`: uses `PrismaNeon` adapter over WebSockets — no TCP 5432 required at runtime
- Custom `npm run migrate` script bypasses TCP port 5432
- Schema models: `User`, `Interview`, `Payment`

### Landing Page
- `Navbar`: sticky glassmorphism pill, `NavbarMovile` animated hamburger/X toggle
- `HeroBlock`: decorative orbs, CSS grid overlay, badge, gradient heading via `TypeAnimation`, stats row
- `HowItWorks`: numbered steps, connector lines, glass cards
- `Pricing`: 3 plans (Free / Pro / Premium) with "Most Popular" badge
- `Contact`: stats grid with glass cards
- `Footer`: warning banner, columns, dynamic copyright year

---

## Branches

| Branch | Purpose |
|---|---|
| `main` | Stable production code |
| `home-page` | Landing page (merged ✓) |
| `dashboard` | Dashboard + Auth (merged ✓) |

---

## Getting Started

```bash
npm install
npm run generate
npm run dev
```

---

<div align="center">

Desarrollado con ❤️ por [Errold Núñez](https://www.linkedin.com/in/errold-n%C3%BA%C3%B1ez-s%C3%A1nchez) · Costa Rica 🇨🇷

[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github&style=flat-square)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin&style=flat-square)](https://linkedin.com/in/errold-n%C3%BA%C3%B1ez-s%C3%A1nchez)

</div>

## Project Structure

```
app/
  layout.tsx                     # Root layout with Space Grotesk font
  (root)/page.tsx                 # Landing page
  (dashboard)/dashboard/
    layout.tsx                   # Dashboard layout with AppSidebar
    page.tsx                     # Dashboard home

components/
  shared/
    Navbar/                      # Sticky glassmorphism navbar
    HeroBlock/                   # Landing hero with TypeAnimation
    home/HowItWorks.tsx          # 4-step section with numbered cards
    pricing/Pricing.tsx          # 3-tier pricing cards
    contact/Contact.tsx          # CTA section with stats
    footer/Footer.tsx            # Footer with warning banner
    Logo.tsx
  dashboard/
    sidebar/
      Sidebar.tsx                # AppSidebar (collapsible="icon")
      AccessStatus.tsx           # Plan status widget in sidebar footer
      StatusPaid.tsx             # Shown when hasPaid = true
      StatusFreeTrial.tsx        # Shown when statusFree = true
    create-interview/
      BtnCreateInterview.tsx     # Button + Dialog trigger (responsive)
      FormCreateInterview.tsx    # Form with name input + role/level selects

data/
  Navbar.data.ts
  HowItWorks.data.ts
  pricing.data.ts
  sidebarItems.data.ts           # Dashboard nav items with Phosphor icons
  FormCreateInterview.data.ts    # roles[] and difficulties[] with IconType icons
  infoContact.data.ts

form/
  FormCreateInterview.form.ts    # Zod schema for the interview form

lib/
  db.ts                          # Prisma singleton (PrismaNeon adapter, WS port 443)
  utils.ts

prisma/
  schema.prisma                  # Data models: User, Interview, Payment
  schema.applied.prisma          # Snapshot of last applied schema (used by migrate script)
  prisma.config.ts               # Prisma 7 config (replaces datasource URL in schema)
  migrations/                    # Migration SQL files history

scripts/
  migrate.ts                     # Custom migration script (bypasses TCP 5432)

generated/
  prisma/                        # Prisma Client output (auto-generated, do not edit)
```

## Dashboard Sidebar

The sidebar uses `collapsible="icon"` mode from shadcn/ui and adapts automatically:

| State       | Behavior                                                      |
|-------------|---------------------------------------------------------------|
| Expanded    | Logo + name, full nav labels, "New Interview" button w/ text  |
| Collapsed   | Logo icon only, icon-only nav with tooltips, `+` icon button  |

**Sections:**
- **Header** — Terra Techview logo, links to `/` on click
- **New Interview button** — opens `FormCreateInterview` in a Dialog. Responsive: full-width text when expanded, square icon-only when collapsed
- **Menu** — nav items from `sidebarItems.data.ts`: Dashboard, Interviews, Calendar, Notifications, Search, Settings. Active item has a green left accent bar
- **Footer** — `AccessStatus` widget showing one of three states:
  - `hasPaid = true` → `StatusPaid`
  - `statusFree = true` → `StatusFreeTrial`
  - Neither → "Plan not activated" with upgrade dialog

## Database Setup (Neon + Prisma 7)

> **Important:** Neon's pooler URL uses WebSockets (port 443). The Prisma CLI needs TCP port 5432 for `prisma migrate dev`, which may be blocked on some networks. Use the custom migrate script instead.

### First time setup

1. Add your Neon connection string to `.env`:
   ```env
   DATABASE_URL="postgresql://..."
   ```

2. Generate the Prisma Client:
   ```bash
   npm run generate
   ```

3. Apply the initial migration:
   ```bash
   npm run migrate -- init
   ```

### After changing `prisma/schema.prisma`

Run **both** commands in order:

```bash
# 1. Regenerate Prisma Client types
npm run generate

# 2. Apply changes to the database
npm run migrate -- describe_your_change
```

Example:
```bash
npm run generate
npm run migrate -- add_avatar_to_user
```

### How the migrate script works

`scripts/migrate.ts` replaces `prisma migrate dev` for networks where TCP port 5432 is blocked:

1. Diffs `prisma/schema.applied.prisma` (last known DB state) against `prisma/schema.prisma` (current)
2. Saves the generated SQL to `prisma/migrations/<timestamp>_<name>/migration.sql`
3. Executes the SQL against Neon via **WebSockets (port 443)** — never blocked
4. Updates `prisma/schema.applied.prisma` as the new snapshot

## Available Scripts

| Command                      | Description                                   |
|------------------------------|-----------------------------------------------|
| `npm run dev`                | Start dev server with Turbopack               |
| `npm run build`              | Production build                              |
| `npm run start`              | Start production server                       |
| `npm run generate`           | Regenerate Prisma Client from schema          |
| `npm run migrate -- <name>`  | Apply schema changes to Neon DB               |
| `npm run lint`               | Run ESLint                                    |
| `npm run format`             | Prettier format all `.ts/.tsx` files          |
| `npm run typecheck`          | TypeScript type check (no emit)               |

## Adding shadcn components

```bash
npx shadcn@latest add button
```

## Changelog

### Dashboard — Sidebar
- `AppSidebar` built with shadcn/ui `collapsible="icon"` mode
- Header logo links to `/` landing page
- `BtnCreateInterview`: responsive — full-width with text when expanded, `size-9` square with `FiPlus` icon when collapsed. Uses `DialogTrigger render={}` pattern to avoid nested `<button>` hydration error
- `FormCreateInterview`: role and level fields use styled `Select` components with `roles[]` and `difficulties[]` data. Green accent for role, blue accent for level
- `AccessStatus`: footer widget with three plan states. Fixed `w-full`/`font-semibold` issues using `DialogTrigger render={}` pattern
- `data/FormCreateInterview.data.ts`: `icon` field typed as `IconType` from `react-icons`

### Database
- Prisma 7 setup with `prisma-client` generator outputting to `./generated/prisma`
- `lib/db.ts`: uses `PrismaNeon` adapter over WebSockets — no TCP 5432 required at runtime
- Custom `npm run migrate` script bypasses TCP port 5432 using `@neondatabase/serverless` WebSocket transport
- Schema models: `User`, `Interview`, `Payment`

### Navbar
- Replaced `@phosphor-icons/react` with `react-icons/fi` across all components
- `NavbarMovile`: animated hamburger/X toggle with staggered dropdown and backdrop close
- Fixed hydration mismatch with `suppressHydrationWarning` on `<html>`
- Fixed `Logo.tsx` Next.js image aspect ratio warning

### HeroBlock
- Decorative orbs, CSS grid overlay, badge pill, gradient animated heading via `TypeAnimation`, stats row

### HowItWorks
- Numbered steps with connector lines, glass cards with azul icon containers, hover lift effect

### Pricing
- 3 plans: Free, Pro (featured + "Most Popular" badge), Premium

### Contact
- Stats grid with glass cards and hover effects

### Footer
- Warning banner (student project — no real card data), brand/platform/connect columns, dynamic copyright year

### Section Transitions
- Chained gradients: `HeroBlock` → `HowItWorks` → `Pricing` → `Contact` → `Footer`

## Branches

| Branch      | Purpose                        |
|-------------|--------------------------------|
| `main`      | Stable production code         |
| `home-page` | Landing page (merged ✓)        |
| `dashboard` | Dashboard section (in progress)|

## Getting Started

```bash
npm install
npm run generate
npm run dev
```

<div align="center">

Desarrollado con ❤️ por [Errold Núñez](https://www.linkedin.com/in/errold-n%C3%BA%C3%B1ez-s%C3%A1nchez) · Costa Rica 🇨🇷

[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github&style=flat-square)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin&style=flat-square)](https://linkedin.com/in/errold-n%C3%BA%C3%B1ez-s%C3%A1nchez)
[![Email](https://img.shields.io/badge/Email-errold222@gmail.com-D14836?logo=gmail&style=flat-square)](mailto:errold222@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+506_7802_7211-25D366?logo=whatsapp&logoColor=white&style=flat-square)](https://wa.me/50678027211)

</div>
