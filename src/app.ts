import express from "express";
import fileUpload from "express-fileupload";

import { configs } from "./configs/configs";
import { errorMiddleware } from "./middlewares/error.middleware";
import { serverMiddleware } from "./middlewares/server.middleware";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(errorMiddleware.caughtError);
process.on("uncaughtException", errorMiddleware.uncaughtException);

app.listen(configs.APP_PORT, serverMiddleware.mongoose);
