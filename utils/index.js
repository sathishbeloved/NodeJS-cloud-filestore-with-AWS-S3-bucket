const AWS = require("aws-sdk");
const { readFileSync } = require("fs");

const aws = {
  id: "YOUR_AWS_ID",
  key: "YOUR_AWS_KEY",
};
AWS.config.update({ region: "ap-south-1" });
const BUCKET_NAME = "YOUR_BUCKET_NAME";
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: aws.id,
  secretAccessKey: aws.key,
  Bucket: BUCKET_NAME,
});

const listFiles = async () => {
  return await s3
    .listObjects({
      Bucket: BUCKET_NAME,
    })
    .promise();
};

const uploadFile = async (location, name) => {
  try {
    let Body = await readFileSync(location);
    let data = await s3
      .upload({
        Bucket: BUCKET_NAME,
        Key: name,
        Body,
      })
      .promise();
    return data;
  } catch (error) {
    console.log(error);
    throw {
      message: "Unable to upload to S3.",
    };
  }
};

const deleteFile = async (name) => {
  try {
    let data = await s3
      .deleteObject({
        Bucket: BUCKET_NAME,
        Key: name,
      })
      .promise();
    return data;
  } catch (error) {
    console.log(error);
    throw {
      message: "Unable to Delete from S3.",
    };
  }
};

const renameFile = async (oldName, newName) => {
  try {
    let data = await s3
      .copyObject({
        Bucket: BUCKET_NAME,
        CopySource: BUCKET_NAME + "/" + oldName,
        Key: newName,
      })
      .promise();
    await deleteFile(oldName);
    return data;
  } catch (error) {
    console.log(error);
    throw {
      message: "Unable to Rename in S3.",
    };
  }
};

module.exports = {
  upload: uploadFile,
  deleteFile,
  renameFile,
  list: listFiles,
};
