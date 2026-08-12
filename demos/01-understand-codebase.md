# 1. Understand the Codebase

## Outcome

Use GitHub Copilot to build an accurate mental model of this unfamiliar, minimal ASP.NET Core application before changing anything. By the end of this module you can explain how a request becomes rendered UI, and you can prove that Copilot's summary matches what the files actually contain.

**This module does not implement code.** No files should change as a result of completing it.

## Prerequisites

- The repository open in VS Code (or your editor of choice) with GitHub Copilot Chat available.
- The app does not need to be running yet, but having it running (`dotnet run`, then open `http://localhost:5000`) makes verification easier.

**Estimated time:** 15-20 minutes

## Steps

### Step 1: Map the core files

Open a new Copilot Chat and ask it to summarize the five files that make up this application:

```text
Summarize the role of each of these files in one or two sentences:
PhotoGallery.csproj, Program.cs, wwwroot/index.html, wwwroot/app.js, wwwroot/styles.css.
Do not propose any code changes, just explain what exists today.
```

Read the response, then open each file yourself and confirm the summary is accurate:

- [`PhotoGallery.csproj`](../PhotoGallery.csproj) — target framework and SDK, no package references.
- [`Program.cs`](../Program.cs) — minimal hosting setup, static files, health check, fallback route.
- [`wwwroot/index.html`](../wwwroot/index.html) — the shared application shell and navigation.
- [`wwwroot/app.js`](../wwwroot/app.js) — mock data, page templates, client-side routing, interactions.
- [`wwwroot/styles.css`](../wwwroot/styles.css) — responsive layout plus light/dark mode styles.

### Step 2: Trace one route end-to-end

Pick the `/gallery` route and ask Copilot to trace it across files:

```text
Trace what happens, file by file, when a browser requests /gallery:
1) how ASP.NET Core handles the request in Program.cs,
2) how wwwroot/index.html is involved,
3) which function in wwwroot/app.js renders the page,
4) which function binds interactions afterward.
Reference exact function and variable names.
```

Confirm the trace yourself by opening `Program.cs` and `wwwroot/app.js`:

- `Program.cs` has no explicit route for `/gallery`; `app.MapFallbackToFile("index.html")` serves the shell for any unmatched path.
- `wwwroot/app.js`'s `render()` function reads `window.location.pathname`, looks it up in the `routes` map, and calls `galleryPage()`.
- `bindGallery()` wires up search, tag filters, and calls `bindPhotoDialogs()` to attach the photo detail modal handlers.

### Step 3: Ask Copilot to explain selected code

Highlight the `render()` function (and separately, `bindPhotoDialogs()`) in `wwwroot/app.js`, right-click, and choose **Copilot → Explain**. For each explanation, check:

- Does it correctly describe what triggers the code (page load, click, popstate)?
- Does it correctly name the DOM elements or selectors involved?
- Does it avoid inventing behavior that isn't in the file (for example, server-side rendering, a build step, or a framework that isn't used here)?

### Step 4: Verify against the repository instructions

Open [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) and compare it against what you observed in Steps 1-3. Confirm:

- The routes it lists (`/`, `/gallery`, `/upload`, `/admin`) match the routes handled in `wwwroot/app.js`.
- The "no external NuGet packages or npm dependencies" claim matches `PhotoGallery.csproj` (no `<PackageReference>` items) and the absence of a `package.json`.

### Step 5: Capture a concise architecture map

Ask Copilot to produce a short architecture summary you can keep as workshop notes:

```text
Produce a concise architecture map of this repository as a short bulleted list:
request entry point, static asset serving, client-side routing, rendering, and styling.
Keep it to 10 lines or fewer.
```

Save this output somewhere you can refer back to later (a scratch file outside the repo, a note, or a chat you keep open). You will reuse this mental model in the next module.

## Expected evidence / validation

- You can state, in your own words, what happens between a browser request for `/gallery` and the rendered gallery grid.
- Every claim in Copilot's summary was checked against the actual file content in at least one case.
- `git status` shows no changes to the working tree — this module is read-only.

## ✅ Completion checklist

- [ ] Reviewed Copilot's summary of all five core files and confirmed it against the files themselves
- [ ] Traced the `/gallery` route from `Program.cs` through `wwwroot/app.js` rendering and binding
- [ ] Used **Explain** on at least one function and validated the explanation
- [ ] Compared `.github/copilot-instructions.md` claims against the real routes and dependency list
- [ ] Captured a short architecture map to reuse later
- [ ] Confirmed no files were changed (`git status` is clean)

## Next step

👉 **[2. Plan and Implement a Scoped Feature](02-plan-scoped-feature.md)**
