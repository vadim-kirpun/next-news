"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as v from "valibot";

import { createNewsItem } from "@/lib/news";

const MAX_IMAGE_UPLOAD_SIZE = 3 * 1024 * 1024;
const uploadDir = path.join(process.cwd(), "public", "images");

const createNewsSchema = v.strictObject({
  title: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(5, "Title should have at least 5 characters"),
    v.maxLength(120, "Title should be at most 120 characters"),
  ),
  content: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(20, "Content should have at least 20 characters"),
    v.maxLength(10_000, "Content should be at most 10000 characters"),
  ),
});

export type CreateNewsState = {
  message?: string;
  fieldErrors?: {
    title?: string[];
    content?: string[];
    imageUpload?: string[];
  };
  values?: {
    title: string;
    content: string;
  };
};

export const initialCreateNewsState: CreateNewsState = {
  values: {
    title: "",
    content: "",
  },
};

function getImageExtensionFromSignature(buffer: Buffer) {
  const isPng =
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a;

  if (isPng) {
    return "png";
  }

  const isJpeg =
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff;

  if (isJpeg) {
    return "jpg";
  }

  const isWebp =
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP";

  if (isWebp) {
    return "webp";
  }

  return null;
}

async function saveUploadedImage(file: File) {
  if (!file.size) {
    throw new Error("Please upload a cover image.");
  }

  if (file.size > MAX_IMAGE_UPLOAD_SIZE) {
    throw new Error("Uploaded image is too large.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = getImageExtensionFromSignature(buffer);

  if (!extension) {
    throw new Error("Unsupported image format. Use JPG, PNG or WEBP.");
  }

  await mkdir(uploadDir, { recursive: true });

  const filename = `uploaded-${Date.now()}-${randomUUID().slice(0, 8)}.${extension}`;
  const filePath = path.join(uploadDir, filename);

  await writeFile(filePath, buffer);

  return filename;
}

export async function createNewsAction(
  _prevState: CreateNewsState,
  formData: FormData,
): Promise<CreateNewsState> {
  const uploadedImage = formData.get("imageUpload");
  const rawValues = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
  };

  const parsed = v.safeParse(createNewsSchema, rawValues);

  if (!parsed.success) {
    const flattened = v.flatten<typeof createNewsSchema>(parsed.issues);

    return {
      message: "Please fix validation errors.",
      fieldErrors: {
        title: flattened.nested?.title,
        content: flattened.nested?.content,
      },
      values: rawValues,
    };
  }

  try {
    if (!(uploadedImage instanceof File)) {
      return {
        message: "Please fix validation errors.",
        fieldErrors: {
          imageUpload: ["Please upload a cover image."],
        },
        values: rawValues,
      };
    }

    const uploadedImageName = await saveUploadedImage(uploadedImage);
    const created = await createNewsItem({
      ...parsed.output,
      image: uploadedImageName,
    });

    revalidatePath("/news");
    revalidatePath("/");

    redirect(`/news/${created.id}`);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not save the article. Please retry.";

    return {
      message,
      fieldErrors: {
        imageUpload: [message],
      },
      values: rawValues,
    };
  }
}
