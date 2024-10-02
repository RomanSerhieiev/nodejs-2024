import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
    return await Token.findOne(params);
  }

  public async create(dto: IToken): Promise<IToken> {
    return await Token.create(dto);
  }

  public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }

  public async deleteManyByParams(
    params: Partial<Record<keyof IToken, any>>,
  ): Promise<number> {
    const { deletedCount } = await Token.deleteMany(params);
    return deletedCount;
  }
}

export const tokenRepository = new TokenRepository();
