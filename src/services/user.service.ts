import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { userValidator } from "../validators/user.validator";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(userId: number): Promise<IUser> {
    await userValidator.id(userId);
    const userIndex = await userRepository.getIndexById(userId);
    await userValidator.index(userIndex);
    return await userRepository.getById(userIndex);
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    await userValidator.dto(dto);
    return await userRepository.create(dto);
  }

  public async updateById(userId: number, dto: Partial<IUser>): Promise<IUser> {
    await userValidator.id(userId);
    const userIndex = await userRepository.getIndexById(userId);
    await userValidator.index(userIndex);
    await userValidator.dto(dto);
    return await userRepository.updateById(userIndex, dto);
  }

  public async deleteById(userId: number): Promise<void> {
    await userValidator.id(userId);
    const userIndex = await userRepository.getIndexById(userId);
    await userValidator.index(userIndex);
    await userRepository.deleteById(userIndex);
  }
}

export const userService = new UserService();
