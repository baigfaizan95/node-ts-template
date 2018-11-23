import { Configs } from '@configs';
import nodemailer from 'nodemailer';
import joi from 'joi';
import { logger } from '@utils';
import { emailTool } from './emailTool';

const emailSchema = joi.object().keys({
  from: joi.string().email().regex(/@boardinfinity\.com|.org/).required(),
  to: joi.string().email().required(),
  cc: joi.string().email(),
  bcc: joi.string().email(),
  subject: joi.string().required(),
  text: joi.string(),
  html: joi.string().required(),
  attachments: joi.array().items(joi.object({
    filename: joi.string(),
    path: joi.string(),
    content: joi.any(),
    contentType: joi.string(),
    encoding: joi.string(),
  })),
});

class MandrillMailer {
  private mandrillSMTPTransport = nodemailer.createTransport({
    host: Configs.mail.mandrill.HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: Configs.mail.mandrill.USERNAME, // generated ethereal user
      pass: Configs.mail.mandrill.PASSWORD, // generated ethereal password
    },
  });

  // public send = (to, subject, html, from) => {
  public send = (emailOptions: nodemailer.SendMailOptions) => {
    return new Promise((resolve, reject) => {
      joi.validate(emailOptions, emailSchema)
        .then((res) => {
          emailOptions.from = `Board Infinity ${emailOptions.from}`;
          this.mandrillSMTPTransport.sendMail(emailOptions, (err, success) => {
            if (err) {
              logger.error(`MAILER: Error Sending Mail To ${emailOptions.to} with subject ${emailOptions.subject}`);
              throw err;
            } else {
              logger.info(`MAILER: Mail Send To ${emailOptions.to} with subject ${emailOptions.subject}`);
              resolve(success);
            }
          });
        })
        .catch((err) => {
          logger.error('MAILER: Email Details Validation Error', err);
          reject(err);
        });
    });
  }
}

const mandrillMailer = new MandrillMailer();

export const mailer = {
  mandrill: {
    send: mandrillMailer.send,
  },
  emailTool: {
    getTemplates: emailTool.getTemplates,
    render: emailTool.renderTemplate,
  },
  send: mandrillMailer.send,
};
