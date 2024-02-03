import { useState } from "react";
import { uploadFile } from "../../../api/upload/upload.api";
import { BaseButton } from "../../../components/base-button";
import { FilePicker } from "../../../components/file-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    <section className="">
      <form onSubmit={handleSubmit}>
        <div className="">
          <FilePicker
            files={files}
            multiple
            disabled={isPending}
            onFileChange={handleFileChange}
          />
        </div>
        <BaseButton disabled={isPending} type="submit" variant="primary">
          {isPending ? "Uploading..." : "Upload"}
        </BaseButton>
      </form>
    </section>
  );
};

export default ImageFormUpload;
