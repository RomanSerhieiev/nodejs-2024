import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { IPaginated } from "../interfaces/pagination.interface";
import { IUserRes } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IPaginated<IUserRes[]>>> {
    try {
      const users = await userService.findAll(req.query);
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUserRes>> {
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
  ): Promise<Response<IUserRes>> {
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
  ): Promise<Response<IUserRes>> {
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

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUserRes>> {
    try {
      const avatar = req.files.avatar as UploadedFile;
      const user = await userService.uploadAvatar(
        req.res.locals.payload.userId,
        avatar,
      );
      return res.status(201).send(user);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUserRes>> {
    try {
      const user = await userService.deleteAvatar(
        req.res.locals.payload.userId,
      );
      return res.status(201).send(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
