import { NextFunction, Request, Response } from "express";

import { ECountDevices } from "../enums/count.enum";
import { IUserWithTokens } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUserWithTokens>> {
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
  ): Promise<Response<IUserWithTokens>> {
    try {
      const userWithTokens = await authService.signIn(req.body);
      return res.status(200).send(userWithTokens);
    } catch (e) {
      next(e);
    }
  }

  public signOut(countDevices: ECountDevices) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response<string>> => {
      try {
        await authService.signOut(countDevices, req.res.locals.jwtPayload);
        const message =
          countDevices === ECountDevices.CURRENT
            ? "current device"
            : "all devices";
        return res
          .status(200)
          .send(`You successfully signed out on ${message}`);
      } catch (e) {
        next(e);
      }
    };
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUserWithTokens>> {
    try {
      const userWithTokens = await authService.refresh(
        req.res.locals.token,
        req.res.locals.jwtPayload,
      );
      return res.status(200).send(userWithTokens);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
