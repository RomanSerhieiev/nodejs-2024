import { HydratedDocument, Model, model, Schema } from "mongoose";

import { ERole } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

interface IUserMethods {
  getName(): string;
}

interface UserModel extends Model<IUser, object, IUserMethods> {
  findByName(name: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      min: 6,
    },
    phone: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ERole,
      default: ERole.USER,
    },
    avatar: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

schema.statics = {
  async findByName(name: string): Promise<IUser> {
    return await this.findOne({ name: name });
  },
};

schema.methods = {
  getName() {
    return this.name;
  },
};

export const User = model<IUser, UserModel>("User", schema);
