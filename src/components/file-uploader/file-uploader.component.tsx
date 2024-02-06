import { BaseButton } from "../base-button";
import { FilePicker } from "../file-picker";
import styles from "./file-uploader.module.css";

type FileUploaderProps = {
  loading?: boolean;
  disabled?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
  errorMessage?: string;
};

/**
 * FileUploader component agnostic from the file upload implementation.
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
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default FileUploader;
