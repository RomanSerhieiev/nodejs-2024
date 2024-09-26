import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.findById(req.params.userId);
      return res.send(user);
    } catch (e) {
      next(e);
    }
  }

  public async findMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.findMe(req.res.locals.payload.userId);
      return res.send(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.updateMe(
        req.res.locals.payload.userId,
        req.body,
      );
      return res.status(201).send(user);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      await userService.deleteMe(req.res.locals.payload.userId);
      return res.status(201).send("User was deleted.");
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
