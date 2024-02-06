import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FileUploaderMVP } from "./features/file-upload";
import { ImageViewer } from "./features/image-viewer";
import { memo } from "react";

const queryClient = new QueryClient();

// memoization to protect against Context root re-renders
// not necessary for react query since the reference of queryClient is stable, but for future addition of other contexes
const MemoApp = memo(() => {
  return (
    <>
      <FileUploaderMVP />
      <ImageViewer />
    </>
  );
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoApp />
    </QueryClientProvider>
  );
}
