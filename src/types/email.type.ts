import { EEmailAction } from "../enums/email.enum";
import { IEmailPayloadCombined } from "../interfaces/email.interface";
import { TPickRequired } from "./pick.type";

export type TEmailActionToPayload = {
  [EEmailAction.SIGN_UP]: TPickRequired<IEmailPayloadCombined, "name">;
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
    "email" | "name"
  >;
  [EEmailAction.OLD_VISIT]: TPickRequired<IEmailPayloadCombined, "email">;
};
