import { API_URL } from "../../constants/api";
import { UploadedFilesDTO } from "../../models/files/files.model";

export const getFiles = async (): Promise<UploadedFilesDTO> => {
  const response = await fetch(`${API_URL}/files`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to get files");
  }

  return response.json();
};
