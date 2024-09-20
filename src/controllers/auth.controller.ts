import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";
import { TUserWithTokens } from "../types/user-with-tokens.type";

class AuthController {
  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<TUserWithTokens>> {
    try {
      const userWithTokens = await authService.signUp(req.body);
      return res.status(201).send(userWithTokens);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<TUserWithTokens>> {
    try {
      const userWithTokens = await authService.signIn(req.body);
      return res.status(200).send(userWithTokens);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
