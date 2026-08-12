# Optional: Modernization Extension

## Outcome

This repository's baseline has been upgraded to **.NET 10**. This optional module teaches you to validate that upgrade end-to-end and use Copilot to look for further modernization opportunities — without creating a second sample app or reverting any part of the upgrade.

**Estimated time:** 15-20 minutes

## Prerequisites

- The [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) installed locally, or use the repository's dev container.
- Completed (or read) [1. Understand the Codebase](01-understand-codebase.md).

## Steps

### Step 1: Confirm the target framework

Open [`PhotoGallery.csproj`](../PhotoGallery.csproj) and confirm `<TargetFramework>net10.0</TargetFramework>`. Ask Copilot to double-check for stragglers:

```text
Search the repository for any file that still references net8.0, net9.0, or a .NET 8 SDK,
and list each one with its line. Do not make any changes yet.
```

### Step 2: Confirm the dev container matches

Open [`.devcontainer/devcontainer.json`](../.devcontainer/devcontainer.json) and confirm the `image` field references the `10.0` tag (for example, `mcr.microsoft.com/devcontainers/dotnet:10.0`). This must match the SDK version participants build with locally.

### Step 3: Confirm documentation consistency

Check that these two files describe the same .NET 10 baseline as the project file:

- [`README.md`](../README.md) — the intro paragraph, the SDK requirement, and the application structure table should all say .NET 10.
- [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) — the project overview line should say ".NET 10", not an older version.

If you find a mismatch, ask Copilot to fix just that line:

```text
Update the .NET version mentioned in <file> to match PhotoGallery.csproj's TargetFramework.
Change only the version reference, nothing else.
```

### Step 4: Restore and build

```bash
dotnet restore
dotnet build
```

Confirm both commands succeed with the .NET 10 SDK and produce no target-framework warnings.

### Step 5: Health and route smoke tests

Run the app:

```bash
dotnet run
```

With the app running, confirm each of the following in a browser or with `curl`:

```bash
curl -i http://localhost:5000/health
curl -i http://localhost:5000/
curl -i http://localhost:5000/gallery
curl -i http://localhost:5000/upload
curl -i http://localhost:5000/admin
```

- `/health` returns a 200 with the healthy status payload.
- `/`, `/gallery`, `/upload`, and `/admin` all return the same `index.html` shell (via the fallback route) and render the correct client-side page once loaded in a browser.

### Step 6: Review official .NET 9 → .NET 10 compatibility notes

Read through:

- [Upgrade to a new .NET version](https://learn.microsoft.com/en-us/dotnet/core/install/upgrade)
- [Breaking changes in .NET 10](https://learn.microsoft.com/en-us/dotnet/core/compatibility/10)

Since this is a package-free, minimal-hosting application, most breaking-change categories (for example, ASP.NET Core, EF Core, or specific NuGet-delivered libraries) won't apply. Ask Copilot to help scope which ones are actually relevant:

```text
Given that PhotoGallery.csproj has no PackageReference items and Program.cs only calls
UseDefaultFiles, UseStaticFiles, MapGet, and MapFallbackToFile, which categories of .NET 10
breaking changes (from the official compatibility page) could plausibly affect this app,
and which categories can be ruled out? Explain your reasoning, don't change any files.
```

### Step 7: Look for further modernization opportunities

Ask Copilot for additional, low-risk modernization ideas that fit the package-free constraint:

```text
Now that this app targets .NET 10, are there any minimal-hosting APIs, Program.cs
simplifications, or built-in ASP.NET Core features from .NET 9 or .NET 10 that would
improve this file without adding any package? List ideas only, do not implement them.
```

Evaluate each idea against the repository's guidelines: no dependencies, preserved routes, responsive/dark mode intact, and safe rendering of user-controlled content.

## Expected evidence / validation

- `PhotoGallery.csproj`, `.devcontainer/devcontainer.json`, `README.md`, and `.github/copilot-instructions.md` all consistently describe .NET 10.
- `dotnet restore` and `dotnet build` both succeed.
- All five smoke-tested endpoints (`/health`, `/`, `/gallery`, `/upload`, `/admin`) respond correctly.
- You can name which .NET 10 breaking-change categories apply to this app and which don't, with reasoning.
- No second sample app or duplicate project was created.

## ✅ Completion checklist

- [ ] Confirmed `PhotoGallery.csproj` targets `net10.0` with no stray .NET 8/9 references
- [ ] Confirmed the dev container image matches the .NET 10 SDK
- [ ] Confirmed README and Copilot instructions consistently describe .NET 10
- [ ] Ran `dotnet restore` and `dotnet build` successfully
- [ ] Smoke-tested the health endpoint and all four application routes
- [ ] Reviewed the official .NET 10 upgrade and compatibility-notes pages
- [ ] Captured further modernization ideas without implementing them
