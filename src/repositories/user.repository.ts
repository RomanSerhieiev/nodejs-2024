import { Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { tokenRepository } from "./token.repository";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  public async getMe(userId: Schema.Types.ObjectId): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }

  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }

  public async updateMe(
    userId: Schema.Types.ObjectId,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteMe(userId: Schema.Types.ObjectId): Promise<IUser> {
    await tokenRepository.delete(userId);
    return await User.findByIdAndDelete(userId);
  }
}

export const userRepository = new UserRepository();
