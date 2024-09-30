import mongoose from "mongoose";

import { config } from "../configs/config";
import { cronRunner } from "../crons";

class ServerMiddleware {
  public async mongoose() {
    cronRunner();
    await mongoose.connect(config.MONGO_URI);
    console.log(
      `Server is running on http://${config.APP_HOST}:${config.APP_PORT}`,
    );
  }
}

export const serverMiddleware = new ServerMiddleware();
