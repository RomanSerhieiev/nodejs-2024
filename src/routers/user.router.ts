import { Router } from "express";

import { avatarConfig } from "../configs/avatar.config";
import { configs } from "../configs/configs";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/file.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.findAll);

router.get(
  "/me",
  authMiddleware.checkToken(configs.JWT_ACCESS_SECRET),
  userController.findMe,
);
router.put(
  "/me",
  authMiddleware.checkToken(configs.JWT_ACCESS_SECRET),
  commonMiddleware.isDtoValid(UserValidator.updateMe),
  userController.updateMe,
);
router.delete(
  "/me",
  authMiddleware.checkToken(configs.JWT_ACCESS_SECRET),
  userController.deleteMe,
);
router.post(
  "/me/avatar",
  authMiddleware.checkToken(configs.JWT_ACCESS_SECRET),
  fileMiddleware.isFileValid("avatar", avatarConfig),
  userController.uploadAvatar,
);
router.delete(
  "/me/avatar",
  authMiddleware.checkToken(configs.JWT_ACCESS_SECRET),
  userController.deleteAvatar,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.findById,
);

export const userRouter = router;
