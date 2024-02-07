# React Smart Upload

## Prerequisite

- Make sure you have Node >= 18
- Install dependencies: `npm i`

## 1. Component Library (Storybook)

Under `src/components` we are placing Components that would ideally belong to the Design System or Shared Component Library.

Those components are data-agnostic and use CSS Modules/SCSS/PostCSS for their styling solution due to the highly dynamic nature of styles that they support.

To view the Component Library, start Storybook:

- `npm run storybook`

### Documentation for other teams

Storybook can be used to automatically generate previews of the availabile components, create an interactive playground, and use `react-codegen` to automatically generate API documentation from our types.

## 2. Application (Frontend and Backend)

Start the application (both FE and BE):

- `npm run dev`

### Overview

The application is a SPA with a single page made of 2 views/template. A Form File Upload and an Image View Gallery.

## 3. Testing Strategy

Run all tests in CI mode (headless)

- `npm run test:ci`

Run only unit tests:

- `npm run test:unit`
  
Run only Cypress component

- `npm run test:integ`

- Mock Service Worker for intercepting network requests and mock Http Response
- Vitest for unit testing of business logic, hooks, utilities, etc.
- Cypress Component Testing for complex Component integration, Component Library (to ensure real DOM Environment)
- [NOT IMPLEMENTED] Percy/Chromatic for Visual Regression Testing
- [NOT IMPLEMENTED] Cypress/Playwright for E2E testing for FE/BE