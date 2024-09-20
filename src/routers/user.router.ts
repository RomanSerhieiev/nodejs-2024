import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { ETokenType } from "../enums/token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  userController.getMe,
);
router.put(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  commonMiddleware.isDtoValid(UserValidator.update),
  userController.updateMe,
);
router.delete(
  "/me",
  authMiddleware.checkToken(ETokenType.ACCESS),
  userController.deleteMe,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);

export const userRouter = router;
