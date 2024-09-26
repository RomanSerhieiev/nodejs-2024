import { Schema } from "mongoose";

export interface IEmailPayloadCombined {
  name?: string;
  deviceName?: string;
  deviceId?: Schema.Types.ObjectId;
  message?: string;
  email?: string;
  token?: string;
}
