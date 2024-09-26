import { model, Schema } from "mongoose";

import { ETokenType } from "../enums/token.enum";
import { IToken } from "../interfaces/token.interface";
import { User } from "./user.model";

const schema = new Schema<IToken>(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ETokenType,
    },
    _userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: User,
    },
    _deviceId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model<IToken>("Token", schema);
