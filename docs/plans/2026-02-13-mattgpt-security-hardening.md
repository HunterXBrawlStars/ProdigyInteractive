# MattGPT Security Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add practical rate limiting, abuse protection, and strict topical-scope controls so `/api/mattgpt` cannot be used as a general-purpose assistant endpoint.

**Architecture:** Harden the existing Vercel function with an in-memory per-IP sliding window limiter, pattern-based abuse detection, and deterministic scope gating before any OpenAI call. Tighten the system prompt to explicitly refuse unrelated tasks and limit responses to Prodigy Interactive site/services/portfolio/scoping topics.

**Tech Stack:** Vercel serverless function (`api/mattgpt.js`), OpenAI SDK, Vitest.

---

### Task 1: Add failing API security tests

**Files:**
- Create: `src/__tests__/mattgpt-api-security.test.ts`

**Step 1: Write failing tests**
- Test that repeated requests from same IP eventually return `429`.
- Test that unrelated prompts (e.g., poem requests) are rejected before model call.
- Test that prompt-injection style requests are rejected.

**Step 2: Run tests to verify RED**
- Run: `npm run test -- src/__tests__/mattgpt-api-security.test.ts`
- Expected: FAIL on current implementation.

### Task 2: Implement limiter + abuse guards

**Files:**
- Modify: `api/mattgpt.js`

**Step 1: Add per-IP rate limiting**
- Compute client IP from forwarded headers.
- Track request timestamps in a module-level map.
- Return `429` with friendly retry guidance when threshold exceeded.

**Step 2: Add abuse checks**
- Reject common injection/jailbreak patterns.
- Reject repetitive/spam-like payloads.
- Continue existing payload validation limits.

### Task 3: Enforce topical scope and tighten prompt

**Files:**
- Modify: `api/mattgpt.js`

**Step 1: Add deterministic scope gate**
- Permit only site/services/portfolio/scoping related topics using keyword + history continuity checks.
- Reject unrelated requests with clear redirect message.

**Step 2: Tighten SYSTEM_PROMPT**
- Explicitly forbid unrelated assistance.
- Require redirect behavior for out-of-scope asks.

### Task 4: Verify end-to-end

**Files:**
- Validate modified files and existing tests

**Step 1: Run security tests**
- Run: `npm run test -- src/__tests__/mattgpt-api-security.test.ts`

**Step 2: Run full verification**
- Run: `npm run lint`
- Run: `npm run test`
- Run: `npm run build`

**Step 3: Summarize behavior guarantees + limitations**
- Document what protections are deterministic vs best-effort.
