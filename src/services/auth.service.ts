import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { TSignIn } from "../types/user-sign-in.type";
import { TUserWithTokens } from "../types/user-with-tokens.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(dto: IUser): Promise<TUserWithTokens> {
    try {
      await this.isEmailExist(dto.email);
      const password = await passwordService.hash(dto.password);
      const user = await userRepository.create({ ...dto, password });
      const tokens = await tokenService.generate({
        userId: user._id,
        role: user.role,
      });
      await tokenRepository.create({ ...tokens, _userId: user._id });
      return { user, tokens };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async signIn(dto: TSignIn): Promise<TUserWithTokens> {
    try {
      const user = await userRepository.getByEmail(dto.email);
      if (!user) {
        throw new ApiError("Invalid email or password", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      const tokens = await tokenService.generate({
        userId: user._id,
        role: user.role,
      });
      await tokenRepository.create({ ...tokens, _userId: user._id });
      return { user, tokens };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    token: string,
    payload: ITokenPayload,
  ): Promise<ITokenPair> {
    try {
      await tokenRepository.delete(payload.userId);
      const tokens = await tokenService.generate({
        userId: payload.userId,
        role: payload.role,
      });
      await tokenRepository.create({ ...tokens, _userId: payload.userId });
      return tokens;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exist", 409);
    }
  }
}

export const authService = new AuthService();
