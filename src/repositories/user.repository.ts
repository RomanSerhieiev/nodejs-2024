import { FilterQuery, Schema } from "mongoose";

import { ETokenType } from "../enums/token.enum";
import { IQuery } from "../interfaces/query.interface";
import { IUserReq, IUserRes } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class UserRepository {
  public async findAll(query: IQuery): Promise<[IUserRes[], number]> {
    const filterObj: FilterQuery<IUserRes> = { isVerified: true };
    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }

    return await Promise.all([
      User.find(filterObj)
        .sort({ [query.orderBy]: query.order })
        .limit(query.limit)
        .skip(query.limit * (query.page - 1)),
      User.countDocuments(filterObj),
    ]);
  }

  public async findById(userId: string): Promise<IUserRes | null> {
    return await User.findById(userId);
  }

  public async findMe(userId: Schema.Types.ObjectId): Promise<IUserRes> {
    return await User.findById(userId).select("+password");
  }

  public async findByEmail(email: string): Promise<IUserRes | null> {
    return await User.findOne({ email }).select("+password");
  }

  public async findAllWithoutActivity(
    date: Date,
    type: ETokenType,
  ): Promise<IUserRes[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$_userId", "$$userId"] } },
            },
            { $match: { createdAt: { $gt: date }, type } },
          ],
          as: "tokens",
        },
      },
      { $match: { tokens: { $size: 0 } } },
    ]);
  }

  public async createMe(dto: IUserReq): Promise<IUserRes> {
    return await User.create(dto);
  }

  public async updateMe(
    userId: Schema.Types.ObjectId,
    dto: Partial<IUserReq>,
  ): Promise<IUserRes> {
    return await User.findByIdAndUpdate(userId, dto, { new: true }).select(
      "+password",
    );
  }

  public async deleteMe(_id: Schema.Types.ObjectId): Promise<void> {
    await User.deleteOne({ _id });
  }
}

export const userRepository = new UserRepository();
