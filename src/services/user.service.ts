import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    return await userRepository.getMe(jwtPayload.userId);
  }

  public async updateMe(
    jwtPayload: ITokenPayload,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await userRepository.updateMe(jwtPayload.userId, dto);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<IUser> {
    return await userRepository.deleteMe(jwtPayload.userId);
  }
}

export const userService = new UserService();
