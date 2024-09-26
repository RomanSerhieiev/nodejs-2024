import { Schema } from "mongoose";

import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { deviceRepository } from "../repositories/device.repository";
import { userRepository } from "../repositories/user.repository";

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
}

export const userService = new UserService();
