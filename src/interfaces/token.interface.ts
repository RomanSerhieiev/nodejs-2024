import { Schema } from "mongoose";

import { ERole } from "../enums/role.enum";

export interface IToken {
  _id?: Schema.Types.ObjectId;
  access: string;
  refresh: string;
  _userId: Schema.Types.ObjectId;
  _deviceId: Schema.Types.ObjectId;
}

export interface ITokenPayload {
  userId: Schema.Types.ObjectId;
  userName: string;
  email: string;
  deviceId: Schema.Types.ObjectId;
  deviceName: string;
  role: ERole;
}

export interface ITokenPair {
  access: string;
  refresh: string;
}
