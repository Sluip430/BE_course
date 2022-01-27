require('dotenv').config();
import fs from 'fs';
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})
 
export const uploadFile = async (file:any) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    //   ACL : 'public-read'
  }
  try{
    const result = await s3.upload(uploadParams).promise();
    return { result };
  }catch(error){
    console.log(error);
    return { error };
  }
}