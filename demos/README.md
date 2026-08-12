# Demo Guides for Photo Gallery & Portfolio

This folder contains step-by-step demo guides for learning and practicing GitHub Copilot in the Photo Gallery & Portfolio application. The workshop has two tiers: a **core curriculum** of five equal-weight modules that build on each other, and a set of shorter **optional extensions** you can pick up afterward.

## Core curriculum

Work through these five modules in order. Each one has a single clear outcome, a definition of done or validation criteria, and a completion checklist.

### 1. Understand the Codebase ([01-understand-codebase.md](01-understand-codebase.md))

Use Copilot to map `PhotoGallery.csproj`, `Program.cs`, `wwwroot/index.html`, `wwwroot/app.js`, and `wwwroot/styles.css`; trace a route from the ASP.NET Core fallback through client-side rendering; and verify Copilot's summary against the files themselves. No code changes.

### 2. Plan and Implement a Scoped Feature ([02-plan-scoped-feature.md](02-plan-scoped-feature.md))

Use Plan mode, then implementation, on one bounded gallery modal UX task (preserve native Escape behavior, add backdrop close, and lock page scroll). Define done up front, use focused context, validate in the browser, and review the diff.

### 3. Apply Repository Standards ([03-apply-repository-standards.md](03-apply-repository-standards.md))

Use `.github/copilot-instructions.md` plus task-specific context on a small app task and a hardening proposal, then run a standards compliance review confirming preserved routes, no new dependencies, responsive/dark-mode styling, and safe rendering of user-controlled content.

### 4. Tests, Security Review, and Code Review ([04-tests-security-review.md](04-tests-security-review.md))

Use the `.github/skills/dotnet-unit-testing/SKILL.md` skill to generate a test plan and scaffold with isolated dependencies, request a focused security review of upload and rendering behavior, and use Source Control/inline review on any accepted changes. Sort findings into test, security, and general review categories.

### 5. Parallel Workstreams with the GitHub Copilot App ([05-parallel-workstreams.md](05-parallel-workstreams.md))

Use the GitHub Copilot desktop app to run three non-overlapping workstreams (test planning, security analysis, documentation/modernization analysis) in isolated sessions and worktrees, compare results, and integrate only reviewed, approved work.

## Optional extensions

These are shorter, secondary materials. They are not equal in weight to the core curriculum — treat them as quick tours or a follow-up deep dive, not additional required modules.

### Exposure Demos ([optional-exposure-demos.md](optional-exposure-demos.md))

Three brief, independent sections: Copilot Spaces (a small context packet and one grounded question), Cloud Agent (assign one scoped issue and inspect the session/PR), and GitHub Copilot CLI (launch `copilot`, check `/help`, run one repository-focused prompt).

### Modernization Extension ([optional-modernization-extension.md](optional-modernization-extension.md))

Validate this repository's completed .NET 10 upgrade (target framework, dev container, documentation consistency, restore/build, health and route smoke tests) and use Copilot to identify further modernization opportunities against official .NET compatibility notes.

## How to use these demos

1. Start with **1. Understand the Codebase** and work through the core curriculum in order.
2. Follow the steps and prompts in each file, and validate against the stated evidence before moving on.
3. Mark off each completion checklist as you go.
4. Once you finish the core curriculum, pick up either optional extension in any order.
5. Share your learnings and results with your team.
