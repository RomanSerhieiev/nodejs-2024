import { Schema } from "mongoose";

import { config } from "../configs/config";
import { EDevice } from "../enums/count-devices.enum";
import { EEmailAction } from "../enums/email.enum";
import { ETokenType } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { IDevice } from "../interfaces/device.interface";
import { IPasswordChange } from "../interfaces/password.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserWithTokens } from "../interfaces/user.interface";
import { deviceRepository } from "../repositories/device.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { TSignIn } from "../types/sign-in.type";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(dto: IUser): Promise<IUserWithTokens> {
    try {
      await this.isEmailExist(dto.email);
      const password = await passwordService.hash(dto.password);
      const user = await userRepository.createMe({ ...dto, password });
      const device = await deviceRepository.create({
        _userId: user._id,
        name: dto.device,
      });
      const tokens = await this.generateTokenPair({
        userId: user._id,
        userName: user.name,
        deviceId: device._id,
        deviceName: device.name,
        email: user.email,
      });

      const token = await tokenService.generate(
        {
          userId: user._id,
          userName: user.name,
          deviceId: device._id,
          deviceName: device.name,
          email: user.email,
        },
        config.JWT_EMAIL_VERIFICATION_SECRET,
        config.JWT_EMAIL_VERIFICATION_EXPIRES_IN,
        ETokenType.EMAIL_VERIFICATION,
      );
      await tokenRepository.create({
        token,
        type: ETokenType.EMAIL_VERIFICATION,
        _userId: user._id,
      });

      await emailService.send(dto.email, EEmailAction.SIGN_UP, {
        name: dto.name,
        token,
      });

      return { user, tokens };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async signIn(dto: TSignIn): Promise<IUserWithTokens> {
    try {
      const user = await this.isUserExist(dto.email);
      await this.isMatched(dto.password, user.password);
      const device = await this.isDeviceExist(dto.device, user._id);
      const tokens = await this.generateTokenPair({
        userId: user._id,
        userName: user.name,
        deviceId: device._id,
        deviceName: device.name,
        email: user.email,
      });

      await emailService.send(dto.email, EEmailAction.SIGN_IN, {
        name: user.name,
        deviceName: device.name,
        deviceId: device._id,
      });

      return { user, tokens };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async signOut(
    countDevices: EDevice,
    payload: ITokenPayload,
  ): Promise<void> {
    try {
      switch (countDevices) {
        case EDevice.CURRENT:
          await tokenRepository.deleteManyByParams({
            _deviceId: payload.deviceId,
          });
          break;

        case EDevice.ALL:
          await tokenRepository.deleteManyByParams({ _userId: payload.userId });
          break;
      }

      const message =
        countDevices === EDevice.CURRENT
          ? `${payload.deviceName} (${payload.deviceId})`
          : "all devices";

      await emailService.send(payload.email, EEmailAction.SIGN_OUT, {
        name: payload.userName,
        message,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    token: string,
    payload: ITokenPayload,
  ): Promise<ITokenPair> {
    try {
      await tokenRepository.deleteManyByParams({ _deviceId: payload.deviceId });
      return await this.generateTokenPair(payload);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    dto: IPasswordChange,
    userId: Schema.Types.ObjectId,
  ): Promise<void> {
    try {
      const { password } = await userRepository.findMe(userId);
      await this.isMatched(dto.currentPassword, password);
      const hashedPassword = await passwordService.hash(dto.newPassword);
      await userRepository.updateMe(userId, { password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(email: string): Promise<void> {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new ApiError("User not found", 400);
      }

      const token = await tokenService.generate(
        {
          userId: user._id,
          userName: user.name,
          email,
        },
        config.JWT_FORGOT_PASSWORD_SECRET,
        config.JWT_FORGOT_PASSWORD_EXPIRES_IN,
        ETokenType.FORGOT_PASSWORD,
      );
      await tokenRepository.create({
        token,
        type: ETokenType.FORGOT_PASSWORD,
        _userId: user._id,
      });

      await emailService.send(email, EEmailAction.FORGOT_PASSWORD, {
        token,
        name: user.name,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setPassword(
    newPassword: string,
    token: string,
    _userId: Schema.Types.ObjectId,
  ): Promise<void> {
    try {
      const forgot = await tokenRepository.findByParams({ token });
      if (!forgot) {
        throw new ApiError("Invalid token", 400);
      }

      const password = await passwordService.hash(newPassword);
      await userRepository.updateMe(_userId, { password });
      await tokenRepository.deleteManyByParams({ _userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async verify(
    token: string,
    _userId: Schema.Types.ObjectId,
  ): Promise<void> {
    try {
      await userRepository.updateMe(_userId, { isVerified: true });
      await tokenRepository.deleteOneByParams({ token });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.findByEmail(email);
    if (user) {
      throw new ApiError("Email already exist", 409);
    }
  }

  private async isUserExist(email: string): Promise<IUser> {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }
    return user;
  }

  private async isDeviceExist(
    name: string,
    _userId: Schema.Types.ObjectId,
  ): Promise<IDevice> {
    const device = await deviceRepository.findByParams({ name, _userId });
    if (device) {
      return device;
    } else {
      return await deviceRepository.create({ name, _userId });
    }
  }

  private async isMatched(
    password: string,
    matchedPassword: string,
  ): Promise<void> {
    const isMatched = await passwordService.compare(password, matchedPassword);
    if (!isMatched) {
      throw new ApiError("Invalid password", 401);
    }
  }

  private async generateTokenPair({
    userId,
    userName,
    deviceId,
    deviceName,
    email,
  }: ITokenPayload): Promise<ITokenPair> {
    const access = await tokenService.generate(
      { userId, userName, deviceId, deviceName, email },
      config.JWT_ACCESS_SECRET,
      config.JWT_ACCESS_EXPIRES_IN,
      ETokenType.ACCESS,
    );
    const refresh = await tokenService.generate(
      { userId, userName, deviceId, deviceName, email },
      config.JWT_REFRESH_SECRET,
      config.JWT_REFRESH_EXPIRES_IN,
      ETokenType.REFRESH,
    );

    await tokenRepository.create({
      token: access,
      type: ETokenType.ACCESS,
      _userId: userId,
      _deviceId: deviceId,
    });
    await tokenRepository.create({
      token: refresh,
      type: ETokenType.REFRESH,
      _userId: userId,
      _deviceId: deviceId,
    });

    return { access, refresh };
  }
}

export const authService = new AuthService();
