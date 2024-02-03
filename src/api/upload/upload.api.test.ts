import { HttpResponse, http } from "msw";
import { it, expect, beforeEach } from "vitest";
import { API_URL } from "../../constants/api";
import { server } from "../../mocks/node";
import { uploadFile } from "./upload.api";

beforeEach(() => {
  server.resetHandlers();
});

it("should upload a file to the BE as FormData with a field name", async () => {
  const fieldName = "file_upload";
  server.use(
    http.post(`${API_URL}/upload`, async ({ request }) => {
      expect(request.body).toBeInstanceOf(ReadableStream);

      const formData = await request.formData();

      expect(formData).toBeInstanceOf(FormData);
      expect(formData.get(fieldName)).toBeInstanceOf(File);
      expect((formData.get(fieldName) as File).name).toBe("file.txt");

      expect(request.headers.get("content-type")).toContain(
        "multipart/form-data",
      );

      return new HttpResponse("", { status: 200 });
    }),
  );
  await uploadFile({ file: new File([""], "file.txt"), fieldName });
});

it("throws an error for 500 codes", async () => {
  server.use(
    http.post(`${API_URL}/upload`, () => {
      return new HttpResponse("", { status: 500 });
    }),
  );

  expect(() =>
    uploadFile({ file: new File([""], "file.txt"), fieldName: "" }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to upload file]`,
  );
});

it("throws an error for 400 codes", async () => {
  server.use(
    http.post(`${API_URL}/upload`, () => {
      return new HttpResponse("", { status: 400 });
    }),
  );

  expect(() =>
    uploadFile({ file: new File([""], "file.txt"), fieldName: "" }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to upload file]`,
  );
});

it("throws an error for 300 codes", async () => {
  server.use(
    http.post(`${API_URL}/upload`, () => {
      return new HttpResponse("", { status: 300 });
    }),
  );

  expect(() =>
    uploadFile({ file: new File([""], "file.txt"), fieldName: "" }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: Failed to upload file]`,
  );
});
