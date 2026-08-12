---
name: dotnet-unit-testing
description: 'Plan focused .NET tests while keeping test dependencies isolated from the application.'
---

# .NET Unit Testing

Use this skill when a workshop participant asks to add the repository's first tests.

## Workflow

1. Identify behavior that can be tested independently.
2. Provide a concise test plan before changing files.
3. Create a separate test project so the application project remains package-free.
4. Use clear Arrange, Act, Assert phases and descriptive test names.
5. Cover happy paths, boundaries, invalid input, and accessibility behavior where applicable.
6. Run only the targeted tests first, then run the complete test project.

Do not add a test framework or package unless the participant explicitly asks to implement the plan. Never add test package references to `PhotoGallery.csproj`.
