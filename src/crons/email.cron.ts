import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { configs } from "../configs/configs";
import { EEmailAction } from "../enums/email.enum";
import { ETokenType } from "../enums/token.enum";
import { timeHelper } from "../helpers/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

dayjs.extend(utc);

class EmailCron {
  public static async send() {
    try {
      const { value, unit } = timeHelper.parseConfigExpiration(
        configs.JWT_REFRESH_EXPIRES_IN,
      );
      const date = timeHelper.subtractByParams(value, unit);
      const users = await userRepository.findAllWithoutActivity(
        date,
        ETokenType.REFRESH,
      );
      await Promise.all(
        users.map(async (user) => {
          await emailService.send(user.email, EEmailAction.OLD_VISIT, {
            name: user.name,
          });
        }),
      );
    } catch (e) {
      console.error(e);
    }
  }
}
export const emailCron = new CronJob("0 1 * * 0", EmailCron.send);
