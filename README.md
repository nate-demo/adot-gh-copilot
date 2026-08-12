# Photo Gallery & Portfolio

A minimal photo gallery workshop application built with ASP.NET Core on .NET 8. It uses only the .NET shared framework and browser-native HTML, CSS, and JavaScript—no npm or external NuGet packages are required.

## Requirements

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or newer

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
PhotoGallery.csproj           .NET 8 project with no package references
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

Workshop guides are available in the [`demos`](demos/) directory.
