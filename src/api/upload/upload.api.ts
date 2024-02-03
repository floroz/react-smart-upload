import { API_URL } from "../../constants/api";

export const uploadFile = async ({
  file,
  fieldName,
}: {
  fieldName: string;
  file: File;
}): Promise<void> => {
  const form = new FormData();

  form.append(fieldName, file);

  const response = await fetch(API_URL + "/upload", {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }
};

// export const uploadChunk = async (file: Blob, ops: {
//   chunkName: string;
//   chunkSize: number;
//   fileName: string;
//   chunkNumber: number;
// }) => {
//   // TODO: requires backend handling chunks upload and streams
// }
