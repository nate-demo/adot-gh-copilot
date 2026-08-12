# 3. Apply Repository Standards

## Outcome

Use [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) together with focused, task-specific context so Copilot's output respects this repository's constraints by default — not by luck. You will run one small task and one hardening proposal, then evidence-check both against the repo's standards.

## Prerequisites

- Completed (or read) [2. Plan and Implement a Scoped Feature](02-plan-scoped-feature.md).
- Read [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) once before starting.

**Estimated time:** 15-20 minutes

> **Important:** Do not rename, move, or disable `.github/copilot-instructions.md` at any point in this module. The goal is to see Copilot apply repository instructions automatically, not to compare with-and-without.

## The repository standards you're validating against

From `.github/copilot-instructions.md`:

- No external NuGet packages or npm dependencies.
- Preserve the `/`, `/gallery`, `/upload`, and `/admin` routes.
- Maintain responsive and dark mode styles.
- Encode or safely render any user-controlled content.

## Steps

### Step 1: Implement one small, focused app task

Start a new chat. Attach only the files the task needs — [`wwwroot/index.html`](../wwwroot/index.html) and [`wwwroot/app.js`](../wwwroot/app.js).

```text
In the main navigation, add aria-current="page" to the link that matches the current route,
alongside the existing "active" class toggle in wwwroot/app.js.
Do not change the route list, page content, or styling. Do not add any dependency.
```

Implement the change, then run the app and confirm:

- The four routes (`/`, `/gallery`, `/upload`, `/admin`) all still navigate correctly.
- The active nav link gets `aria-current="page"` only while its route is active.
- Layout and dark mode appearance are unchanged.

### Step 2: Request a hardening proposal (no implementation yet)

Start a fresh chat for this new topic. Use this prompt:

```text
Propose a hardening plan for the upload flow in wwwroot/app.js (bindUpload) and the
upload settings form. Return exactly these sections:
1) Constraints from .github/copilot-instructions.md
2) Proposed edits
3) Regression risks
4) Validation checklist
Do not implement anything yet — this is a proposal only.
```

Read the proposal and confirm it explicitly references the repository's constraints (no dependencies, preserved routes, responsive/dark mode, safe rendering) rather than generic advice.

### Step 3: Standards compliance review

For **both** the Step 1 change and the Step 2 proposal, check off the same four criteria:

| Standard | Step 1 change | Step 2 proposal |
| --- | --- | --- |
| Preserves `/`, `/gallery`, `/upload`, `/admin` routes | | |
| Adds no NuGet or npm dependency | | |
| Stays responsive and dark-mode compatible | | |
| Safely handles user-controlled content (encodes/escapes, no raw HTML injection) | | |

If either output fails a check, ask Copilot to revise it citing the specific instruction it missed, rather than restarting the task from scratch.

## Expected evidence / validation

- The Step 1 diff is small, adds no dependency, and all four routes still work in the browser.
- The Step 2 proposal names the actual constraints from `.github/copilot-instructions.md`, not generic security advice.
- You completed the compliance table above for both outputs.

## ✅ Completion checklist

- [ ] Implemented the nav accessibility task and verified all four routes still work
- [ ] Requested a hardening proposal for the upload flow with the four required sections
- [ ] Completed the standards compliance table for both outputs
- [ ] Left `.github/copilot-instructions.md` untouched throughout

## Next step

👉 **[4. Tests, Security Review, and Code Review](04-tests-security-review.md)**
