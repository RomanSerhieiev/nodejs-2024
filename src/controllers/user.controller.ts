import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { IUser } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();
      const result = userPresenter.toPublicResDtoArray(users);
      return res.send(result);
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
      const result = userPresenter.toPublicResDto(user);
      return res.send(result);
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
      const result = userPresenter.toPublicResDto(user);
      return res.send(result);
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
      const result = userPresenter.toPublicResDto(user);
      return res.status(201).send(result);
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
  ): Promise<Response<IUser>> {
    try {
      const avatar = req.files.avatar as UploadedFile;
      const user = await userService.uploadAvatar(
        req.res.locals.payload.userId,
        avatar,
      );
      const result = userPresenter.toPublicResDto(user);
      return res.status(201).send(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.deleteAvatar(
        req.res.locals.payload.userId,
      );
      const result = userPresenter.toPublicResDto(user);
      return res.status(201).send(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
