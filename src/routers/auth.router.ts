import { Router } from "express";

import { config } from "../configs/config";
import { authController } from "../controllers/auth.controller";
import { EDevice } from "../enums/count-devices.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isDtoValid(UserValidator.signUp),
  authController.signUp,
);
router.put(
  "/email-verification",
  authMiddleware.checkToken(config.JWT_EMAIL_VERIFICATION_SECRET),
  authController.verify,
);

router.post(
  "/sign-in",
  commonMiddleware.isDtoValid(UserValidator.signIn),
  authController.signIn,
);

router.post(
  "/sing-out",
  authMiddleware.checkToken(config.JWT_ACCESS_SECRET),
  authController.signOut(EDevice.CURRENT),
);
router.post(
  "/sing-out/all",
  authMiddleware.checkToken(config.JWT_ACCESS_SECRET),
  authController.signOut(EDevice.ALL),
);

router.post(
  "/refresh",
  authMiddleware.checkToken(config.JWT_REFRESH_SECRET),
  authController.refresh,
);

router.post(
  "/change-password",
  authMiddleware.checkToken(config.JWT_ACCESS_SECRET),
  commonMiddleware.isDtoValid(UserValidator.changePassword),
  authController.changePassword,
);

router.post(
  "/forgot-password",
  commonMiddleware.isDtoValid(UserValidator.emailVerification),
  authController.forgotPassword,
);
router.put(
  "/forgot-password",
  authMiddleware.checkToken(config.JWT_FORGOT_PASSWORD_SECRET),
  commonMiddleware.isDtoValid(UserValidator.setPassword),
  authController.setPassword,
);

export const authRouter = router;
