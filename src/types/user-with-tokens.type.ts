import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";

export type TUserWithTokens = {
  user: IUser;
  tokens: ITokenPair;
};
