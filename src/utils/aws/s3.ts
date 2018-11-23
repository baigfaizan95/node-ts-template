import { S3 } from 'aws-sdk';
import { logger } from '@utils';

const s3 = new S3();

export const createBucket = (params: S3.Types.CreateBucketRequest) => {
  return s3
    .createBucket(params)
    .promise()
    .then((res) => {
      logger.info('AWS_S3: s3.createBucket successfull', res);
      return res;
    })
    .catch((err) => {
      logger.error('AWS_S3: s3.createBucket error', err);
      throw err;
    });
};

export const listBuckets = () => {
  return s3
    .listBuckets()
    .promise()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const listAllObjects = (params: S3.Types.ListObjectsV2Request) => {
  return s3
    .listObjectsV2(params)
    .promise()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const listObject = (params: S3.Types.HeadObjectRequest) => {
  return s3.headObject(params)
    .promise()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteObject = (params: S3.Types.DeleteObjectRequest) => {
  return s3.deleteObject(params)
    .promise()
    .then((res) => {
      logger.info('AWS_S3: object deleted', params);
      return res;
    })
    .catch((err) => {
      logger.error('AWS_S3: error deleting object', params, err);
      throw err;
    });
};

export const uploadObject = (params: S3.Types.PutObjectRequest) => {
  if (!params.ACL) {
    params.ACL = 'public-read';
  }

  return s3.putObject(params)
    .promise()
    .then((res) => {
      logger.info('AWS_S3: file upload successfull', params);
      return res;
    })
    .catch((err) => {
      logger.error('AWS_S3: file upload error', params, err);
      throw err;
    });
};

import multer from 'multer';
import multerS3 from 'multer-s3';
import mime from 'mime';
import path from 'path';
import bytes from 'bytes';

const multerCustomErrors = {
  FILETYPE_ERROR: 'Invalid File Type',
};

class MulterCustomError extends Error {
  code: string;
  constructor(code) {
    super(multerCustomErrors[code]);
    this.name = 'MulterCustomError';
    this.code = code;
  }
}

/**
 * upload a file directly to s3 with file filtering
 * @param params [Required] params for aws { bucketName, ACL }
 * @param fileName [Required] custom filename to be saved without extension (extension will be taken from mimetype)
 * @param filetypes [Optional] accepted file types in regex e.g /jpg|jpeg/ (default: all)
 * @param maxFileSize [Optional] limit file size (default: 10MB)
 */

export const fileUploadMiddleware = (params, fileName, filetypes = /./, maxFileSize = bytes('10mb')) => {
  return  multer({
    limits: { fieldNameSize: 255, fileSize: maxFileSize },
    fileFilter: function (req, file, cb) {
      const allowedFiletypes = filetypes;
      const mimetype = allowedFiletypes.test(file.mimetype);
      const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new MulterCustomError('FILETYPE_ERROR'), false);
    },

    storage: multerS3({
      s3: s3,
      bucket: params.bucketName,
      acl: params.ACL,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, `${fileName}.${mime.getExtension(file.mimetype)}`);
      },
    }),
  });
};
