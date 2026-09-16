# Copilot instructions for this Ionic Angular project

## Project overview
- This repository contains an Ionic + Angular mobile app scaffolded with Capacitor.
- Main source code lives under `src/app`.
- Use Angular standalone components and Ionic UI primitives when adding new screens or logic.
- Keep changes focused and consistent with the existing app structure.

## Coding standards
- Prefer small, readable components and avoid unnecessary abstractions.
- Use TypeScript strict typing and explicit return types for functions when useful.
- Use SCSS for component styling and keep styles scoped to the component when possible.
- Preserve existing routing patterns defined in `src/app/app.routes.ts`.
- When creating new pages, register them in the route configuration and update navigation if needed.

## Validation
- Run `npm run build` after significant changes to verify the app still compiles.
- If adding UI behavior or logic, run the relevant Angular tests or add a focused test for the new behavior.
- Keep the app mobile-first and avoid platform-specific assumptions unless explicitly required.

## Working style
- Prefer incremental edits over large rewrites.
- Respect the existing naming conventions in the project.
- Do not add unrelated dependencies or configuration churn.
- Follow the app’s current design and structure rather than introducing alternate patterns.
