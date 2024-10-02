import { Schema } from "mongoose";

import { ETokenType } from "../enums/token.enum";

export interface IToken {
  _id?: Schema.Types.ObjectId;
  token: string;
  type: ETokenType;
  _userId: Schema.Types.ObjectId;
  _deviceId?: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITokenPayload {
  userId: Schema.Types.ObjectId;
  userName: string;
  deviceId?: Schema.Types.ObjectId;
  deviceName?: string;
  email: string;
}

export interface ITokenPair {
  access: string;
  refresh: string;
}
