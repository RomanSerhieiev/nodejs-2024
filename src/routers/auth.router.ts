import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ECountDevices } from "../enums/count.enum";
import { ETokenType } from "../enums/token.enum";
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
  "/sing-out/current",
  authMiddleware.checkToken(ETokenType.ACCESS),
  authController.signOut(ECountDevices.CURRENT),
);
router.post(
  "/sing-out/all",
  authMiddleware.checkToken(ETokenType.ACCESS),
  authController.signOut(ECountDevices.ALL),
);
router.post(
  "/refresh",
  authMiddleware.checkToken(ETokenType.REFRESH),
  authController.refresh,
);

export const authRouter = router;
