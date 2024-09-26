import jwt from "jsonwebtoken";

import { ETokenType } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
  public async generate(
    payload: ITokenPayload,
    secret: string,
    expiresIn: string,
    type: ETokenType,
  ): Promise<string> {
    try {
      await tokenRepository.deleteManyByParams({
        _deviceId: payload.deviceId,
        type,
      });
      return jwt.sign(payload, secret, { expiresIn });
    } catch (e) {
      throw new ApiError(e.message, 401);
    }
  }

  public async verify(token: string, secret: string): Promise<ITokenPayload> {
    try {
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError(e.message, 401);
    }
  }
}

export const tokenService = new TokenService();
