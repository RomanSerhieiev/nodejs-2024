import { Schema } from "mongoose";

export interface IDevice {
  _id?: Schema.Types.ObjectId;
  name: string;
  _userId: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
