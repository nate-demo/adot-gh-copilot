# 4. Tests, Security Review, and Code Review

## Outcome

Use the repository's testing skill to design and inspect a draft first-test suite, perform an evidence-based security review of the current app, and run Copilot code review on the implementation work from Demos 2 and 3. You will finish with a concise quality summary that records the verified result, evidence, and next action from each check.

**Steps 1 and 2 are analysis-only.** They should not edit repository files. This module does not add a test project, test packages, or security fixes. Implementing any proposal is a separate, explicitly approved task outside this workshop.

## Prerequisites

- Completed [2. Plan and Implement a Scoped Feature](02-plan-scoped-feature.md) and the gallery-count implementation in [3. Apply Repository Standards](03-apply-repository-standards.md) in this workspace.
- Review [`.github/skills/dotnet-unit-testing/SKILL.md`](../.github/skills/dotnet-unit-testing/SKILL.md) before starting.

**Estimated time:** 20-25 minutes

## Steps

### Step 1: Draft the repository's first endpoint tests

In Copilot Chat Agent mode, type `/dotnet-unit-testing` and select the skill from the menu. If it is not listed, attach [`.github/skills/dotnet-unit-testing/SKILL.md`](../.github/skills/dotnet-unit-testing/SKILL.md) and start the prompt with `Follow the attached dotnet-unit-testing skill`.

```text
Design the repository's first ASP.NET Core endpoint tests for Program.cs.
This is a draft-only exercise: do not edit files, run commands, or add packages.

First provide a concise test plan, then show the proposed project and test-file scaffold.
The draft should verify:
- GET /health returns 200 and the expected healthy JSON response
- GET / returns the application shell
- GET /gallery, /upload, and /admin return that same shell through fallback routing
- an unknown path also returns the shell, with an explanation of why this app does not
  return a conventional 404 for that request

Follow the dotnet-unit-testing skill: keep all test dependencies in a separate test
project, identify every required test package, and call out any production-code test
seam that WebApplicationFactory would require without applying it.
```

Inspect the response rather than accepting edits. It should:

- Recognize that `/gallery`, `/upload`, `/admin`, and unknown paths are handled by `MapFallbackToFile("index.html")`, not by separate server endpoints.
- Propose a separate test project and name its test framework, test SDK, and ASP.NET Core test-host dependencies.
- Call out the `Program` accessibility seam commonly needed by `WebApplicationFactory<Program>` rather than silently changing `Program.cs`.
- Keep the plan and scaffold in chat output only. No `.csproj`, test file, or package should appear in the workspace.

### Step 2: Request a focused security review

Start a new chat for this new topic. Attach [`wwwroot/app.js`](../wwwroot/app.js) and [`Program.cs`](../Program.cs), then use this prompt:

```text
Review the current security posture of bindUpload, photoCard, and bindPhotoDialogs in
wwwroot/app.js, using Program.cs to verify the server boundary.

For each finding, report the exact code evidence, current exploitability in this mock-data
app, and a minimal dependency-free mitigation. Check:
1) where photo titles and tags reach innerHTML,
2) what the file picker and showFiles actually validate,
3) whether file size is limited,
4) whether file bytes are read or sent to any server endpoint, and
5) whether selected filenames are rendered safely.

Do not implement changes. Distinguish current behavior from risks that would exist only
after real user data or a server-side upload endpoint is introduced.
```

Check the report against the code. An accurate review should explain all of these points:

- `photoCard` and `bindPhotoDialogs` interpolate titles and tags into `innerHTML`. The values currently come from the trusted, in-file `photos` array, so this is a future trust-boundary risk rather than a currently exposed network-input exploit.
- `accept="image/*"` is a picker hint, and `showFiles` trusts the browser-provided `file.type`. There is no file-size limit.
- Selected filenames are rendered with `textContent`, which is the safe behavior the review should preserve.
- The demo never reads or transmits file bytes: form submission only shows an alert, and `Program.cs` defines no upload endpoint. Server-side file validation is therefore a requirement for a future real upload feature, not protection that exists in this mock flow.

### Step 3: Review the implementation from Demos 2 and 3

Steps 1 and 2 should have left the workspace unchanged. Review the real app changes you made earlier: the modal behavior from Demo 2 and the live gallery count from Demo 3.

**If those changes are still uncommitted:**

1. Open **Source Control** in the Activity Bar.
2. Hover over **CHANGES**, then select **Copilot Code Review - Uncommitted Changes**.

   ![Copilot Code Review button](images/code-review.png)

3. Read any comments inline and in the **Problems** tab.
4. Verify each comment against the Demo 2 and Demo 3 definitions of done before applying or discarding its suggestion.

**If the changes are already committed or the Source Control review button is unavailable:**

1. Select the modal or gallery-count implementation in `wwwroot/app.js`.
2. Right-click and choose **Generate Code > Review**.
3. Read the resulting comments inline and in the **Comments** panel.

Focus on actionable regressions in the changed code: every modal close path should restore scrolling, and the gallery count should match the initial, search, tag, and reset states while using `textContent`. Copilot might return no comments; that is a valid result and should be recorded rather than replaced with invented findings.

### Step 4: Summarize the three quality checks

Bring the three activities together without mixing their results. Copy this table into your notes and complete one row for each check:

| Quality check | Verified result | Evidence | Next action |
| --- | --- | --- | --- |
| Test plan | What the draft covered correctly or missed | A route expectation or test-project detail from Step 1 | Revise the draft, or `No action` |
| Security review | A risk or safe behavior you confirmed | The relevant function or line from `app.js` or `Program.cs` | Record future hardening, or `No action` |
| Code review | An actionable comment you verified, or `None found` | The comment and changed code, or the completed review with no comments | Apply, discard, or `No action` |

Keep each result to one sentence. Do not turn a safe behavior into a problem or invent a code review comment just to fill the table.

## Expected evidence / validation

- The test plan and draft scaffold remain in chat and isolate all test dependencies from `PhotoGallery.csproj`.
- The test plan correctly describes the fallback behavior and identifies any test-host package and `Program` accessibility requirement.
- The security report distinguishes trusted mock data and safe filename rendering from future risks.
- Code review ran against the actual Demo 2/3 diff or a selected implementation, and you recorded whether it produced actionable comments.
- Your quality summary has one evidence-backed row for each check and uses `None found` when code review produced no actionable comment.
- No test project, package, or security fix was added as part of this module.

## ✅ Completion checklist

- [ ] Drafted and inspected a first-test plan and scaffold with isolated dependencies
- [ ] Confirmed the draft expects fallback routes to return the application shell
- [ ] Verified the security report against `app.js` and `Program.cs`
- [ ] Ran uncommitted-change review or selection review on the Demo 2/3 implementation
- [ ] Completed the three-row quality summary with a verified result, evidence, and next action
- [ ] Confirmed Steps 1 and 2 made no repository changes

## Optional extension: Create an accessibility review agent

This extension demonstrates how a repository custom agent can combine focused instructions, restricted tools, and a specific model. It is optional and does not change the required checklist above.

### 1. Create a workspace agent

1. Open the Command Palette and run **Chat: New Custom Agent**.
2. Choose **Workspace** so the agent is available to this repository.
3. Name the file `accessibility-review.agent.md`. VS Code creates it in `.github/agents/`.
4. Replace the generated content with this compact, read-only agent:

````markdown
---
name: Accessibility Reviewer
description: Reviews the photo gallery for keyboard, focus, semantics, and live-region issues without editing files.
target: vscode
model: Claude Sonnet 4.6
tools: ['read', 'search']
---

# Accessibility review instructions

Review the supplied photo-gallery files for evidence-backed accessibility issues.
Report findings only. Do not edit files.

## Review focus

- Keyboard operation and visible focus
- Dialog naming, Escape behavior, focus movement, and focus restoration
- Semantic landmarks, headings, labels, and accessible names
- Live announcements for gallery filtering and other dynamic updates
- Code behavior that still requires browser or assistive-technology validation

## Output

For each finding, provide severity, exact code evidence, user impact, a minimal
recommendation, and a verification step. Separate confirmed code findings from
runtime checks that have not yet been performed.
````

The `tools` list keeps this agent read-only. The `model` field makes **Claude Sonnet 4.6** the model for this agent instead of inheriting the model currently selected in Chat.

> If Claude Sonnet 4.6 is not available in your organization's model picker, replace the value with the exact name of an available model before running the agent. Model availability can vary by account and organization policy.

### 2. Run the specialized review

1. Select **Accessibility Reviewer** from the Chat agent picker.
2. Attach [`wwwroot/index.html`](../wwwroot/index.html), [`wwwroot/app.js`](../wwwroot/app.js), and [`wwwroot/styles.css`](../wwwroot/styles.css).
3. Submit:

```text
Review these files for WCAG 2.2 accessibility risks introduced or exposed by the
modal behavior and live gallery count. Prioritize keyboard access, focus management,
accessible names, and live announcements. Report findings only and distinguish
code-backed issues from checks that require runtime testing.
```

### 3. Check the result

Confirm the agent:

- Cites exact elements, selectors, or functions instead of returning a generic checklist.
- Does not claim that static inspection proves keyboard, screen-reader, contrast, or focus behavior at runtime.
- Recommends browser checks for anything that cannot be established from the code.
- Makes no application edits; this extension itself adds only `.github/agents/accessibility-review.agent.md`.

You can keep the agent as a reusable repository customization or remove the file after the exercise.

## Next step

👉 **[5. End-to-End Workflow: Issue to Human Approval](05-end-to-end-workflow.md)**
