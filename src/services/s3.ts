import dotenv from 'dotenv';
import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadFile = async (file: any): Promise< {result?: ManagedUpload.SendData, error?: Error}> => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    //   ACL : 'public-read'
  };

  try {
    const result = await s3.upload(uploadParams).promise();

    return { result };
  } catch (error) {
    return { error };
  }
};

export const getFileStream = (fileKey) => {
  console.log(fileKey);
  const downloadParams = {
    Key: fileKey.key,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};
