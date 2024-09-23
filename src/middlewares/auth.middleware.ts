import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { IToken } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public checkToken(type: ETokenType) {
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
        const payload = await tokenService.verify(token, type);

        let tokenFieldName: keyof IToken;

        switch (type) {
          case ETokenType.ACCESS:
            tokenFieldName = "access";
            break;

          case ETokenType.REFRESH:
            tokenFieldName = "refresh";
            break;
        }

        const pair = await tokenRepository.findByParams({
          [tokenFieldName]: token,
        });
        if (!pair) {
          throw new ApiError("Token is not valid", 401);
        }
        req.res.locals.jwtPayload = payload;
        req.res.locals.token = token;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
