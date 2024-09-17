import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";

class ErrorMiddleware {
  public caughtError(
    e: ApiError | Error,
    request: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (e instanceof ApiError) {
      res.status(e.status).send(e.message);
    } else if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  }

  public uncaughtException(e: Error) {
    console.error("uncaughtException", e.message, e.stack);
    process.exit(1);
  }
}

export const errorMiddleware = new ErrorMiddleware();
