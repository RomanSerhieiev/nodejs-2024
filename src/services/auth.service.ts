import { Schema } from "mongoose";

import { ECountDevices } from "../enums/count.enum";
import { EEmailAction } from "../enums/email.enum";
import { ApiError } from "../errors/api.error";
import { IDevice } from "../interfaces/device.interface";
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
      const user = await userRepository.create({ ...dto, password });

      const device = await deviceRepository.create({
        _userId: user._id,
        name: dto.device,
      });

      const tokens = await tokenService.generate({
        userId: user._id,
        userName: user.name,
        email: user.email,
        deviceId: device._id,
        deviceName: device.name,
        role: user.role,
      });
      await tokenRepository.create({
        ...tokens,
        _userId: user._id,
        _deviceId: device._id,
      });

      await emailService.send(dto.email, EEmailAction.SIGN_UP, {
        name: dto.name,
      });

      return { user, tokens };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async signIn(dto: TSignIn): Promise<IUserWithTokens> {
    try {
      const user = await userRepository.findByEmail(dto.email);
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

      const device = await this.isDeviceExist(dto.device, user._id);

      const tokens = await tokenService.generate({
        userId: user._id,
        userName: user.name,
        email: user.email,
        deviceId: device._id,
        deviceName: device.name,
        role: user.role,
      });
      await tokenRepository.create({
        ...tokens,
        _userId: user._id,
        _deviceId: device._id,
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
    countDevices: ECountDevices,
    payload: ITokenPayload,
  ): Promise<void> {
    try {
      switch (countDevices) {
        case ECountDevices.CURRENT:
          await tokenRepository.deleteByDevice(payload.deviceId);
          break;

        case ECountDevices.ALL:
          await tokenRepository.deleteAll(payload.userId);
          break;
      }

      const message =
        countDevices === ECountDevices.CURRENT
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
      await tokenRepository.deleteByDevice(payload.userId);
      const tokens = await tokenService.generate({
        userId: payload.userId,
        userName: payload.userName,
        email: payload.email,
        deviceId: payload.deviceId,
        deviceName: payload.deviceName,
        role: payload.role,
      });
      await tokenRepository.create({
        ...tokens,
        _userId: payload.userId,
        _deviceId: payload.deviceId,
      });
      return tokens;
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

  private async isDeviceExist(
    name: string,
    _userId: Schema.Types.ObjectId,
  ): Promise<IDevice> {
    const device = await deviceRepository.findByName(name, _userId);
    if (device) {
      return device;
    } else {
      return await deviceRepository.create({ _userId, name });
    }
  }
}

export const authService = new AuthService();
