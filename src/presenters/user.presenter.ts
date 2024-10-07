import { configs } from "../configs/configs";
import { IUser, IUserPublicRes } from "../interfaces/user.interface";

class UserPresenter {
  toPublicResDto(user: IUser): IUserPublicRes {
    return {
      _id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
      isVerified: user.isVerified,
      isDeleted: user.isDeleted,
    };
  }

  toPublicResDtoArray(users: IUser[]): IUserPublicRes[] {
    return users.map((user) => this.toPublicResDto(user));
  }
}

export const userPresenter = new UserPresenter();
