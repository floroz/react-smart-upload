import { forwardRef } from "react";
import { FilePickerProps } from "./file-picker.types";
import styles from "./file-picker.module.css";
import { clsx } from "clsx";
import { MdOutlineFileUpload } from "react-icons/md";
import { generateButtonTextFromFiles } from "./file-picker.utils";

const FilePicker = forwardRef<HTMLInputElement | null, FilePickerProps>(
  (
    {
      accept,
      disabled,
      files,
      inputClassNames,
      inputStyles,
      leftIcon,
      multiple,
      name,
      onFileChange,
      placeholder,
      variant = "primary",
      ...inputAttributes
    },
    ref,
  ) => {
    const buttonText: string =
      files && files.length
        ? generateButtonTextFromFiles(files)
        : placeholder
          ? placeholder
          : "Choose a file";

    return (
      <label
        title={buttonText}
        className={clsx(
          styles.label,
          {
            [styles.disabled]: disabled,
            [styles.primary]: variant === "primary",
            [styles.secondary]: variant === "secondary",
            [styles.tertiary]: variant === "tertiary",
          },
          inputClassNames,
        )}
        style={inputStyles}
      >
        <span className={styles.labelIcon}>
          {leftIcon ?? <MdOutlineFileUpload />}
        </span>
        <span className={styles.labelText}>{buttonText}</span>
        <input
          className={styles.input}
          {...inputAttributes}
          disabled={disabled}
          multiple={multiple}
          name={name}
          accept={accept}
          type="file"
          ref={ref}
          onChange={onFileChange}
        />
      </label>
    );
  },
);

export default FilePicker;
