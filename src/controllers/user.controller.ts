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
      const { userId } = req.params;
      const user = await userService.getById(userId);
      return res.send(user);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      const dto = req.body as IUser;
      const newUser = await userService.create(dto);
      return res.status(201).send(`User ${newUser.name} was created`);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      const { userId } = req.params;
      const dto = req.body as Partial<IUser>;
      const updatedUser = await userService.updateById(userId, dto);
      return res.status(201).send(`User ${updatedUser.name} was updated.`);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<string>> {
    try {
      const { userId } = req.params;
      const deletedUser = await userService.deleteById(userId);
      return res.status(201).send(`User ${deletedUser.name} was deleted.`);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
