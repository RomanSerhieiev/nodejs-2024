import { IPassword } from "../interfaces/password.interface";
import { IToken } from "../interfaces/token.interface";
import { Password } from "../models/password.model";

class PasswordRepository {
  public async findByParams(params: Partial<IPassword>): Promise<IPassword[]> {
    return await Password.find(params);
  }

  public async create(dto: IPassword): Promise<IPassword> {
    return await Password.create(dto);
  }

  public async deleteManyByParams(
    params: Partial<Record<keyof IToken, any>>,
  ): Promise<number> {
    const { deletedCount } = await Password.deleteMany(params);
    return deletedCount;
  }
}

export const passwordRepository = new PasswordRepository();
