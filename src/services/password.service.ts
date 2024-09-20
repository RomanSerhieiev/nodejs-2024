import bcrypt from "bcrypt";

class PasswordService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 13);
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
