import { IUserReq } from "../interfaces/user.interface";

export type TSignIn = Pick<IUserReq, "email" | "password" | "device">;
