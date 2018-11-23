export const MESSAGES = {};

export class ApiMessages {
  public static MESSAGES = {
    SYSTEM_ERROR: 'Error processing the request',
    DATA_FOUND: 'Data Found',
    WRONG_PASSWORD: 'Wrong Password',
    WRONG_USER: 'Wrong User',
    NO_USER: 'User not found',
    NO_DATA: 'Data not found',
    DATA_DELETED: 'Data Deleted',
    USER_EXISTS: 'Email or Phone Number already registered',
    DATA_CREATED: 'Data Created',
    DATA_UPDATED: 'Data Updated',
    DATA_EXISTS: 'Data Exists',
    WRONG_DATA: 'Wrong Data',
    NOT_DELETED: 'Not Deleted',
    INVALID_REQUEST: 'Invalid Data',
    NOT_UPDATED: 'NOT UPDATED',
    OTP_SENT: 'OTP_SENT',
    OTP_VERIFIED: 'OTP VERIFIED',
    EMAIL_VERIFIED: 'EMAIL VERIFIED',
    EMAIL_SENT: 'EMAIL SENT',
  };

  public static HTTP_CODES = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TIME_OUT: 408,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
    BAD_GATEWAY: 502,
    NOT_AVAILABLE: 503,
  };
}
