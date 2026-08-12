---
mode: 'agent'
description: 'Generate a new UI component following project patterns'
tools: ['codebase', 'editFiles']
---

# Create New UI Component

## Context
Generate a new UI component for the Photo Gallery & Portfolio application following established patterns and conventions.

## Project Patterns to Follow
- Use semantic HTML and browser-native JavaScript
- Reuse the page rendering and event-binding patterns in `wwwroot/app.js`
- Implement responsive design with the existing CSS
- Include dark mode support
- Do not add npm or external NuGet packages
- Follow accessibility best practices

## Component Requirements
1. Create focused rendering and event-binding functions
2. Reuse existing CSS classes and dark mode variables
3. Use safe DOM APIs for user-controlled content
4. Follow the existing naming conventions
5. Implement responsive design patterns

## File Structure
- Markup and interactions: `wwwroot/app.js`
- Shared document shell: `wwwroot/index.html`
- Reusable styles: `wwwroot/styles.css`

Create the component following these patterns and include a usage example.
