import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api.error";
import { IFile } from "../interfaces/file.interface";

class FileMiddleware {
  public isFileValid(key: string, config: IFile) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const file = req.files?.[key] as UploadedFile;

        if (!file) {
          throw new ApiError(`${key} not found`, 400);
        }

        if (Array.isArray(file)) {
          throw new ApiError(`${key} can be only one`, 400);
        }

        if (!config.MIME_TYPES.includes(file.mimetype)) {
          throw new ApiError(`${key} has invalid format`, 400);
        }

        if (file.size > config.MAX_SIZE) {
          throw new ApiError(`${key} is too big`, 400);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
