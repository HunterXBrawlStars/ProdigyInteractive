# Logo Edge Seamless Blend Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove all visible rectangular boundaries around the hero logo image so the logo block fades seamlessly into the hero background on desktop and mobile.

**Architecture:** Keep the original source logo (`ProdigyInteractiveLogo.png`) and solve blending at render time with a composite mask strategy. Replace the current single radial mask with a multi-axis edge-fade mask that explicitly handles left/right/top/bottom plus corners. Add tuning variables for quick visual iteration without refactoring component structure.

**Tech Stack:** React 19, MUI `sx`, CSS masking (`mask-image`, `-webkit-mask-image`, mask positioning/repeat), Vitest + Testing Library, Vite.

---

### Task 1: Define Visual Acceptance Criteria

**Files:**
- Modify: `docs/plans/2026-02-10-logo-edge-seamless-blend.md`

**Step 1: Lock acceptance criteria**
- No hard horizontal or vertical boundary line visible around the logo at 100% zoom on a 1440px-wide viewport.
- No hard corner box artifact visible on the logo container.
- Logo center remains fully legible and not hollowed out.
- Pills below logo remain in current vertical position.

**Step 2: Define target test environments**
- Desktop Chrome latest, Safari latest.
- Mobile width check at 390px.

---

### Task 2: Implement Composite Edge Mask (Core Fix)

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

**Step 1: Keep original image source**
- Ensure hero logo uses `/assets/ProdigyInteractiveLogo.png`.

**Step 2: Replace single radial mask with composite mask layers**
- Use two directional masks for side fade:
  - Horizontal fade: transparent at outer 10-14% on left/right, opaque center.
  - Vertical fade: transparent at outer 10-14% on top/bottom, opaque center.
- Add a third radial/corner mask layer for corner smoothing.
- Configure mask composition to intersect layers so all edges fade together.
- Keep `mask-size: 100% 100%`, `mask-repeat: no-repeat`, centered positioning.

**Step 3: Introduce tunable mask constants**
- Define edge start/stop stops in one place in `sx` so adjustment is fast.
- Start with outer fade zone at 12% each side.

---

### Task 3: Add Controlled Background-Assistance Layer (Only If Needed)

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

**Step 1: Add subtle ambient assist behind image**
- If boundaries are still perceptible after Task 2, add a soft blurred halo behind logo with very low opacity.
- Do not add panel backgrounds or anything with visible rectangular geometry.

**Step 2: Keep contrast safe**
- Ensure logo text and emblem remain visually crisp against hero backdrop.

---

### Task 4: Verification and Regression Safety

**Files:**
- Modify: `src/__tests__/hero-layout-refresh.test.tsx` (only if needed)

**Step 1: Verify existing structural expectations still pass**
- Run: `npm run test -- src/__tests__/hero-layout-refresh.test.tsx`
- Expected: PASS

**Step 2: Add minimal assertion only if mask refactor changes behavior surfaces**
- Assert logo blend element still exists and no legacy panel labels return.
- Avoid brittle pixel assertions.

**Step 3: Full validation pass**
- Run: `npm run lint`
- Run: `npm run test`
- Run: `npm run build`
- Expected: all pass.

---

### Task 5: Visual QA Checklist

**Files:**
- No file changes required unless tuning

**Step 1: Desktop check**
- Inspect hero at 100%, 90%, and 125% zoom.
- Confirm no visible straight border lines.

**Step 2: Mobile check**
- Inspect at 390x844 and 430x932 equivalents.
- Confirm fade remains smooth and logo readability intact.

**Step 3: Final tuning loop**
- If edge still visible: increase side fade width by 2% increments.
- If logo body over-faded: reduce corner/radial fade intensity, not side fade width first.

---

### Task 6: Commit Hygiene

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`
- Optional Modify: `src/__tests__/hero-layout-refresh.test.tsx`

**Step 1: Commit after green checks**
- `git add <files>`
- `git commit -m "fix: apply seamless multi-axis mask to hero logo edges"`

**Step 2: Push**
- `git push origin main`

---

## Recommended Approach

Use Task 2 as the primary fix and treat Task 3 as fallback only. The screenshot shows rectangular visibility on all sides, which strongly indicates radial-only masking is insufficient. A composite side+corner mask directly targets the failure mode and gives us precise control over edge behavior without reintroducing generated assets.
