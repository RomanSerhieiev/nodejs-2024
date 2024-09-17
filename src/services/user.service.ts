import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async create(dto: IUser): Promise<IUser> {
    return await userRepository.create(dto);
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.updateById(userId, dto);
  }

  public async deleteById(userId: string): Promise<IUser> {
    return await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
