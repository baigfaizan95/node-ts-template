import { logger } from '@utils';
import joi from 'joi';

import { ApiMessages } from '@configs';
const { HTTP_CODES, MESSAGES } = ApiMessages;

const validationOptions: joi.ValidationOptions = {
  abortEarly: true, // abort after the first validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

export const validator = (schema) => {
  return (req, res, next) => {
    return joi.validate(req.body, schema, validationOptions, (err, data) => {
      if (err) {
        logger.info(`VALIDATOR: ${req.route.path} invalid data`, err);
        res.status(HTTP_CODES.BAD_REQUEST).json({
          message: MESSAGES.WRONG_DATA,
        });
      } else {
        logger.info('VALIDATOR: valid data');
        next();
      }
    });
  };
};
