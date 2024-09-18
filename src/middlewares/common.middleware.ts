import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";

class CommonMiddleware {
  public isIdValid(id: string) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        if (!isObjectIdOrHexString(req.params[id])) {
          throw new ApiError("Invalid ID", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isDtoValid(validator: ObjectSchema) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        req.body = await validator.validateAsync(req.body, {
          abortEarly: false,
        });
        next();
      } catch (e) {
        next(
          new ApiError(
            e.details
              .map((detail: { message: string }) => detail.message)
              .join(", "),
            400,
          ),
        );
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
