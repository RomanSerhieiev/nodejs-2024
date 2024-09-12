import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { baseURL, urls } from "../constants/urls";
import { IUser } from "../interfaces/user.interface";

const userService = {
  getAll: async (): Promise<IUser[]> => {
    const users = await readFile(join(baseURL, urls.users.base), {
      encoding: "utf-8",
    });
    return JSON.parse(users);
  },
  getById: async (userId: number): Promise<IUser> => {
    const users = await userService.getAll();
    return users.find((user) => user.id === userId);
  },
  getIndexById: async (userId: number): Promise<number> => {
    const users = await userService.getAll();
    return users.findIndex((user) => user.id === userId);
  },
  updateAll: async (users: IUser[]): Promise<void> => {
    await writeFile(join(baseURL, urls.users.base), JSON.stringify(users));
  },
};

export { userService };
