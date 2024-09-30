import { Router } from "express";

import { config } from "../configs/config";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.findAll);

router.get(
  "/me",
  authMiddleware.checkToken(config.JWT_ACCESS_SECRET),
  userController.findMe,
);
router.put(
  "/me",
  authMiddleware.checkToken(config.JWT_ACCESS_SECRET),
  commonMiddleware.isDtoValid(UserValidator.updateMe),
  userController.updateMe,
);
router.delete(
  "/me",
  authMiddleware.checkToken(config.JWT_ACCESS_SECRET),
  userController.deleteMe,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.findById,
);

export const userRouter = router;
