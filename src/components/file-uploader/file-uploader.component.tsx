import { BaseButton } from "../base-button";
import { FilePicker } from "../file-picker";
import styles from "./file-uploader.module.css";
import { MdFileUpload } from "react-icons/md";

type FileUploaderProps = {
  loading?: boolean;
  disabled?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
  errorMessage?: string;
};

const FileItem = ({ file }: { file: File }) => {
  return (
    <li className={styles.previewFile}>
      <MdFileUpload style={{ display: "inline-block" }} />
      {file.name}
    </li>
  );
};

/**
 * FileUploader component agnostic from the file upload implementation.
 *
 * We might want to forward the ref to the child Input component, but to avoid breaking SB I am skipping this step (will add in production code).
 */
const FileUploader = ({
  handleFileChange,
  handleSubmit,
  loading,
  files,
  disabled,
  errorMessage,
}: FileUploaderProps) => {
  return (
    <div className={styles.uploader}>
      <ul className={styles.preview}>
        {loading ? (
          <li>
            <p>Uploading...</p>
          </li>
        ) : files.length > 0 ? (
          files.map((file) => <FileItem key={file.name} file={file} />)
        ) : (
          <li>
            <p>Drag and drop zone (not implemented)</p>
          </li>
        )}
      </ul>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FilePicker
          files={files}
          multiple
          accept="image/*"
          disabled={loading || disabled}
          onFileChange={handleFileChange}
        />
        <BaseButton
          disabled={loading || !files || files.length === 0}
          type="submit"
          variant="tertiary"
        >
          {loading ? "Uploading..." : "Upload"}
        </BaseButton>
      </form>
      <div className={styles.error}>
        {errorMessage && (
          <p role="alert" aria-live="assertive" aria-atomic="true">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
