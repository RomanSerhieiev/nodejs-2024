import { Schema } from "mongoose";

export interface IPassword {
  _id?: Schema.Types.ObjectId;
  password: string;
  _userId: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPasswordSet {
  newPassword: string;
  confirmPassword: string;
}

export interface IPasswordChange extends IPasswordSet {
  currentPassword: string;
}
