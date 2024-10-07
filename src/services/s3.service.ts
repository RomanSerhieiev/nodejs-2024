import { extname } from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { Schema } from "mongoose";
import { v4 } from "uuid";

import { configs } from "../configs/configs";
import { EFileItemType } from "../enums/file.enum";

class S3Service {
  constructor(
    private readonly client = new S3Client({
      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY_ID,
        secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
      },
    }),
  ) {}

  public async uploadFile(
    file: UploadedFile,
    itemType: EFileItemType,
    itemId: Schema.Types.ObjectId,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(itemType, itemId, file.name);
      await this.client.send(
        new PutObjectCommand({
          ACL: configs.AWS_S3_ACL,
          Body: file.data,
          Bucket: configs.AWS_S3_BUCKET,
          ContentType: file.mimetype,
          Key: filePath,
        }),
      );
      return filePath;
    } catch (e) {
      console.error("Error upload: ", e.message);
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: configs.AWS_S3_BUCKET,
          Key: filePath,
        }),
      );
    } catch (e) {
      console.error("Error delete: ", e.message);
    }
  }

  private buildPath(
    itemType: EFileItemType,
    itemId: Schema.Types.ObjectId,
    fileName: string,
  ) {
    return `${itemType}/${itemId}/${v4()}${extname(fileName)}`;
  }
}

export const s3Service = new S3Service();
