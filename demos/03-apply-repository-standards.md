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

Start a new chat. Attach only the files the task needs — [`wwwroot/app.js`](../wwwroot/app.js) and [`wwwroot/styles.css`](../wwwroot/styles.css).

```text
On the Gallery page, add a clearly visible live results summary above the photo grid.
It should display "Showing X of Y photos", use the existing photos array for the total,
and update when search or tag filters change and when filters are cleared.
Use an aria-live="polite" element and update its value with textContent.
Add only the minimal CSS needed for the summary to work in light mode, dark mode,
and responsive layouts. Do not change the photo data, routes, or filtering behavior.
Do not add any dependency.
```

Implement the change, then run the app and confirm:

- `/gallery` initially displays **Showing 9 of 9 photos**.
- Searching for `City` displays **Showing 1 of 9 photos**.
- Clearing filters restores **Showing 9 of 9 photos**.
- Selecting the `nature` tag displays **Showing 4 of 9 photos**.
- The four routes (`/`, `/gallery`, `/upload`, `/admin`) all still navigate correctly.
- The summary remains easy to read on a narrow viewport and in dark mode.

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

- The Step 1 diff is limited to the gallery behavior and its minimal styling, adds no dependency, and all four routes still work in the browser.
- The visible count changes from 9 to 1 or 4 during the search and tag checks, then returns to 9 when filters are cleared.
- The Step 2 proposal names the actual constraints from `.github/copilot-instructions.md`, not generic security advice.
- You completed the compliance table above for both outputs.

## ✅ Completion checklist

- [ ] Implemented the visible live gallery count and verified its initial, search, tag, and reset states
- [ ] Verified the summary in dark mode and at a narrow viewport
- [ ] Verified all four routes still work
- [ ] Requested a hardening proposal for the upload flow with the four required sections
- [ ] Completed the standards compliance table for both outputs
- [ ] Left `.github/copilot-instructions.md` untouched throughout

## Next step

👉 **[4. Tests, Security Review, and Code Review](04-tests-security-review.md)**
