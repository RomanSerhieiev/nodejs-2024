import { Schema } from "mongoose";

import { ERole } from "../enums/role.enum";
import { TPickRequired } from "../types/pick.type";
import { ITokenPair } from "./token.interface";

export interface IUserReq {
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

export interface IUserRes
  extends Pick<
      IUserReq,
      | "name"
      | "age"
      | "email"
      | "password"
      | "phone"
      | "role"
      | "avatar"
      | "isVerified"
      | "isDeleted"
    >,
    TPickRequired<IUserReq, "_id"> {}

export interface IUserWithTokens {
  user: IUserRes;
  tokens: ITokenPair;
}
