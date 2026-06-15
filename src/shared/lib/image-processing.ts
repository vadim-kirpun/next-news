import "server-only";

import sharp from "sharp";

const MAX_IMAGE_WIDTH = 1920;
const UPLOAD_QUALITY = 80;

export type ProcessedUpload = {
  buffer: Buffer;
  extension: "webp";
};

export async function processImageUpload(
  buffer: Buffer,
): Promise<ProcessedUpload> {
  const metadata = await sharp(buffer).metadata();
  let pipeline = sharp(buffer).rotate();

  if (metadata.width && metadata.width > MAX_IMAGE_WIDTH) {
    pipeline = pipeline.resize(MAX_IMAGE_WIDTH, undefined, {
      withoutEnlargement: true,
    });
  }

  const processedBuffer = await pipeline
    .webp({ quality: UPLOAD_QUALITY })
    .toBuffer();

  return {
    buffer: processedBuffer,
    extension: "webp",
  };
}
