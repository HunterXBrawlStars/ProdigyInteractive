# Prodigy Interactive Website V1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Launch an ultra-modern, conversion-focused V1 website for Prodigy Interactive that communicates services, showcases portfolio/client work, and includes a stubbed MattGPT assistant.

**Architecture:** Build a fast single-page React + TypeScript app (Vite) with section-based composition and content-driven data files so copy and links can be updated without touching layout code. Use MUI for accessibility-forward primitives, custom CSS variables for brand styling, and Framer Motion for purposeful animations (hero reveal, staggered cards, scroll-triggered sections). Keep backend-dependent features as clear stubs: team roster placeholders, contact submission placeholder, and MattGPT UI shell ready for future ChatGPT integration.

**Tech Stack:** Vite, React 18, TypeScript, MUI (`@mui/material` + Emotion), Framer Motion, React Icons, Vitest, React Testing Library, Playwright, ESLint, Prettier

---

## Product direction and approach selection

### Approach A (Recommended): Single-page premium marketing site
- Why: fastest path to launch, strongest conversion flow, fewer moving parts, mobile-first focus.
- Trade-off: fewer indexable route pages at launch.

### Approach B: Full multi-page site now (`/services`, `/portfolio`, `/about`, `/contact`)
- Why: stronger long-term SEO structure from day one.
- Trade-off: slower launch and higher design/content overhead now.

### Approach C: Hybrid (single-page now + hidden route scaffolding)
- Why: launch speed with easier future expansion.
- Trade-off: slightly more engineering upfront than Approach A.

**Chosen for V1 in this plan:** Approach A with routing-ready structure so migration to B is low-friction.

---

### Task 1: Bootstrap project and quality tooling

**Files:**
- Create: `package.json` (via Vite scaffold)
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `src/test/setupTests.ts`
- Create: `src/__tests__/app-smoke.test.tsx`
- Modify: `README.md`

**Step 1: Scaffold app and install dependencies**
Run:
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install @mui/material @emotion/react @emotion/styled framer-motion react-icons
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test eslint-config-prettier prettier
```
Expected: dependencies install with no fatal errors.

**Step 2: Write a failing smoke test**
Create `src/__tests__/app-smoke.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders Prodigy Interactive hero heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /prodigy interactive/i })
  ).toBeInTheDocument();
});
```

**Step 3: Run test to verify RED**
Run:
```bash
npm run test -- src/__tests__/app-smoke.test.tsx
```
Expected: FAIL because default scaffold heading does not match.

**Step 4: Minimal implementation for GREEN**
Modify `src/App.tsx` to include a heading containing `Prodigy Interactive`.

**Step 5: Verify GREEN and commit**
Run:
```bash
npm run test -- src/__tests__/app-smoke.test.tsx
```
Expected: PASS.
Commit:
```bash
git add .
git commit -m "chore: scaffold react app with test tooling"
```

---

### Task 2: Establish brand design system and global visual foundation

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/theme/theme.ts`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Test: `src/__tests__/theme-shell.test.tsx`

**Step 1: Write failing test for themed app shell**
Create `src/__tests__/theme-shell.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

it('shows primary CTA button in hero', () => {
  render(<App />);
  expect(
    screen.getByRole('button', { name: /book a strategy call/i })
  ).toBeInTheDocument();
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/theme-shell.test.tsx
```
Expected: FAIL (button missing).

**Step 3: Implement global brand system**
- Add logo-matching tokens in `src/styles/tokens.css` (deep navy, electric cyan, cool violet accents).
- Add gradient/noise/grid background and font declarations in `src/styles/global.css`.
- Create MUI theme in `src/theme/theme.ts` using custom palette and typography scale.
- Wrap app in `ThemeProvider` in `src/main.tsx`.
- Add hero CTA button text `Book a Strategy Call` in `src/App.tsx`.

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/theme-shell.test.tsx
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/main.tsx src/App.tsx src/theme/theme.ts src/styles/tokens.css src/styles/global.css src/__tests__/theme-shell.test.tsx
git commit -m "feat: add brand theme tokens and global visual foundation"
```

---

### Task 3: Model all site content in typed data files

**Files:**
- Create: `src/content/siteContent.ts`
- Create: `src/types/content.ts`
- Modify: `src/App.tsx`
- Test: `src/__tests__/content-model.test.ts`

**Step 1: Write failing test for required service and portfolio items**
Create `src/__tests__/content-model.test.ts`:
```ts
import { portfolioItems, services } from '../content/siteContent';

it('contains required service categories', () => {
  expect(services.map((s) => s.title)).toEqual(
    expect.arrayContaining([
      'Web Design & Hosting',
      'Mobile App Development',
      'Game Design & Development',
      'Technical Consulting',
      'Digital Marketing',
      'SEO & AIEO'
    ])
  );
});

it('contains existing client and product links', () => {
  const names = portfolioItems.map((p) => p.title);
  expect(names).toEqual(
    expect.arrayContaining([
      'Brawl Connections',
      'Brawl Stars-dle',
      'Power League Prodigy Draft Simulator',
      'November Roses',
      'The Podcast Trailer'
    ])
  );
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/content-model.test.ts
```
Expected: FAIL because content file does not exist yet.

**Step 3: Implement typed content model**
- Define `Service`, `PortfolioItem`, `ProcessStep`, `FaqItem`, and `TeamMemberStub` types.
- Add complete content arrays with required links and TODO placeholders where details are unknown.
- Include `mattGptStub` configuration text for future API integration.

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/content-model.test.ts
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/types/content.ts src/content/siteContent.ts src/__tests__/content-model.test.ts
git commit -m "feat: add typed content source for services portfolio and stubs"
```

---

### Task 4: Build navigation, hero, and social-proof strip

**Files:**
- Create: `src/components/layout/SiteHeader.tsx`
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/components/sections/ProofStrip.tsx`
- Create: `src/components/ui/GlowButton.tsx`
- Modify: `src/App.tsx`
- Test: `src/__tests__/hero-nav.test.tsx`

**Step 1: Write failing test for nav anchors and hero copy**
Create `src/__tests__/hero-nav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders primary navigation anchors', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
});

it('renders hero value proposition', () => {
  render(<App />);
  expect(
    screen.getByText(/ultra-modern products for ambitious businesses/i)
  ).toBeInTheDocument();
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/hero-nav.test.tsx
```
Expected: FAIL.

**Step 3: Implement minimal section shell**
- Header with anchor links and sticky blur backdrop.
- Hero with logo area (placeholder image path), value prop, and dual CTAs.
- Proof strip with 3-4 credibility stats (placeholder-safe labels).

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/hero-nav.test.tsx
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/components/layout/SiteHeader.tsx src/components/sections/HeroSection.tsx src/components/sections/ProofStrip.tsx src/components/ui/GlowButton.tsx src/App.tsx src/__tests__/hero-nav.test.tsx
git commit -m "feat: add sticky nav and conversion-oriented hero"
```

---

### Task 5: Build Services section with modern cards and animation

**Files:**
- Create: `src/components/sections/ServicesSection.tsx`
- Modify: `src/App.tsx`
- Test: `src/__tests__/services-section.test.tsx`

**Step 1: Write failing test for all services**
Create `src/__tests__/services-section.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders all core service cards', () => {
  render(<App />);
  expect(screen.getByText('Web Design & Hosting')).toBeInTheDocument();
  expect(screen.getByText('Mobile App Development')).toBeInTheDocument();
  expect(screen.getByText('SEO & AIEO')).toBeInTheDocument();
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/services-section.test.tsx
```
Expected: FAIL.

**Step 3: Implement services grid**
- Use content array mapping to animated card components.
- Include concise outcome-driven bullets per service.
- Add `id="services"` anchor target.

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/services-section.test.tsx
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/components/sections/ServicesSection.tsx src/App.tsx src/__tests__/services-section.test.tsx
git commit -m "feat: add animated services section"
```

---

### Task 6: Build portfolio matrix for products and clients

**Files:**
- Create: `src/components/sections/PortfolioSection.tsx`
- Modify: `src/content/siteContent.ts`
- Modify: `src/App.tsx`
- Test: `src/__tests__/portfolio-links.test.tsx`

**Step 1: Write failing test for external links**
Create `src/__tests__/portfolio-links.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders external portfolio links for known projects and clients', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /brawl connections/i })).toHaveAttribute(
    'href'
  );
  expect(screen.getByRole('link', { name: /november roses/i })).toHaveAttribute(
    'href'
  );
  expect(screen.getByRole('link', { name: /the podcast trailer/i })).toHaveAttribute(
    'href'
  );
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/portfolio-links.test.tsx
```
Expected: FAIL.

**Step 3: Implement portfolio section**
- Add tab-like filters (`Products`, `Client Work`, `Experiments`).
- Render card grid with title, short description, tech tags, and external link CTA.
- Add TODO notes for any unknown final URLs.

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/portfolio-links.test.tsx
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/components/sections/PortfolioSection.tsx src/content/siteContent.ts src/App.tsx src/__tests__/portfolio-links.test.tsx
git commit -m "feat: add portfolio matrix for products and client sites"
```

---

### Task 7: Build process, team, and testimonial placeholders

**Files:**
- Create: `src/components/sections/ProcessSection.tsx`
- Create: `src/components/sections/TeamSection.tsx`
- Create: `src/components/sections/TestimonialsSection.tsx`
- Modify: `src/App.tsx`
- Test: `src/__tests__/placeholder-sections.test.tsx`

**Step 1: Write failing test for placeholders**
Create `src/__tests__/placeholder-sections.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders placeholder content where details are pending', () => {
  render(<App />);
  expect(screen.getByText(/team profiles coming soon/i)).toBeInTheDocument();
  expect(screen.getByText(/case study metrics coming soon/i)).toBeInTheDocument();
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/placeholder-sections.test.tsx
```
Expected: FAIL.

**Step 3: Implement sections with explicit stub markers**
- Process timeline with discovery/build/launch/iterate steps.
- Team grid with placeholder names and role labels.
- Testimonials/case-study panel with clear `coming soon` placeholders.

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/placeholder-sections.test.tsx
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/components/sections/ProcessSection.tsx src/components/sections/TeamSection.tsx src/components/sections/TestimonialsSection.tsx src/App.tsx src/__tests__/placeholder-sections.test.tsx
git commit -m "feat: add process and placeholder credibility sections"
```

---

### Task 8: Build contact section with non-functional submission stub

**Files:**
- Create: `src/components/sections/ContactSection.tsx`
- Create: `src/lib/contactStub.ts`
- Modify: `src/App.tsx`
- Test: `src/__tests__/contact-stub.test.tsx`

**Step 1: Write failing test for stubbed submit behavior**
Create `src/__tests__/contact-stub.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

it('shows a stub message when contact form is submitted', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /send inquiry/i }));
  expect(
    screen.getByText(/contact workflow not connected yet/i)
  ).toBeInTheDocument();
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/contact-stub.test.tsx
```
Expected: FAIL.

**Step 3: Implement minimal contact stub**
- Form fields: name, email, company, project scope.
- On submit, prevent default and call `contactStubSubmit`.
- Show deterministic placeholder success message.

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/contact-stub.test.tsx
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/components/sections/ContactSection.tsx src/lib/contactStub.ts src/App.tsx src/__tests__/contact-stub.test.tsx
git commit -m "feat: add contact form with stubbed submission flow"
```

---

### Task 9: Build MattGPT chat widget stub shell

**Files:**
- Create: `src/components/chat/MattGPTLauncher.tsx`
- Create: `src/components/chat/MattGPTPanel.tsx`
- Create: `src/lib/mattGptStub.ts`
- Modify: `src/App.tsx`
- Test: `src/__tests__/mattgpt-stub.test.tsx`

**Step 1: Write failing test for chatbot shell**
Create `src/__tests__/mattgpt-stub.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

it('opens MattGPT panel from floating launcher', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /open mattgpt/i }));
  expect(screen.getByRole('heading', { name: /mattgpt/i })).toBeInTheDocument();
  expect(
    screen.getByText(/chatgpt integration coming soon/i)
  ).toBeInTheDocument();
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/mattgpt-stub.test.tsx
```
Expected: FAIL.

**Step 3: Implement chat stub UI**
- Floating action button in lower-right corner.
- Slide-in panel with message list and input disabled-state explanation.
- Stub response provider in `mattGptStub.ts` (no external API call yet).

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/mattgpt-stub.test.tsx
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/components/chat/MattGPTLauncher.tsx src/components/chat/MattGPTPanel.tsx src/lib/mattGptStub.ts src/App.tsx src/__tests__/mattgpt-stub.test.tsx
git commit -m "feat: add MattGPT interface stub"
```

---

### Task 10: Add SEO, metadata, and performance-friendly assets

**Files:**
- Modify: `index.html`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `public/site.webmanifest`
- Create: `public/assets/prodigy-logo.png` (provided logo export)
- Test: `src/__tests__/seo-tags.test.tsx`

**Step 1: Write failing test for canonical metadata rendered in document head**
Create `src/__tests__/seo-tags.test.tsx`:
```tsx
import { render } from '@testing-library/react';
import App from '../App';

it('sets document title for Prodigy Interactive', () => {
  render(<App />);
  expect(document.title).toMatch(/prodigy interactive/i);
});
```

**Step 2: Verify RED**
Run:
```bash
npm run test -- src/__tests__/seo-tags.test.tsx
```
Expected: FAIL.

**Step 3: Implement minimal SEO layer**
- Add title/description/OG tags in `index.html`.
- Set canonical domain placeholder `https://prodigyinteractive.io`.
- Add robots/sitemap stubs.
- Include logo asset in public assets path.

**Step 4: Verify GREEN**
Run:
```bash
npm run test -- src/__tests__/seo-tags.test.tsx
```
Expected: PASS.

**Step 5: Commit**
```bash
git add index.html public/robots.txt public/sitemap.xml public/site.webmanifest public/assets/prodigy-logo.png src/__tests__/seo-tags.test.tsx
git commit -m "feat: add baseline seo and public metadata assets"
```

---

### Task 11: Visual polish pass and responsive hardening

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/App.tsx`
- Modify: relevant section components for breakpoints
- Test: `tests/e2e/home.spec.ts`

**Step 1: Write failing E2E test for mobile and desktop key CTAs**
Create `tests/e2e/home.spec.ts`:
```ts
import { expect, test } from '@playwright/test';

test('home page shows hero CTA on desktop and mobile', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /book a strategy call/i })).toBeVisible();
});
```

**Step 2: Verify RED**
Run:
```bash
npx playwright test tests/e2e/home.spec.ts
```
Expected: FAIL initially until Playwright setup/config is complete.

**Step 3: Implement responsive/accessibility polish**
- Tune spacing/typography at `xs`, `sm`, `md`, `lg` breakpoints.
- Respect `prefers-reduced-motion` for non-essential animations.
- Ensure visible focus states and WCAG-compliant contrast.

**Step 4: Verify GREEN**
Run:
```bash
npx playwright test tests/e2e/home.spec.ts
```
Expected: PASS.

**Step 5: Commit**
```bash
git add src/styles/global.css src/App.tsx src/components tests/e2e/home.spec.ts
git commit -m "feat: finish responsive and accessibility polish"
```

---

### Task 12: Final verification and GitHub repo preparation

**Files:**
- Modify: `README.md`
- Create: `.env.example`
- Create: `.github/workflows/ci.yml`

**Step 1: Add CI-ready quality commands**
Document and wire commands:
- `npm run lint`
- `npm run test`
- `npm run build`

**Step 2: Run full verification suite**
Run:
```bash
npm run lint
npm run test
npm run build
npx playwright test
```
Expected: all commands exit 0.

**Step 3: Prepare repo metadata**
- Add setup instructions and deployment notes.
- Add environment placeholders for future MattGPT API integration.
- Add GitHub Actions workflow for lint/test/build.

**Step 4: Commit release-ready baseline**
```bash
git add README.md .env.example .github/workflows/ci.yml
git commit -m "chore: finalize ci and delivery documentation"
```

---

## Known stubs required for V1
- Team member names, titles, bios, and headshots.
- Contact submission backend endpoint and CRM integration.
- MattGPT production integration with ChatGPT API.
- Final case-study metrics/testimonials.
- Confirmed canonical URLs for each portfolio tool link.

## Asset and copy checklist needed from Prodigy Interactive
- High-resolution transparent logo export (PNG + SVG preferred).
- Brand font files or approved web fonts.
- Final short company pitch (1 sentence) and hero subtitle.
- Preferred inquiry email and phone number.
- Social/profile links (LinkedIn, X, GitHub, etc.).
