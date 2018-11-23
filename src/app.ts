import express from 'express';
import bodyParser from 'body-parser';
import './env';
import compression from 'compression';
import routes from './routes';
const sequelize = require('@models/postgres').sequelize;
import { logger } from '@utils';
import mongoose from 'mongoose';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      next();
    });

    this.checkSequelizeConnection();
    this.checkMongooseConnection();
    routes(this.app);
  }

  private config(): void {
    // Port Setup
    this.app.set('port', process.env.PORT || 3000);

    // Body Parser Config
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    // Using gzip compression
    this.app.use(compression());
  }

  private checkSequelizeConnection(): void {
    sequelize
    .authenticate()
    .then(() => {
      logger.info('SEQUELIZE DATABASE: CONNECTION OK');
    })
    .catch((err) => {
      logger.error('SEQUELIZE DATABASE: UNABLE TO CONNECT: ', err);
    });
  }

  private checkMongooseConnection(): void {
    mongoose.connect(process.env.MONGO_URL || '');
    const db = mongoose.connection;
    db.on('error', () => {
      logger.error('MONGO DATABASE: UNABLE TO CONNECT');
    });
    db.once('open', () => {
      logger.info('MONGO DATABASE: CONNECTION OK');
    });
  }
}

export const app = new App().app;
