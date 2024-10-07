import { configs } from "../configs/configs";
import { ETokenType } from "../enums/token.enum";

export const tokenExpirations = [
  { type: ETokenType.ACCESS, expiration: configs.JWT_ACCESS_EXPIRES_IN },
  { type: ETokenType.REFRESH, expiration: configs.JWT_REFRESH_EXPIRES_IN },
  {
    type: ETokenType.FORGOT_PASSWORD,
    expiration: configs.JWT_FORGOT_PASSWORD_EXPIRES_IN,
  },
  {
    type: ETokenType.EMAIL_VERIFICATION,
    expiration: configs.JWT_EMAIL_VERIFICATION_EXPIRES_IN,
  },
];
