# 4. Tests, Security Review, and Code Review

## Outcome

Combine three related quality practices in one module: generate a test plan and scaffold with a reusable skill while keeping test dependencies isolated, get a focused security review of upload and rendering behavior, and use Copilot's Source Control / inline review on whatever changes you accepted. You will finish able to tell test findings, security findings, and general review comments apart.

**This module does not add a test project to the repository.** Any test scaffold you generate stays as a plan or draft output for you to evaluate — implementing it for real is a separate, explicitly-approved step outside this workshop.

## Prerequisites

- Completed (or read) [3. Apply Repository Standards](03-apply-repository-standards.md).
- Review [`.github/skills/dotnet-unit-testing/SKILL.md`](../.github/skills/dotnet-unit-testing/SKILL.md) before starting.

**Estimated time:** 20-25 minutes

## Steps

### Step 1: Generate a test plan and scaffold with the skill

The `dotnet-unit-testing` skill exists specifically to plan tests without touching `PhotoGallery.csproj`. Use it:

```text
/dotnet-unit-testing Design a test suite for the photo gallery health endpoint and route
fallback behavior in Program.cs.
Requirements:
- include tests for the healthy response, known routes, and an unknown route
- keep test dependencies isolated from PhotoGallery.csproj
- identify any test framework package that would be required before adding it
- output a test plan first, then test file scaffolding
```

Confirm the response:

- States a test project would be separate from `PhotoGallery.csproj`.
- Names the test framework package(s) it would need, without adding them to the app project.
- Does not modify `PhotoGallery.csproj` or add a `.csproj` file for you automatically.

### Step 2: Request a focused security review

Start a new chat for this new topic. Ask Copilot to review the client-side upload and rendering behavior in [`wwwroot/app.js`](../wwwroot/app.js):

```text
Review the security posture of bindUpload (client-side file handling) and the innerHTML
rendering in photoCard and bindPhotoDialogs in wwwroot/app.js.
Focus on:
1) how user-controlled values (title, tags) reach innerHTML,
2) whether file type/size validation is enforced anywhere beyond the client,
3) concrete, minimal mitigations that keep the app dependency-free.
Do not implement changes yet — report findings only.
```

Read the findings. This mock-data application does not yet accept arbitrary user input from a network boundary, so expect the review to flag things like: reliance on client-only MIME-type checks, direct `innerHTML` interpolation of `photo.title` and `photo.tags` (safe only because the current data is trusted mock data), and the absence of a server-side upload endpoint to validate against.

### Step 3: Review any accepted changes

If you accepted any edits from Steps 1 or 2 (for example, a scaffold file), review them with Copilot's built-in review tools:

**Inline review**

1. Select the generated code.
2. Right-click → **Copilot → Review**.
3. Process each suggestion: accept or discard.

**Source Control review**

1. Open the Source Control panel in the Activity Bar.
2. Hover over **CHANGES**, then select **Code Review – Unstaged Changes**.

   ![Code review button](images/code-review.png)

3. Read any inline comments in the affected file(s) and in the **Problems** tab.

### Step 4: Sort findings by category

Before closing this module, sort everything Copilot surfaced into three buckets so nothing gets lost or conflated:

| Category | Example from this module |
| --- | --- |
| Test finding | Missing coverage for an unknown-route fallback response |
| Security finding | `innerHTML` used for values that would be unsafe if untrusted |
| General review comment | Naming, duplication, or style suggestions unrelated to correctness or safety |

## Expected evidence / validation

- The test plan explicitly isolates any new test dependency from `PhotoGallery.csproj`.
- The security review references specific functions (`bindUpload`, `photoCard`, `bindPhotoDialogs`) rather than generic advice.
- You produced a three-way sorted list (test / security / general) from the session's output.
- No test project was actually added to the repository as part of this module.

## ✅ Completion checklist

- [ ] Generated a test plan and scaffold via `/dotnet-unit-testing` with isolated dependencies
- [ ] Requested and read a focused security review of upload and rendering behavior
- [ ] Ran inline review and/or Source Control review on any accepted changes
- [ ] Sorted findings into test, security, and general review categories
- [ ] Confirmed no test project was added to the repository

## Next step

👉 **[5. Parallel Workstreams with the GitHub Copilot App](05-parallel-workstreams.md)**
