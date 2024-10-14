import { configs } from "../configs/configs";
import { IUserRes } from "../interfaces/user.interface";

class UserPresenter {
  one(user: IUserRes): IUserRes {
    return {
      _id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar ? `${configs.AWS_S3_ENDPOINT}/${user.avatar}` : null,
      isVerified: user.isVerified,
      isDeleted: user.isDeleted,
    };
  }

  all(users: IUserRes[]): IUserRes[] {
    return users.map(this.one);
  }
}

export const userPresenter = new UserPresenter();
