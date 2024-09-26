import { NextFunction, Request, Response } from "express";

import { EDevice } from "../enums/count-devices.enum";
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

  public signOut(countDevices: EDevice) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response<string>> => {
      try {
        await authService.signOut(countDevices, req.res.locals.payload);
        const message =
          countDevices === EDevice.CURRENT ? "current device" : "all devices";
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
        req.res.locals.payload,
      );
      return res.status(200).send(userWithTokens);
    } catch (e) {
      next(e);
    }
  }

  public async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      await authService.changePassword(req.body, req.res.locals.payload.userId);
      return res.status(200).send("Password is updated");
    } catch (e) {
      next(e);
    }
  }

  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      await authService.forgotPassword(req.body.email);
      return res.status(200).send("Email was send");
    } catch (e) {
      next(e);
    }
  }

  public async setPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      await authService.setPassword(
        req.body.newPassword,
        req.res.locals.token,
        req.res.locals.payload.userId,
      );
      return res.status(200).send("Password was updated");
    } catch (e) {
      next(e);
    }
  }

  public async emailVerification(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      await authService.emailVerification(
        req.res.locals.token,
        req.res.locals.payload.userId,
      );
      return res.status(200).send("Email was verified");
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
