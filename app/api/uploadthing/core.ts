import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete", file.ufsUrl);
    // You can store file.url in DB
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
