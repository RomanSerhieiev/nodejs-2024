import { Schema } from "mongoose";

import { ERole } from "../enums/role.enum";
import { ITokenPair } from "./token.interface";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  device?: string;
  role: ERole;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserWithTokens {
  user: IUser;
  tokens: ITokenPair;
}
