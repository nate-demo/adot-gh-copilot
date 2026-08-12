# Copilot Instructions for Photo Gallery & Portfolio

## Project overview

This is a minimal ASP.NET Core application targeting .NET 8. ASP.NET Core serves a browser-native HTML, CSS, and JavaScript photo gallery.

## Architecture

- `Program.cs` configures the web application, static files, health check, and fallback routing.
- `wwwroot/index.html` provides the shared application shell.
- `wwwroot/app.js` contains mock data, page templates, routing, and interactions.
- `wwwroot/styles.css` contains responsive light and dark mode styles.

## Development workflow

```bash
dotnet run
dotnet build
```

The application runs at `http://localhost:5000`.

## Guidelines

- Do not add external NuGet packages or npm dependencies.
- Prefer ASP.NET Core and browser APIs included with the platform.
- Keep features small and focused.
- Preserve the `/`, `/gallery`, `/upload`, and `/admin` routes.
- Maintain responsive and dark mode styles.
- Encode or safely render any user-controlled content.
