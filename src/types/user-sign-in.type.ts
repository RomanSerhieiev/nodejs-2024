import { IUser } from "../interfaces/user.interface";

export type TSignIn = Pick<IUser, "email" | "password">;
