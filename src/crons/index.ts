import { removeOldTokens } from "./remove-tokens.cron";

export const cronRunner = () => {
  console.log("cronRunner");
  removeOldTokens.start();
};
