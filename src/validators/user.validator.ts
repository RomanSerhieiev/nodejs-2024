import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";

const nameRegex = /^[a-zA-Z\s]{3,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{6,}$/;
const idRegex = /^\d+$/;

class UserValidator {
  public async dto(dto: Partial<IUser>) {
    if (!nameRegex.test(dto.name)) {
      throw new ApiError(
        "Name must be between 3 and 30 characters and contain only letters and spaces.",
        400,
      );
    }
    if (!emailRegex.test(dto.email)) {
      throw new ApiError("Invalid email format.", 400);
    }
    if (!passwordRegex.test(dto.password)) {
      throw new ApiError("Password must be at least 6 characters long.", 400);
    }
  }

  public async id(userId: number): Promise<void> {
    if (!idRegex.test(userId.toString())) {
      throw new ApiError("ID is not valid.", 404);
    }
  }

  public async index(index: number): Promise<void> {
    if (index === -1) {
      throw new ApiError("User not found.", 404);
    }
  }
}

export const userValidator = new UserValidator();
