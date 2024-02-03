// vitest.setup.js
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/mocks/node";

// uncomment for debugging
// server.events.on('request:start', ({ request }) => {
//   console.log('MSW intercepted:', request.method, request.url)
// })

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
