import { getFiles } from "../api/files/files.api";
import { S3_URL } from "../constants/api";
import {
  UploadedFileDTO,
  UploadedFileWithUrl,
} from "../models/files/files.model";

const toUploadFileWithUrl = (file: UploadedFileDTO): UploadedFileWithUrl => ({
  ...file,
  url: `${S3_URL}/${file.name}`,
});

const getFilesWithUrls = async (): Promise<UploadedFileWithUrl[]> => {
  const { files } = await getFiles();

  return files.map(toUploadFileWithUrl);
};

export const fileService = {
  getFilesWithUrls,
};
