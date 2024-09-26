import { model, Schema } from "mongoose";

import { IDevice } from "../interfaces/device.interface";
import { User } from "./user.model";

const schema = new Schema<IDevice>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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

schema.index({ name: 1, _userId: 1 }, { unique: true });

export const Device = model<IDevice>("Device", schema);
