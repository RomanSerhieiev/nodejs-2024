import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { rateLimit } from "express-rate-limit";
import swagger from "swagger-ui-express";

import swaggerDoc from "../docs/swagger.json";
import { configs } from "./configs/configs";
import { errorMiddleware } from "./middlewares/error.middleware";
import { serverMiddleware } from "./middlewares/server.middleware";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Authorization",
      "Content-type",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/docs", swagger.serve, swagger.setup(swaggerDoc));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(errorMiddleware.caughtError);
process.on("uncaughtException", errorMiddleware.uncaughtException);

app.listen(configs.APP_PORT, serverMiddleware.mongoose);
