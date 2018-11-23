import * as AWS from 'aws-sdk';
import { Configs } from '@configs';
import * as s3 from './s3';

AWS.config.update({
  accessKeyId: Configs.aws.ACCESS_KEY,
  secretAccessKey: Configs.aws.SECRET_KEY,
  region: Configs.aws.REGION,
});

export const aws = {
  s3: {
    createBucket: s3.createBucket,
    listBuckets: s3.listBuckets,
    listAllObjects: s3.listAllObjects,
    listObject: s3.listObject,
    deleteObject: s3.deleteObject,
    uploadObject: s3.uploadObject,
    fileUploadMiddleware: s3.fileUploadMiddleware,
  },
};
