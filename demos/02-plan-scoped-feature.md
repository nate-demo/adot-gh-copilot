# 2. Plan and Implement a Scoped Feature

## Outcome

Practice the Plan-then-implement workflow on one small, bounded UX task. You will define done up front, give Copilot only the context the task needs, implement the change, validate it in the browser, and review the resulting diff before considering it finished.

## Prerequisites

- Completed (or read) [1. Understand the Codebase](01-understand-codebase.md) so you know where `wwwroot/app.js` fits.
- The app running locally: `dotnet run`, then open `http://localhost:5000`.

**Estimated time:** 15-20 minutes

## The task

Improve the photo detail modal in [`wwwroot/app.js`](../wwwroot/app.js) (see `bindPhotoDialogs`, which opens a native `<dialog>`). The browser already closes a modal dialog when the user presses Escape, so treat that as behavior to preserve rather than code to reimplement.

**Definition of done**

After running the app locally, go to the gallery page and select "View Details" on a photo:

- [ ] Pressing **Escape** continues to close the modal through the native dialog behavior.
- [ ] Clicking outside the modal content (the backdrop) closes the modal.
- [ ] The page cannot scroll while the modal is open.
- [ ] No other UI text, layout, or styling changed.
- [ ] No new dependency was added anywhere in the repository.

## Steps

### Step 1: Start in Plan mode with focused context

Open a **new** Copilot Chat (this is a new task, so don't reuse an unrelated conversation). Switch to **Plan mode**. Attach only the file the task needs:

- [`wwwroot/app.js`](../wwwroot/app.js)

Avoid attaching `index.html`, `styles.css`, or unrelated demo files — the task is behavior-only and doesn't require them.

### Step 2: Submit the scoped prompt

```text
In wwwroot/app.js, improve the photo detail modal UX:
1) preserve the native Escape-to-close behavior,
2) close on backdrop click,
3) disable page scroll while the modal is open and restore it whenever the dialog closes.
Keep the current UI, text, and styling unchanged. Do not add any dependency.
Propose a plan before making changes.
```

### Step 3: Review the plan before approving

Confirm the plan:

- Only touches `wwwroot/app.js` (or explicitly justifies any other file).
- Lists concrete edits to `bindPhotoDialogs` (or wherever it proposes the change), including cleanup after every close path, rather than vague steps.
- Does not introduce a package, script tag, or external library.

Approve the plan once it matches the definition of done above. If it proposes something broader (for example, restyling the modal), send feedback narrowing the scope before approving.

### Step 4: Implement and watch the diff

Let the agent implement the approved plan. Keep an eye on which lines change — a change this small should be a handful of lines, not a rewrite of the file.

### Step 5: Validate in the browser

1. Run `dotnet run` if it isn't already running.
2. Open `http://localhost:5000/gallery`.
3. Click "View Details" on any photo.
4. Verify each item in the definition of done: native Escape behavior, backdrop click, scroll lock, and scroll restoration.
5. Confirm the modal's title, tags, and likes text still render exactly as before.

### Step 6: Review the diff

Open the Source Control panel and review the actual change (`git diff -- wwwroot/app.js` works too):

- Confirm the diff is limited to the modal behavior — no unrelated formatting or reordering.
- Confirm `PhotoGallery.csproj` and any `package.json`-equivalent are untouched (there should be no such file).
- Confirm no console errors appear in the browser dev tools when opening/closing the modal.

## Expected evidence / validation

- All three definition-of-done behaviors work in the browser.
- `git diff` shows a small, focused change scoped to the modal logic in `wwwroot/app.js`.
- No new files, packages, or script/link tags were introduced.

## ✅ Completion checklist

- [ ] Planned the change in Plan mode with only `wwwroot/app.js` attached
- [ ] Reviewed and approved a plan scoped to the three modal behaviors
- [ ] Implemented the change and confirmed all three behaviors in the browser
- [ ] Reviewed the diff and confirmed it is small, focused, and dependency-free

## Next step

👉 **[3. Apply Repository Standards](03-apply-repository-standards.md)**
