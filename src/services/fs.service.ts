import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { baseURL, urls } from "../constants/urls";
import { IUser } from "../interfaces/user.interface";

class FsService {
  public async read(): Promise<IUser[]> {
    try {
      const users = await readFile(join(baseURL, urls.users.base), "utf-8");
      return users ? JSON.parse(users) : [];
    } catch (e) {
      console.log("Read error", e.message);
    }
  }

  public async write(users: IUser[]): Promise<void> {
    try {
      await writeFile(join(baseURL, urls.users.base), JSON.stringify(users));
    } catch (e) {
      console.log("Write error", e.message);
    }
  }
}

export const fsService = new FsService();
