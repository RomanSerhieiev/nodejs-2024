import express from "express";

import { config } from "./configs/config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { serverMiddleware } from "./middlewares/server.middleware";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(errorMiddleware.caughtError);
process.on("uncaughtException", errorMiddleware.uncaughtException);

app.listen(config.APP_PORT, serverMiddleware.mongoose);
