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
  avatar?: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserPublicRes {
  _id: Schema.Types.ObjectId;
  name: string;
  age: number;
  email: string;
  phone: string;
  role: ERole;
  avatar: string;
  isVerified: boolean;
  isDeleted: boolean;
}

export interface IUserWithTokens {
  user: IUser;
  tokens: ITokenPair;
}
