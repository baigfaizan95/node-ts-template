export class Configs {

  public static dbConfig = {
    logging: false,
    username: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    database: process.env.DB || '',

// Start Postgres Configs
    host: process.env.DB_HOST || '',
    dialect: 'postgres',
    define: {
      freezeTableName: true,
    },
  };

  public static aws = {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
    SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    REGION: process.env.AWS_REGION,
    USER_BUCKET: process.env.AWS_USER_BUCKET || '',
  };

  public static mail = {
    mandrill: {
      HOST: process.env.MAIL_MANDRILL_HOST,
      FROM: process.env.MAIL_MANDRILL_FROM,
      USERNAME: process.env.MAIL_MANDRILL_USERNAME,
      PASSWORD: process.env.MAIL_MANDRILL_PASSWORD,
    },
    ses: {
      temp: 'temp',
    },
  };

  public static sms = {
    textlocal: {
      USERNAME: process.env.TEXTLOCAL_USERNAME,
      HASH: process.env.TEXTLOCAL_HASH,
      SENDER: process.env.TEXTLOCAL_SENDER,
      APIKEY: process.env.TEXTLOCAL_APIKEY,
    },
  };
}
