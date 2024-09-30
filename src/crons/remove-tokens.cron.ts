import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Token } from "../models/token.model";

dayjs.extend(utc);

const oldTokensRemover = async (): Promise<void> => {
  console.log("oldTokensRemover");
  const previousMonth = dayjs().utc().subtract(1, "month");
  await Token.deleteMany({ createdAt: { $lte: previousMonth } });
};

export const removeOldTokens = new CronJob("0 0 * * *", oldTokensRemover);
