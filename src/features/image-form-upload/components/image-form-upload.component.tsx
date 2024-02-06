import { useState } from "react";
import { uploadFile } from "../../../api/upload/upload.api";
import { BaseButton } from "../../../components/base-button";
import { FilePicker } from "../../../components/file-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * This component is an MVP to validate the correct integration of the FilePicker and our API/Services in the FE side.
 *
 * The <FileUploader /> should be responsible for hiding and containing most of the logic used here, alongside providing advanced options and customisation based on the requirements specified in the Component's comments.
 */
const ImageFormUpload = () => {
  const [files, setFiles] = useState<File[] | null>(null);

  const queryClient = useQueryClient();

  const { isPending, mutate: uploadMutation } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles instanceof FileList && selectedFiles.length > 0) {
      const filesArray = Array.from(selectedFiles);
      setFiles(filesArray);
    } else {
      console.warn("No files were selected");
      setFiles(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!files || files.length === 0) {
      return;
    }

    // TODO: Tackle the problem of large files and too many parallel uploads.
    // Strategies are:
    // 1. Batching
    // 2. Compression
    // 3. Chunking
    // 4. Retry failed uploads
    for (const file of files) {
      uploadMutation({
        file,
        fieldName: "file_upload",
      });
    }

    setFiles(null);
  };
  return (
    <section className="w-full flex justify-center my-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="">
          <FilePicker
            files={files}
            multiple
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
    </section>
  );
};

export default ImageFormUpload;
