import { model, Schema } from "mongoose";

import { IPassword } from "../interfaces/password.interface";
import { User } from "./user.model";

const schema = new Schema<IPassword>(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    _userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Password = model<IPassword>("Password", schema);
