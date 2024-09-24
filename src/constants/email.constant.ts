import { EEmailAction } from "../enums/email.enum";

export const emailTemplates = {
  [EEmailAction.SIGN_UP]: {
    template: EEmailAction.SIGN_UP,
    subject: "Welcome to our platform",
  },
  [EEmailAction.SIGN_IN]: {
    template: EEmailAction.SIGN_IN,
    subject: "You successfully logged in",
  },
  [EEmailAction.SIGN_OUT]: {
    template: EEmailAction.SIGN_OUT,
    subject: "You successfully logged out",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    template: EEmailAction.FORGOT_PASSWORD,
    subject: "Don't worry, your password is under control",
  },
  [EEmailAction.OLD_VISIT]: {
    template: EEmailAction.OLD_VISIT,
    subject: "You haven't visited our platform for a long time",
  },
};
