import { config } from "../configs/config";
import { ETokenType } from "../enums/token.enum";

export const tokenExpirations = [
  { type: ETokenType.ACCESS, expiration: config.JWT_ACCESS_EXPIRES_IN },
  { type: ETokenType.REFRESH, expiration: config.JWT_REFRESH_EXPIRES_IN },
  {
    type: ETokenType.FORGOT_PASSWORD,
    expiration: config.JWT_FORGOT_PASSWORD_EXPIRES_IN,
  },
  {
    type: ETokenType.EMAIL_VERIFICATION,
    expiration: config.JWT_EMAIL_VERIFICATION_EXPIRES_IN,
  },
];
