---
phase: 6
slug: design-token-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-10
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | next build (static analysis) + grep-based token audits |
| **Config file** | next.config.ts (existing) |
| **Quick run command** | `npx next build 2>&1 | tail -5` |
| **Full suite command** | `npx next build && grep -rn 'bg-white\|bg-gray-\|bg-slate-\|bg-zinc-\|text-gray-\|text-slate-\|border-gray-' app/ --include='*.tsx' \| grep -v node_modules` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx next build 2>&1 | tail -5`
- **After every plan wave:** Run full suite command
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | CLR-01 | grep | `grep '#09090b\|gray-950' app/globals.css` | ✅ | ⬜ pending |
| 06-01-02 | 01 | 1 | CLR-02 | grep | `grep 'oklch' app/globals.css \| wc -l` | ✅ | ⬜ pending |
| 06-01-03 | 01 | 1 | CLR-03 | grep | `grep 'z-index\|--z-' app/globals.css` | ✅ | ⬜ pending |
| 06-01-04 | 01 | 1 | CLR-04 | visual | Manual: check noise texture at ~3% opacity | N/A | ⬜ pending |
| 06-02-01 | 02 | 1 | TYP-01 | grep | `grep -i 'geist' app/layout.tsx` | ✅ | ⬜ pending |
| 06-02-02 | 02 | 1 | TYP-02 | grep | `grep 'letter-spacing\|-0.0' app/globals.css` | ✅ | ⬜ pending |
| 06-02-03 | 02 | 1 | TYP-03 | grep | `grep 'clamp' app/globals.css` | ✅ | ⬜ pending |
| 06-02-04 | 02 | 1 | TYP-04 | grep | `grep 'gradient\|bg-clip-text' app/globals.css` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. No new test framework needed — build validation + grep audits verify token presence and raw utility elimination.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Noise texture visible at ~3% opacity | CLR-04 | Visual judgment — opacity perception varies by display | Open site in browser, inspect full-screen sections, verify subtle grain without distraction |
| Type scale consistent across breakpoints | TYP-03 | Requires viewport resizing | Open at 375px, 768px, 1440px — headings should scale fluidly without jumps |
| Near-black background on all pages | CLR-01 | Visual check across all routes | Navigate every page — no white or light sections should remain |

*All other behaviors have automated verification via build + grep.*

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
