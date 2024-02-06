import { useState } from "react";
import { uploadFile } from "../../../api/upload/upload.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileUploader } from "../../../components";

/**
 * The design of this component will be influenced by:
 *
 * 1. UX Design requirements
 *  a) Design constraints vs Design flexibility
 *  b) User flow
 *  c) Accessibility requirements
 *  d) Drag and drop support
 *  e) File preview
 *  f) Error messages to the user
 *
 * 2. Backend requirements
 *  a) API contract
 *  b) File types and size
 *  c) File validation
 *  d) File compression
 *  e) File storage
 *  f) Parallel uploading
 *  g) Retry failed uploads
 *  h) Chunking
 *
 * 3. Engineering requirements:
 *  a) shared across teams?
 *  b) support different BE and services?
 */
const FileUploaderMVP = () => {
  const [files, setFiles] = useState<File[]>([]);

  const queryClient = useQueryClient();

  const {
    isPending,
    mutateAsync: uploadMutation,
    error,
    reset: resetError,
  } = useMutation({
    mutationFn: uploadFile,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles instanceof FileList && selectedFiles.length > 0) {
      const filesArray = [...selectedFiles];
      setFiles(filesArray);
    } else {
      console.warn("No files were selected");
      setFiles([]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    resetError();

    event.preventDefault();

    if (!files || files.length === 0) {
      return;
    }

    // TODO:
    // Perform file validation on TYPE and SIZE

    // TODO: Tackle the problem of large files and too many parallel uploads.
    // Strategies are:
    // 1. Batching
    // 2. Compression
    // 3. Chunking
    // 4. Retry failed uploads
    // 5. Progress tracking of multiple uploads
    try {
      await Promise.all(
        files.map((file) => uploadMutation({ file, fieldName: "file_upload" })),
      );
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
      setFiles([]);
    } catch (err) {
      console.error("Error uploading files", err);
    }
  };
  return (
    <section className="w-full flex justify-center my-5">
      <FileUploader
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        files={files}
        loading={isPending}
        errorMessage={error?.message}
      />
    </section>
  );
};

export default FileUploaderMVP;
