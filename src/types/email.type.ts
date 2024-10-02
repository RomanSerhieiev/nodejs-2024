import { EEmailAction } from "../enums/email.enum";
import { IEmailPayloadCombined } from "../interfaces/email.interface";
import { TPickRequired } from "./pick.type";

export type TEmailActionToPayload = {
  [EEmailAction.SIGN_UP]: TPickRequired<
    IEmailPayloadCombined,
    "name" | "token"
  >;
  [EEmailAction.SIGN_IN]: TPickRequired<
    IEmailPayloadCombined,
    "name" | "deviceName" | "deviceId"
  >;
  [EEmailAction.SIGN_OUT]: TPickRequired<
    IEmailPayloadCombined,
    "name" | "message"
  >;
  [EEmailAction.FORGOT_PASSWORD]: TPickRequired<
    IEmailPayloadCombined,
    "name" | "token"
  >;
  [EEmailAction.EMAIL_VERIFICATION]: TPickRequired<
    IEmailPayloadCombined,
    "email"
  >;
  [EEmailAction.OLD_VISIT]: TPickRequired<IEmailPayloadCombined, "name">;
};
