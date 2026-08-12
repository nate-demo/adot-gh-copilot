# 6. Parallel Workstreams with the GitHub Copilot App

## Outcome

Use the [GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) — the desktop application for agent-driven development — to run three non-overlapping workstreams against this repository at the same time, each in its own isolated session and worktree. You will compare the sessions' results and integrate only the work you've reviewed and approved.

## Prerequisites

- Completed (or read) [4. Tests, Security Review, and Code Review](04-tests-security-review.md).
- The [GitHub Copilot app](https://github.com/features/ai/github-app) installed (macOS, Linux, or Windows). If you cannot install it, read through this module and adapt the prompts to separate Copilot Chat sessions instead.
- See [Getting started with the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started) and [Working with agent sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions) for the current, authoritative walkthrough of the concepts used below.

**Estimated time:** 25-30 minutes

## Concepts you'll use

- **Sessions and worktrees** — each session in the Copilot app runs in its own isolated workspace with a dedicated git worktree and branch, so multiple sessions can run in parallel without clashing.
- **Session mode** — Interactive (you and the agent collaborate), Plan (the agent plans, you approve), or Autopilot (fully autonomous), chosen per session.
- **Model selection** — pick a model and reasoning effort per session, or use Auto.
- **Changes review** — each session has its own Changes view scoped to that session's worktree.

## Steps

### Step 1: Connect this repository

1. Open the GitHub Copilot app and sign in.
2. Select the `+` button next to **Sessions**.
3. Choose **Local folder or repository...** and select this repository.
4. Confirm the branch shown matches your current working branch for this session (update it if not).

### Step 2: Start three non-overlapping sessions

Create three separate sessions, each on its own working tree, so no two sessions touch the same files. Use this assignment so file scope never overlaps:

| Workstream | Scope (files) | Session mode | Suggested prompt |
| --- | --- | --- | --- |
| A. Test planning | `Program.cs` | Plan | `/dotnet-unit-testing Produce a test plan for the health endpoint and fallback routing in Program.cs. Keep test dependencies isolated from PhotoGallery.csproj. Plan only, do not implement.` |
| B. Security analysis | `wwwroot/app.js` | Plan | `Review bindUpload and the innerHTML rendering paths (photoCard, bindPhotoDialogs) in wwwroot/app.js for injection and validation risks. Report findings only, do not implement.` |
| C. Documentation/modernization analysis | `README.md`, `.github/copilot-instructions.md` | Interactive | `Check README.md and .github/copilot-instructions.md for consistency with the current PhotoGallery.csproj target framework and the .devcontainer image tag. Report any mismatches, do not edit other files.` |

For each session:

1. Select the working tree/session-mode/model options from the dropdowns below the prompt field.
2. Paste in the workstream's prompt.
3. Let the agent start working, then move to the next session — you don't need to wait for one to finish before starting the next.

### Step 3: Let the sessions run in parallel

While the sessions work, your active sessions appear in the sidebar grouped by repository. Switch between them to check progress. Since each workstream reads a disjoint set of files and is instructed to report rather than implement broadly, they should not conflict even though they run concurrently.

### Step 4: Compare results

For each session:

1. Open its **Changes** view and confirm it only touched files inside that workstream's declared scope (ideally none, since all three are analysis/plan-only).
2. Read the session's summary and judge it against the workstream's goal.
3. Note which session produced the most actionable, specific output (referencing real function/file names) versus generic advice.

### Step 5: Integrate only approved work

1. For any session whose output you want to keep (for example, workstream C's documentation findings), review the diff carefully — the same way you did in earlier modules — before accepting anything.
2. If a change is approved, use the session's PR creation flow to open a draft pull request from that session's branch.
3. For sessions that produced only analysis (no diff), copy the useful findings into your own notes instead of merging anything.
4. Do not merge or apply output from a session you have not personally reviewed.

## Expected evidence / validation

- Three sessions ran concurrently, each in its own worktree/branch, with no overlapping file edits.
- Each session's Changes view is empty or limited strictly to its declared scope.
- You can name which workstream's output was most useful and why.
- Nothing was merged or applied without an explicit review step.

## ✅ Completion checklist

- [ ] Connected this repository in the GitHub Copilot app
- [ ] Started three sessions on separate worktrees with non-overlapping file scopes
- [ ] Compared each session's Changes view and summary
- [ ] Integrated (or explicitly declined to integrate) each session's output only after review

## Next step

You've completed the core curriculum. Continue with the optional guides for a broader tour of GitHub Copilot surfaces:

- **[Optional: Exposure Demos](optional-exposure-demos.md)** — short tours of Copilot Spaces, Cloud Agent, and Copilot CLI.
- **[Optional: Modernization Extension](optional-modernization-extension.md)** — validate the repository's .NET 10 upgrade and look for further modernization opportunities.
