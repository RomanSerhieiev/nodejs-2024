import { emailCron } from "./email.cron";
import { passwordCron } from "./password.cron";
import { tokenCron } from "./token.cron";

export const cronsRunner = () => {
  tokenCron.start();
  passwordCron.start();
  emailCron.start();
};
