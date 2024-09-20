import { Schema } from "mongoose";

import { ERole } from "../enums/role.enum";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  name: string;
  age: number;
  email: string;
  password: string;
  phone?: string;
  role: ERole;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
