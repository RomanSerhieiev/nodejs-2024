import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async create(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteById(userId: string): Promise<IUser> {
    return await User.findByIdAndDelete(userId);
  }
}

export const userRepository = new UserRepository();
