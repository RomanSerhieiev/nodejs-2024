import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ETokenType } from "../enums/token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isDtoValid(UserValidator.create),
  authController.signUp,
);
router.post(
  "/sign-in",
  commonMiddleware.isDtoValid(UserValidator.update),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkToken(ETokenType.REFRESH),
  authController.signIn,
);

export const authRouter = router;
