export type UploadedFileDTO = {
  name: string;
  size: number;
  id: string;
};
export type UploadedFilesDTO = {
  files: UploadedFileDTO[];
};

export type UploadedFileWithUrl = UploadedFileDTO & {
  url: string;
};
