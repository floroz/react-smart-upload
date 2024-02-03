import { CSSProperties } from "react";

export type FilePickerProps = {
  files: File[] | null;
  /**
   * The id of the file input
   */
  id?: string;
  /**
   * A string that defines the file types the file input should accept
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
   */
  accept?: string;
  /**
   * Allow multiple files to be selected
   */
  multiple?: boolean;
  /**
   * The name of the file input
   */
  name?: string;
  /**
   * The callback function that is called when the file input changes
   */
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * TODO: implement
   */
  disabled?: boolean;
  /**
   * TODO: implement
   */
  inputStyles?: CSSProperties;
  /**
   * TODO: implement
   */
  inputClassNames?: string;
  /**
   * The text to display on the input when no files are selected.
   */
  placeholder?: string;
  /**
   * The Icon component to display on the left side of the input
   */
  leftIcon?: JSX.Element;
  /**
   * The Icon component to display on the right side of the input
   */
  variant?: "primary" | "secondary" | "tertiary";
};
