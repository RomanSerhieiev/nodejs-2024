import { Schema } from "mongoose";

import { IDevice } from "../interfaces/device.interface";
import { Device } from "../models/device.model";
import { tokenRepository } from "./token.repository";

class DeviceRepository {
  public async create(dto: IDevice): Promise<IDevice> {
    return await Device.create(dto);
  }

  public async findByName(
    name: string,
    _userId: Schema.Types.ObjectId,
  ): Promise<IDevice | null> {
    return await Device.findOne({ name, _userId });
  }

  public async deleteCurrent(
    deviceId: Schema.Types.ObjectId,
  ): Promise<IDevice> {
    await tokenRepository.deleteByDevice(deviceId);
    return await Device.findByIdAndDelete(deviceId);
  }

  public async deleteAll(_userId: Schema.Types.ObjectId): Promise<void> {
    await tokenRepository.deleteAll(_userId);
    await Device.deleteMany({ _userId });
  }
}

export const deviceRepository = new DeviceRepository();
