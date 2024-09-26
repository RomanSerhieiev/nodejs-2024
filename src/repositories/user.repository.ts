import { Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async findById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  public async findMe(userId: Schema.Types.ObjectId): Promise<IUser> {
    return await User.findById(userId).select("+password");
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }

  public async createMe(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }

  public async updateMe(
    userId: Schema.Types.ObjectId,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true }).select(
      "+password",
    );
  }

  public async deleteMe(userId: Schema.Types.ObjectId): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
