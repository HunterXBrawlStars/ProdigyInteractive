# MattGPT Live Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current MattGPT stub with a production-ready chat flow backed by an OpenAI-powered server endpoint.

**Architecture:** Keep API keys server-side by adding a Vercel serverless function in `api/` that validates requests, applies a MattGPT system prompt, and calls OpenAI Responses API. Update the existing React drawer widget to submit user prompts to that endpoint, render a running conversation, and handle loading/error states gracefully. Preserve existing brand copy and haptic interactions while removing hardcoded stub-response behavior.

**Tech Stack:** React 19, TypeScript, MUI, Vite, Vitest, Vercel Functions, OpenAI Node SDK.

---

### Task 1: Add failing tests for live MattGPT behavior

**Files:**
- Create: `src/__tests__/mattgpt-live.test.tsx`

**Step 1: Write the failing test**
- Add test that opens MattGPT, enters a prompt, submits, and expects:
  - `fetch('/api/mattgpt', ...)` is called with JSON body containing `message`.
  - assistant reply from API is rendered in chat transcript.

**Step 2: Run test to verify it fails**
- Run: `npm run test -- src/__tests__/mattgpt-live.test.tsx`
- Expected: FAIL because widget is currently disabled/stubbed and does not call API.

### Task 2: Add API request helper and wire widget

**Files:**
- Create: `src/lib/mattGptApi.ts`
- Modify: `src/components/chat/MattGPTWidget.tsx`

**Step 1: Write minimal implementation in request helper**
- Implement `requestMattGptReply(message, history)` that POSTs to `/api/mattgpt`, validates JSON response shape, and throws user-safe errors.

**Step 2: Implement widget chat state and submit flow**
- Replace stub preview with:
  - message list (user + assistant)
  - enabled input + send button
  - loading state during request
  - error fallback message if API fails
- Keep haptic triggers for open/close/send actions.

**Step 3: Run targeted test to verify green**
- Run: `npm run test -- src/__tests__/mattgpt-live.test.tsx`
- Expected: PASS.

### Task 3: Add secure server endpoint for MattGPT

**Files:**
- Create: `api/mattgpt.js`

**Step 1: Implement endpoint guardrails**
- Allow `POST` only.
- Validate message length and sanitize history.
- Handle missing `OPENAI_API_KEY` with non-200 response.

**Step 2: Implement OpenAI call**
- Use OpenAI SDK `responses.create` with system prompt tuned for Prodigy Interactive service/portfolio/scoping conversations.
- Return `{ reply }` JSON.

**Step 3: Handle known failures**
- Return user-safe error messages for upstream failures and malformed payloads.

### Task 4: Align site copy and decision tests

**Files:**
- Modify: `src/content/siteContent.ts`
- Modify: `src/__tests__/homepage.test.tsx`
- Modify: `src/__tests__/business-decisions.test.tsx`

**Step 1: Update copy for live MattGPT**
- Remove “coming soon” language where MattGPT is now live.

**Step 2: Update tests for non-stub behavior**
- Keep checks for services/portfolio/scoping positioning, but remove reliance on “stub response preview.”

**Step 3: Run related tests**
- Run: `npm run test -- src/__tests__/homepage.test.tsx src/__tests__/business-decisions.test.tsx src/__tests__/mobile-haptics.test.tsx`
- Expected: PASS.

### Task 5: Add environment setup guidance and dependency

**Files:**
- Modify: `package.json`
- Create: `.env.example`

**Step 1: Add OpenAI SDK dependency**
- Install `openai` package.

**Step 2: Add env example**
- Include `OPENAI_API_KEY` and optional `MATTGPT_MODEL`.

### Task 6: Full verification

**Files:**
- Validate all modified files

**Step 1: Lint**
- Run: `npm run lint`

**Step 2: Tests**
- Run: `npm run test`

**Step 3: Build**
- Run: `npm run build`

**Step 4: Summarize outcomes**
- Report changed files, behavior, and env/deploy notes.
