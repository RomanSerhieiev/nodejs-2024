import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { config } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
import { passwordRepository } from "../repositories/password.repository";

dayjs.extend(utc);

class PasswordCron {
  public static async delete() {
    try {
      const { value, unit } = timeHelper.parseConfigExpiration(
        config.PASSWORD_EXPIRES_IN,
      );
      const date = timeHelper.subtractByParams(value, unit);
      await passwordRepository.deleteManyByParams({
        createdAt: { $lt: date },
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export const passwordCron = new CronJob("0 3 * * 0", PasswordCron.delete);
