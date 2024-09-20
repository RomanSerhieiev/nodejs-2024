import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { ETokenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
  public async generate(payload: ITokenPayload): Promise<ITokenPair> {
    await tokenRepository.delete(payload.userId);

    const access = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRATION,
    });
    const refresh = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRATION,
    });

    return { access, refresh };
  }

  public async verify(token: string, type: ETokenType): Promise<ITokenPayload> {
    try {
      let secret: string;

      switch (type) {
        case ETokenType.ACCESS:
          secret = config.JWT_ACCESS_SECRET;
          break;

        case ETokenType.REFRESH:
          secret = config.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError(e.message, 401);
    }
  }
}

export const tokenService = new TokenService();
