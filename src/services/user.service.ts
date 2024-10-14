import { UploadedFile } from "express-fileupload";
import { Schema } from "mongoose";

import { EFileItemType } from "../enums/file.enum";
import { ApiError } from "../errors/api.error";
import { IPaginated } from "../interfaces/pagination.interface";
import { IQuery } from "../interfaces/query.interface";
import { IUserReq, IUserRes } from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { deviceRepository } from "../repositories/device.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async findAll(query: IQuery): Promise<IPaginated<IUserRes[]>> {
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );
    const [users, totalItems] = await userRepository.findAll(queryObj);
    const data = userPresenter.all(users);

    return {
      page: query.page,
      totalPages: Math.floor(totalItems / query.limit) + 1,
      limit: query.limit,
      totalItems,
      data,
    };
  }

  public async findById(userId: string): Promise<IUserRes> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return userPresenter.one(user);
  }

  public async findMe(userId: Schema.Types.ObjectId): Promise<IUserRes> {
    const user = await userRepository.findMe(userId);
    return userPresenter.one(user);
  }

  public async updateMe(
    userId: Schema.Types.ObjectId,
    dto: Partial<IUserReq>,
  ): Promise<IUserRes> {
    const user = await userRepository.updateMe(userId, dto);
    return userPresenter.one(user);
  }

  public async deleteMe(_userId: Schema.Types.ObjectId): Promise<void> {
    await deviceRepository.deleteManyByParams({ _userId });
    await userRepository.deleteMe(_userId);
  }

  public async uploadAvatar(
    userId: Schema.Types.ObjectId,
    file: UploadedFile,
  ): Promise<IUserRes> {
    const user = await userRepository.findMe(userId);
    const avatar = await s3Service.uploadFile(file, EFileItemType.USER, userId);
    await this.isAvatarExist(user.avatar);
    const result = await userRepository.updateMe(userId, { avatar });
    return userPresenter.one(result);
  }

  public async deleteAvatar(userId: Schema.Types.ObjectId): Promise<IUserRes> {
    const user = await userRepository.findMe(userId);
    await this.isAvatarExist(user.avatar);
    const result = await userRepository.updateMe(userId, { avatar: null });
    return userPresenter.one(result);
  }

  private async isAvatarExist(avatar: string): Promise<void> {
    if (avatar) {
      await s3Service.deleteFile(avatar);
    }
  }
}

export const userService = new UserService();
