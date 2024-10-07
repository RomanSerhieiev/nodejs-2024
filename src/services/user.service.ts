import { UploadedFile } from "express-fileupload";
import { Schema } from "mongoose";

import { EFileItemType } from "../enums/file.enum";
import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { deviceRepository } from "../repositories/device.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await userRepository.findAll();
  }

  public async findById(userId: string): Promise<IUser> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async findMe(userId: Schema.Types.ObjectId): Promise<IUser> {
    return await userRepository.findMe(userId);
  }

  public async updateMe(
    userId: Schema.Types.ObjectId,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await userRepository.updateMe(userId, dto);
  }

  public async deleteMe(userId: Schema.Types.ObjectId): Promise<void> {
    await deviceRepository.deleteManyByParams({ _userId: userId });
    await userRepository.deleteMe(userId);
  }

  public async uploadAvatar(
    userId: Schema.Types.ObjectId,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.findMe(userId);
    const avatar = await s3Service.uploadFile(file, EFileItemType.USER, userId);
    await this.isAvatarExist(user.avatar);
    return await userRepository.updateMe(userId, { avatar });
  }

  public async deleteAvatar(userId: Schema.Types.ObjectId): Promise<IUser> {
    const user = await userRepository.findMe(userId);
    await this.isAvatarExist(user.avatar);
    return await userRepository.updateMe(userId, { avatar: null });
  }

  private async isAvatarExist(avatar: string): Promise<void> {
    if (avatar) {
      await s3Service.deleteFile(avatar);
    }
  }
}

export const userService = new UserService();
