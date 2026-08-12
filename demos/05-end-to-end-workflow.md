# 5. End-to-End Workflow: Issue to Human Approval

## Outcome

Trace one bounded change from a GitHub issue through a reviewed Copilot plan, implementation, validation, pull request, Copilot review, one verified fix, and independent human approval.

The application change in this demo exists only on Copilot's branch and pull request. Do not merge it during the workshop, and do not change the baseline application before starting.

**Estimated time:** 10-15 minutes

## Demo objective

By the end of this demo, you will have followed this governed workflow:

`Issue -> Copilot Agent -> Review Plan -> Implement -> Test -> Pull Request -> Copilot Review -> Fix -> Validate -> Human Approval`

The task is intentionally small: add a deterministic, read-only `/status` endpoint. The initial implementation changes only `Program.cs`; an approved review finding may add one short README update.

## Prerequisites

- This repository is hosted on GitHub and you have write access.
- [Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github) is enabled for the repository.
- [GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/copilot-code-review) is enabled.
- The repository's **Agents** tab or panel is available.
- An independent human reviewer is available for the final approval.
- The repository starts from a clean workshop branch containing [`.github/copilot-instructions.md`](../.github/copilot-instructions.md).

Verify these prerequisites before the live session. If a required feature is unavailable, use this guide as a read-through instead of troubleshooting customer access or policy during the demo.

> Use only this synthetic workshop repository. Do not put customer code, credentials, production logs, or operational data in the issue or prompts.

## Exact issue text

Create a GitHub issue with this title:

```text
Add a deterministic application status endpoint
```

Use this exact body:

```markdown
## Objective

Add a read-only `GET /status` endpoint to the existing ASP.NET Core application.

## Scope

- Implement the endpoint in `Program.cs` before the fallback route.
- Return HTTP 200 JSON containing `status: "ok"` and `application: "PhotoGallery"`.
- Keep the response deterministic: no timestamps, environment values, machine names, or external calls.
- Preserve `/health`, static files, fallback routing, and the existing browser routes.
- Do not add packages, configuration, authentication, infrastructure, database, deployment, or external-service changes.
- Keep the initial implementation limited to `Program.cs`; do not update documentation yet.

## Acceptance criteria

- `GET /status` returns HTTP 200.
- The response content type is JSON.
- The response contains `status` equal to `ok`.
- The response contains `application` equal to `PhotoGallery`.
- `dotnet build PhotoGallery.slnx` succeeds.
- `GET /health` still returns HTTP 200.
- `GET /gallery` still returns the application shell.
- The initial diff changes only `Program.cs`.
```

## Acceptance criteria

Treat the issue checklist above as the definition of done. In addition, the workflow is complete only when:

- The implementation plan is reviewed before any file changes.
- The pull request links back to the issue.
- Copilot review comments are verified against the issue and code.
- Any fix is explicitly approved and remains within the two-file maximum.
- An independent human approves the final pull request.
- The pull request is not merged during the demo.

## Attendee steps and suggested prompts

### Step 1: Create the issue

Create the issue from the exact title and body above. Do not add customer data or broaden the scope.

Copy its issue number; the prompts below use `#<number>` as a placeholder.

### Step 2: Delegate a plan to Copilot

Open the repository's **Agents** tab or panel, select this repository and the intended starting branch, then start a task with:

```text
Read issue #<number> and .github/copilot-instructions.md.
Create an implementation plan only.
Do not edit files and do not create a pull request.
List the exact file, route placement, response fields, validation commands,
regression checks, and anything that is out of scope.
```

Use the Agents plan-first path for this demo. Do not use the issue's **Assignees** shortcut: that faster path may start implementation and create a pull request immediately, removing the plan-approval moment this demo teaches.

### Step 3: Review the plan before coding

Approve the plan only if it:

- Changes only `Program.cs`.
- Places `/status` before `MapFallbackToFile`.
- Preserves `/health`, static files, and fallback routing.
- Uses built-in ASP.NET Core APIs and adds no dependency.
- Keeps the JSON deterministic.
- Includes the build and three endpoint checks.
- Leaves documentation out of the initial implementation.

If the plan is broader, ask Copilot to revise only the plan. Do not allow implementation until the plan matches the issue.

### Step 4: Implement and test on Copilot's branch

After approving the plan, send:

```text
Implement the approved plan on a branch.
Keep the initial diff limited to Program.cs and do not create a pull request yet.
Run dotnet build PhotoGallery.slnx.
Start the app on a local test port, verify /status, /health, and /gallery,
stop the app, and report the exact results.
```

Wait for the session to finish, then review its reported commands and results.

### Step 5: Review the diff before creating the pull request

Select **Diff** in the agent session and confirm:

- Only `Program.cs` changed.
- The endpoint appears before the fallback route.
- The response contains only the two requested fields.
- No package, configuration, workflow, or unrelated formatting changed.

If the diff is broader, request a focused revision before continuing.

### Step 6: Create a traceable pull request

Select **Create pull request** from the agent session. Before requesting review, confirm the PR:

- Targets the intended workshop branch.
- Explains why the endpoint is being added.
- Lists the build and endpoint validation.
- Describes the low risk and limited scope.
- Includes `Closes #<issue-number>`.

`Closes #<issue-number>` links the PR to the issue. The issue remains open because this demo intentionally does not merge the PR.

### Step 7: Request and evaluate Copilot review

In the pull request's **Reviewers** section, request **Copilot**. Copilot returns a comment review, not an approval, and its review does not satisfy required approvals.

Read every comment and verify it against the issue, repository instructions, and actual diff. Apply only an actionable, evidence-backed finding.

Copilot may return no comments. Record `No Copilot findings` rather than inventing a defect.

### Step 8: Apply one harmless review finding

If Copilot flags that the new public endpoint is not documented, use that finding.

If Copilot returns no actionable comment, add this prepared **human** review comment and identify it honestly as human feedback:

```text
Please document GET /status in README.md, including its deterministic JSON
response. Keep the documentation change limited to the existing application
structure or local verification section.
```

Then ask Copilot to apply only the approved finding:

```text
@copilot Implement this approved documentation finding only.
Do not change application code or any other file.
Rerun the original build and endpoint validation, then update this pull request
with the exact results.
```

### Step 9: Validate the updated pull request

Review the new commit and confirm the final diff contains at most:

- `Program.cs` for the endpoint.
- `README.md` for the approved documentation finding.

Verify the reported validation:

```text
dotnet build PhotoGallery.slnx
GET /status  -> 200, JSON, status=ok, application=PhotoGallery
GET /health  -> 200
GET /gallery -> 200 and the application shell
```

If Copilot reviewed the earlier commit, request a re-review after the fix when useful. A re-review is not automatic unless the repository is configured for it.

### Step 10: Obtain human approval

Request review from an independent human. The reviewer should check:

- Issue and PR traceability.
- Final file scope.
- Acceptance criteria and validation evidence.
- Copilot and human review findings.
- Resolution of the approved documentation finding.

The human approves only after those checks pass. Do not merge the PR during the demo.

## Expected outcomes

- The issue contains a bounded objective, explicit exclusions, and observable acceptance criteria.
- Copilot produces a plan before editing, and a human approves or narrows it.
- The initial agent diff changes only `Program.cs`.
- Build and endpoint checks provide deterministic evidence.
- The pull request links to the issue and records why, validation, and risk.
- Copilot code review runs and its actual result is recorded.
- A harmless documentation finding is applied without inventing a security issue.
- The final diff contains no more than `Program.cs` and `README.md`.
- An independent human approves the pull request.
- Nothing is merged into the workshop branch.

## ✅ Completion checklist

- [ ] Created the issue from the exact text
- [ ] Started a plan-only Copilot agent session referencing the issue
- [ ] Reviewed and approved a one-file implementation plan
- [ ] Reviewed the implementation diff before creating a pull request
- [ ] Confirmed the build and three endpoint checks
- [ ] Created a PR containing the issue-closing reference
- [ ] Requested Copilot code review and recorded its actual result
- [ ] Applied only the approved documentation finding
- [ ] Revalidated the final two-file maximum
- [ ] Obtained independent human approval without merging

## Next step

👉 **[6. Parallel Workstreams with the GitHub Copilot App](06-parallel-workstreams.md)**
