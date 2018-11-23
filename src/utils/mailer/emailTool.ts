import { logger } from '@utils';
import appRootPath from 'app-root-path';
import ejs from 'ejs';
import fs from 'fs';
import joi from 'joi';

const emailTemplateSchema = joi.object().keys({
  title: joi.string().required(),
  subject: joi.string().required(),
  template: joi.string().required(),
  variables: joi.array().items(
    joi.object({
      name: joi.string().required(),
      desc: joi.string().required(),
    }),
  ),
});

class EmailTool {

  public getTemplates = () => {
    return new Promise((resolve, reject) => {
      const templates: {}[] = [];
      const templatesPath = `${appRootPath}/templates/emailTemplates`;

      try {
        fs.readdirSync(templatesPath).forEach((folder) => {
          const dir = `${templatesPath}/${folder}`;
          if (fs.lstatSync(dir).isDirectory()) {
            const configFile = `${templatesPath}/${folder}/config.json`;
            const templateFile = `${templatesPath}/${folder}/index.hbs`;
            logger.info(configFile);
            logger.info(templateFile);

            if (fs.existsSync(configFile) && fs.existsSync(templateFile)) {
              const configContent = JSON.parse(
                fs.readFileSync(configFile, 'utf8'),
              );
              const templateContent = fs.readFileSync(templateFile, 'utf-8');
              const template = {
                title: configContent.title,
                subject: configContent.subject,
                template: templateContent,
                variables: configContent.variables,
              };
              template.variables.push({
                name: 'send_to_email',
                desc: 'SENDING EMAIL',
              });
              const valid = joi.validate(template, emailTemplateSchema); // validate mail
              if (valid.error) {
                logger.error(
                  'EMAIL_TOOL: Template Validation Error',
                  valid,
                );
                throw 'email template validation error';
              }
              logger.info(`EMAIL_TOOL: ${folder} template found`);
              templates.push(template);
            } else {
              logger.warn(`EMAIL_TOOL: template doesn't exist - ${folder}`);
            }
          }
        });

        resolve(templates);
      } catch (err) {
        logger.error(err);
        reject(err);
      }
    });
  }

  public renderTemplate = (template: string, data: {}) => {
    return new Promise((resolve, reject) => {
      try {
        const renderedTemplate = ejs.render(template, data);
        resolve(renderedTemplate);
      } catch (err) {
        logger.error('EMAIL_TOOL: template rendering error', err);
        reject(err);
      }
    });
  }
}

export const emailTool = new EmailTool();
