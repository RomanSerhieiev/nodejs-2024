import { Router } from "express";

import { configs } from "../configs/configs";
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
  "/sign-up",
  authMiddleware.checkToken(configs.JWT_EMAIL_VERIFICATION_SECRET),
  authController.verify,
);

router.post(
  "/sign-in",
  commonMiddleware.isDtoValid(UserValidator.signIn),
  authController.signIn,
);

router.post(
  "/sing-out",
  authMiddleware.checkToken(configs.JWT_ACCESS_SECRET),
  authController.signOut(EDevice.CURRENT),
);
router.post(
  "/sing-out/all",
  authMiddleware.checkToken(configs.JWT_ACCESS_SECRET),
  authController.signOut(EDevice.ALL),
);

router.post(
  "/refresh",
  authMiddleware.checkToken(configs.JWT_REFRESH_SECRET),
  authController.refresh,
);

router.post(
  "/password/change",
  authMiddleware.checkToken(configs.JWT_ACCESS_SECRET),
  commonMiddleware.isDtoValid(UserValidator.changePassword),
  authController.changePassword,
);
router.post(
  "/password/forgot",
  commonMiddleware.isDtoValid(UserValidator.emailVerification),
  authController.forgotPassword,
);
router.put(
  "/password/forgot",
  authMiddleware.checkToken(configs.JWT_FORGOT_PASSWORD_SECRET),
  commonMiddleware.isDtoValid(UserValidator.setPassword),
  authController.setPassword,
);

export const authRouter = router;
