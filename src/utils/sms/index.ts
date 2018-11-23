import { logger } from '@utils';
import { Configs } from '@configs';
import requestPromise from 'request-promise';
import { SMS_TEMPLATES } from './SmsTemplates';

const request = requestPromise;

class TextLocal {
  private url = {
    send: 'http://api.textlocal.in/send',
    bulkjson: 'https://api.textlocal.in/bulk_json',
    templates: 'https://api.textlocal.in/get_templates',
    balance: 'https://api.textlocal.in/balance',
  };

  private textLocalSend = (number: number, message: string) => {
    return request.post(
      {
        url: this.url.send,
        form: {
          apikey: Configs.sms.textlocal.APIKEY,
          numbers: number,
          message: message,
          sender: Configs.sms.textlocal.SENDER,
        },
      }).then((response) => {
        const res = JSON.parse(response);
        if (res.status === 'success') {
          logger.info(`TEXTLOCAL: message sent to ${number} - ${message}`);
          return res;
        }
        logger.error('TEXTLOCAL: textlocal response error', res);
        throw res;
      }).catch((err) => {
        logger.error('TEXTLOCAL: textLocalSend() request error', err);
        throw err;
      });
  }

  public send = (number: number, template: string, data: any) => {
    return new Promise((resolve, reject) => {
      if (!(template in SMS_TEMPLATES)) {
        logger.error(`TEXTLOCAL: invalid template : ${template}`);
        reject(`invalid template ${template} [${number}]`);
      } else {
        try {
          const compiledTemplate = SMS_TEMPLATES[template](data);
          this.textLocalSend(number, compiledTemplate)
            .then((res) => { resolve(res); })
            .catch((err) => { reject(err); });
        } catch (e) {
          logger.error(`TEXTLOCAL: template compilation error - ${template}`, data);
          return reject(`template compilation error - ${template} [${number}]`);
        }
      }
    });
  }

  public bulkSend = (data: { number: number, text: string }[]) => {
    return request.post(
      {
        url: this.url.bulkjson,
        form: {
          apikey: Configs.sms.textlocal.APIKEY,
          data: JSON.stringify({
            sender: Configs.sms.textlocal.SENDER,
            messages: data,
          }),
        },
      })
      .then((response) => {
        const res = JSON.parse(response);
        if (res.status === 'success') {
          logger.info(`TEXTLOCAL: messages sent to ${res.total_cost} numbers`, data);
          return data;
        }

        logger.error('TEXTLOCAL: bulkSend response error', res);
        throw res;
      })
      .catch((err) => {
        logger.error('TEXTLOCAL: bulkSend() request error', err);
        throw err;
      });
  }

  public getTemplates = (): any => {
    return request.post(
      {
        url: this.url.templates,
        form: {
          apikey: Configs.sms.textlocal.APIKEY,
        },
      })
      .then((response) => {
        const res = JSON.parse(response);

        if (res.status === 'success') {
          logger.info(`TEXTLOCAL: ${res.templates.length} templates found`);
          return res.templates;
        }
        logger.error('TEXTLOCAL: getTemplates response error', res);
        throw res;
      })
      .catch((err) => {
        logger.error('TEXTLOCAL: getTemplates() request error', err);
        throw err;
      });
  }

  public getBalance = (): any => {
    return request.post(
      {
        url: this.url.balance,
        form: {
          apikey: Configs.sms.textlocal.APIKEY,
        },
      })
      .then((response) => {
        const res = JSON.parse(response);

        if (res.status === 'success') {
          logger.info(`TEXTLOCAL: balance is ${res.balance.sms}`, res);
          return res.balance.sms;
        }
        logger.error('TEXTLOCAL: getBalance response error', res);
        throw res;
      })
      .catch((err) => {
        logger.error('TEXTLOCAL: getBalance() request error', err);
        throw err;
      });
  }
}

const textLocal = new TextLocal();

export const sms = {
  send: textLocal.send,
  bulkSend: textLocal.bulkSend,
  getTemplates: textLocal.getTemplates,
  getBalance: textLocal.getBalance,
};
