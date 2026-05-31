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
![VAPI](https://img.shields.io/badge/VAPI-5865F2?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMSAxNHYtNGgtMlY4aDZ2NGgtMnY0aC0yeiIvPjwvc3ZnPg==&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
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
| **AI Voice** | VAPI (`@vapi-ai/web` v2) |
| **Iconos** | `react-icons` (Feather — `fi`) + `@phosphor-icons/react` |
| **Formularios** | React Hook Form + Zod |
| **Fuentes** | Space Grotesk (Google Fonts via `next/font`) |
| **Pagos** | Stripe (`stripe@22`, `@stripe/stripe-js`) — Embedded Checkout, subscriptions |
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
    page.tsx                     # Dashboard home with MetricCards + InterviewList
  interview/[id]/
    layout.tsx                   # Interview session layout
    page.tsx                     # Live AI interview page (VAPI voice call)
  api/
    create-interview/route.ts    # POST — create a new interview
    interviews/route.ts          # GET  — list all interviews for current user
    interview/[id]/
      route.ts                   # GET  — fetch single interview
                                 # DELETE — delete interview (ownership check)
      complete/route.ts          # POST — save transcript + mark as completed
    checkout/route.ts            # POST — create Stripe Embedded Checkout session
    stripe/
      complete/route.ts          # GET  — Stripe return URL handler (updates DB + redirects)
      webhook/route.ts           # POST — Stripe webhook (checkout.completed, subscription.deleted)
      cancel/route.ts            # POST — cancel active Stripe subscription
      verify-session/route.ts    # GET  — legacy session verification (kept for reference)
    user/
      status/route.ts            # GET  — return current user plan from DB

components/
  shared/
    Navbar/                      # Sticky glassmorphism navbar
    HeroBlock/                   # Landing hero with TypeAnimation
    home/HowItWorks.tsx          # 4-step section with numbered cards
    pricing/Pricing.tsx          # 3-tier pricing cards
    contact/Contact.tsx          # CTA section with stats
    footer/Footer.tsx            # Footer with warning banner
    Spinner.tsx                  # Loading spinner
    Logo.tsx
  dashboard/
    sidebar/
      Sidebar.tsx                # AppSidebar (collapsible="icon")
      AccessStatus.tsx           # Selects plan component based on user plan
      StatusFreeTrial.tsx        # Free plan — amber card with upgrade button
      StatusPaid.tsx             # Pro plan — green card with cancel button
      StatusPremium.tsx          # Premium plan — purple card with cancel button
      UserFooter.tsx             # User photo + name + sign out button
    metric-card/
      MetricCard.tsx             # Horizontal metric card (icon + value + title)
    create-interview/
      BtnCreateInterview.tsx     # Button + Dialog trigger (responsive)
      FormCreateInterview.tsx    # Form: name + role + level + language selects
    interviews/
      InterviewList.tsx          # Table of interviews with status, delete + detail actions
    interview-image/
      InterviewImage.tsx         # Role avatar image for each interview row
    DashboardFooter.tsx          # Footer with security notice + contact links
    roleColors.ts                # Map of rol → Tailwind color classes
  shared/
    stripe/
      StripeDialogPayment.tsx    # Stripe Embedded Checkout dialog (EmbeddedCheckoutProvider)
      CancelPlanButton.tsx       # Inline cancel subscription button with Sonner toast
  interviews/
    messages/Messages.tsx        # Scrollable transcript panel during live call
    user-boxes/UserBoxes.tsx     # AI + User avatar boxes with call controls

data/
  Navbar.data.ts
  HowItWorks.data.ts
  pricing.data.ts
  sidebarItems.data.ts
  FormCreateInterview.data.ts    # roles[], difficulties[], languages[]
  infoContact.data.ts
  stripePlans.data.ts            # Stripe Price ID map per plan (pro / premium)

form/
  FormCreateInterview.form.ts    # Zod schema (name, rol, level, language)

lib/
  db.ts                          # Prisma singleton (PrismaNeon adapter, WS port 443)
  utils.ts
  vapi.sdk.ts                    # VAPI singleton instance
  plan.ts                        # Helper: resolve user plan from DB

types/
  index.ts                       # StatusCall enum, Speaker, Message, MessageVapi types

proxy.ts                         # Clerk middleware (Next.js 16 convention — protects routes)
app/not-found.tsx                # Custom 404 page ("coming in v2")

prisma/
  schema.prisma                  # Data models: User, Interview, Payment
  schema.applied.prisma          # Snapshot of last applied schema (used by migrate script)
  migrations/                    # Migration SQL files history

scripts/
  migrate.ts                     # Custom migration script (bypasses TCP 5432)
  sync-payment.ts                # One-time: sync existing Stripe sessions to DB
  test-payment.ts                # Diagnostic: show DB users, payments, Stripe sessions
  setup-stripe.ts                # Helper: configure Stripe products/prices

generated/
  prisma/                        # Prisma Client output (auto-generated)
```

---

## Environment Variables

Create a `.env` file at the project root with the following variables:

```env
# Neon PostgreSQL
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# VAPI
NEXT_PUBLIC_VAPI_API_KEY=...

# Stripe (real keys in .env, Price IDs in .env.local)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.local — Stripe Price IDs
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_...
```

---

## Authentication (Clerk)

Authentication is handled by **Clerk v7** with the `@clerk/nextjs` package.

### Routes

| Route | Access |
|---|---|
| `/` | Public (landing page) |
| `/sign-in` | Public (Clerk hosted UI) |
| `/dashboard` | Protected (requires sign in) |
| `/interview/[id]` | Protected (requires sign in) |

### Components used

- `ClerkProvider` — wraps the entire app in `app/layout.tsx`
- `Show when="signed-in/out"` — conditional rendering in dashboard header
- `SignInButton`, `SignUpButton`, `UserButton` — header auth controls
- `UserFooter` — sidebar footer with user photo, name and sign out button
- `clerkMiddleware()` — in `proxy.ts` (Next.js 16 middleware convention) protects all non-static routes
- `auth()` from `@clerk/nextjs/server` — server-side user session in API routes and dashboard page

---

## Database Setup (Neon + Prisma 7)

> **Important:** Neon's pooler URL uses WebSockets (port 443). The Prisma CLI needs TCP port 5432 for `prisma migrate dev`, which may be blocked on some networks. Use the custom migrate script instead.

### Schema models

```prisma
enum Plan {
  free
  pro
  premium
}

model User {
  id                   String      @id @default(cuid())
  email                String?     @unique
  name                 String?
  hasUsedFreeTrial     Boolean     @default(false)
  hasPaid              Boolean     @default(false)
  plan                 Plan        @default(free)
  paidAt               DateTime?
  canceledAt           DateTime?
  stripeCustomerId     String?
  stripeSubscriptionId String?
  createdAt            DateTime    @default(now())
  interviews           Interview[]
  payments             Payment[]
}

model Interview {
  id          String    @id @default(cuid())
  userId      String
  name        String
  rol         String
  level       String
  language    String    @default("English")
  createdAt   DateTime  @default(now())
  startedAt   DateTime  @default(now())
  completedAt DateTime?
  transcript  Json?
}

model Payment {
  id                   String   @id @default(cuid())
  userId               String
  amount               Float
  plan                 Plan     @default(free)
  stripeSessionId      String?  @unique
  stripeSubscriptionId String?
  status               String   @default("active")
  createdAt            DateTime @default(now())
}
```

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

## AI Interview — VAPI Integration

Live voice interviews are powered by **VAPI** (`@vapi-ai/web`).

### How it works

1. User creates an interview selecting: **name**, **role**, **level**, and **language** (English / Spanish)
2. The interview session page (`/interview/[id]`) connects to VAPI via `vapi.start(assistantId, overrides)`
3. The assistant receives `topic` (role + level) and `language` as `variableValues`
4. Real-time transcript is captured from VAPI `message` events (type `"transcript"`, `transcriptType: "final"`)
5. On call end, the transcript is saved via `POST /api/interview/[id]/complete`

### VAPI Assistant configuration

In the VAPI dashboard, configure your assistant with:

**First Message:**
```
Hi, I'm Alex, Head of Human Resources at TechView. We're going to conduct an interview about {{topic}}. I'll ask you 5 questions. Ready to begin?
```

**System Prompt** (key instruction at the top):
```
Always conduct this entire interview in {{language}}. Every question, response, and farewell must be in {{language}}.

You are Alex, a virtual technical interviewer with experience in recruitment processes for software development roles.
You are going to simulate a job interview focused on the topic: {{topic}}, with a total of 5 questions...
```

### Call lifecycle

| Event | Action |
|---|---|
| `call-start` | Sets status to `ACTIVE` |
| `call-end` | Sets status to `FINISHED` |
| `message` (transcript/final) | Appends message to transcript list, updates speaker indicator |
| `error` | Logs to console |

### Call controls

| Control | Description |
|---|---|
| **Start** | Initiates the VAPI call with assistant overrides |
| **End** | Stops the call, saves transcript, redirects to dashboard |
| **Mute/Unmute** | Toggles microphone via `vapi.setMuted()` |

---

## Dashboard

### Metrics (Dashboard page)

Computed server-side from the user's interviews:

| Metric | Description |
|---|---|
| **Completed** | Count of interviews with `completedAt` set |
| **Total** | Total interviews created |
| **Average Time** | Mean duration of completed interviews (minutes) |
| **Success Rate** | `100%` if any interview exists, `0%` otherwise |

### Interview List

- Displayed in a `<table>` with columns: **Date**, **Lessons**, **Level**, **Type**, **Status**, **Actions**
- **Status badges:**
  - `Completed` — green badge with check icon (when `completedAt` is set)
  - `Pending` — amber badge with clock icon (when `completedAt` is null)
- **Details button:** navigates directly if pending; opens a confirmation modal if already completed
  - Modal options: **Redo this interview** or **Create new interview**
- **Delete button:** opens a confirmation dialog, then calls `DELETE /api/interview/[id]`

### Sidebar

- `collapsible="icon"` — collapses to icon-only rail on desktop, Sheet drawer on mobile
- **Footer sections:**
  - Plan card (`StatusFreeTrial` / `StatusPaid` / `StatusPremium`)
  - `UserFooter` — user photo + name + sign out button

### Plan System

| Plan | Color | Description |
|---|---|---|
| `free` | Amber/Orange | Free Trial — shows upgrade button |
| `pro` | Green | Pro Plan — full access |
| `premium` | Purple | Premium — unlimited + exclusive features |

---

## API Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/create-interview` | Creates a new interview for the authenticated user |
| `GET` | `/api/interviews` | Returns all interviews for the authenticated user |
| `GET` | `/api/interview/[id]` | Returns a single interview by ID |
| `DELETE` | `/api/interview/[id]` | Deletes an interview (verifies ownership) |
| `POST` | `/api/interview/[id]/complete` | Saves transcript and sets `completedAt` timestamp |
| `GET` | `/api/user/status` | Returns current user plan from DB |
| `POST` | `/api/checkout` | Creates a Stripe Embedded Checkout session |
| `GET` | `/api/stripe/complete` | Stripe return URL — verifies session, updates DB, redirects to /dashboard |
| `POST` | `/api/stripe/webhook` | Handles `checkout.session.completed` and `customer.subscription.deleted` |
| `POST` | `/api/stripe/cancel` | Cancels the user's active Stripe subscription |

All routes validate the Clerk session via `auth()` and return `401` if unauthenticated. The `DELETE` route additionally returns `403` if the interview doesn't belong to the requesting user.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run generate` | Regenerate Prisma Client from schema |
| `npm run migrate -- <name>` | Apply schema changes to Neon DB |
| `npx ts-node scripts/sync-payment.ts` | Sync existing Stripe sessions to DB (one-time) |
| `npx ts-node scripts/test-payment.ts` | Show DB users, payments and Stripe sessions |
| `npm run lint` | Run ESLint |
| `npm run format` | Prettier format all `.ts/.tsx` files |
| `npm run typecheck` | TypeScript type check (no emit) |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env   # then fill in the values

# 3. Generate Prisma client
npm run generate

# 4. Apply database migrations
npm run migrate -- init

# 5. Start development server
npm run dev
```

---

## Changelog

### Interview Session (VAPI) — `interview` branch
- Live AI voice interview page at `/interview/[id]`
- VAPI SDK singleton in `lib/vapi.sdk.ts`
- `UserBoxes` component: AI + User avatar cards with animated speaking indicators
- `Messages` component: real-time scrollable transcript during the call
- `StatusCall` enum: `INACTIVE | CONNECTING | ACTIVE | FINISHED`
- Call controls: Start, End (saves transcript), Mute/Unmute
- `POST /api/interview/[id]/complete` — persists transcript as JSON + sets `completedAt`
- `endCall` fix: toast and redirect only trigger on API success, error toast on failure
- Language support (English / Spanish) via VAPI `variableValues.language`
- `language` field added to `Interview` model with `@default("English")`
- Language selector added to `FormCreateInterview` (third select field)

### Dashboard — Interview List
- `InterviewList` refactored from CSS grid `div` to semantic `<table>` with `<thead>/<tbody>/<tr>/<td>`
- **Status column** with `Completed` (green) / `Pending` (amber) badges
- **Delete button** with `Dialog` confirmation modal per row
- `DELETE /api/interview/[id]` route with ownership verification (403 on mismatch)
- **Details button** behavior: navigates directly if pending; shows "Already Completed" modal if done
  - Modal options: Redo interview or open Create New Interview form
- Optimistic UI: deleted rows removed from state immediately without page reload
- `toast.error` added to `FormCreateInterview` catch block for visible API error feedback

### Payments & Subscriptions — `payments` branch
- **Stripe Embedded Checkout** (`ui_mode: "embedded_page"`) with `EmbeddedCheckoutProvider` + `EmbeddedCheckout`
- `POST /api/checkout` — creates Stripe checkout session (subscription mode, `pro` / `premium`)
- `GET /api/stripe/complete` — server-side return URL handler: verifies payment, `upsert` User plan in DB, creates Payment record, redirects to `/dashboard`
- `POST /api/stripe/webhook` — handles `checkout.session.completed` (full data save) and `customer.subscription.deleted` (resets plan to `free`)
- `POST /api/stripe/cancel` — cancels active subscription, resets User to `plan: free`, marks `canceledAt`, updates Payment status to `"canceled"`
- `GET /api/user/status` — returns current user plan from DB for sidebar `AccessStatus`
- **Plan enum** added to Prisma schema: `free | pro | premium`
- **User** extended with `plan`, `canceledAt`, `stripeSubscriptionId` fields
- **Payment** extended with `plan`, `stripeSessionId` (unique), `stripeSubscriptionId`, `status` fields
- `AccessStatus` starts as `null` (no Free Trial flash while loading)
- `CancelPlanButton` in `StatusPaid` / `StatusPremium` — in-line cancel with Sonner toast
- `StripeDialogPayment` — dialog with Stripe embedded checkout UI
- `lib/plan.ts` — helper to resolve user plan from DB
- `proxy.ts` replaces `middleware.ts` (Next.js 16 middleware convention for Clerk)
- Custom 404 page at `app/not-found.tsx` — styled with brand colors, "coming in v2" badge
- `DashboardFooter` — security notice (no real card data) + contact links
- `scripts/sync-payment.ts` — one-time sync of existing Stripe sessions to DB
- `scripts/test-payment.ts` — diagnostic: show DB users, payments, Stripe sessions

### Interview Details — `interview-details` branch
- New page at `/dashboard/interview/[id]` — interview summary with full transcript viewer
- **Hero header**: centered layout with gradient strip (azul → verde), animated orbs, status badge (`Completed` / `Pending`), metadata chips (Role · Level · Language · Date)
- **Back to Dashboard** button with animated left-arrow, outside the hero card
- **`InfoCard` component** (`components/interviews/info/InfoCard.tsx`): glassmorphism card with gradient icon container, label + value, hover effects
- **`TranscriptBox` component** (`components/interviews/info/TranscriptBox.tsx`): chat-bubble transcript viewer
  - AI messages on the **left** (azul, `FiCpu` avatar)
  - User messages on the **right** (verde, `FiUser` avatar)
  - Ordered oldest → newest (reverses DB prepend order)
  - Empty state with `FiMessageSquare` placeholder
- **`InterviewList` action buttons** updated: Go Interview (`FiEye`, verde) · Details (`FiFileText`, azul) · Delete (dialog)
- Interview name in list is now a clickable `<Link>` to the details page
- **Responsiveness fixes**: `Messages.tsx` max-width typo, live interview header (`flex-col sm:flex-row`), `MetricCard` value `text-2xl md:text-3xl`

---

## Branches

| Branch | Purpose |
|---|---|
| `main` | Stable production code |
| `home-page` | Landing page (merged ✓) |
| `dashboard` | Dashboard + Auth (merged ✓) |
| `interview` | AI interview session + VAPI (merged ✓) |
| `interview-details` | Interview summary page + transcript viewer (merged ✓) |
| `payments` | Stripe subscriptions, plan management, custom 404, dashboard footer (merged ✓) |

---

<div align="center">

Desarrollado con ❤️ por [Errold Núñez](https://www.linkedin.com/in/errold-n%C3%BA%C3%B1ez-s%C3%A1nchez) · Costa Rica 🇨🇷

[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github&style=flat-square)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin&style=flat-square)](https://linkedin.com/in/errold-n%C3%BA%C3%B1ez-s%C3%A1nchez)
[![Email](https://img.shields.io/badge/Email-errold222@gmail.com-D14836?logo=gmail&style=flat-square)](mailto:errold222@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+506_7802_7211-25D366?logo=whatsapp&logoColor=white&style=flat-square)](https://wa.me/50678027211)

</div>
