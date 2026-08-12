# Application Guide

The gallery uses a minimal static front end served by ASP.NET Core.

## Server

`Program.cs` configures static files, a health endpoint, and fallback routing. Keep server changes limited to APIs or middleware that cannot be implemented in the browser.

## Client

- `wwwroot/index.html` contains the shared document shell and navigation.
- `wwwroot/app.js` contains page templates, mock data, and browser interactions.
- `wwwroot/styles.css` contains reusable component styles and responsive rules.

Page functions in `app.js` return markup for the home, gallery, upload, and admin routes. Bind interactive behavior after rendering a page, and use browser-native APIs instead of adding dependencies.
