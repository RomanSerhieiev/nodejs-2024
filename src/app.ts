import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api.error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
  "*",
  (
    e: ApiError | Error,
    request: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (e instanceof ApiError) {
      res.status(e.status).send(e.message);
    }
    if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  },
);

process.on("uncaughtException", (e: Error) => {
  console.error("uncaughtException", e.message, e.stack);
  process.exit(1);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
