# Photo Gallery & Portfolio

A minimal photo gallery workshop application built with ASP.NET Core on .NET 10. It uses only the .NET shared framework and browser-native HTML, CSS, and JavaScript—no npm or external NuGet packages are required.

## Requirements

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)

## Run locally

```bash
dotnet run
```

Open [http://localhost:5000](http://localhost:5000).

To verify the application without starting it:

```bash
dotnet build
```

## Application structure

```text
Program.cs                    Minimal ASP.NET Core application
PhotoGallery.csproj           .NET 10 project with no package references
wwwroot/
├── index.html                Application shell
├── app.js                    Routes, mock data, and interactions
└── styles.css                Responsive application styles
demos/                        GitHub Copilot workshop guides
```

ASP.NET Core serves the static application and falls back to `index.html` for the `/gallery`, `/upload`, and `/admin` routes. The `/health` endpoint provides a basic local health check.

## Tests

The repository intentionally contains no unit-test project so workshop participants can add one as a demonstration.

## Demos

Workshop guides are available in the [`demos`](demos/) directory. The five-part core curriculum covers:

1. [Understanding an unfamiliar .NET codebase](demos/01-understand-codebase.md)
2. [Planning and implementing a scoped feature](demos/02-plan-scoped-feature.md)
3. [Applying repository instructions and team standards](demos/03-apply-repository-standards.md)
4. [Drafting tests, identifying security risks, and reviewing changes](demos/04-tests-security-review.md)
5. [Running parallel workstreams in the GitHub Copilot desktop app](demos/05-parallel-workstreams.md)

Short [exposure exercises](demos/optional-exposure-demos.md) for Copilot Spaces, Cloud Agent, and Copilot CLI, plus a [.NET modernization extension](demos/optional-modernization-extension.md), are available as optional follow-up material.
