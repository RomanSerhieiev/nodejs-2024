import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public checkToken(secret: string) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const authorization = req.headers.authorization;
        if (!authorization) {
          throw new ApiError("Token is not provided", 401);
        }

        const token = authorization.split("Bearer ")[1];
        const payload = await tokenService.verify(token, secret);

        const dbToken = await tokenRepository.findByParams({ token });
        if (!dbToken) {
          throw new ApiError("Token is not valid", 401);
        }
        req.res.locals.payload = payload;
        req.res.locals.token = token;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
