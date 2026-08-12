# Optional: Exposure Demos

These are short, optional tours of three additional GitHub Copilot surfaces. Unlike the six core modules, these are **not** equal-weight — each section below is intentionally brief, meant to give you a first look rather than deep practice. Do them in any order, or skip any you don't have access to.

**Estimated time:** 5-10 minutes per section

---

## Copilot Spaces

[Copilot Spaces](https://docs.github.com/en/copilot/concepts/context/spaces) let you group a small, curated set of context (files, repositories, issues, or notes) so Copilot's answers stay grounded in exactly what you intend.

1. Go to [github.com/copilot/spaces](https://github.com/copilot/spaces) and select **Create Space**.
2. Give it a short name and description related to this repository (for example, "Photo Gallery quick reference").
3. Under **Add sources**, add three or four files from this repo that describe its architecture: `Program.cs`, `wwwroot/app.js`, `.github/copilot-instructions.md`.
4. Ask one grounded question, for example:

   ```text
   Based only on the attached files, what would break if the /health endpoint were removed
   from Program.cs?
   ```

5. Confirm the answer references the attached files rather than generic ASP.NET Core knowledge.

See [Using GitHub Copilot Spaces](https://docs.github.com/en/copilot/how-tos/provide-context/use-copilot-spaces/use-copilot-spaces) for more on managing and sharing a Space.

---

## Cloud Agent

The [Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent) can research a repository, plan, and open a pull request from a GitHub issue, working independently in the background.

For the complete plan-first workflow, use [5. End-to-End Workflow](05-end-to-end-workflow.md). This optional tour intentionally uses the faster issue-assignment path, which may begin implementation and create a pull request immediately.

1. In a repository you have write access to, open the **Issues** tab and create a small, scoped issue, for example:

   ```text
   Title: Add a data-testid attribute to the gallery search input
   Body: In wwwroot/app.js, add a data-testid="gallery-search" attribute to the gallery
   search input for easier test targeting. Keep all existing behavior and styling unchanged.
   Do not add any dependency.
   ```

2. Assign **Copilot** to the issue.
3. Once Copilot links a pull request, open it and select **View session** to see its research, plan, and steps.
4. Review the file changes in the pull request the same way you would review a teammate's PR.

---

## GitHub Copilot CLI

[GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli) brings an agent into your terminal.

1. Install it following [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli).
2. From this repository's root folder, run:

   ```bash
   copilot
   ```

3. Confirm you trust the folder when prompted, then run:

   ```text
   /help
   ```

   Skim the available slash commands and keyboard shortcuts.
4. Run one repository-focused prompt, for example:

   ```text
   Summarize what Program.cs does and list the routes wwwroot/app.js handles client-side.
   ```

5. Confirm the answer matches what you already know from [1. Understand the Codebase](01-understand-codebase.md).

See [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview) for the full walkthrough, including tool-approval prompts and voice input.

---

## ✅ Completion checklist

- [ ] Created a Copilot Space with a small context packet and asked one grounded question
- [ ] Assigned Copilot to one scoped issue and reviewed its session and pull request
- [ ] Launched Copilot CLI, checked `/help`, and ran one repository-focused prompt
