import mongoose from "mongoose";

import { config } from "../configs/config";
import { cronsRunner } from "../crons";

class ServerMiddleware {
  public async mongoose() {
    await mongoose.connect(config.MONGO_URI);
    cronsRunner();
    console.log(
      `Server is running on http://${config.APP_HOST}:${config.APP_PORT}`,
    );
  }
}

export const serverMiddleware = new ServerMiddleware();
