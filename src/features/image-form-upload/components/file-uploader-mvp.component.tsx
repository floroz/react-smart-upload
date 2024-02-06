import { useState } from "react";
import { uploadFile } from "../../../api/upload/upload.api";
import { BaseButton } from "../../../components/base-button";
import { FilePicker } from "../../../components/file-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * This component is an MVP to validate the correct integration of the FilePicker and our API/Services in the FE side.
 *
 * The <FileUploader /> coming from /components/ should be responsible for hiding and containing most of the logic used here, alongside providing advanced options and customisation based on the requirements specified in the Component's comments.
 */
const FileUploaderMVP = () => {
  const [files, setFiles] = useState<File[] | null>(null);

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
      setFiles(null);
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
      setFiles(null);
    } catch (err) {
      console.error("Error uploading files", err);
    }
  };
  return (
    <section className="w-full flex justify-center my-5">
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSubmit} className="flex flex-row gap-2">
          <div className="">
            <FilePicker
              files={files}
              multiple
              accept="image/*"
              disabled={isPending}
              onFileChange={handleFileChange}
            />
          </div>
          <BaseButton
            disabled={isPending || !files || files.length === 0}
            type="submit"
            variant="tertiary"
          >
            {isPending ? "Uploading..." : "Upload"}
          </BaseButton>
        </form>
        <div className="min-h-8">
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      </div>
    </section>
  );
};

export default FileUploaderMVP;
