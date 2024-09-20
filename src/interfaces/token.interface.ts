import { Schema } from "mongoose";

import { ERole } from "../enums/role.enum";

export interface IToken {
  _id?: Schema.Types.ObjectId;
  access: string;
  refresh: string;
  _userId: Schema.Types.ObjectId;
}

export interface ITokenPayload {
  userId: Schema.Types.ObjectId;
  role: ERole;
}

export interface ITokenPair {
  access: string;
  refresh: string;
}
