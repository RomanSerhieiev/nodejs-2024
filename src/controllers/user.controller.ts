import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.getById(req.params.userId);
      return res.send(user);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.getMe(req.res.locals.jwtPayload);
      return res.send(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      const updatedUser = await userService.updateMe(
        req.res.locals.jwtPayload,
        req.body,
      );
      return res.status(201).send(`User ${updatedUser.name} was updated.`);
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
      const deletedUser = await userService.deleteMe(req.res.locals.jwtPayload);
      return res.status(201).send(`User ${deletedUser.name} was deleted.`);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
