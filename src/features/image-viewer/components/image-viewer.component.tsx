import { UploadedFileWithUrl } from "../../../models/files/files.model";
import { fileService } from "../../../services/file.service";
import { useQuery } from "@tanstack/react-query";

const Loading = () => <div>Loading...</div>;

const Error = ({ error }: { error: Error }) => (
  <div>Error: {error.message}</div>
);

const NoFiles = () => <div>No files found</div>;

const FileImageList = ({ files }: { files: UploadedFileWithUrl[] }) => (
  <ul className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 max-w-4xl gap-2">
    {files.map((file) => (
      <li
        key={file.id}
        className="overflow-hidden rounded-md shadow-md w-32 h-32 relative"
      >
        <img
          src={file.url}
          alt={file.name}
          className="w-full h-full object-cover"
        />
      </li>
    ))}
  </ul>
);

const ImageViewer = () => {
  const {
    data: files,
    status,
    error,
  } = useQuery({
    queryKey: ["files"],
    queryFn: fileService.getFilesWithUrls,
  });

  return (
    <div className="w-full flex flex-col justify-center">
      <h1 className="text-center font-bold text-3xl mb-4">Image Viewer</h1>
      <div className="flex justify-center">
        {status === "pending" ? (
          <Loading />
        ) : status === "error" ? (
          <Error error={error} />
        ) : files && files.length > 0 ? (
          <FileImageList files={files} />
        ) : (
          <NoFiles />
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
