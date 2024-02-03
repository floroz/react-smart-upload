# React Smart Upload

## Prerequisite

- Make sure you have Node >= 18
- Install dependencies: `npm i`

## Component Library

Start Storybook to review the Components:

- `npm run storybook`

## Application (Frontend and Backend)

Start the application:

- `npm run dev`

## Testing 

Run the testing suite in CI mode (headless)

- `npm run test:ci`

This will run both Unit and Integration test (Vitest and Cypress)

### Testing Strategy

- Mock Service Worker for intercepting network requests and mock Http Response
- Vitest for unit testing of business logic, hooks, utilities, etc.
- Cypress Component Testing for complex Component integration, Component Library (to ensure real DOM Environment)
- [NOT IMPLEMENTED] Percy/Chromatic for Visual Regression Testing
- [NOT IMPLEMENTED] Cypress/Playwright for E2E testing for FE/BE