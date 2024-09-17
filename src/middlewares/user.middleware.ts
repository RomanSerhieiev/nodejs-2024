import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { createDto, updateDto } from "../validators/user.validator";

class UserMiddleware {
  public async isCreateDtoValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = createDto.validate(req.body, { abortEarly: false });
      if (error) {
        throw new ApiError(
          error.details.map((detail) => detail.message).join(", "),
          400,
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUpdateDtoValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { error } = updateDto.validate(req.body, { abortEarly: false });
      if (error) {
        throw new ApiError(
          error.details.map((detail) => detail.message).join(", "),
          400,
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
