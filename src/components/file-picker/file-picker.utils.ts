export const generateButtonTextFromFiles = (files: File[]) => {
  if (files.length > 1) {
    return `${files.length} files selected`;
  } else {
    return files[0].name;
  }
};
