import { UploadedFileWithUrl } from "../../../models/files/files.model";
import { fileService } from "../../../services/file.service";
import { useQuery } from "@tanstack/react-query";

const Loading = () => <div>Loading...</div>;

const Error = ({ error }: { error: Error }) => (
  <div>Error: {error.message}</div>
);

const NoImages = () => <div>No images found. Upload images to start.</div>;

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
/**
 * Techniques to improve performances for large image galleries:
 *
 * 1. Pagination
 * 2. Infinite Scrolling / Lazy loading below the fold (Intersection Observer)
 * 3. low res low size Thumbnail loading first and then source image swapping upon loading
 */
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
          <NoImages />
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
