import { IUser } from "../interfaces/user.interface";
import { fsService } from "../services/fs.service";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await fsService.read();
  }

  public async getById(userIndex: number): Promise<IUser> {
    const users = await fsService.read();
    return users[userIndex];
  }

  public async getIndexById(userId: number): Promise<number> {
    const users = await fsService.read();
    return users.findIndex((user) => user.id === userId);
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const users = await fsService.read();
    const newUser = {
      id: users[users.length - 1].id + 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await fsService.write(users);

    return newUser;
  }

  public async updateById(
    userIndex: number,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    const users = await fsService.read();
    users[userIndex].name = dto.name;
    users[userIndex].email = dto.email;
    users[userIndex].password = dto.password;
    await fsService.write(users);

    return users[userIndex];
  }

  public async deleteById(userIndex: number): Promise<void> {
    const users = await fsService.read();
    users.splice(userIndex, 1);
    await fsService.write(users);
  }
}

export const userRepository = new UserRepository();
