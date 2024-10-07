import mongoose from "mongoose";

import { configs } from "../configs/configs";
import { cronsRunner } from "../crons";

class ServerMiddleware {
  public async mongoose() {
    await mongoose.connect(configs.MONGO_URI);
    cronsRunner();
    console.log(
      `Server is running on http://${configs.APP_HOST}:${configs.APP_PORT}`,
    );
  }
}

export const serverMiddleware = new ServerMiddleware();
