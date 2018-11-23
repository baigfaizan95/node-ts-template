export { aws } from './aws/index';
export { logger } from './logger/index';
export { mailer } from './mailer/index';
export { sms } from './sms/index';
export { bitly } from './bitly';
export { helper } from './helper';

export const objectId = () => {
  const os = require('os');
  const crypto = require('crypto');
  const seconds: string = Math.floor(new Date().getTime() / 1000).toString(16);
  const machineId = crypto
    .createHash('md5')
    .update(os.hostname())
    .digest('hex')
    .slice(0, 6);
  const processId = process.pid
    .toString(16)
    .slice(0, 4)
    .padStart(4, '0');
  const counter = process
    .hrtime()[1]
    .toString(16)
    .slice(0, 6)
    .padStart(6, '0');
  return seconds + machineId + processId + counter;
};
