import { IFile } from "../interfaces/file.interface";

export const avatarConfig: IFile = {
  MIME_TYPES: [
    "image/apng",
    "image/avif",
    "image/bmp",
    "image/gif",
    "image/vnd.microsoft.icon",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
  ],
  MAX_SIZE: 2 * 1024 * 1024,
};
