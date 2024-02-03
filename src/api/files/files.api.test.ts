import { HttpResponse, http } from "msw";
import { it, expect, beforeEach } from "vitest";
import { getFiles } from "./files.api";
import { API_URL } from "../../constants/api";
import { server } from "../../mocks/node";

beforeEach(() => {
  server.resetHandlers();
});

it("returns files data when getFiles is called", async () => {
  server.use(
    http.get(`${API_URL}/files`, () => {
      return HttpResponse.json({ success: true });
    }),
  );

  const data = await getFiles();

  expect(data).toEqual({ success: true });
});

it("throws an error for 500 codes", async () => {
  server.use(
    http.get(`${API_URL}/files`, () => {
      return new HttpResponse("", { status: 500 });
    }),
  );

  expect(() => getFiles()).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to get files]`,
  );
});

it("throws an error for 400 codes", async () => {
  server.use(
    http.get(`${API_URL}/files`, () => {
      return new HttpResponse("", { status: 400 });
    }),
  );

  expect(() => getFiles()).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to get files]`,
  );
});

it("throws an error for 300 codes", async () => {
  server.use(
    http.get(`${API_URL}/files`, () => {
      return new HttpResponse("", { status: 300 });
    }),
  );

  expect(() => getFiles()).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to get files]`,
  );
});
