import { IDevice } from "../interfaces/device.interface";
import { Device } from "../models/device.model";
import { tokenRepository } from "./token.repository";

class DeviceRepository {
  public async findByParams(params: Partial<IDevice>): Promise<IDevice | null> {
    return await Device.findOne(params);
  }

  public async create(dto: IDevice): Promise<IDevice> {
    return await Device.create(dto);
  }

  public async deleteOneByParams(params: Partial<IDevice>): Promise<void> {
    await tokenRepository.deleteOneByParams(params);
    await Device.deleteOne(params);
  }

  public async deleteManyByParams(params: Partial<IDevice>): Promise<void> {
    await tokenRepository.deleteManyByParams(params);
    await Device.deleteMany(params);
  }
}

export const deviceRepository = new DeviceRepository();
