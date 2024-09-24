import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { Device } from "./device.model";
import { User } from "./user.model";

const schema = new Schema<IToken>(
  {
    access: {
      type: String,
      required: [true, "Access is required"],
    },
    refresh: {
      type: String,
      required: [true, "Refresh is required"],
    },
    _userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: User,
    },
    _deviceId: {
      type: Schema.Types.ObjectId,
      required: [true, "Device id is required"],
      ref: Device,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model<IToken>("Token", schema);
