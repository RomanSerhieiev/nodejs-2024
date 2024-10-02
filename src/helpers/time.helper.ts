import dayjs, { ManipulateType } from "dayjs";

class TimeHelper {
  public subtractByParams(value: number, unit: ManipulateType): Date {
    return dayjs().subtract(value, unit).toDate();
  }

  public parseConfigExpiration(expiration: string): {
    value: number;
    unit: ManipulateType;
  } {
    const [value, unit] = expiration.split(" ");
    return { value: parseInt(value), unit: unit as ManipulateType };
  }
}

export const timeHelper = new TimeHelper();
