import express from "express";
import mutler from "multer";
import { readdir, stat } from "fs/promises";
import { join, resolve } from "path";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __dirname = dirname(fileURLToPath(import.meta.url));

const S3_DIR = join(resolve(__dirname, "../"), "uploads");

export const app = express();

const upload = mutler({ dest: "uploads/" });

// in real environment we would block all origins and only whitelist FE domain based on the environment loaded (staging -> staging, production -> production)
app.use(cors());

app.use(express.json());

// pretend that the /uploads is our S3 bucket
app.use("/s3", express.static(S3_DIR));

app.get("/api/ping", (_, res) => res.status(200).json({ success: true }));

/**
 * In reality we might provide the end user with a pre-signed URL to upload the file directly to S3 with an expiration date of 5-10 minutes to avoid exposing AWS credentials on the FE.
 */
app.post("/api/upload", upload.single("file_upload"), function (_req, res) {
  /**
   * In this function we would need to validate the file and save it to a distributed file system storage like S3.
   *
   * We need to store each image with an unique identifier and store the identifier in a database, and have that identifier pointing at the URL of the image in the distributed file system.
   */
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    return res.status(500).json({ message });
  }
});

app.get("/api/files", async (_req, res) => {
  /**
   * In this function we would need to query the database for the images and return the URLs of the images.
   */
  try {
    const fileNames = await readdir("uploads/");
    const files: { name: string; size: number; id: string }[] = [];
    for (const fileName of fileNames) {
      const file = await stat(join("uploads", fileName));
      files.push({
        name: fileName,
        size: file.size,
        // added ID from BE to simulate the ID that would be stored in the database
        id: nanoid(),
      });
    }

    return res.status(200).json({ files });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    return res.status(500).json({ message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
