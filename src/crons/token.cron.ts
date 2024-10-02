import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { tokenExpirations } from "../constants/token.constant";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

dayjs.extend(utc);

class TokenCron {
  public static async delete() {
    try {
      for (const { type, expiration } of tokenExpirations) {
        const { value, unit } = timeHelper.parseConfigExpiration(expiration);
        const date = timeHelper.subtractByParams(value, unit);
        await tokenRepository.deleteManyByParams({
          createdAt: { $lt: date },
          type,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export const tokenCron = new CronJob("0 2 * * 0", TokenCron.delete);
